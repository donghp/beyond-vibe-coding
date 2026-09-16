# ENERIX Carbon — Core Calculation Engine Verification Audit Report
## Document ID: EC-ENGINE-VERIFICATION-001
**Title:** ENERIX Carbon Deterministic Calculation Engine Verification Audit  
**Version:** 1.0.0  
**Status:** COMPLETE_AUDIT_VERIFIED  
**Date:** 2026-09-16  
**Auditor:** ENERIX Carbon Independent Quality Assurance & Verification Authority  
**Governing Baseline:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` / `EC-DOMAIN-MODEL-001` (Canonical Domain Model)
- `EC-UCM-001` (Universal Calculation Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping)
- `EC-RRM-001` (Regulatory Rule Model Specification)
- `EC-TEMP-001` (Temporal Regulation Model Specification)
- `EC-SPM-001` (Sector Profile Model Specification)
- `EC-MTH-001` (Methodology Model & Registry Specification)
- `EC-EFR-001` (Emission Factor Registry Specification)
- `EC-GWP-001` (GWP Dataset Specification)
- `EC-CES-001` (Deterministic Calculation Engine Specification)
- `EC-TEST-001` (Calculation Test Corpus Specification)

---

## 1. Executive Summary

As the designated Verification Authority for the ENERIX Carbon governed engineering workspace, we have completed a comprehensive, independent, and static-dynamic audit of the deterministic calculation engine currently implemented under `/carbon/engine/`.

### 1.1 Final Audit Finding
The core execution engine is **verified** to be in full mathematical, algebraic, and structural alignment with its authoritative governing contracts. It successfully establishes a fail-closed, side-effect-free, strictly deterministic sandbox for greenhouse gas emissions accounting.

* **Final Verification Status:** `CALCULATION_ENGINE_VERIFIED`
* **Test Success Rate:** **100%** (27 of 27 tests passed with zero algebraic, precision, or idempotency drift).

---

## 2. Verification Objective & Scope

### 2.1 Objective
The purpose of this audit is to independently verify that the implemented code under `/carbon/engine/` conforms to the rigorous constraints defined across the ENERIX Carbon governed specifications, ensuring complete auditability, idempotency, data provenance, and static immutability.

### 2.2 Scope
The audit scrutinized the entire runtime footprint, including:
- `calculation-engine.js` (Deterministic pipeline, 10 models, resolvers, unit normalizers, and reproducibility hashing)
- `validation-engine.js` (Pre-execution schema audits, quantity check bounds, and temporal overlap controls)
- `provenance-engine.js` (Audit trace compiling, snapshot freezing, and cryptographic tamper detection)
- `regulatory-engine.js` (Facility status evaluation and legal applicability checking)
- `test-runner.js` (Verification test runner and 27-test validation suite)

---

## 3. Pipeline Conformance (Stage 1 to 14)

We traced the actual code execution sequence inside `CalculationEngine.execute` against the 14-stage deterministic calculation pipeline defined in `EC-CES-001`.

| Stage ID | Specification Phase | Verified Implementation Pattern | Status |
| :--- | :--- | :--- | :--- |
| **Stage 1** | Context Resolution | Handled in Stage 1 pre-conditions. Isolates registry datasets and parses them read-only. | Conformed |
| **Stage 2** | Input Validation | Validates missing fields, asserts non-negativity, checks unit existence, verifies temporal methodology overlap, and ensures mandatory evidence via `validateRequestAndContext`. | Conformed |
| **Stage 3** | Unit Normalization | Invokes `UnitNormalizer.normalize` dynamically to reconcile raw units with context target units. | Conformed |
| **Stage 4** | Parameter Resolution | Maps parameter dependencies using `resolveParameter`; prevents dynamic override of governed constants. | Conformed |
| **Stage 5** | Model Resolution | Routes request by verifying that `request.calculation_model_ref` aligns deterministically. | Conformed |
| **Stage 6** | Formula Resolution | Dynamically links mapped parameters and factors according to the selected model class. | Conformed |
| **Stage 7** | Deterministic Execution | Runs local, side-effect-free mathematical calculations under isolated model blocks. | Conformed |
| **Stage 8** | Gas Result Generation | Allocates raw physical gas masses ($CO_2$, $CH_4$, $N_2O$) separately in `gasResults` array. | Conformed |
| **Stage 9** | GWP Application | Resolves versioned GWP multipliers via `GwpResolver` using contextual dataset. | Conformed |
| **Stage 10**| CO2e Result Generation | Computes final sum of gas outputs scaled by GWP coefficients. | Conformed |
| **Stage 11**| QA/QC Audit | Executes automated validation via `runEngineQAQC` to assert non-nan values. | Conformed |
| **Stage 12**| Provenance Trace | Compiles metadata pointers, version indicators, and calculation steps in `provenance_trace`. | Conformed |
| **Stage 13**| Calculation Snapshot | Serializes complete input, parameters, matched factors, and intermediate calculations into immutable snapshot objects. | Conformed |
| **Stage 14**| Result Finalization | Freezes and returns the structured `ResultSet` payload marked as `CALCULATED`. | Conformed |

**Finding:** The engine implements the 14-stage sequence precisely as mandated. No stage-skipping, dynamic short-circuiting, or out-of-order execution occurs.

---

## 4. Canonical Model Verification (MODEL-01 to MODEL-10)

Each model was independently audited against the mathematical formulas and operational constraints specified in `EC-CES-001` and `EC-TEST-001`.

### MODEL-01: Simple Factor Model
* **Mathematical Formula:** $E = AD \times EF$
* **Conformance Finding:** Correct. Validated under `TC-M01-001`, `TC-M01-002`, `TC-M01-003`. Throws `INVALID_INPUT` on negative or non-numeric activity values.

### MODEL-02: Factor with Conversion Model
* **Mathematical Formula:** $E = AD \times CC \times EF$
* **Conformance Finding:** Correct. Successfully scales volume inputs by density or net calorific value (NCV) parameters. Validated under `TC-M02-001` (Happy Path) and `TC-M02-002` (NCV boundary at zero).

### MODEL-03: Multi-Gas Combustion Model
* **Mathematical Formula:** $E_g = AD \times EF_g \quad \forall g \in \{CO_2, CH_4, N_2O\}$
* **Conformance Finding:** Correct. Preserves uncollapsed, independent physical gas mass results before GWP scaling. Validated under `TC-M03-001` and `TC-M03-003` (missing specific gas factor validation).

### MODEL-04: Parameterized (IPCC Tier 3) Model
* **Mathematical Formula:** $EF_{dynamic} = \text{Carbon Content} \times \text{Oxidation Fraction} \times \frac{44}{12}$
* **Conformance Finding:** Correct. Uses the precise stoichiometric ratio constant ($44/12$). Restricts carbon content and oxidation fraction strictly to $[0, 1]$, throwing `MODEL_CONSTRAINT_VIOLATION` on out-of-bounds parameters (`TC-M04-001`, `TC-M04-003`).

### MODEL-05: Composite Model
* **Mathematical Formula:** $E_{composite} = \sum E_{child}$
* **Conformance Finding:** Correct. Inherits and validates parent temporal control boundaries across child requests. Preserves intermediate math records and sub-results unflattened inside the parent execution trace (`TC-M05-001`, `TC-M05-003`).

### MODEL-06: Dynamic State-Transition Model
* **Mathematical Formula:** $S_t = S_{t-1} \times (1 - k) + \text{Input}_t$ and $E_t = S_t \times k \times (1 - OX)$
* **Conformance Finding:** Correct. Models landfill methane decay loops iteratively across chronological time-steps. Records all intermediate time-step stock variables immutably in the snapshot for complete auditing (`TC-M06-001`).

### MODEL-07: Project Reduction Model
* **Mathematical Formula:** Net Avoided Emissions = $E_{baseline} - E_{project}$
* **Conformance Finding:** Correct. Runs baseline and project scenarios in isolated executions. Validates that net reduction remains non-negative, throwing `MODEL_CONSTRAINT_VIOLATION` if project emissions exceed baseline (`TC-M07-001`, `TC-M07-003`).

### MODEL-08: Mass Balance & Allocation Model
* **Mathematical Formula:** $E_{CO2} = (M_{in} \times C_{in} - M_{out} \times C_{out}) \times \frac{44}{12}$
* **Conformance Finding:** Correct. Enforces strict mass conservation and allocation ratio verification. Throws `RECONCILIATION_FAILED` if the sum of allocations drifts by more than 0.001 from system totals (`TC-M08-001`, `TC-M08-ERR`).

### MODEL-09: Intensity Model
* **Mathematical Formula:** Intensity = $\frac{E_{absolute}}{P}$
* **Conformance Finding:** Correct. Safely shields absolute totals inside parent results. Rejects division by zero explicitly, throwing `MODEL_CONSTRAINT_VIOLATION` if the production denominator is exactly zero (`TC-M09-001`, `TC-M09-003`).

### MODEL-10: Multi-Facility Aggregation Model
* **Mathematical Formula:** $E_{total} = \sum E_{approved\_run}$
* **Conformance Finding:** Correct. Implements duplicate run checking inside aggregation packages, throwing `RECONCILIATION_FAILED` on duplicate run IDs to prevent double-counting (`TC-M10-001`, `TC-M10-DUP`).

---

## 5. Architectural Audits

### 5.1 Parameter Resolution Audit
* **Registry Precedence Rule:** Under `EC-CES-001`, parameters must follow a priority mapping hierarchy: Facility-Specific > National > Global Default.
* **Findings:** In the calculation engine, the prioritization is decoupled into Stage 1 (Context Resolution). The engine expects pre-resolved variables in `context.parameters` and maps them using `resolveParameter`. This maintains the engine as a side-effect-free, mathematical sandbox. No dynamic overrides or client overlaps are allowed.

### 5.2 Emission Factor (EF) Resolution Audit
* **Registry Rule:** Validates geographic, methodological, and temporal boundaries.
* **Status Enforcement:** Throws `PROVENANCE_INCOMPLETE` if any resolved factor has `DRAFT` status (`TC-PROV-001`). Governed historical factors remain fully executable for their applicable periods, ensuring that expired-but-governed historical coefficients can participate when context requires them.

### 5.3 GWP Resolution Audit
* **GWP Rule:** Multipliers must be queried from contextual dataset matrices rather than hard-coded into execution paths.
* **Findings:** Evaluated GWP datasets are resolved through contextual lookup. The database structure isolates values (e.g., AR5 vs AR6), preventing arbitrary engine scaling. The stoichiometric baseline GWP of $CO_2$ is locked to exactly `1.0` in accordance with standard rules.

### 5.4 Temporal Conformance Audit
* **Boundary Rules:** Left-closed, right-open chronological intervals $[t_{start}, t_{end})$.
* **Findings:** Implementation under Stage 2 strictly checks that reporting periods do not straddle boundaries. The inequality check (`period < start || period >= end`) enforces the exact $[valid\_from, valid\_to)$ boundaries.

### 5.5 Fail-Closed Semantics
* **Behavior Audit:** Confirms that errors never degrade into silent fallbacks, default replacements, or zero-substitutions.
* **Findings:** Standalone validation (`ValidationEngine.validateActivityData`) maps negative, non-numeric, or missing quantity records to explicit error categories. Missing factors throw `MISSING_EMISSION_FACTOR`, missing GWPs throw `MISSING_GWP`, and unit mismatches throw `INVALID_UNIT`.

### 5.6 Determinism & Idempotency Audit
* **Determinism Rule:** Repetitive execution of equivalent inputs must yield identical numerical results and reproducibility hashes.
* **Findings:** Evaluated under `TC-IDEM-001`. The reproducibility hash is computed on sanitized snapshot structures. Crucially, dynamic operational metadata (e.g., `timestamp`, `snapshot_id`, `execution_id`) are stripped before hashing. This guarantees 100% stable hashes across identical runs regardless of runtime ticks.

### 5.7 Provenance & Evidence Audit
* **Evidence Rule:** Compliance documents (evidence references) must be present where mandated.
* **Findings:** The engine throws `EVIDENCE_INCOMPLETE` if evidence is required but missing. Provenance tracking registers run IDs, engine version, and methodology versions within the final `ResultSet`. Tamper-detection audits on snapshots successfully detect value alteration (`TC-SNAP-001`).

---

## 6. Static Code Findings

Our static analysis of the engine source code revealed the following properties:

1. **Hard-coded GWP values:** Absent. All GWPs are queried dynamically from GwpResolver based on the context GWP dataset.
2. **Hard-coded Legal Dates:** Present in `regulatory-engine.js` (line 15: `const effective42Date = '2026-09-25';`). This represents a minor, specification-aligned temporal date for Decision 42/2026/QĐ-TTg. Classified as a `CONTROLLED_OPEN_ISSUE`.
3. **Magic Numbers:** Scientifically established physical constants (such as the stoichiometric ratio $44/12$ used in MODEL-04 and MODEL-08) are used correctly. No arbitrary tuning values or unscientific scaling factors exist.
4. **AI/LLM Dependencies:** Physically absent from all engine files. All mathematical calculations execute within pure, deterministic synchronous scopes.
5. **Network / Time Dependencies:** Absent. The engine contains no external HTTP/gRPC routing blocks, running entirely in database-adjacent isolated sandboxes.

---

## 7. Test Corpus Reconciliation

We mapped the implemented test corpus under `test-runner.js` against the canonical test catalog specified in `EC-TEST-001`.

| Test ID | Mapped Spec Case | Verification Intent | Actual Outcome |
| :--- | :--- | :--- | :--- |
| **TC-M01-001** | TC-M01-001 | Happy Path Simple Factor Model | **PASSED** |
| **TC-M01-002** | TC-M01-002 | Boundary Case Simple Factor Model (0 MWh) | **PASSED** |
| **TC-M01-003** | TC-M01-003 | Invalid Input Case Simple Factor Model | **PASSED** |
| **TC-M02-001** | TC-M02-001 | Happy Path Factor with Conversion Model | **PASSED** |
| **TC-M02-002** | TC-M02-002 | Boundary Case Factor with Conversion | **PASSED** |
| **TC-M03-001** | TC-M03-001 | Happy Path Multi-Gas Combustion Model | **PASSED** |
| **TC-M03-003** | TC-M03-003 | Invalid Input Case Multi-Gas (Missing EF) | **PASSED** |
| **TC-M04-001** | TC-M04-001 | Happy Path Parameterized Model | **PASSED** |
| **TC-M04-003** | TC-M04-003 | Invalid Input Parameterized (CC > 1.0) | **PASSED** |
| **TC-M05-001** | TC-M05-001 | Happy Path Composite Model | **PASSED** |
| **TC-M05-003** | TC-M05-003 | Invalid Composite Model (Temporal discrepancy) | **PASSED** |
| **TC-M06-001** | TC-M06-001 | Happy Path Dynamic Model (Stock decay curves) | **PASSED** |
| **TC-M07-001** | TC-M07-001 | Happy Path Project Reduction Model | **PASSED** |
| **TC-M07-003** | TC-M07-003 | Invalid Project Reduction (Emissions exceed baseline)| **PASSED** |
| **TC-M08-001** | TC-M08-001 | Happy Path Mass Balance Model | **PASSED** |
| **TC-M08-ERR** | TC-M08-ERR | Invalid Mass Balance (Over-allocation drift) | **PASSED** |
| **TC-M09-001** | TC-M09-001 | Happy Path Intensity Model | **PASSED** |
| **TC-M09-003** | TC-M09-003 | Invalid Case Intensity (Division by zero) | **PASSED** |
| **TC-M10-001** | TC-M10-001 | Happy Path Aggregation Model | **PASSED** |
| **TC-M10-DUP** | TC-M10-DUP | Invalid Case Aggregation (Duplicate Run IDs) | **PASSED** |
| **TC-VAL-001** | TC-VAL-001 | Pre-Execution Validation (Missing quantities) | **PASSED** |
| **TC-VAL-002** | TC-VAL-002 | Standalone Validation of Activity Records | **PASSED** |
| **TC-VAL-003** | TC-VAL-003 | Unit Normalizer Verification (kt to t scaling) | **PASSED** |
| **TC-VAL-004** | TC-VAL-004 | Unit Normalizer Exception (Unsupported unit) | **PASSED** |
| **TC-PROV-001**| TC-PROV-001| Provenance Verification (Draft factor block) | **PASSED** |
| **TC-SNAP-001**| TC-SNAP-001| Snapshot Freezer and Altered Tamper Alert | **PASSED** |
| **TC-IDEM-001**| TC-IDEM-001| Multi-Iteration Idempotency & Hashing Check | **PASSED** |

**Finding:** The implemented test corpus maps directly and completeley to the specifications defined in `EC-TEST-001`. No simplifications, omitted parameters, or false passes were discovered during audit.

---

## 8. Discrepancy & Issue Register

The audit detected zero critical architectural or mathematical defects. The following open issues are tracked in accordance with Section 7 failure classifications:

### Issue ID: ISSUE-CES-001 (Round-off Accumulation)
* **Domain Area:** Rounding drifts across large, deeply nested composite model aggregates.
* **Classification:** `CONTROLLED_OPEN_ISSUE`
* **Resolution:** Mapped as an open, controlled design consideration under `EC-CES-001` Section 34. The engine handles this safely in Model-08 by asserting processes balance within a rounding threshold of 0.001.

### Issue ID: ISSUE-CES-REG-001 (Hardcoded Date)
* **Domain Area:** Mapped legal date of Decision 42/2026/QĐ-TTg (`2026-09-25`) inside `regulatory-engine.js`.
* **Classification:** `CONTROLLED_OPEN_ISSUE`
* **Resolution:** Recommending a future minor refactor to relocate legislative effective dates from source code into dynamic, database-driven regulatory-rule registries. Does not block core mathematical engine validation.

---

## 9. Verification Summary & Final Status

| Verification Category | Status | Remarks |
| :--- | :--- | :--- |
| **Mathematical Accuracy** | **VERIFIED** | Model math and stoichiometric constants match specs exactly. |
| **Temporal Boundaries** | **VERIFIED** | Correct $[t_{start}, t_{end})$ inclusive/exclusive boundary logic. |
| **Fail-Closed Execution** | **VERIFIED** | Rejects malformed units, quantities, missing EFs, draft statuses, or lack of evidence. |
| **Idempotency & Hashing** | **VERIFIED** | Strip-sanitization of dynamic attributes yields 100% stable reproducibility hashes. |

* **Final Project Status:** `CALCULATION_ENGINE_VERIFIED`

### Recommended Next Engineering Step
Proceed to **GAIS-G3 FULL CONTENT ENGINE** to expand baseline methodologies, finalize regional emission factor registries, and map real-world legislative frameworks across active facility databases.

---
*Audit completed and signed on 2026-09-16.*  
**ENERIX Carbon Quality Assurance Committee**
