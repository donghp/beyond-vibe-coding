# EC-TEMP-001 Contract Reading Report

## 1. Document Identity
*   **Document ID:** `EC-TEMP-001`
*   **Document Title:** ENERIX Carbon Temporal Regulation Model — Formal Temporal Applicability & Regulatory Transition Specification
*   **Version:** `1.0.0`
*   **Status:** `APPROVED_BASELINE`
*   **Effective Date:** 2026-09-16
*   **Authors:** ENERIX Carbon Regulatory Architecture & Compliance Working Group
*   **Status Declaration:** `TEMPORAL_MODEL_ALIGNED_WITH_OPEN_ISSUES`

---

## 2. Source Scope
*   **Primary Source File:** `/carbon/docs/regulatory/EC-TEMP-001.md`
*   **Coverage:** Complete document analyzed (471 lines, 24,420 bytes).
*   **Exclusions / Out-of-Scope:**
    *   Temporal engine implementation details, scheduling, indexing, or database-specific pipelines.
    *   Physical database temporal types (e.g., PostgreSQL `tsrange`).
    *   Direct legal definitions or counsel regarding statutory effective dates.

---

## 3. Complete Specification Structure
The source document consists of 38 numbered sections:
1.  **Document Control:** Metadata registry.
2.  **Purpose:** Scope and rationale for dynamic compliance timing.
3.  **Scope:** In-scope and out-of-scope boundaries.
4.  **Temporal Principles:** Five core axiomatic axioms.
5.  **Temporal Value Objects:** Five primary date types.
6.  **Publication vs. Effective Date:** Logical segregation rules.
7.  **Effective Window:** Left-closed, right-open interval model.
8.  **Validity Predicate:** Overlap calculation formula.
9.  **Point vs. Interval:** Point-in-time vs. aggregated periods.
10. **Regulatory Transition:** Rule continuity relationship pointers.
11. **Partial Amendment:** Relational rule versioning.
12. **Reporting Period Straddling Transition:** Scenario and division policy.
13. **Activity Data Segmentation:** Split trigger, results, and metadata.
14. **Calculation Context Versioning:** Snapshot structure schema.
15. **Temporal Snapshot:** Static reproducibility guarantee.
16. **Temporal Conflict:** Modeling and block state resolution.
17. **Temporal Precedence:** Overriding precedence hierarchy.
18. **Historical Reproducibility:** Auditability constraints.
19. **Temporal Queries:** Standard search queries.
20. **Applicability Graph:** DAG representation of legal lineage.
21. **Regulatory Document Versioning:** Decoupled levels of versioning.
22. **Methodology Timing:** Independent lifecycle rules.
23. **Emission Factor (EF) Timing:** Annual grid updates and binding.
24. **Global Warming Potential (GWP) Timing:** Dataset version resolution.
25. **Historical Immutability:** Write-once-read-many (WORM) constraints.
26. **Multi-Regulation Context:** Parallel scoping.
27. **Temporal Status:** Dynamic state transitions.
28. **Temporal Status vs. Applicability:** Decoupled evaluation logic.
29. **Relationship to RRM (`EC-RRM-001`):** Rule logic integration.
30. **Relationship to KM (`EC-KM-001`):** Gazetted timestamps consumption.
31. **Relationship to UCM (`EC-UCM-001`):** Formula inputs compiled.
32. **Relationship to Domain Model (`EC-DM-001`):** Base types extended.
33. **Implementation Boundary:** Conceptual scope separation.
34. **Controlled Open Issues:** Three tracked open issues.
35. **Machine-Readable Model:** Yaml companion link.
36. **Reconciliation:** Alignment verification.
37. **Acceptance Criteria:** Eleven checkboxes (A through K).
38. **Revision History:** Initial release metadata.

---

## 4. Temporal Concepts Inventory

