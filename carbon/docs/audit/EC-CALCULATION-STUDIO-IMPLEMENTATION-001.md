# ENERIX CARBON — CALCULATION STUDIO IMPLEMENTATION AUDIT REPORT
**Artifact Identifier**: `EC-CALCULATION-STUDIO-IMPLEMENTATION-001`  
**Governing Standard**: EC-TEST-001 / Vietnam Decision 42/2026/QĐ-TTg / Circular 17/2022/TT-BTNMT / Circular 38/2023/TT-BCT  
**Phase**: G5 — Product / Demo Operationalization  
**Task Ref**: #0027 & #0027.1 — Carbon Calculation Studio & Semantic Integrity Audit  
**Status**: `CALCULATION_STUDIO_IMPLEMENTATION_ALIGNED_WITH_OPEN_ISSUES`  
**Date**: 2026-09-16  

---

## 1. Executive Summary

Task #0027 delivered the **Carbon Calculation Studio** (`/carbon/ui/pages/calculations.js`), serving as the primary engineering workspace for governed calculation preparation, validation gate inspection, deterministic engine execution, multi-scope aggregation, greenhouse gas species breakdown, activity ledger binding, statutory factor cataloging, and reproducibility lineage.

Task #0027.1 executed a narrow corrective semantic integrity audit focusing on:
1. **Dynamic GWP Dataset Binding**: Eliminating universal hardcoding of IPCC AR5, enabling dynamic dataset resolution from calculation snapshots, and fully preserving `ISSUE-GWP-001` (GWP Standard & Horizon Selection).
2. **Hash & Provenance Terminology**: Replacing inappropriate claims of "cryptographic hash" / "SHA-256 Validated" with accurate non-cryptographic deterministic integrity labels: "Integrity Hash" and "Reproducibility Hash".
3. **Test Manifest Reconciliation**: Validating canonical test alignment across all 13 suites and 319 test cases.

---

## 2. Governed Information Architecture

The Calculation Studio UI is structured into 8 modular panels:

