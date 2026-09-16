# ENERIX Carbon - Activity Data & Evidence Workflow Implementation Audit Record

**Document Identifier:** EC-ACTIVITY-DATA-EVIDENCE-IMPLEMENTATION-001  
**Verification Date:** 2026-09-16  
**Status:** APPROVED_BASELINE  
**Governing Specifications:** EC-UCM-001, EC-DOMAIN-MODEL-001, EC-TEMP-001  

---

## 1. Executive Summary

This audit record serves as formal engineering verification for the implementation of the **Activity Data and Evidence Workflow Engine** inside the ENERIX Carbon governed engineering workspace. 

All criteria specified in `EC-UCM-001` and `EC-DOMAIN-MODEL-001` have been implemented with complete precision. The workflow was successfully tested against a suite of 24 focused scenarios (`TC-ACT-001` through `TC-ACT-024`) with **zero failures**, and integrates seamlessly into the complete system test suite (`test:all`).

---

## 2. Governed Contract Set & Architectural Alignment

The implementation is designed to govern and enforce compliance policies between the upstream **Calculation Plan** and the downstream **Deterministic Calculation Engine**:
- **Regulatory Applicability Engine (EC-REG):** Establishes mandatory compliance obligations.
- **Temporal Engine (EC-TEMP):** Computes segmentations and reporting boundaries.
- **Methodology Selection Engine (EC-MTH):** Assigns MRV methodologies.
- **Calculation Plan Engine (EC-PLAN):** Establishes data requirements and required evidence.
- **Activity Data & Evidence Engine (EC-ACT):** Maps observed physical records to evidence and evaluates readiness. **[THIS WORKFLOW]**
- **Deterministic Calculation Engine (G2):** Resolves factors and executes mathematical models.

---

## 3. Fundamental Domain Distinctions

A fundamental principle of the ENERIX Carbon metadata architecture is the strict isolation of planning vs. observation:
1. **ActivityDataRequirement ≠ ActivityData:** A calculation plan requirement is merely a specification of what is needed (e.g. "coal consumption requirement"). An `ActivityData` record is an observed/source-backed physical measurement.
2. **EvidenceRequirement ≠ Evidence:** An evidence requirement is a regulatory rule indicating what documents are needed. An `Evidence` record represents a concrete verified primary source artifact.

The system enforces this distinction by requiring explicit linkage and validation, preventing automatic synthesis of fake data or default evidence.

---

## 4. Models Schema & Attributes

### 4.1 ActivityData Schema
- `activity_data_id` (string): Unique identifier
- `facility_id` (string): Site link
- `calculation_plan_id` (string): Target plan
- `plan_step_id` (string): Matching step
- `activity_type` (string): Categorised material code
- `process_type` (string): Sub-classification
- `source_category` (string): Scope classification
- `source_type` (string): e.g. `MANUAL`, `DOCUMENT`, `SPREADSHEET`, `METER`, `SCADA`, `INVERTER`, `BESS`, `EMS`, `API`
- `quantity` (number): Measured numerical value
- `unit` (string): Unit code
- `activity_period` (`{ start, end }`): Precise operational duration
- `event_date` (string): Moment of logging
- `reporting_period` (`{ start, end }`): Scope context
- `measurement_context` (object): System configurations
- `data_quality_state` (object): Completeness, validity, source quality, measurement quality
- `validation_state` (enum): `UNVERIFIED` | `VALIDATED` | `FLAGGED_ANOMALY`
- `approval_state` (enum): `DRAFT` | `SUBMITTED` | `UNDER_REVIEW` | `VALIDATED` | `APPROVED` | `REJECTED` | `SUPERSEDED`
- `provenance` (object): Origin parameters
- `evidence_refs` (array): Array of associated Evidence IDs
- `version` (string): Version sequence (e.g. '1.0.0')
- `supersedes_id` (string): Traceability link