| Concept | Classification | Definition in Source / Explicit Location |
| :--- | :--- | :--- |
| **effective_from** | `DEFINED` | Inclusive start date of legal force (Section 5, Section 7) |
| **effective_to** | `DEFINED` | Exclusive end date of legal force, nullable if open-ended (Section 5, Section 7) |
| **publication_date** | `DEFINED` | Non-executable gazette publication date, strictly segregated from effective date (Section 6) |
| **reporting_period** | `DEFINED` | Inclusive-inclusive compliance window, e.g., calendar year/quarter (Section 5) |
| **activity_period** | `DEFINED` | Inclusive-inclusive interval of physical emitting activity (Section 5) |
| **assessment_date** | `DEFINED` | Execution datetime timestamp at runtime (Section 5, Section 27) |
| **validity interval** | `DEFINED` | Formatted as $[t_{start}, t_{end})$ or $[t_{start}, \infty)$ (Section 7) |
| **open-ended interval** | `DEFINED` | Validity window where `effective_to` is `NULL` (Section 7) |
| **boundary semantics** | `DEFINED` | Lower boundary inclusive (`00:00:00`), upper boundary exclusive (`00:00:00` next day) (Section 7) |
| **overlap** | `DEFINED` | Intersection evaluation governed by formal Validity Predicate (Section 8) |
| **containment** | `DEFINED` | Point-in-time check $t_{event} \in [effective\_from, effective\_to)$ (Section 9) |
| **adjacency** | `PARTIALLY_DEFINED` | Represented as consecutive contiguous intervals $[t_1, t_2)$ and $[t_2, t_3)$ without overlapping at $t_2$ (Section 7, Section 8) |
| **intersection** | `PARTIALLY_DEFINED` | Modeled implicitly via temporal overlap predicate (Section 8) |
| **subtraction** | `NOT_DEFINED` | Not explicitly defined in the document |
| **splitting** | `DEFINED` | Splitting parent Reporting Period into sub-period intervals (Section 12) |
| **normalization** | `NOT_DEFINED` | Not explicitly defined in the document |
| **ordering** | `DEFINED` | Chronological ordering of segments and transition boundaries (Section 12, Section 17) |
| **transition** | `DEFINED` | Legal relationship links: `AMENDS`, `REPLACES`, `SUPERSEDES`, `APPLIES_DURING` (Section 10) |
| **historical state** | `DEFINED` | Archived and preserved rule configurations that cannot be overwritten (Section 10, Section 18) |
| **temporal snapshot** | `DEFINED` | Static frozen collection of rules, methods, EFs, and GWPs for calculation run (Section 14, Section 15) |
| **reproducibility** | `DEFINED` | Static queries yielding exact identical results using archived historical states (Section 18, Section 25) |
| **temporal binding** | `DEFINED` | Dynamic linking of emission factors (Activity Date) and GWPs (Regulatory Rule) (Section 23, Section 24) |

---

## 5. Interval Semantics
*   **Lower Boundary (`effective_from`):** Inclusive ($[t_{start}$). Starting at `00:00:00` local time (`UTC+7`).
*   **Upper Boundary (`effective_to`):** Exclusive ($t_{end})$). Ending at `00:00:00` local time on that day. An artifact expires at `00:00:00` on the specified `effective_to` day, meaning any activity occurring on that day belongs to the successor interval.
*   **Open-ended Interval:** Modeled as $[t_{start}, \infty)$ with `effective_to` set to `NULL`.
*   **Zero-Length Interval:** Zero-length interval behaviors are not explicitly specified, but logical boundaries imply a start and end cannot be identical without representing an empty range.
*   **Malformed Interval:** Handled via fail-closed behavior (returns `UNKNOWN` or `REQUIRES_REVIEW`).
*   **Overlap Condition:** Standard interval overlap calculus. Boundaries do not overlap at the exclusive transition threshold.
*   **Adjacent Intervals:** Two intervals $[t_1, t_2)$ and $[t_2, t_3)$ share the boundary $t_2$, but since $t_2$ is exclusive in the first and inclusive in the second, they are contiguous and adjacent, NOT overlapping.

