# EC-CANONICAL-TEST-MANIFEST-001
## Authoritative Canonical Test Manifest & Discrepancy Resolution Record
**Manifest ID:** EC-CANONICAL-TEST-MANIFEST-001  
**Published Date:** 2026-09-16  
**Status:** `AUTHORITATIVE`  
**Governing Standard:** EC-TEST-001  
**Lifecycle Phase:** G4 — Document Intelligence & Assurance  

---

### 1. Discrepancy Analysis & Resolution (`TEST_REPORTING_COUNT_DISCREPANCY`)

- **Prior Anomaly:** A previous high-level status summary reported a count of 136 tests, while individual suite descriptions totaled 160, and active test execution actually contained more tests.
- **Root Cause:** The label "136" reflected an obsolete snapshot prior to the complete registration of the extended G3 engine verification suites (`test-temporal.js` [24], `test-plan.js` [24], `test-activity.js` [24]).
- **Resolution:** This document establishes the **single authoritative canonical inventory** of all verification suites in the ENERIX Carbon codebase.

---

### 2. Comprehensive Suite Inventory

| Suite # | Suite Name | Test Script | Implementation File | Phase | Count | Status |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| **1** | Deterministic Calculation Core | `npm run test:carbon` | `test-runner.js` | G2 | 27 | **100% PASS** |
| **2** | Regulatory Applicability Engine | `npm run test:regulatory` | `test-regulatory.js` | G3 | 20 | **100% PASS** |
| **3** | Temporal Applicability & Segmentation | `npm run test:temporal` | `test-temporal.js` | G3 | 24 | **100% PASS** |
| **4** | Methodology Selection Engine | `npm run test:methodology` | `test-methodology.js` | G3 | 20 | **100% PASS** |
| **5** | Calculation Plan Engine | `npm run test:plan` | `test-plan.js` | G3 | 24 | **100% PASS** |
| **6** | Activity Data & Evidence Engine | `npm run test:activity` | `test-activity.js` | G3 | 24 | **100% PASS** |
| **7** | Document Intelligence Engine | `npm run test:document` | `test-document.js` | G4 | 24 | **100% PASS** |
| **8** | Evidence & Provenance Engine | `npm run test:provenance` | `test-provenance.js` | G4 | 24 | **100% PASS** |
| **9** | QA/QC & Data Health Engine | `npm run test:qaqc` | `test-qa-qc.js` | G4 | 24 | **100% PASS** |
| **10** | Report Readiness & Audit Package Engine | `npm run test:readiness` | `test-report-readiness.js` | G4 | 24 | **100% PASS** |
| **11** | App State & Data Provider Engine Bridge | `npm run test:appstate` | `test-app-state.js` | G5 | 44 | **100% PASS** |
| **12** | Regulatory Workspace UI & Governed Bridge | `npm run test:regws` | `test-regulatory-workspace.js` | G5 | 20 | **100% PASS** |

**Grand Total:** **299 Canonical Tests across 12 Suites**  
**Consolidated Execution Command:** `npm run test:all`  
**Overall Result:** **299 / 299 PASSED (100% Compliance)**  

---

### 3. Canonical Test Identifier Registry

#### Suite 1: Deterministic Calculation Core (27 tests)
- `TC-UCM-001` through `TC-UCM-005` (5 tests)
- `TC-ENG-001` through `TC-ENG-008` (8 tests)
- `TC-MOD-001` through `TC-MOD-010` (10 tests)
- `TC-VAL-001` through `TC-VAL-004` (4 tests)

#### Suite 2: Regulatory Applicability Engine (20 tests)
- `TC-REG-001` through `TC-REG-020` (20 tests)

#### Suite 3: Temporal Applicability & Segmentation (24 tests)
- `TC-TEMP-001` through `TC-TEMP-024` (24 tests)

#### Suite 4: Methodology Selection Engine (20 tests)
- `TC-MTH-001` through `TC-MTH-020` (20 tests)

#### Suite 5: Calculation Plan Engine (24 tests)
- `TC-PLAN-001` through `TC-PLAN-024` (24 tests)

#### Suite 6: Activity Data & Evidence Engine (24 tests)
- `TC-ACT-001` through `TC-ACT-024` (24 tests)

#### Suite 7: Document Intelligence Engine (24 tests)
- `TC-DOC-001` through `TC-DOC-024` (24 tests)

#### Suite 8: Evidence & Provenance Engine (24 tests)
- `TC-PROV-001` through `TC-PROV-024` (24 tests)

#### Suite 9: QA/QC & Data Health Engine (24 tests)
- `TC-QAQC-001` through `TC-QAQC-024` (24 tests)

#### Suite 10: Report Readiness & Audit Package Engine (24 tests)
- `TC-REP-001` through `TC-REP-024` (24 tests)

#### Suite 11: App State & Data Provider Engine Bridge (44 tests)
- `TC-STATE-001` through `TC-STATE-024` (24 tests)
- `TC-APP-001` through `TC-APP-020` (20 tests)

#### Suite 12: Regulatory Workspace UI & Governed Bridge (20 tests)
- `TC-REGUI-001` through `TC-REGUI-020` (20 tests)

---

### 4. Certification Statement

The test suite structure, canonical identifiers, and test count registry are mathematically verified and frozen.
All 12 active suites containing 299 canonical tests pass with 100% compliance.
