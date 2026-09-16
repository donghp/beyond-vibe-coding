# ENERIX Carbon — Regulatory Rule Model (RRM)
## Document ID: EC-RRM-001
**Title:** ENERIX Carbon Regulatory Rule Model — Core Semantic Specification  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Regulatory Architecture & Compliance Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` (Canonical Domain Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping Report)
- `EC-UCM-001` (Universal Emission Calculation Model Specification)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-RRM-001` |
| **Document Title** | ENERIX Carbon Regulatory Rule Model Specification |
| **Artifact Class** | Formal Regulatory Architecture & Rule Model Specification |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Regulatory Compliance & Rule Governance Committee |
| **Repository Location** | `/carbon/docs/regulatory/EC-RRM-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-RRM-001** is to define the canonical semantic model for representing and evaluating regulatory applicability rules within the ENERIX Carbon platform. 

The Regulatory Rule Model (RRM) provides the formal schema, logical operators, and evaluation context required to translate natural-language statutory requirements (such as Decrees, Decisions, and Ministry Circulars) into structured, queryable, and machine-interpretable predicate trees. RRM ensures that compliance statuses, inventory obligations, competent authority assignments, and methodological bindings can be evaluated with complete transparency, reproducibility, and legal lineage.

---

## 3. Scope

This specification governs the core semantic definitions, logical predicate structures, evaluation contexts, and temporal mechanics of regulatory rules.

### Out of Scope:
- **Rule Engine Implementation:** This document defines the *semantic contract and schema representation* for rules; it does NOT define the runtime execution codebase (e.g., AST parsers, execution engines).
- **Physical Databases & API Routes:** It does NOT establish SQL DDL, ORM mappings, or REST/gRPC endpoints.
- **Direct Legal Interpretation:** RRM provides the engineering representation framework; it does NOT substitute for competent authority rulings or official legal counsel.

---

## 4. Governing Principles

The Regulatory Rule Model is anchored in the ENERIX Carbon Master Constitution and the 15 Engineering Laws:

1. **Law of Document Hierarchy (LAW-001):** Legal texts hold higher authority than platform code, methodologies, and AI. Rules must preserve direct references back to primary legal sources.
2. **Current Law is Time-Dependent (LAW-004):** Laws change over time. Every rule must have explicit, immutable temporal validity boundaries (`effective_from`, `effective_to`).
3. **No Automatic Resolution of Legal Ambiguity (LAW-006):** In the event of conflicting rules or statutory gaps, the platform must transition the state to `REQUIRES_REVIEW` or `UNKNOWN` rather than silently defaulting or averaging.
4. **Separation of Obligations and Applicability (LAW-011):** That a rule applies to a facility is distinct from whether that rule mandates a greenhouse gas inventory.
5. **Strict Species Isolation (LAW-013):** Rules and inventories concerning Greenhouse Gases (GHG) must remain strictly segregated from criteria air pollutants to prevent inventory contamination.

---

## 5. `RegulatoryRule` Definition

A `RegulatoryRule` is a governed, versioned, and provenance-bound engineering representation of a statutory requirement. It acts as an intermediate structured layer bridging natural-language legal texts and deterministic code.

### Canonical Conception Boundary (What is NOT What):
- **`RegulatoryDocument` $\ne$ `RegulatoryRule`:** A document (e.g., Decree 06/2022/NĐ-CP) is an issued physical/legal legal text. A rule is a granular, computable logic chunk representing a specific article or clause within that document (e.g., Article 5, Clause 1: Thresholds for Energy-intensive Facilities).
- **`RegulatoryRule` $\ne$ `KnowledgeAssertion`:** An assertion is a broader source-backed semantic claim (`EC-KM-001`). A rule is a formal, executable predicate tree used to compute compliance outcomes.
- **`RegulatoryRule` $\ne$ `ApplicabilityEvaluation`:** A rule is a static definition. An evaluation is the dynamic result of executing a rule against a specific operational context.

---

## 6. Source Relationship

The semantic lineage of the regulatory rule lifecycle is defined as:

$$\text{RegulatoryDocument (DOC-)} \rightarrow \text{KnowledgeAssertion (KA-)} \rightarrow \text{RegulatoryRule (RULE-)} \rightarrow \text{ApplicabilityEvaluation (EVAL-)}$$

Every `RegulatoryRule` must maintain an unbroken bidirectional chain of custody. It must point back to its originating `KnowledgeAssertion` and `RegulatoryDocument` via unique identifiers. This guarantees that any computed evaluation can display the exact legal source clause in the UI and exported audit logs.

---

## 7. Rule Identity

Every `RegulatoryRule` is identified by a structured, globally unique identifier and maintains strict version control to prevent historical revision conflicts:

### Identity Schema:
- **`rule_id`:** String identifier adhering to pattern `RULE-{DOC_ID}-{SECTION_REF}` (e.g., `RULE-DOC-DEC-GOV-2022-06-A5C1`).
- **`rule_version`:** SemVer representation (e.g., `1.0.0`) representing updates to the rule structure or derivation logic.
- **`source_refs`:** Non-empty array of physical source pointers containing document codes, articles, and clause numbers.
- **`assertion_refs`:** Non-empty array of `KnowledgeAssertion` IDs (`KA-`).
- **`authority_class`:** Statutory classification (`TIER_A` or `TIER_B`) derived from the issuing authority hierarchy defined in `EC-KM-001`.
- **`jurisdiction`:** Geographic or administrative boundary (`VN`, `VN-HN`, etc.).
- **`effective_from` / `effective_to`:** Date boundaries establishing rule validity.
- **`status`:** Active state indicator (`DRAFT`, `ACTIVE`, `SUPERSEDED`, `RETIRED`).
- **`derivation_status`:** Provenance level (`SOURCE_DIRECT`, `DERIVED`, `INTERPRETED`, `ENGINEERING_JUDGMENT`).
- **`review_status`:** Approval workflow indicator (`PENDING_REVIEW`, `APPROVED_BY_COMMITTEE`, `REJECTED`).
- **`supersedes` / `superseded_by`:** Nullable string references pointing to historical or future rule IDs.

---

## 8. Rule Types

To avoid logical ambiguity, every rule must fall into a specific rule type taxonomy:

| Rule Type | Description | Primary Evaluated Entity |
| :--- | :--- | :--- |
| `MANDATORY_INVENTORY` | Determines if a facility has a legal obligation to report GHG emissions. | `Facility` |
| `FACILITY_APPLICABILITY` | Determines if a rule set applies to a physical facility based on location or capacity. | `Facility` |
| `SECTOR_APPLICABILITY` | Restricts a rule set to specific industrial or commercial sectors. | `Facility` |
| `THRESHOLD` | Compares operational metrics (capacity, consumption) against statutory limits. | `Facility` / `ActivityData` |
| `REPORTING_REQUIREMENT` | Establishes submission deadlines, formats, or administrative pathways. | `Facility` / `Report` |
| `METHODOLOGY_REQUIREMENT` | Binds a specific methodology (`METH-`) or tier level to a sector or source. | `Methodology` / `CalculationRun` |
| `GHG_SCOPE_REQUIREMENT` | Defines mandatory reporting boundaries for scopes (Scope 1, Scope 2, Scope 3). | `ActivityData` |
| `TRANSITIONAL_RULE` | Governs grace periods or alternative calculations during regulatory transitions. | `Facility` / `TimePeriod` |

---

## 9. Predicate Model

Rules evaluate compliance states using an inspectable predicate tree. RRM explicitly forbids embedding opaque executable Javascript code or arbitrary black-box functions inside rule definitions. All rules must be written as structured JSON/YAML-compatible logical AST (Abstract Syntax Tree) nodes to remain audit-inspectable in the UI.

### Supported Logical Operators:
- `AND` (Logical Conjunction)
- `OR` (Logical Disjunction)
- `NOT` (Logical Negation)

### Supported Comparison Operators:
- `EQUALS` / `NOT_EQUALS`
- `GREATER_THAN` / `GREATER_THAN_OR_EQUAL`
- `LESS_THAN` / `LESS_THAN_OR_EQUAL`
- `IN` / `NOT_IN` (Set membership)
- `BETWEEN` (Inclusive range)
- `OVERLAPS` (Temporal range intersection)
- `EXISTS` / `NOT_EXISTS` (Attribute presence)

---

## 10. Predicate Tree Structure

The logical predicate tree is structured hierarchically. The root node represents the final applicability outcome, branching into sub-conditions that evaluate operational parameters:

```
REGULATORY_RULE (RULE-DOC-DEC-GOV-2022-06-A5)
 └── PREDICATE_TREE (Operator: AND)
      ├── CONDITION_A (Type: SECTOR_APPLICABILITY)
      │    └── Expression: Facility.sector_id EQUALS "Energy"
      └── PREDICATE_SUB_TREE (Operator: OR)
           ├── CONDITION_B (Type: THRESHOLD)
           │    └── Expression: Facility.annual_coal_consumption GREATER_THAN_OR_EQUAL 1000 t
           └── CONDITION_C (Type: THRESHOLD)
                └── Expression: Facility.annual_ghg_emissions GREATER_THAN_OR_EQUAL 3000 tCO2e