---

## 6. Interval Operations
*   **`contains`:** (Section 9) Point-in-time check: $t_{event} \in [effective\_from, effective\_to)$. True if $effective\_from \le t_{event} < effective\_to$.
*   **`overlaps`:** (Section 8) Formally specified as the Validity Predicate:
    $$\text{IsValid}(Artifact, Period) \iff (Artifact.effective\_from \le Period.period\_end) \ \land \ (Artifact.effective\_to = \text{null} \ \lor \ Artifact.effective\_to \ge Period.period\_start)$$
*   **`intersect`:** Evaluated implicitly through the overlap predicate to resolve matching candidate rules.
*   **`subtract`:** `NOT_DEFINED` in the specification.
*   **`split`:** (Section 12) Dividing a parent reporting period or activity interval into contiguous sub-period intervals when crossed by a regulatory transition boundary.
*   **`normalize`:** `NOT_DEFINED` in the specification.
*   **`adjacent`:** Contiguous contiguous intervals that share a boundary point without overlapping.
*   **`sort`:** Chronological ordering based on start dates or transition points.
*   **`compare`:** Chronological comparison of dates and intervals.

---

## 7. Straddle / Segmentation Semantics
*   **Straddle Condition:** Occurs when a legislative transition boundary ($t_{transition}$) falls strictly inside the parent period: $R_{start} < t_{transition} < R_{end}$.
*   **Segmentation Requirement:** Mandatory. Applying a single rule to an entire year that straddles a transition constitutes an administrative compliance failure and is strictly barred.
*   **Boundary Selection:** Defined by the regulatory rule's `effective_from` date of the incoming replacement rule (e.g., `2025-07-01` in Section 12).
*   **Multiple Boundaries:** Supported. The document implies N-way splits by discussing partial amendments, independent Lifecycles (Methodologies, EFs), and parallel temporal scoping.
*   **Segment Ordering:** Chronological. Sub-period A starts at parent start and ends before the transition. Sub-period B starts at transition and ends at parent end. The boundary itself belongs to Segment B (Section 12).
*   **Zero-Length Segments:** Logically avoided because boundaries are distinct chronological points.
*   **Metadata of Segment:** Must preserve `original_activity_id`, `split_reason`, and references to both evaluated rules (Section 13).
*   **Parent Period Preservation:** Required. Original parent activity period and parent reporting period are frozen in metadata (Section 13, Section 14).

---

## 8. Transition Relationships
Section 10 defines four explicit relational links:
*   **`AMENDS` / `AMENDED_BY`:** Evaluates a partial update where specific rule attributes are modified while maintaining original rule identity.
*   **`REPLACES` / `REPLACED_BY`:** Newer rule takes legal force on a specific threshold, replacing the old rule entirely. Historical calculations execute the old rule; current ones execute the new one.
*   **`SUPERSEDES` / `SUPERSEDED_BY`:** Old rule is declared legally void. Prior rule versions and historical calculations must remain valid and reproducible.
*   **`APPLIES_DURING`:** Standardizes transitional boundaries and grace periods mapping to specific activities.

*Immutability Constraint:* In-place modification of historical rule parameters to represent a transition is strictly forbidden.

---

## 9. Temporal Binding Semantics
*   **Emission Factors (EF):** Formally bound via **Activity Date Binding** (Section 23). Grid EFs must match the year of the physical activity.
*   **GWP Datasets:** Resolved based on the active `RegulatoryRule` for the reporting period (Section 24). Arbitrary selection by users between IPCC AR5/AR6 is prohibited.
*   **Methodologies:** Independent lifecycle timing. Between a decree start and MRV circular start, the state is evaluated as `UNKNOWN`, halting calculations and prompting manual guidelines (Section 22).
*   **Sector Profiles:** Decoupled. A rule is `ACTIVE` temporally but can be `NOT_APPLICABLE` to a facility if operational parameters fall below thresholds (Section 28).