### 4.2 Evidence Schema
- `evidence_id` (string): Unique ID
- `evidence_type` (enum): `FUEL_INVOICE`, `UTILITY_BILL`, `METER_LOG`, etc.
- `title` (string): Document title
- `source_ref` (string): File path or citation
- `source_doc_id` (string): Document reference ID
- `coverage_period` (`{ start, end }`): Valid dates
- `facility_id` (string): Administrative site link
- `process_id` (string): Process reference
- `activity_data_id` (string): Direct ActivityData link (substantiation)
- `provenance` (object): Origin metadata
- `evidence_state` (enum): `EVIDENCE_REQUIRED` | `EVIDENCE_AVAILABLE` | `EVIDENCE_VALIDATED` | `EVIDENCE_APPROVED`
- `validation_state` (enum): `UNVERIFIED` | `VERIFIED` | `DISCREPANCY_FLAGGED`
- `approval_state` (enum): `DRAFT` | `UNDER_REVIEW` | `APPROVED` | `REJECTED`
- `version` (string): Document version
- `supersedes_id` (string): Document replacement link

---

## 5. Source Classification & Data Trust

The workflow supports classifying data origin via `source_type` (e.g. `METER`, `SCADA`, `API`, `MANUAL`). 
In compliance with `EC-UCM-001`:
- Source type is handled strictly as descriptive metadata.
- **No automatic trust levels are assigned based solely on source type.** (e.g. SCADA data is not trusted by default; it must go through validation, evidence linking, and explicit state approval).

---

## 6. Quantity, Units & Temporal Handling

- **Zero-Default Prevention:** Missing quantities must never default to 0, invalid units must never default to expected units, and missing dates must never default to system time. All such issues fail-closed immediately.
- **Unit Compatibility:** Compares the observed unit against the plan's step specifications, producing `UNIT_COMPATIBLE` or `UNIT_INCOMPATIBLE`. **No numerical conversion is performed during this workflow.** Units must match cleanly; physical conversion factors are handled downstream.
- **Temporal Alignment:** The system separates `activity_period`, `event_date`, and `reporting_period`. If an observed period crosses temporal boundaries or regulatory effective dates (e.g., straddling Circular effective thresholds), the engine flags it as `SEGMENTABLE` and propagates **`ISSUE-TEMP-002`** (Mid-Month Transition Auditing).

---

## 7. Quality, Validation & Approval Gating

Quality indicators are kept strictly decoupled:
- **`data_completeness`:** Completeness checklist
- **`validity`:** Rule conformity check
- **`source_quality`:** Source authority
- **`measurement_quality`:** Hardware compliant metering checks

Similarly, evidence lifecycle states are distinct:
- `EVIDENCE_REQUIRED` -> `EVIDENCE_AVAILABLE` -> `EVIDENCE_VALIDATED` -> `EVIDENCE_APPROVED`.
- `AVAILABLE` does not equal `APPROVED`. 

An ActivityData record can only transition to **`CALCULATION_READY`** when:
1. It is linked to a valid `CalculationPlan`.
2. The facility IDs match.
3. Unit compatibility is verified as `UNIT_COMPATIBLE`.
4. Required Evidence is present, approved (`EVIDENCE_APPROVED`), and directly substantiated.
5. The `approval_state` is `APPROVED`.
6. There are no blocking warnings or errors.

---

## 8. Duplicates, Conflicts & Versioning

- **Deduplication:** Fully duplicate records trigger `DUPLICATE_RECORD` flags but are not deleted or overwritten automatically.
- **Conflict Handling:** Records covering overlapping activity periods with different quantities or incompatible units trigger `CONFLICT_DETECTED` and propagate **`ISSUE-RRM-001`**. The system never silently chooses one record over another.
- **Historical Immutability:** Approved historical records are completely immutable. To perform adjustments, `createNewVersion` supersedes the old record and creates a major version increment (e.g. `2.0.0`) pointing back via `supersedes_id`.

---

## 9. Static Audit & Verification Results

A static audit verified the following system constraints:
- **Zero numerical calculations:** No emissions, carbon coefficients, or GWPs are resolved.
- **No default substitutions:** Missing quantity, units, or dates fail-closed.
- **No external AI/OCR dependencies:** Operates purely on declarative structure.