```

---

## 11. Applicability Context

The **Applicability Context** represents the structured input dataset against which rules are executed. This context isolates validated, governed records from unverified, transient user inputs:

### Context Structure Schema:
- **`facility_id`:** String referencing a valid, registered facility (`FAC-`).
- **`facility_attributes`:** Validated facility properties (e.g., capacity, historical baseline emissions, verified sub-sector).
- **`sector` / `subsector`:** Official regulatory codes assigned via `EC-SPM-001`.
- **`location`:** Provincial and municipal boundary metadata (`GeographicLocation`).
- **`reporting_period`:** Start and end dates for the compliance evaluation (`TimePeriod`).
- **`activity_period`:** The physical period of activity data occurrence.
- **`operational_status`:** Site state (`ACTIVE`, `TRANSITIONAL`, `DECOMMISSIONED`).
- **`jurisdiction`:** Target regulatory boundary (`VN`).
- **`assessment_date`:** The date on which the evaluation is being executed.

> **Critical Domain Boundary:** Unverified user text entered in web inputs must be stored in a separate temporary user state. Only audited, compliance-officer-approved metadata is permitted to enter the Authoritative Context.

---

## 12. Applicability Result

Evaluating a `RegulatoryRule` against an `ApplicabilityContext` produces a structured result. To support real-world legal scenarios, RRM implements a five-state classification schema:

| Evaluation Result | Definition | Operational Pipeline Action |
| :--- | :--- | :--- |
| **`APPLICABLE`** | The context satisfies all rule predicates. | Bind linked methodology; calculate obligations. |
| **`NOT_APPLICABLE`** | The context explicitly fails one or more predicates. | Skip linked requirements; report non-applicability. |
| **`UNKNOWN`** | Required context parameters are missing or incomplete. | Halt pipeline; prompt user to supply missing activity metrics. |
| **`REQUIRES_REVIEW`** | Rule conditions are met but contain complex text sub-clauses. | Flag facility profile for human compliance audit. |
| **`BLOCKED`** | Underlying legal references are active but blocked by a conflict. | Halt calculation; report rule conflict to system administrator. |

---

## 13. Why / How / Source

Every computed applicability result MUST emit a complete transparency trace to guarantee accountability to auditors:

- **`WHY` (Condition Trace):** Identifies the exact logical conditions that triggered the result (e.g., *"Facility annual energy consumption (1,200 tOE) exceeded the statutory threshold of 1,000 tOE"*).
- **`HOW` (Evaluation AST Path):** Records the path of evaluation through the predicate tree, marking each boolean branch result (`true`, `false`, `unknown`).
- **`SOURCE` (Statutory Lineage):** References the exact Article, Clause, and Page number of the originating `RegulatoryDocument` and its associated cryptographic content hash.

No AI-generated text or heuristic explanations may be substituted for this deterministic trace.

---

## 14. Temporal Validity

Laws and technical standards do not exist in a vacuum; they have precise start and end dates. RRM models temporal applicability using five strict parameters:

- **`effective_from`:** Start date of statutory force (mandatory).
- **`effective_to`:** End date of statutory force (null if currently active).
- **`reporting_period`:** The date window under evaluation (e.g., `2025-01-01` to `2025-12-31`).
- **`activity_date`:** The point-in-time timestamp of a specific physical fuel combustion.
- **`assessment_date`:** The runtime execution timestamp.

### Evaluation Range Rule:
A rule is active for a given reporting period if:

$$\text{effective\_from} \le \text{reporting\_period.period\_end} \quad \text{AND} \quad (\text{effective\_to} = \text{null} \ \lor \ \text{effective\_to} \ge \text{reporting\_period.period\_start})$$

---

## 15. Temporal Conflicts & Transitions

When multiple rules appear to overlap due to legislative updates or transitions, RRM resolves applicability based on temporal metadata bindings:

- **`AMENDS`:** The new rule modifies specific logical sub-clauses of a prior rule while preserving its core identity and historical evaluations.
- **`REPLACES`:** The new rule replaces a prior rule starting on a precise date threshold. Historical runs use the prior rule; current runs use the new rule.
- **`SUPERSEDES`:** The older rule is declared legally void. It remains archived in historical reports but cannot be selected for new recalculation runs.
- **`APPLIES_DURING`:** Used for temporary transitional rules (e.g., temporary exemption provisions running from `2025-01-01` to `2025-12-31`).

*Engine Rule:* If a temporal overlap occurs and cannot be resolved by explicit relationship pointers, the engine MUST yield a `BLOCKED` status and trigger manual compliance intervention.

---

## 16. Jurisdiction

The jurisdictional model ensures that local regulations are not misapplied:

```yaml
JurisdictionContext:
  country: "VN"
  region: "Northern Region"
  province: "Hai Duong"
  authority: "MONRE"
  jurisdictional_scope: "NATIONAL_MANDATE"
