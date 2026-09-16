# ENERIX Carbon — Temporal Regulation Model (TRM)
## Document ID: EC-TEMP-001
**Title:** ENERIX Carbon Temporal Regulation Model — Formal Temporal Applicability & Regulatory Transition Specification  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Regulatory Architecture & Compliance Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` (Canonical Domain Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping Specification)
- `EC-RRM-001` (Regulatory Rule Model Specification)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-TEMP-001` |
| **Document Title** | ENERIX Carbon Temporal Regulation Model |
| **Artifact Class** | Formal Temporal Applicability & Transition Specification |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Compliance Engineering & Temporal Architecture Committee |
| **Repository Location** | `/carbon/docs/regulatory/EC-TEMP-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-TEMP-001** is to define the formal semantic model for temporal applicability within the ENERIX Carbon platform. 

Environmental laws, technical methodologies, emission factor sets, and global warming potential (GWP) datasets are highly dynamic. They are subject to legislative amendments, replacements, grace periods, and transitional regulations. This model establishes a standardized temporal metadata calculus to guarantee that calculations remain completely historical, audit-reproducible, and aligned with statutory timelines without silently inheriting current-state variations.

---

## 3. Scope

This specification governs the temporal semantics, value objects, date boundary calculus, and transition mechanics used across all regulatory and calculation modules.

### Out of Scope:
- **Temporal Engine Code:** Implementation details of chronological scheduling, database indexes, or cron-based pipelines.
- **Generic Database Schema:** Physical DDL scripts or SQL dialect-specific temporal datatypes (e.g., PostgreSQL `tsrange`).
- **Direct Legal Counsel:** Setting or altering the statutory effective dates of legislation.

---

## 4. Temporal Principles

The Temporal Regulation Model is anchored in five fundamental engineering axioms:

1. **Law of Non-Timelessness:** Regulation does not exist in a vacuum. No regulatory rule, methodology, emission factor, or GWP dataset can be treated as timeless. All artifacts must be temporally bounded.
2. **First-Class Date Segregation:** Dates with distinct semantic roles (e.g., publication date vs. effective date) must remain strictly isolated. Under no circumstances may they be collapsed or used interchangeably.
3. **Temporal Invariance of Calculations:** A calculation run recorded for a specific historical reporting period must remain perfectly reproducible. Changing the system's "current" active rules must never modify historical results.
4. **Non-Contamination of Boundaries:** Temporal boundaries must be evaluated using standard interval calculus to prevent overlap errors or gaps in compliance coverage.
5. **Traceability of Amendments:** Legislative updates must be tracked through explicit relational pointers, maintaining the historical identity of the original rule.

---

## 5. Temporal Value Objects

To enforce type-safe chronological operations, TRM defines five primary temporal value objects. These reuse and extend the value types established in `/carbon/docs/data-model/EC-DM-001.md`:

### 1. `EffectivePeriod`
Indicates the exact date window during which an artifact has statutory force.
- Attributes: `effective_from` (Date, inclusive), `effective_to` (Date, exclusive, nullable).

### 2. `ReportingPeriod`
The statutory compliance window under evaluation (typically a calendar year or quarter).
- Attributes: `period_start` (Date, inclusive), `period_end` (Date, inclusive).

### 3. `ActivityPeriod`
The actual physical interval over which a carbon-emitting activity occurred.
- Attributes: `activity_start` (Date, inclusive), `activity_end` (Date, inclusive).

### 4. `EventDate`
The discrete point-in-time date of a specific physical event (e.g., fuel invoice date, stack measurement date).
- Attributes: `date_value` (Date).

### 5. `AssessmentDate`
The date on which the compliance evaluation or calculation is executed (system runtime timestamp).
- Attributes: `timestamp` (DateTime).

---

## 6. Publication vs. Effective Date

TRM enforces strict logical segregation between chronological states:

$$\text{Publication Date} \ne \text{Effective From} \ne \text{Effective To}$$

A regulation is frequently published in the official gazette (Công báo) months before it legally enters into force:
* **`publication_date`:** The date of official publication (non-executable).
* **`effective_from`:** The date on which the rule becomes legally active (executable).

*Engine Rule:* Under no circumstances may a platform engine fallback to `publication_date` as the default execution trigger if `effective_from` is missing. If the effective date cannot be verified from primary legal sources, the state must transition to `UNKNOWN` and issue a `SOURCE_VERIFICATION_REQUIRED` alert.

---

## 7. Effective Window

The validity window of an artifact is modeled as a left-closed, right-open interval $[t_{start}, t_{end})$ when $t_{end}$ is defined, or $[t_{start}, \infty)$ for active open-ended legislation:

- **`effective_from` (Inclusive):** The day, starting at `00:00:00` in the local time zone (`UTC+7`), when the artifact enters into force.
- **`effective_to` (Exclusive):** The day, starting at `00:00:00` in the local time zone, when the artifact loses force. If the rule is currently active, `effective_to` is set to `NULL`.

| Artifact State | Effective From | Effective To | Representation Interval |
| :--- | :--- | :--- | :--- |
| **Draft** | Future Date | NULL | $[t_{future}, \infty)$ (Inactive until $t \ge t_{future}$) |
| **Active** | Historical Date | NULL | $[t_{start}, \infty)$ |
| **Expired / Superseded** | Historical Date | Historical Date | $[t_{start}, t_{end})$ |

---

## 8. Validity Predicate

To evaluate whether a versioned regulatory artifact is valid for a given reporting period, the execution engine must execute the formal **Temporal Overlap Predicate**:

$$\text{IsValid}(Artifact, Period) \iff (Artifact.effective\_from \le Period.period\_end) \ \land \ (Artifact.effective\_to = \text{null} \ \lor \ Artifact.effective\_to \ge Period.period\_start)$$

*Boundary Inclusivity Rule:* If an artifact expires on `2025-01-01` (`effective_to` = `2025-01-01`), it is considered legally expired at `00:00:00` on that day. Any activity occurring on `2025-01-01` must be evaluated against the replacing rule set.

---

## 9. Point vs. Interval

TRM distinguishes between Point-in-Time events and Interval-based compliance structures:

- **Point-in-Time Evaluation:** Applicable to discrete occurrences (e.g., fuel purchase transactions mapped via `EventDate`). The evaluation matches the single date against the active window:
  $$t_{event} \in [effective\_from, effective\_to)$$
- **Interval Evaluation:** Applicable to aggregate compliance calculations (e.g., calculating annual Scope 2 emissions). The evaluation applies the **Validity Predicate** to evaluate overlap during the defined `ReportingPeriod`.

---

## 10. Regulatory Transition

Legislative transitions are represented through strict semantic links to preserve the historical continuity of rule identity:

- **`AMENDS` / `AMENDED_BY`:** The newer rule modifies specific attributes of the target rule while preserving its identity.
- **`REPLACES` / `REPLACED_BY`:** The newer rule replaces the target rule entirely on a specific date threshold. Historical periods execute the replaced rule; current periods execute the new rule.
- **`SUPERSEDES` / `SUPERSEDED_BY`:** The older rule is declared legally void.
- **`APPLIES_DURING`:** Standardizes transitional boundaries (e.g., grace periods), ensuring temporary exemptions map cleanly to activities occurring within those dates.

Under no circumstances may a historical rule definition be overwritten or modified in-place to represent a transition.

---

## 11. Partial Amendment

When a legislative amendment alters only a subset of clauses within a master document, the TRM models the mutation through **Relational Rule Versioning**:

1. The parent `RegulatoryDocument` is versioned (e.g., from `V1.0` to `V1.1`).
2. Unchanged articles retain their existing rule versions and mappings.
3. Amended articles spawn new `RegulatoryRule` entities pointing to the amendment document with updated `effective_from` dates.
4. The older, modified clauses are flagged as `SUPERSEDES` by the new clauses, establishing an unbroken lineage path.

---

## 12. Reporting Period Straddling Transition

When a facility's `ReportingPeriod` straddles a legislative transition date, the evaluation engine must prevent the retrospective or premature application of either rule. 

### Scenario:
* **Reporting Period:** `2025-01-01` to `2025-12-31`
* **Transition Date:** `2025-07-01` (Rule A expires; Rule B becomes effective)

```
                       Transition Date (2025-07-01)
                                    │
