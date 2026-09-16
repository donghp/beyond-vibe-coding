# ENERIX Carbon - Document Intelligence Core Audit Record

**Document Identifier:** EC-DOCUMENT-INTELLIGENCE-IMPLEMENTATION-001  
**Verification Date:** 2026-09-16  
**Status:** APPROVED_BASELINE  
**Governing Specifications:** EC-UCM-001, EC-DOMAIN-MODEL-001, G3 operational core  

---

## 1. Executive Summary

This audit record documents the formal verification of the **Document Intelligence Core** module within the ENERIX Carbon governed engineering workspace. 

The implementation establishes a robust boundary between unstructured input documents and the deterministic regulatory-calculation core. All data isolation boundaries (Document ≠ Evidence ≠ ExtractionCandidate ≠ ActivityData) are strictly preserved. The module has been verified against a suite of 24 focused validation tests (`TC-DOC-001` through `TC-DOC-024`) with **100% success** and zero regressions across G1/G2/G3 core components.

---

## 2. Fundamental Boundary Constraints & Principles

The Document Intelligence engine enforces a secure, fail-closed perimeter protecting the regulatory ledger from untrusted inputs:
1. **Separation of Authority:** AI/OCR, heuristics, and document extractors are **NOT** calculation-authoritative. Only human-reviewed and system-validated handoff records (`ActivityData` and `Evidence`) are accepted downstream.
2. **Metadata Integrity:** Source type identifiers (e.g. `SCADA`, `METER`, `API`) are treated as metadata and do **NOT** bypass any validation or confidence gates.
3. **No Automatic Correction/Defaults:** Missing quantities, unit discrepancies, and out-of-bounds dates fail-closed. No default substitutions (such as setting missing values to `0`) are performed.
4. **No External Dependencies:** Operates natively without vendor-specific or third-party API/network dependencies, eliminating runtime failure points during cold-starts.

---

## 3. Workflow Model Entities

- **`Document`:** Represents the raw unstructured or structured input file with associated hashes (`sha256_hash`), statuses, and upload metrics.
- **`DocumentClassification`:** Captures the category determination (e.g. `FUEL_INVOICE`) and heuristic confidence.
- **`ExtractionCandidate`:** Represents the temporary, unapproved candidate fields (e.g., `quantity`, `unit`, `facility_id`) extracted from the document. This entity is completely separated from calculation structures.
- **`ApprovedHandoff`:** Captures the final completed handoff transaction, including the generated `ActivityData` and `Evidence` objects and reviewer audits.

---

## 4. Verification Gating & Human in the Loop (HITL)

Candidate validation occurs across multiple independent levels:
- **Confidence Thresholds:** Enforces an overall extraction confidence minimum of **0.80** and key field confidence minimum of **0.85**.
- **Mandatory Review Triggers:** Any candidate with field confidences below the thresholds, or any candidate encountering validation failures, is blocked from auto-approval and flagged as `REQUIRES_HUMAN_REVIEW`.
- **Review Corrections:** Reviewers can manually correct and adjust values (e.g., modifying quantities or dates). Any human adjustment automatically elevates that field's confidence to `1.0` and triggers re-validation before acceptance.
- **Handoff Generation:** Accepted candidates are mapped to real `ActivityData` and `Evidence` instances, carrying direct substantiation linkages (`ActivityData.evidence_refs`) and provenance paths.

---

## 5. Duplicate & Conflict Detection

- **Document Deduplication:** Document hash matches (`sha256_hash`) trigger `DUPLICATE_DOCUMENT` warnings, keeping records cleanly audit-isolated.
- **Overlapping Candidates:** Detects overlapping activity periods with conflicting quantities or units from different candidates, flagging them as `CANDIDATE_CONFLICT` and propagating **`ISSUE-RRM-001`**.

---

## 6. Static Audit Verification

- **Zero Emissions/Multiplier Calculations:** Confirmed that GWP coefficients, emissions calculations, and models are entirely excluded from this layer.
- **Zero Provider SDK Dependencies:** Confirmed that classification and extraction run locally and natively using declarative heuristic models.

---

## 7. Verification Test Execution Results

The suite `/carbon/engine/test-document.js` executed 24 distinct scenarios against our quality bounds:

| Scenario | Objective | Expected Outcome | Actual Outcome |
|---|---|---|---|
| **TC-DOC-001** | Standard document classification | FUEL_INVOICE (Confidence 0.95) | PASS |
| **TC-DOC-002** | Classification with low confidence | Below threshold flag | PASS |
| **TC-DOC-003** | Extraction candidate creation | Fields successfully populated | PASS |
| **TC-DOC-004** | Fail-closed validation on missing facility ID | Blocked (MISSING_FACILITY_ID) | PASS |
| **TC-DOC-005** | Fail-closed validation on missing quantity | Blocked (MISSING_QUANTITY) | PASS |
| **TC-DOC-006** | Validation on negative or invalid quantities | Blocked (NEGATIVE_QUANTITY) | PASS |
| **TC-DOC-007** | Unit compatibility check vs plan step | Blocked (UNIT_INCOMPATIBLE) | PASS |
| **TC-DOC-008** | Temporal range validation of candidate | Blocked (MISSING_DATES) | PASS |
| **TC-DOC-009** | Overall confidence average rules | Average computation correct | PASS |
| **TC-DOC-010** | Low field confidence trigger review | Flags human review requirement | PASS |
| **TC-DOC-011** | Human approval of valid candidate | Status transitions to ACCEPTED | PASS |
| **TC-DOC-012** | Human review modification & approval | Applies adjustments & promotes confidence | PASS |
| **TC-DOC-013** | Human review rejection | Blocked from handoff | PASS |
| **TC-DOC-014** | Successful handoff generation | Compliant ActivityData & Evidence created| PASS |
| **TC-DOC-015** | Administrative facility/evidence link | Matches facility_id | PASS |
| **TC-DOC-016** | Direct substantiation mapping in handoff | Direct linkage in evidence_refs | PASS |
| **TC-DOC-017** | Document deduplication via SHA256 | DUPLICATE_DOCUMENT flag | PASS |
| **TC-DOC-018** | Conflicting candidates overlap checking | CANDIDATE_CONFLICT (ISSUE-RRM-001) | PASS |
| **TC-DOC-019** | Immutable document status flow | Rejects re-extraction on APPROVED status | PASS |
| **TC-DOC-020** | Deterministic extraction runs | Idempotent across multiple runs | PASS |
| **TC-DOC-021** | SCADA/API source metadata preservation | Retains custom metadata (SERVER-A) | PASS |
| **TC-DOC-022** | Isolation of candidate authority | Is not an instance of ActivityData | PASS |
| **TC-DOC-023** | Exclusion of emissions calculations | No carbon factors or multiplier leaks | PASS |
| **TC-DOC-024** | Static audit verification | local heuristic constraints preserved | PASS |

---

## 8. System Status

The complete ENERIX Carbon test suite (Methodology, Regulatory, Temporal, Plan, Activity, and Document Core) runs perfectly green with **112 passing tests**.

**Verification Service Sign-Off:**  
**Final Status Code:** `DOCUMENT_INTELLIGENCE_IMPLEMENTATION_ALIGNED`