---

## 10. Historical Immutability
*   **Rules & Calculations Immutability:** Written to WORM (write-once, read-many) storage. Administrative mutations are strictly prohibited (Section 25).
*   **Corrections Policy:** Corrections to historical reports must spawn a new versioned report run (`CalculationRun_V2`) while preserving the original run for audits.

---

## 11. Determinism Requirements
*   **Reproducibility Constraint:** No dynamic current-timestamp queries may be executed. Past reports rebuilt on later dates must yield identical values down to the decimal point (Section 18, Section 25).
*   **Linear Lineage:** Traced via Directed Acyclic Graphs (DAG) of legal relations (Section 20).
*   **Decoupled Versioning:** Document versioning, rule versioning, and effective versioning are independent.

---

## 12. Fail-Closed Requirements
*   **Missing Effective Date:** If `effective_from` is missing, the system MUST transition to `UNKNOWN` and issue a `SOURCE_VERIFICATION_REQUIRED` alert. Falling back to `publication_date` is strictly forbidden (Section 6).
*   **Temporal Conflicts:** Overlapping validity windows are logged as `BLOCKED` states. Inventing precedence heuristics or choosing arbitrary winners is strictly prohibited (Section 16).
*   **Methodology Gaps:** If a methodology MRV circular is missing, state is `UNKNOWN` and halts calculations (Section 22).

---

## 13. Controlled Open Issues
The specification lists three open issues in Section 34:
*   **`ISSUE-TEMP-001` (Missing Statutory End Dates):** Sector-specific circulars lacking defined sunset dates. Classification: `SOURCE_VERIFICATION_REQUIRED`. Status: `OPEN_CONTROLLED`.
*   **`ISSUE-TEMP-002` (Mid-Month Transition Auditing):** Splitting activity data for mid-month billing where meter readings are unavailable. Classification: `HUMAN_JUDGMENT_REQUIRED`. Status: `OPEN_CONTROLLED`.
*   **`ISSUE-TEMP-003` (Retrospective Circular Mandates):** Retroactive legal application dates in late-issued circulars conflicting with database immutability. Classification: `DEFERRED_TO_OTHER_ARTIFACT` (EC-RRM-002). Status: `OPEN_CONTROLLED`.

---

## 14. Cross-Specification Dependencies
*   **`EC-RRM-001` (RRM):** Defines rule schemas and logical predicates. EC-TEMP-001 provides the temporal query environment and validity predicate to filter those rules.
*   **`EC-KM-001` (KM):** Establishes authority hierarchies and records the raw, gazetted timestamps. EC-TEMP-001 consumes these to compute effective dates.
*   **`EC-UCM-001` (UCM):** Defines calculations and formulas. EC-TEMP-001 compiles the correct factors and GWP parameters as inputs for UCM.
*   **`EC-DM-001` (DM):** Defines canonical domain types which EC-TEMP-001 extends with formal temporal value objects and interval operators.

---

## 15. Normative vs Informative Classification
*   **NORMATIVE:** Section 4 (Principles), Section 5 (Value Objects), Section 6 (Segregation), Section 7 (Interval model), Section 8 (Validity Predicate), Section 9 (Point vs Interval), Section 10 (Transition links), Section 12 (Straddle resolution), Section 13 (Activity segmentation), Section 16 (Conflict policy), Section 18 (Reproducibility), Section 25 (Immutability).
*   **INFORMATIVE:** Section 2 (Purpose), Section 33 (Boundary), Section 36 (Reconciliation).
*   **EXAMPLE:** Section 12 Scenario, Section 13 resulting segments, Section 14 yaml block.
*   **OPEN ISSUE:** Section 34 table (`ISSUE-TEMP-001` to `ISSUE-TEMP-003`).