┌───────────────────────────────────┼───────────────────────────────────┐
│              Period A             │              Period B             │
│        (Rule A Applicable)        │        (Rule B Applicable)        │
└───────────────────────────────────┴───────────────────────────────────┘
2025-01-01                                                             2025-12-31
```

### Resolution Policy:
The system must split the parent `ReportingPeriod` into two distinct temporal evaluation intervals:
1. **Sub-period A:** `2025-01-01` to `2025-06-30` (bound to Rule A).
2. **Sub-period B:** `2025-07-01` to `2025-12-31` (bound to Rule B).

Applying either Rule A or Rule B to the entire calendar year constitutes an administrative compliance failure and is strictly barred.

---

## 13. Activity Data Segmentation

To execute the sub-period calculations required by straddling transitions, the platform introduces **Activity Data Segmentation**:

* **Original Activity Period:** The physical date boundary declared on the incoming activity data record (e.g., fuel delivery invoice spanning `2025-06-15` to `2025-07-15`).
* **Segmentation Trigger:** The occurrence of a regulatory transition date ($t_{transition} = \text{2025-07-01}$) within the activity period.
* **Resulting Segments:**
  1. **Segment A:** `2025-06-15` to `2025-06-30` (calculated using Rule A parameters).
  2. **Segment B:** `2025-07-01` to `2025-07-15` (calculated using Rule B parameters).
* **Segmentation Metadata:** Must record the `original_activity_id`, `split_reason` (e.g., *"Regulatory transition under Decision 42"*), and references to both evaluated rules.

---

## 14. Calculation Context Versioning

A `CalculationRun` must record and freeze all temporal variables utilized during its execution to satisfy carbon audit standards. The frozen metadata snapshot contains:

```yaml
TemporalContextSnapshot:
  calculation_run_id: "RUN-HD-2025-001"
  calculation_timestamp: "2026-09-16T08:15:00Z"
  reporting_period: "2025-01-01..2025-12-31"
  active_ruleset_version: "RSET-VN-NATIONAL-2025_V1.0.0"
  bound_methodology_versions:
    - methodology_id: "METH-MONRE-ENERGY-2022"
      version: "1.2.0"
  applied_ef_versions:
    - factor_id: "EF-VN-GRID-ELECTRICITY"
      version: "EF_VER_MONRE_2024"
  applied_gwp_versions:
    - dataset_id: "GWP-IPCC-AR5"
      version: "1.0.0"