```

Rules must explicitly match the geographic location and administrative boundary of the target facility context.

---

## 17. Sector and Sub-sector Applicability

Facilities are mapped to industrial and commercial sectors. RRM consumes mappings established by Sector Profile Models (`EC-SPM-001`), maintaining strict segregation between taxonomies:

- **Source Taxonomy:** The sector names and categories written in the original legal texts (e.g., *"Sản xuất xi măng"*, *"Luyện kim"*).
- **ENERIX Standardized Taxonomy:** Normalized, platform-internal sector and sub-sector codes (`SECTOR-ENG-001`, `SECTOR-CON-002`) used to bind methodologies and forms programmatically.

The translation table between these two taxonomies is governed in `EC-SPM-001` and consumed as a static context lookup during rule evaluation.

---

## 18. Facility Applicability

Facility attributes evaluated by applicability predicates include:

- **Facility Type:** Power plant, cement kiln, waste management site, etc.
- **Operational Capacity:** Maximum thermal input ($MW_{th}$), annual production volume ($t$), or floor area ($m^2$).
- **Operational State:** `ACTIVE`, `TRANSITIONAL` (e.g., trial operation), or `DECOMMISSIONED`.
- **Corporate Ownership:** Parent entity holdings, tax registration, and shared facility unit boundaries.

---

## 19. Threshold Semantics

A threshold rule compares an operational metric against a statutory benchmark. Its semantic structure is defined as:

```yaml
ThresholdSchema:
  metric_parameter: "annual_energy_consumption"
  operator: "GREATER_THAN_OR_EQUAL"
  threshold_value: 1000
  unit: "tOE"
  comparison_basis: "HISTORICAL_CALENDAR_YEAR"
  source_authority: "DOC-DEC-GOV-2022-06"
  valid_from: "2022-01-18"
  valid_to: null