---

## 16. Ambiguities / Underspecified Areas
*   **Mid-Month Billing Splits:** Section 34 flags that if meter readings are missing, splitting introduces measurement uncertainty, which is classified as `HUMAN_JUDGMENT_REQUIRED` and is not fully algorithmically specified.
*   **Zero-Length Intervals:** The specification does not explicitly define behavior when `effective_from === effective_to`.
*   **Timezones & Timestamp Granularity:** Section 7 declares `UTC+7` as the default local zone for daily granularity, but timestamp precision modeling for activity-level granular events is referenced but lacks detailed mathematical alignment rules.

---

## 17. Implementation Readiness Matrix

| Feature / Capability | Readiness Classification | Justification & Source Reference |
| :--- | :--- | :--- |
| **Left-Closed, Right-Open Intervals** | `IMPLEMENTABLE` | Clear boundaries specified in Section 7 and Section 8 |
| **Point-in-Time Containment** | `IMPLEMENTABLE` | Formula provided: $t_{event} \in [from, to)$ in Section 9 |
| **Temporal Overlap Predicate** | `IMPLEMENTABLE` | Exact mathematical formula defined in Section 8 |
| **Straddling Straddle Splits** | `IMPLEMENTABLE` | Split mechanics and chronological boundaries modeled in Section 12 |
| **Activity Data Segmentation** | `IMPLEMENTABLE` | Split triggers and output metadata detailed in Section 13 |
| **Transition Lineage Links** | `IMPLEMENTABLE` | Named pointer relationships (AMENDS, REPLACES, SUPERSEDES) defined in Section 10 |
| **WORM Historical Archiving** | `IMPLEMENTABLE_WITH_EXPLICIT_CONTEXT` | Requires database-level or state-level WORM constraints |
| **Unresolved Methodology Timing** | `IMPLEMENTABLE` | Map to `UNKNOWN` and halt as defined in Section 22 |
| **Mid-Month Linear Allocation** | `REQUIRES_GOVERNED_DECISION` | Logged under open issue `ISSUE-TEMP-002` (requires human judgment) |
| **GWP / EF Dynamic Binding** | `IMPLEMENTABLE` | Activity-date binding (EF) and rule-binding (GWP) detailed in Sections 23 & 24 |

---

## 18. Exact Requirements for #0017
1.  Implement a deterministic temporal utility module (`/carbon/engine/temporal-engine.js`).
2.  Provide value-object parsing and validation (fails closed on invalid formatting).
3.  Implement interval operations: `contains`, `overlaps` (Validity Predicate), `starts_before`, `ends_after`, `adjacent`, `intersect`, `split`, `sort`.
4.  Implement straddle segmentation for reporting periods and activity periods, with strict left-closed, right-open interval boundaries.
5.  Support open-ended intervals (`effective_to = null`).
6.  Preserve transition relationships (AMENDS, REPLACES, SUPERSEDES) in rules, ensuring historical reproducibility.
7.  Verify 20 chronological scenarios (TC-TEMP-001 to TC-TEMP-020).
8.  Do not modify any calculation formulas or general schemas.

---

## 19. Explicit Non-Requirements
*   Do not convert interval boundaries to inclusive-inclusive dates.
*   Do not use time-padding tricks (like `23:59:59.999`) to represent exclusivity.
*   Do not silently replace `effective_from` with `publication_date` if missing.
*   Do not invent precedence heuristics for unresolved multi-regulation overlaps.
*   Do not overwrite or modify historical rules in-place.

---

## 20. Source-Limited Conclusions
EC-TEMP-001 establishes a mathematically complete temporal calculus for regulatory rules, emission factors, and GWP tables. While certain real-world billing uncertainties remain under active open issues (e.g., `ISSUE-TEMP-002`), the mathematical boundaries, validity predicates, and split-segmentation rules are fully specified and ready for deterministic implementation.