```
+---------------------------------------------------------------------------------------------------+
|  CALCULATION STUDIO HEADER: Active Regulated Facility, Framework, Temporal Regime, Status Badges  |
+---------------------------------------------------------------------------------------------------+
|  1. FAIL-CLOSED BLOCKER ALERT                                                                     |
|     - Triggers when temporal segmentation is required but unsegmented (ISSUE-TEMP-001)           |
|     - Renders prerequisites checklist before deterministic execution is permitted                |
+---------------------------------------------------------------------------------------------------+
|  2. GOVERNED VALIDATION GATES (G3 EXECUTION BLUEPRINT)                                            |
|     - GATE-01: Facility Identity & Legal Boundary                                                 |
|     - GATE-02: Statutory Rule & Applicability Resolved                                            |
|     - GATE-03: Temporal Segment & Statutory Boundary                                              |
|     - GATE-04: Sector MRV Methodology Bound                                                       |
|     - GATE-05: Activity Data & Evidence Linked                                                    |
|     - GATE-06: Emission Factors & GWP Multipliers                                                 |
|     - Action Bar: Re-evaluate Gates, Execute Governed Calculation Engine Run                      |
+---------------------------------------------------------------------------------------------------+
|  3. DETERMINISTIC CALCULATION SNAPSHOT & SCOPE AGGREGATION                                         |
|     - Total Gross GHG Emissions (t CO2e) with dynamic GWP standard tag                            |
|     - Scope 1 Direct Emissions (Stationary Combustion Diesel)                                     |
|     - Scope 2 Indirect Emissions (Grid Electricity location-based)                                |
|     - Scope 3 Value Chain Emissions (Transparently disclosed as not assessed/optional)            |
+---------------------------------------------------------------------------------------------------+
|  4. GREENHOUSE GAS SPECIES COMPOSITION TABLE                                                      |
|     - Individual Gas Physical Masses: CO2, CH4, N2O                                               |
|     - Dynamic Run-Specific GWP Multipliers derived from active dataset                           |
|     - Equivalent CO2e Contributions and Percentages                                               |
+---------------------------------------------------------------------------------------------------+
|  5. SEQUENTIAL CALCULATION STEPS AUDIT TRAIL                                                      |
|     - Ordered trace of calculation steps (STEP-01, STEP-02, STEP-03)                              |
|     - Model Class IDs (MODEL-01, MODEL-03), mathematical formulas, activity data, and factors    |
+---------------------------------------------------------------------------------------------------+
|  6. BOUND ACTIVITY DATA LEDGER & AUDIT EVIDENCE                                                   |
|     - Activity records, statutory source documents, invoice references, and quantities            |
+---------------------------------------------------------------------------------------------------+
|  7. STATUTORY EMISSION FACTORS & GOVERNED GWP DATASETS CATALOG                                    |
|     - Ministerial Emission Factors Registry                                                       |
|     - Governed GWP Reference Datasets Table (AR5 vs AR6, Time Horizon, Multipliers, Run State)    |
|     - Controlled Issue disclosure: ISSUE-GWP-001 (OPEN_CONTROLLED)                                |
+---------------------------------------------------------------------------------------------------+
|  8. CALCULATION INTEGRITY MANIFEST & REPRODUCIBILITY LINEAGE                                      |
|     - Immutable Snapshot ID, Integrity Hash, Reproducibility Hash, Timestamp, QA/QC Health        |
+---------------------------------------------------------------------------------------------------+
|  9. GOVERNED CALCULATION MODEL CLASSES REFERENCE                                                  |
|     - Reference specifications for MODEL-01 through MODEL-07 standards                            |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Semantic Corrections Audit Detail (#0027.1)

### 3.1 Global Warming Potential (GWP) Representation
- **Prior State**: The UI displayed IPCC AR5 100-year metrics as a universal standard across the header, summary badges, and composition table.
- **Audit Findings**: Under Decision 42/2026/QĐ-TTg and Circular 17/2022/TT-BTNMT, IPCC AR5 is the default statutory standard in Vietnam, but governed operations must support dynamic selection of alternative standards (e.g. IPCC AR6) and transparently surface controlled issue `ISSUE-GWP-001`.
- **Corrective Actions Applied**:
  1. Updated `stateStore.getCalculationStudioViewModel()` to dynamically query the active run's GWP dataset specification (`gwp_dataset_ref`) from `DataProvider`.
  2. Implemented a fallback to `dataset_id: 'UNKNOWN'` and `status: 'REQUIRES_REVIEW'` if an unmapped dataset reference is encountered.
  3. Replaced static text labels in `calculations.js` with dynamic bindings (`${vm.gwp_dataset.name}`, `${vm.gwp_dataset.dataset_id}`, `${vm.gwp_dataset.horizon}`).
  4. Added a dedicated **Governed GWP Reference Datasets (EC-GWP-001)** catalog section to `calculations.js` displaying all registered GWP standards, time horizons, legal citations, gas multipliers, and active run status.
  5. Surfaced `ISSUE-GWP-001: OPEN_CONTROLLED` badge in the UI without altering underlying calculation engine math.

### 3.2 Integrity Hash & Reproducibility Terminology
- **Prior State**: Manifest container referenced "Cryptographic Audit Manifest" and "SHA-256 Validated".
- **Audit Findings**: The application hashes deterministic JSON snapshots using non-cryptographic hash algorithms (e.g., FNV-1a / deterministic string hash). Labeling these as cryptographic or SHA-256 constitutes a false cryptographic security claim.
- **Corrective Actions Applied**:
  1. Renamed section header to **Calculation Integrity Manifest & Reproducibility Lineage**.
  2. Replaced badge label with `Deterministic Integrity Verified`.
  3. Updated manifest properties to display **INTEGRITY_HASH** and **REPRODUCIBILITY_HASH** alongside **SNAPSHOT_ID**.
  4. Updated test case `TC-CALCUI-017` in `test-calculation-studio.js` to assert `INTEGRITY_HASH` and `REPRODUCIBILITY_HASH`.

### 3.3 Static Code Audit Findings
| Audit Check | Target File(s) | Status | Notes |
|---|---|---|---|
| Universal AR5 Hardcoding | `calculations.js`, `state-store.js` | **REMEDIATED** | Dynamic resolution via `vm.gwp_dataset` & `vm.all_gwp_datasets`. |
| Hardcoded GWP Values in UI | `calculations.js` | **REMEDIATED** | Consumes multipliers dynamically from `vm.gwp_dataset.gwp_values`. |
| "Cryptographic Hash" Claims | `calculations.js`, `test-calculation-studio.js` | **REMEDIATED** | Replaced with "Integrity Hash" / "Reproducibility Hash". |
| Duplicate Calculation Formulas | `calculations.js` | **COMPLIANT** | Zero mathematical operations (`* EF`, `* GWP`) performed in UI. |
| Duplicate Regulatory Logic | `calculations.js` | **COMPLIANT** | Zero threshold evaluations in UI; consumed from `StateStore`. |

---

## 4. Test Verification & Reconciliation

### Canonical Test Manifest Reconciliation
The canonical test inventory was verified against `EC-CANONICAL-TEST-MANIFEST-001.yaml`, confirming:
- **Total Registered Suites**: 13
- **Total Registered Canonical Tests**: 319
- **Total Passed Tests**: 319
- **Total Failed Tests**: 0
- **Total Skipped Tests**: 0
- **Pass Rate**: 100%

### Suite 13 Test Results (`TC-CALCUI-001` .. `TC-CALCUI-020`)
| Test ID | Objective | Status |
|---|---|---|
| `TC-CALCUI-001` | Workspace loads with primary statutory layout & headers | **PASSED** |
| `TC-CALCUI-002` | Active facility context properly resolved in header | **PASSED** |
| `TC-CALCUI-003` | Statutory framework and applicability status surfaced | **PASSED** |
| `TC-CALCUI-004` | Temporal regime state and segmentation controls present and reactive | **PASSED** |
| `TC-CALCUI-005` | All 6 statutory validation gates (G3 blueprint) evaluated and rendered | **PASSED** |
| `TC-CALCUI-006` | Sector MRV methodology binding surfaced with governing circular and tier | **PASSED** |
| `TC-CALCUI-007` | Deterministic execution trigger button present | **PASSED** |
| `TC-CALCUI-008` | Fail-closed blocker alert rendered when temporal segmentation required but disabled | **PASSED** |
| `TC-CALCUI-009` | Total gross GHG emissions snapshot displayed with dynamic GWP sum | **PASSED** |
| `TC-CALCUI-010` | Scope 1 direct emissions correctly rendered with diesel fuel breakdown | **PASSED** |
| `TC-CALCUI-011` | Scope 2 indirect emissions correctly rendered with grid electricity breakdown | **PASSED** |
| `TC-CALCUI-012` | Scope 3 value chain emissions handled gracefully without fake placeholders | **PASSED** |
| `TC-CALCUI-013` | Greenhouse gas species composition table rendered with dynamic GWP multipliers | **PASSED** |
| `TC-CALCUI-014` | Sequential calculation steps trace rendered with model classes & factor bindings | **PASSED** |
| `TC-CALCUI-015` | Bound activity data ledger rendered with quantities, units, and evidence references | **PASSED** |
| `TC-CALCUI-016` | Emission factors registry and GWP datasets table rendered with source references | **PASSED** |
| `TC-CALCUI-017` | Calculation integrity manifest rendered with Snapshot ID, Integrity Hash, and Reproducibility Hash | **PASSED** |
| `TC-CALCUI-018` | Standard contract calculation models reference rendered (MODEL-01 to MODEL-07) | **PASSED** |
| `TC-CALCUI-019` | StateStore.executeCalculation() deterministically executes and stores historical snapshot | **PASSED** |
| `TC-CALCUI-020` | UI is strictly NOT calculation authority: zero duplicate formulas in view rendering | **PASSED** |

---

## 5. Audit Conclusion & Final Status

The Calculation Studio workspace has successfully passed the semantic integrity audit. All presentation bindings dynamically reflect the underlying domain state and governed registries without encroaching on calculation authority.

**Final Governed Status**:  
`CALCULATION_STUDIO_IMPLEMENTATION_ALIGNED_WITH_OPEN_ISSUES` (Governed by open controlled issues `ISSUE-GWP-001`, `ISSUE-TEMP-001`, `ISSUE-TEMP-002`, `ISSUE-RRM-001`).