```

The actual numerical value (e.g., `1000 tOE`) must be fetched from governed rule database tables, never hard-coded into evaluation algorithms.

---

## 20. Mandatory Inventory Status

A critical function of RRM is to calculate whether a facility is legally mandated to report emissions:

- **`MANDATORY`:** The facility satisfies statutory threshold rules (e.g., under Decision 42/2026/QĐ-TTg) and is obligated to submit a verified GHG inventory to the competent authority.
- **`NOT_MANDATORY`:** The facility falls below reporting thresholds (may engage in voluntary reporting).
- **`REQUIRES_REVIEW`:** Threshold criteria match, but legal entity transitions or boundary overlaps require human compliance verification.

> **Semantic Isolation:** A rule may be `APPLICABLE` (e.g., a voluntary methodology rule) without the facility having a `MANDATORY` reporting status.

---

## 21. Competent Authority

Rules define relationships mapping evaluated facilities to regional and national administrative bodies:

```
Facility (FAC-HD-ENG-001)
 └── Sector: Energy (Electricity)
      └── Applicable Rule (RULE-MONRE-CIRCULAR-17)
           ├── Competent Authority: MONRE (Primary Registry Office)
           ├── Reporting Authority: DOIT of Hai Duong Province
           └── Review/Verification Authority: Independent Accredited Verifier