```

---

## 15. Temporal Snapshot

The `TemporalSnapshot` guarantees mathematical reproducibility. Rather than relying on dynamic database joins, the execution engine retrieves a static snapshot of the compliance state frozen to a specific date. This ensures that even if emission factors are corrected or rules amended tomorrow, rebuilding a past report will yield the exact same emissions value down to the decimal point.

---

## 16. Temporal Conflict

Temporal overlap conflicts (e.g., two distinct rules claiming exclusive applicability for the same sub-sector during the same reporting period) are structured explicitly:

```yaml
TemporalConflict:
  conflict_id: "CONF-TEMP-2026-01"
  conflict_type: "OVERLAPPING_VALIDITY_WINDOWS"
  affected_rule_ids: ["RULE-DOC-A-A5C1", "RULE-DOC-B-A3C2"]
  temporal_context: "2026-01-01..2026-12-31"
  impact: "Determining grid emission factors for Hanoi power stations"
  resolution_status: "OPEN_CONTROLLED_AMBIGUITY"
  resolution_authority: "MONRE_MRV_BOARD"
```

*Conflict Resolution Policy:* The engine is strictly forbidden from inventing precedence heuristics or defaulting to the newer rule. The run must be halted and flagged as `BLOCKED`.

---

## 17. Temporal Precedence

When evaluating active rules, the chronological precedence logic is ordered as:

1. **Constitutional Power:** A Decree's validity window overrides a Circular's validity window.
2. **Specific Jurisdictional Window:** Local provincial temporal overrides (e.g., early-adoption mandates) supersede national transition dates within that boundary.
3. **Explicit Supersession:** If Rule B contains an explicit `SUPERSEDES` pointer to Rule A, Rule A's validity is evaluated as terminated on Rule B's `effective_from` date.

---

## 18. Historical Reproducibility

To guarantee auditability by independent third-party verifiers, any evaluation or calculation run must be fully reproducible under the following constraints:

- No dynamic, current-timestamp queries may be executed.
- All historical versions of rules, factors, GWP values, and methodologies must remain archived, queryable, and immutable.
- The compilation pipeline must run calculations using the archived metadata matching the historical `ReportingPeriod`.

---

## 19. Temporal Queries

The TRM provides formal query definitions used to retrieve compliance states chronologically:

- **Query 1 (Point Validity):** `GetRuleAt(rule_id, date_value) -> RegulatoryRule`
- **Query 2 (Period Validity):** `GetRulesActiveDuring(reporting_period, sector) -> List<RegulatoryRule>`
- **Query 3 (Methodology Transition):** `GetMethodologyAt(methodology_id, reporting_period) -> MethodologyVersion`
- **Query 4 (Factor Timing):** `GetEmissionFactorFor(factor_id, activity_date) -> EmissionFactorValue`

---

## 20. Applicability Graph

The chronological relationships among entities form a directed acyclic graph (DAG) representing legal lineage:

```
Document (V1.0) ───────────────> Document (V1.1 - Amendment)
    │                                 │
    ▼                                 ▼