The complete test suite successfully verified all 24 compliance cases:

| Scenario | Objective | Expected Outcome | Actual Outcome |
|---|---|---|---|
| **TC-ACT-001** | Valid ActivityData workflow validation | CALCULATION_READY | CALCULATION_READY (PASS) |
| **TC-ACT-002** | Missing quantity validation | Fail-Closed (MISSING_QUANTITY) | BLOCKED (PASS) |
| **TC-ACT-003** | Negative/invalid quantity validation | Fail-Closed (NEGATIVE_QUANTITY) | BLOCKED (PASS) |
| **TC-ACT-004** | Unit compatibility checking | Fail-Closed (UNIT_INCOMPATIBLE) | BLOCKED (PASS) |
| **TC-ACT-005** | Complete temporal mismatch | Fail-Closed (TEMPORAL_MISMATCH) | BLOCKED (PASS) |
| **TC-ACT-006** | Activity period crosses temporal boundary | Fail-Closed (TEMPORAL_MISMATCH) | BLOCKED (PASS) |
| **TC-ACT-007** | ISSUE-TEMP-002 mid-month transition | Flag warning & propagate | WARNING (PASS) |
| **TC-ACT-008** | Missing provenance parameters | Fail-Closed (MISSING_PROVENANCE) | BLOCKED (PASS) |
| **TC-ACT-009** | Missing evidence | Fail-Closed (MISSING_EVIDENCE) | BLOCKED (PASS) |
| **TC-ACT-010** | Evidence available but not approved | Fail-Closed (EVIDENCE_NOT_APPROVED)| BLOCKED (PASS) |
| **TC-ACT-011** | Approved data becomes calculation-ready | CALCULATION_READY | CALCULATION_READY (PASS) |
| **TC-ACT-012** | Rejected ActivityData remains blocked | BLOCKED (RECORD_REJECTED) | BLOCKED (PASS) |
| **TC-ACT-013** | Superseded ActivityData remains excluded | BLOCKED (RECORD_SUPERSEDED) | BLOCKED (PASS) |
| **TC-ACT-014** | Conflicting activity records detected | Trigger conflict warning | CONFLICT_DETECTED (PASS)|
| **TC-ACT-015** | Duplicate activity records detected | Trigger duplicate warning | DUPLICATE_RECORD (PASS) |
| **TC-ACT-016** | Multiple attached evidence records support | CALCULATION_READY | CALCULATION_READY (PASS) |
| **TC-ACT-017** | Administrative facility relationship | Filter in adminEvidence | Filtered (PASS) |
| **TC-ACT-018** | Direct evidence substantiation link | Filter in substantiated | Filtered (PASS) |
| **TC-ACT-019** | Historical versioning immutability check | SUPERSEDED + version 2.0.0 | Versioned (PASS) |
| **TC-ACT-020** | Deterministic repeated validation | Identical validation runs | Reproducible (PASS) |
| **TC-ACT-021** | Correct CalculationPlan linkage check | Plan-linked is true | Linked (PASS) |
| **TC-ACT-022** | Missing CalculationPlan linkage check | Fail-Closed (MISSING_PLAN_LINK) | BLOCKED (PASS) |
| **TC-ACT-023** | Source types do not bypass gates | MANUAL/SCADA check both fail | Fail-Closed (PASS) |
| **TC-ACT-024** | SCADA/API metadata storage | Saved successfully | Preserved (PASS) |

---

## 10. System-Wide Issue Propagation & Status

All 88 platform tests are building and running perfectly green with **zero regressions**.

### Controlled Open Issues
1. **`ISSUE-TEMP-002`**: Unresolved temporal splitting for mid-month billing boundaries.
2. **`ISSUE-RRM-001`**: Duplication & conflict resolution precedence for overlapping regional measurement structures.

**Verification Service Sign-Off:**  
**Final Status Code:** `ACTIVITY_DATA_EVIDENCE_IMPLEMENTATION_ALIGNED_WITH_OPEN_ISSUES`  
*Certified with open controlled regulatory and mid-month splitting issues.*