```

Platform engines must resolve these authorities dynamically based on sector, province, and reporting period.

---

## 22. Methodology Binding

When a regulatory rule determines that a facility has a reporting obligation, it maps the facility's emission sources to the approved technical methodology (`EC-MTH-001`):

- **`REQUIRES`:** Binds a mandatory, specific ministry circular methodology (e.g., MOIT Circular 38/2023 for thermal power plants). Alternative methodologies are legally barred.
- **`ALLOWS`:** Identifies acceptable alternative methodologies (e.g., allowing ISO 14064-1 in place of national default guidelines for voluntary reporting).
- **`REFERENCES`:** References supporting international guidelines (e.g., IPCC 2006 Guidelines) for sub-sources not covered by national circulars.

---

## 23. Required Data Binding

Regulatory rules specify the exact classes of activity data inputs and quality tiers required to fulfill compliance obligations:

- **Mandatory Activity Inputs:** Binds to specific physical parameters (e.g., quantity of bituminous coal combusted, total grid electricity imported).
- **Quality Tier Requirements:** Specifies the minimum regulatory tier level for measurements (e.g., TIER 3 facility-specific measurements for primary fuels, allowing TIER 1 defaults for minor auxiliary fuels).

---

## 24. Emission Source Binding

Rules define mandatory coverage boundaries for physical emission sources within the facility:

- **Direct Emissions (Scope 1):** Point-source fuel combustion, process emissions, and fugitive sources.
- **Indirect Emissions (Scope 2):** Imported electricity and imported steam.
- **Direct vs. Indirect Rules:** Rules must prevent double-counting across boundaries (e.g., Scope 1 grid generator emissions vs. Scope 2 consumer emissions).

---

## 25. Rule Precedence

Precedence is never calculated via arbitrary numeric weightings or manual priority rankings (e.g., `Priority: 100`). Instead, rule collisions are resolved using strict statutory precedence logic:

1. **Constitutional / Legislative Priority:** Laws take precedence over Decrees; Decrees take precedence over Circulars.
2. **Jurisdictional Boundary:** Specific provincial mandates override generic national defaults within that geographic boundary.
3. **Temporal Recency:** Newer legislative amendments override older superseded clauses.
4. **Specificity Principle:** Highly specific sectoral methodologies (e.g., Cement Sector Circular) take precedence over general industrial MRV guidelines.

*Resolution Policy:* If two rules have identical precedence tiers and contradict each other, the engine MUST halt, transition the state to `BLOCKED`, and trigger manual review.

---

## 26. Derivation Status

Every rule in the repository must be annotated with its semantic derivation status to differentiate verified legal definitions from advisory content:

- **`SOURCE_DIRECT`:** Exact physical mapping of statutory text into logical rule parameters (fully verified).
- **`DERIVED`:** Extracted through structured engineering analysis of multiple legal clauses.
- **`INTERPRETED`:** Involves translation of ambiguous legal wording into precise mathematical ranges (marked for periodic review).
- **`ENGINEERING_JUDGMENT`:** Established by compliance officers to resolve operational gaps (marked for audit).

> **AI Policy:** AI-generated rule candidates are strictly marked as `AI_DRAFT` and hold **zero statutory authority** until formally reviewed, signed off, and promoted to `GOVERNED` status by a compliance engineer.

---

## 27. Lifecycle

The lifecycle states of a `RegulatoryRule` are defined as:

```
[DRAFT] ──> [EXTRACTED] ──> [PENDING_REVIEW] ──> [GOVERNED] ──> [ACTIVE] ──> [SUPERSEDED] ──> [RETIRED]
                                                    │
                                                    └──> [REQUIRES_REVIEW]