Rule A (V1.0.0) ──[SUPERSEDES]──> Rule A (V2.0.0)
    │                                 │
    ├── Valid [2022..2025)            └── Valid [2025..Open)
    ▼                                 ▼
Evaluation (2024 Run)              Evaluation (2025 Run)
```

---

## 21. Regulatory Document Versioning

- **Document Version:** Tracks physical publications or ministerial releases.
- **Rule Version:** Tracks the specific translation of a clause into predicate AST nodes.
- **Effective Version:** Tracks changes in the validity dates of a rule set.

A single parent Document may undergo minor administrative updates without altering the underlying rule predicate trees. Thus, document versioning and rule versioning must remain decoupled.

---

## 22. Methodology Timing

Technical methodologies have independent lifecycles from general legislative documents:
* A Decree may mandate reporting obligations starting on `2025-01-01`.
* The specific MRV Circular defining the calculation methodology may not enter into force until `2025-06-01`.

*Evaluation Policy:* Between `2025-01-01` and `2025-05-31`, the methodology state is evaluated as `UNKNOWN`, halting calculations and prompting for manual administrative guidelines, rather than defaulting to older, outdated circulars.

---

## 23. Emission Factor (EF) Timing

Emission factors are highly temporal. For example, national grid electricity emission factors represent historical grid mixes and are updated annually:

* **Grid EF 2024:** Valid only for activity dates within `2024-01-01` to `2024-12-31`.
* **Grid EF 2025:** Valid only for activity dates within `2025-01-01` to `2025-12-31`.

Applying the 2024 grid factor to a 2025 activity data point is a calculation methodology error. The temporal model enforces strict **Activity Date Binding** to map the correct factor version.

---

## 24. Global Warming Potential (GWP) Timing

GWP datasets represent scientific assessments issued by the IPCC. A regulatory framework binds a specific GWP dataset for a defined compliance period:

* **Framework 1 (Decision 01/2022/QĐ-TTg):** Mandates IPCC AR5 GWP values.
* **Framework 2 (Future statutory updates):** Mandates IPCC AR6 GWP values.

The temporal engine must resolve the GWP dataset version based on the active `RegulatoryRule` for the reporting period, never allowing the user to select AR5 or AR6 values arbitrarily.

---

## 25. Historical Immutability

To guarantee data integrity:
- Archival database records of rules, methodologies, factors, and GWP tables must be marked as write-once, read-many (WORM).
- Administrative mutations of historical compliance states are strictly prohibited.
- Corrections to historical reports must spawn a new versioned report run (`CalculationRun_V2`) while preserving the original run for auditing.

---

## 26. Multi-Regulation Context

A facility may be subject to multiple, parallel regulatory frameworks with differing reporting periods (e.g., submitting an annual national report to MONRE alongside a quarterly corporate compliance report to an international parent entity).

The TRM natively supports **Parallel Temporal Scoping**, permitting different rule sets and methodologies to execute against the same facility's activity data without cross-contamination.

---

## 27. Temporal Status

Every version of a regulatory rule or methodology has a chronological status calculated dynamically:

* **`ACTIVE`:** The assessment date falls within the validity window:
  $$t_{assessment} \in [effective\_from, effective\_to)$$
* **`EXPIRED`:** The validity window has closed:
  $$t_{assessment} \ge effective\_to$$
* **`TRANSITIONAL`:** The rule is currently active under temporary transition or grace period guidelines.
* **`UNKNOWN`:** The validity window boundaries are missing or unverified.

---

## 28. Temporal Status vs. Applicability

- **Temporal Status:** Evaluates if a rule is legally active at a given point in time (dimension of time only).
- **Applicability Result:** Evaluates if the rule applies to a specific facility context (dimension of time AND operational attributes).

*Rule of Decoupling:* A rule may be `ACTIVE` temporally but evaluate as `NOT_APPLICABLE` to a facility because its operational metrics fall below statutory thresholds.

---

## 29. Relationship to RRM (`EC-RRM-001`)

The Regulatory Rule Model (`EC-RRM-001`) defines rule schemas and logical predicate structures. The TRM (`EC-TEMP-001`) provides the temporal context and validity calculus used to filter, retrieve, and sequence those rules inside execution loops.

---

## 30. Relationship to KM (`EC-KM-001`)

The Knowledge Matrix (`EC-KM-001`) establishes source authority hierarchies and records the raw, gazetted timestamps of statutory documents. The TRM consumes these timestamps to compute the `effective_from` and `effective_to` variables.

---

## 31. Relationship to UCM (`EC-UCM-001`)

The Universal Calculation Model (`EC-UCM-001`) defines the mathematical formulas and execution models. The TRM compiles the temporal snapshot (factors, GWP dataset version, active rules) required as input parameters before executing the deterministic calculation formulas.

---

## 32. Relationship to Domain Model (`EC-DM-001`)

The Canonical Domain Model (`EC-DM-001`) defines core entities and basic date objects. The TRM establishes the formal interval logic, validity predicates, and relational schemas governing those entities over time.

---

## 33. Implementation Boundary

TRM governs the conceptual schemas and formal temporal predicates of the system.

### Under TRM Governance:
- Temporal value objects, intervals, and boundary inclusivity calculus.
- Overlap validity predicates, period splitting, and activity segmentation concepts.
- Lineage transition relationships (`AMENDS`, `REPLACES`, `SUPERSEDES`).
- Reproducibility parameters, snapshots, and temporal conflict modeling.

### Outside TRM Boundaries:
- Database timezone management, SQL date formatting, indexing, or performance optimization.
- UI scheduler calendars or report generation buttons.
- Calculation algorithms or GWP conversions.

---

## 34. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-TEMP-001` | Missing Statutory End Dates | Several sector-specific circulars lack defined sunset dates, risking silent overlaps when newer guidelines are issued. | `EC-TEMP-002` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-TEMP-002` | Mid-Month Transition Auditing | Splitting activity data for mid-month billing cycles where meter readings are unavailable introduces measurement uncertainty. | `EC-MTH-001` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-TEMP-003` | Retrospective Circular Mandates | Retroactive legal application dates in late-issued ministry guidelines conflict with static database immutability rules. | `EC-RRM-002` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |

---

## 35. Machine-Readable Model

The machine-readable definitions for core temporal value objects are defined in the companion YAML document `/carbon/docs/regulatory/EC-TEMP-001.yaml`.

---

## 36. Reconciliation

The TRM has been fully reconciled against the ENERIX Carbon baseline:
* Terminology (e.g., `ReportingPeriod`, `effective_from`, `effective_to`) is identical to the canonical definitions in `EC-DM-001` and `EC-RRM-001`.
* Temporal calculus matches the validity ranges defined in `EC-DM-001` (Section 11/12).
* decouping of administrative documents and rule-level versioning aligns perfectly with `EC-KM-001`.

---

## 37. Acceptance Criteria

`EC-TEMP-001` is accepted only if:

- [x] **A.** Publication date is strictly decoupled from legislative effective dates.
- [x] **B.** Reporting period, activity period, and effective periods are represented as distinct temporal value objects.
- [x] **C.** Logical boundary inclusivity ($[t_{start}, t_{end})$) is formalized and mathematically defined.
- [x] **D.** Transitional regulations and grace periods are modeled under separate, identifiable transition relationships.
- [x] **E.** Partial amendments preserve the lineage and identity of the master document.
- [x] **F.** Overlapping reporting periods can be conceptually segmented into sub-period intervals.
- [x] **G.** Historical calculation runs are frozen, immutable, and 100% reproducible.
- [x] **H.** Independent timing cycles for methodologies, emission factors, and GWP datasets are represented.
- [x] **I.** Overlapping temporal conflicts are logged explicitly as `BLOCKED` states, rather than silently bypassed.
- [x] **J.** Decoupling of rule temporal status from facility-level operational applicability is preserved.
- [x] **K.** Compatible with the semantic boundaries of `EC-KM-001`, `EC-DM-001`, and `EC-RRM-001`.

---

## 38. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Compliance Working Group | Initial formal specification of the Temporal Regulation Model (`EC-TEMP-001`). |

---
**Status Declaration:** `TEMPORAL_MODEL_ALIGNED_WITH_OPEN_ISSUES`
