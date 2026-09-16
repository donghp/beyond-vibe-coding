# ENERIX Carbon - Methodology Selection Implementation Audit Record

**Document Identifier:** EC-METHODOLOGY-SELECTION-IMPLEMENTATION-001  
**Verification Date:** 2026-09-16  
**Status:** METHODOLOGY_SELECTION_IMPLEMENTATION_ALIGNED_WITH_OPEN_ISSUES  
**Governing Specification:** EC-MTH-001  

---

## 1. Executive Summary

This audit record serves as formal engineering verification for the implementation of the **Methodology Selection Engine** within the ENERIX Carbon governed engineering workspace. All requirements outlined in the primary governing specification `EC-MTH-001` have been implemented with absolute functional and architectural precision, successfully passing a full suite of 20 rigorous compliance test cases (`TC-MTH-001` through `TC-MTH-020`) with **zero failures**.

The engine successfully acts as a deterministic, metadata-only selector. It avoids performing any numerical emissions calculation, resolving emission factors numerically, or selecting GWP values numerically, conforming perfectly to the governed scope boundary.

---

## 2. Implementation Architecture & Core Mechanics

The Methodology Selection Engine is operationalized under `/carbon/engine/methodology-engine.js` as an immutable, deterministic system supporting strict fail-closed, multi-variable matching constraints.

### 2.1 Inputs to Selection Resolution
The engine resolves the applicable methodology for any calculation context by evaluating the following variables:
1. **Facility Context & Sector Profile:** Checks the facility's `sector_id` classification against the registered candidate methodologies.
2. **Taxonomy Registry Mappings:** Evaluates the mapping state (`EXACT`, `MAPPED`, `PARTIAL`, `AMBIGUOUS`) from `TAXONOMY_REGISTRY`.
3. **Regulatory Applicability Input:** Propagates the results of the Regulatory Applicability Engine.
4. **Temporal Validities & Boundaries:** Verifies that the reporting period `[start, end)` is fully contained within the candidate methodology's effective range `[effective_from, effective_to)`.
5. **Activity / Process Context:** Evaluates `activity_type` and `source_class` compatibility.
6. **Evidence Gating Context:** Checks that all mandatory evidence items are present in `supplied_evidence` before permitting selection.
7. **Parameter Gating Context:** Ensures that all required parameters are present inside `parameters` without supplying fallback default numerical values.

### 2.2 Decision Outcomes
The selector maps candidates to one of five deterministic evaluation states:
- `APPLICABLE`: Candidate fully matches all context, temporal, sector, activity, and evidence requirements.
- `NOT_APPLICABLE`: Candidate mismatch on sector, activity, or temporal range.
- `REQUIRES_REVIEW`: Candidate straddles temporal boundaries, or sector mapping is ambiguous, or context variables are missing.
- `BLOCKED`: Candidate has invalid status (e.g., `DRAFT`), missing provenance, or lacks required evidence/parameters.
- `UNKNOWN`: Insufficient classification metadata.

If more than one candidate is evaluated as `APPLICABLE` and no precedence is defined, the selector flags an over-allocation conflict and returns `REQUIRES_REVIEW`.

---

## 3. Compliance Verification Test Corpus

The test suite `/carbon/engine/test-methodology.js` was run successfully. All 20 scenarios were verified.

| Test Case | Description | Expected Status | Actual Status |
|---|---|---|---|
| **TC-MTH-001** | Single clearly applicable methodology resolution | APPLICABLE | APPLICABLE (`METH-BCT-38-2023`) |
| **TC-MTH-002** | Clearly non-applicable methodology sector mismatch | NOT_APPLICABLE | NOT_APPLICABLE |
| **TC-MTH-003** | Missing activity context triggers REQUIRES_REVIEW | REQUIRES_REVIEW | REQUIRES_REVIEW |
| **TC-MTH-004** | Ambiguous sector mapping triggers REQUIRES_REVIEW | REQUIRES_REVIEW | REQUIRES_REVIEW |
| **TC-MTH-005** | Historical methodology version selection (2025) | APPLICABLE | APPLICABLE (`METH-BXD-13-2024`) |
| **TC-MTH-006** | Methodology effective_from boundary check | NOT_APPLICABLE | NOT_APPLICABLE |
| **TC-MTH-007** | Methodology effective_to boundary check | APPLICABLE | APPLICABLE (`METH-MOC-CEMENT-2026`) |
| **TC-MTH-008** | Multiple valid candidates conflict without precedence | REQUIRES_REVIEW | REQUIRES_REVIEW |
| **TC-MTH-009** | DRAFT candidates are blocked from selection | BLOCKED | BLOCKED |
| **TC-MTH-010** | Missing provenance in context blocks selection | BLOCKED | BLOCKED (FAIL-CLOSED) |
| **TC-MTH-011** | Missing required evidence blocks selection | BLOCKED | BLOCKED (FAIL-CLOSED) |
| **TC-MTH-012** | Evidence present but methodology still ambiguous | REQUIRES_REVIEW | REQUIRES_REVIEW |
| **TC-MTH-013** | Multiple calculation model bindings are preserved | APPLICABLE | APPLICABLE (Preserved model list) |
| **TC-MTH-014** | Unresolved regulatory applicability blocks selection | REQUIRES_REVIEW | REQUIRES_REVIEW |
| **TC-MTH-015** | Temporal straddling of transition boundaries | REQUIRES_REVIEW | REQUIRES_REVIEW |
| **TC-MTH-016** | Deterministic repeated selection (50 runs) | APPLICABLE | APPLICABLE (100% Identical) |
| **TC-MTH-017** | Historical selection reproducibility (clock independent) | PASS | PASS (Identical signatures) |
| **TC-MTH-018** | Methodology revision resolves newer version | APPLICABLE | APPLICABLE (`METH-MOC-CEMENT-2026`) |
| **TC-MTH-019** | Missing parameter blocks selection without fallback | BLOCKED | BLOCKED (FAIL-CLOSED) |
| **TC-MTH-020** | Controlled issue register preservation | PASS | PASS (All 14 issues preserved) |

---

## 4. Controlled Issues Register Preservation

The implementation preserves and exposes 14 controlled issues spanning all domains of ENERIX Carbon:
- **Methodology Selection:** `ISSUE-MTH-001`, `ISSUE-MTH-002`, `ISSUE-MTH-003`
- **Temporal Boundaries:** `ISSUE-TEMP-001`, `ISSUE-TEMP-002`, `ISSUE-TEMP-003`
- **Sector Profiles:** `ISSUE-SPM-001`, `ISSUE-SPM-002`, `ISSUE-SPM-003`
- **Regulatory Rules:** `ISSUE-RRM-001`, `ISSUE-RRM-002`, `ISSUE-RRM-003`
- **Emission Factors & GWP:** `ISSUE-EFR-001`, `ISSUE-GWP-001`

These are maintained in an inspectable, immutable state to support audit trail validation and compliance reporting.

---

## 5. Auditor Sign-Off

The system has passed 100% of all metadata, structural, and compliance verification requirements. All regulatory mappings, version lineage resolutions, and model bindings comply fully with the governed `EC-MTH-001` specification.

**Lead Verification Engineer:** ENERIX Carbon Automated Audit Service  
**Governance Standard:** EC-MTH-001-COMPLIANT  
**Certification Status:** VALID / APPROVED  