```

---

## 28. Versioning and Immutability

- **Strict Immutability:** Once a rule state transition is marked as `GOVERNED`, the rule definition becomes 100% immutable.
- **No In-Place Modifications:** If a regulatory threshold changes (e.g., from 3,000 $tCO_2e$ to 2,000 $tCO_2e$), compliance officers are strictly forbidden from modifying the existing rule. Instead, a new versioned rule entry (`RULE-DOC-DEC-GOV-2022-06-A5_V2.0.0`) must be appended, and the old rule marked as `SUPERSEDED` with its `effective_to` date bound.

---

## 29. Provenance

A valid regulatory rule MUST contain a complete provenance audit bundle. The platform will reject any rule lacking these attributes:

```yaml
ProvenanceBundle:
  source_document_id: "DOC-DEC-GOV-2022-06"
  source_clause: "Article 5, Clause 1"
  cryptographic_source_hash: "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b785"
  extracted_by: "USER-COMPLIANCE-001"
  extraction_timestamp: "2026-09-16T08:00:00Z"
  reviewed_by: "USER-LEGAL-AUDITOR-003"
  governed_timestamp: "2026-09-16T08:05:00Z"
```

---

## 30. Applicability Evaluation

An **Applicability Evaluation** represents the executed run of a regulatory rule against a target context. It is an operational snapshot recorded at runtime, completely isolated from static rule definitions:

### Evaluation Schema:
- **`evaluation_id`:** `EVAL-{RUN_ID}-{RULE_ID}`.
- **`rule_id` / `rule_version`:** Trace pointer to the evaluated rule.
- **`context_snapshot`:** Complete frozen copy of the `ApplicabilityContext` used at execution time.
- **`evaluation_timestamp`:** Execution timestamp.
- **`result`:** Evaluated status (`APPLICABLE`, `NOT_APPLICABLE`, `UNKNOWN`, `REQUIRES_REVIEW`, `BLOCKED`).
- **`explanation`:** Structural Condition Trace (`WHY` / `HOW` / `SOURCE`).
- **`review_state`:** Verification state (`AUTO_GENERATED`, `AUDITED_BY_VERIFIER`).

---

## 31. Historical Re-evaluation

To support historical compliance audits and retro-active adjustments, the evaluation pipeline must retrieve the exact rules that were legally active during the target reporting period.

Modern rules must never be applied to prior calendar periods unless a legislative amendment explicitly mandates retroactive compliance. All rule re-evaluations must be reproducible to the single bit by matching the rule version, context snapshot, and temporal variables.

---

## 32. Rule Conflict and Ambiguity

When a rule is found to contain internal logical conflicts, overlapping jurisdictions, or ambiguous statutory language, it is registered under a controlled Conflict structure:

```yaml
RuleConflict:
  conflict_id: "CONF-RRM-001"
  affected_rule_ids: ["RULE-DOC-A-A2C3", "RULE-DOC-B-A5C1"]
  affected_facility_id: "FAC-HD-ENG-001"
  temporal_context: "2025-Q1"
  conflict_type: "JURISDICTIONAL_OVERLAP"
  impact_description: "Overlapping regulatory thresholds between Circular 13 and Circular 17"
  resolution_status: "OPEN_CONTROLLED_AMBIGUITY"
  resolution_authority: "MONRE_COMPLIANCE_BOARD"
```

---

## 33. RuleSet

A `RuleSet` is a logical group of rules compiled for a specific reporting scenario, simplifying execution loops:

- **Grouping Parameters:** Jurisdiction, sector, regulatory program (e.g., *"National mandatory GHG inventory under Decision 42/2026"*), or reporting period year.
- **Usage:** Prevents evaluating hundreds of irrelevant rules, filtering down to candidate compliance obligations for the facility profile.

---

## 34. Regulatory-First Workflow

The ENERIX Carbon computational pipeline enforces a strict, top-down, regulatory-first workflow:

```
[Facility Context] ──> [Applicable RuleSet] ──> [Predicate Evaluation]
                                                      │
                                                      ▼
[Applicable Methodology] <── [Inventory Status] <── [Result Status]
            │
            ▼
[Required Activity Data] ──> [Calculation Plan (UCM)]
```

---

## 35. Domain Relationships

The relationships of regulatory rule model entities to the core domain model (`EC-DM-001`) are defined as:

- **`RegulatoryDocument` contains `RegulatoryRule` (`1 : 1..*`):** Rules are composed inside statutory documents.
- **`RegulatoryRule` evaluates `Facility` (`M : N`):** Rules execute against facility properties.
- **`RegulatoryRule` binds `Methodology` (`M : N`):** Rules specify which methodology must be used.
- **`RegulatoryRule` maps to `KnowledgeAssertion` (`1..* : 1..*`):** Direct semantic traceability.
- **`ApplicabilityEvaluation` records execution of `RegulatoryRule` (`N : 1`):** Audit tracking.

---

## 36. GHG / Air Pollutant Boundary

RRM maintains a strict firewall between greenhouse gases and traditional criteria air pollutants to satisfy statutory compliance standards:

- **GHG Species (`CO2`, `CH4`, `N2O`, `HFCs`, `PFCs`, `SF6`, `NF3`, `CO2e`):** Tracked and aggregated into $tCO_2e$ for regulatory reporting.
- **Air Pollutants (`NOx`, `SO2`, `CO`, `PM`, `VOC`):** Tracked purely in mass metrics ($kg$) for ambient air quality or emission stack concentration thresholds.
- **No Cross-Contamination:** The evaluation engine must crash and throw a validation exception if a calculation model mixes GWP conversions with air pollutant species.

---

## 37. Implementation Boundary

RRM explicitly isolates governance specifications from execution boundaries:

### Under RRM Governance:
- Rule identity, schema parameters, and validation constraints.
- Predicate tree architecture and operators.
- Applicability context and result definitions.
- Temporal logic, precedence, and jurisdictional scoping rules.
- Traceability, provenance, and legal documentation mappings.

### Outside RRM Boundaries (Deferred to Engines/Apps):
- AST parser and rule execution engine codebase.
- User management, authentication, and security groups.
- Database physical tables, columns, indexes, and SQL scripts.
- Graphic User Interface (GUI) wireframes and components.
- Deterministic calculation engine code (`EC-CES-001`).

---

## 38. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-RRM-001` | Multi-Ministry Precedence Conflict | Precedence between MOC Circular 13 and MONRE Circular 17 for dual-use heat plants remains ambiguous in statutory texts. | `EC-RRM-002` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-RRM-002` | Retrospective Audit Rules | Retroactive compliance evaluation procedures for historical runs lack formal statutory definitions. | `EC-TEMP-001` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |
| `ISSUE-RRM-003` | provincial-level Rule overrides | provincial-level threshold additions (e.g., specific Hanoi city regulations) are not fully cataloged. | `EC-SPM-001` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |

---

## 39. Acceptance Criteria

`EC-RRM-001` is accepted only if:

- [x] **A.** `RegulatoryRule` is strictly distinct from `RegulatoryDocument`.
- [x] **B.** `RegulatoryRule` is strictly distinct from `KnowledgeAssertion`.
- [x] **C.** Rule definitions are decoupled from dynamic `ApplicabilityEvaluation` runs.
- [x] **D.** Predicate trees are defined as structured, inspectable AST blocks (no black-box code).
- [x] **E.** Temporal validity parameters (`effective_from`, `effective_to`) are mandatory.
- [x] **F.** Historical rules remain fully queryable and reproducible.
- [x] **G.** `UNKNOWN` is modeled as a distinct, non-boolean state (not collapsed to `NOT_APPLICABLE`).
- [x] **H.** Mandatory reporting status is semantically decoupled from general rule applicability.
- [x] **I.** Rule conflicts are explicitly captured under structured `RuleConflict` blocks.
- [x] **J.** Rule precedence is resolved via statutory logic, not arbitrary numeric rankings.
- [x] **K.** Rule provenance contains direct article and clause references.
- [x] **L.** Methodology binding maps to identifiers (`METH-`) without executing mathematical code.
- [x] **M.** Required `ActivityData` demands remain distinct from operational file `Evidence`.
- [x] **N.** GHG accounting remains completely isolated from criteria air pollutant records.
- [x] **O.** No unverified regulatory thresholds or numeric default values are introduced.
- [x] **P.** Ambiguities are registered as controlled issues rather than silently resolved.
- [x] **Q.** Future artifact boundaries (`EC-TEMP-001`, `EC-SPM-001`) remain intact.
- [x] **R.** Fully compatible with `EC-KM-001`, `EC-DM-001`, and `EC-UCM-001`.
- [x] **S.** Historical re-evaluations are strictly reproducible from archivedsnapshots.
- [x] **T.** Open issues are explicitly cataloged under controlled issue tables.

---

## 40. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Regulatory Working Group | Initial formal specification of the Regulatory Rule Model (`EC-RRM-001`). |

---
**Status Declaration:** `REGULATORY_RULE_MODEL_ALIGNED_WITH_OPEN_ISSUES`
