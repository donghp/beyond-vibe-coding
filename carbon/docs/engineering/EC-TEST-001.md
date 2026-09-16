# ENERIX Carbon — Calculation Test Corpus
## Document ID: EC-TEST-001
**Title:** ENERIX Carbon Calculation Test Corpus — Canonical Test Cases & Verification Matrix  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Quality Assurance & Systems Verification Committee  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` (Canonical Domain Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping Specification)
- `EC-RRM-001` (Regulatory Rule Model Specification)
- `EC-TEMP-001` (Temporal Regulation Model Specification)
- `EC-SPM-001` (Sector Profile Model Specification)
- `EC-MTH-001` (Methodology Model & Registry Specification)
- `EC-EFR-001` (Emission Factor Registry Specification)
- `EC-GWP-001` (GWP Dataset Specification)
- `EC-UCM-001` (Universal Calculation Model Specification)
- `EC-CES-001` (Deterministic Calculation Engine Specification)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-TEST-001` |
| **Document Title** | ENERIX Carbon Calculation Test Corpus Specification |
| **Artifact Class** | Formal Verification Specification & Test Catalog |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Quality Assurance & Verification Board |
| **Repository Location** | `/carbon/docs/engineering/EC-TEST-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-TEST-001** is to define the canonical, deterministic, and auditable test corpus required to verify ENERIX Carbon's deterministic calculation engine before and after implementation.

To secure regulatory and third-party audit acceptance, all math execution must be verified against rigorous, algebraic test cases. This document maps and details verification boundaries, expected errors, inputs, expected outputs, and coverage matrices, keeping calculations fully decoupled from dynamic code, mutable registries, and non-deterministic processes.

---

## 3. Test Principles

The verification process is guided by five primary technical standards:

1. **Complete Determinism:** Every test must have explicitly defined input values and expected outputs or errors. No test result may depend on mutable registry states, live clock times, dynamic rounding assumptions, or stochastic AI interpretations.
2. **Comprehensive Boundary coverage:** Verification requires both positive (happy path) and negative (fail-closed) checks covering typical edge boundaries (e.g., zero divisions, temporal overlaps).
3. **Traceable Lineage Assertions:** Successful execution tests must output full, inspectable verification trails mapping `WHY` selection resolved, `HOW` math calculated, and `SOURCE` citations.
4. **Isolate Synthetic Data:** Synthetic values and testing fixtures must be explicitly labeled `TEST_ONLY_SYNTHETIC` to prevent mixing them with real-world, approved constants.
5. **Fail-Closed on Gaps:** Rejects execution on any missing data parameters, validation gaps, or conflicting records, returning typed exceptions instead of applying silent fallbacks.

---

## 4. Test Classes

The test corpus is organized into sixteen formal verification classes:

* **A. Unit / Formula Tests:** Validates algebraic formula correctness.
* **B. Model Contract Tests:** Verifies compliance of individual models (`MODEL-01` to `MODEL-10`) with their UCM requirements.
* **C. Input Validation Tests:** Checks error-handling behavior for malformed, missing, or negative inputs.
* **D. Unit Normalization Tests:** Audits dimension, scale, and density conversion calculations.
* **E. Parameter Resolution Tests:** Tests priority mappings and resolution orders.
* **F. EF Selection Tests:** Tests geographic, chronological, and activity-based factor match queries.
* **G. GWP Selection Tests:** Verifies dataset-version-basis matches.
* **H. Temporal Tests:** Exercises Left-closed Right-open interval boundaries $[t_{start}, t_{end})$.
* **I. Composite / Aggregation Tests:** Audits hierarchical process calculations and multi-facility consolidations.
* **J. Allocation Tests:** Verifies mass-balance conservation and division ratios.
* **K. Intensity Tests:** Checks numerator/denominator calculations and ratio outputs.
* **L. Dynamic Model Tests:** Assesses chronological iterations and decay curve modeling.
* **M. Reduction Model Tests:** Audits baseline vs. project subtraction logic.
* **N. Provenance / Snapshot Tests:** Confirms calculation snapshot completeness and immutability.
* **O. Reproducibility / Idempotency Tests:** Verifies equivalent outputs across repetitive runs.
* **P. Error / Fail-Closed Tests:** Checks explicit abort states for missing coefficients.

---

## 5. Model Coverage

Each of the ten canonical models possesses a dedicated verification suite covering four mandatory perspectives:
1. **Happy Path:** standard operational baseline calculation.
2. **Boundary Case:** zero-values, limits, or scale transition points.
3. **Invalid Input Case:** validation exceptions on missing data, incorrect unit types, or out-of-bound variables.
4. **Provenance Case:** verifies metadata snapshots can reconstruct calculation results.

---

## 6. Model Coverage & Formula Tests

### MODEL-01: Simple Factor Model
* **Happy Path Formula (TC-M01-001):**
  - *Inputs:* $AD = 100.0\text{ MWh}$ (`TEST_ONLY_SYNTHETIC`)
  - *Factors:* $EF = 0.5\text{ t CO2e / MWh}$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:* $E = AD \times EF = 100.0 \times 0.5 = 50.0\text{ t CO2e}$
* **Boundary Case (TC-M01-002):** $AD = 0.0 \implies E = 0.0\text{ t CO2e}$
* **Invalid Input Case (TC-M01-003):** $AD = \text{"one hundred"}$ (non-numeric) $\implies$ Throws `INVALID_INPUT` error.
* **Provenance Case (TC-M01-004):** Verify that results snapshot retains full source references (`Decision-501/QD-BCT`).

### MODEL-02: Factor with Conversion Model
* **Happy Path Formula (TC-M02-001):**
  - *Inputs:* $AD = 1000.0\text{ liters}$ (`TEST_ONLY_SYNTHETIC`)
  - *Parameters:* $CC = 0.0008\text{ t / liter}$ (`TEST_ONLY_SYNTHETIC`), $EF = 3.1\text{ t CO2 / t fuel}$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:* $E = AD \times CC \times EF = 1000.0 \times 0.0008 \times 3.1 = 2.48\text{ t CO2}$
* **Boundary Case (TC-M02-002):** $CC = 0.0 \implies E = 0.0\text{ t CO2}$
* **Invalid Input Case (TC-M02-003):** Matching $AD$ (`liters`) against an $EF$ numerator of `liter/MWh` $\implies$ Throws `INVALID_UNIT` error.
* **Provenance Case (TC-M02-004):** Confirm snapshot retains both $CC$ and $EF$ publication metadata.

### MODEL-03: Multi-Gas Combustion Model
* **Happy Path Formula (TC-M03-001):**
  - *Inputs:* $AD = 10.0\text{ t coal}$ (`TEST_ONLY_SYNTHETIC`)
  - *Factors:* $EF_{CO2} = 2.1\text{ t CO2 / t}$ (`TEST_ONLY_SYNTHETIC`), $EF_{CH4} = 0.0002\text{ t CH4 / t}$ (`TEST_ONLY_SYNTHETIC`)
  - *GWP:* $GWP_{CO2} = 1.0$, $GWP_{CH4} = 28.0$ (`TEST_ONLY_SYNTHETIC` IPCC AR5)
  - *Algebraic Oracle:* 
    - $E_{CO2} = 10.0 \times 2.1 \times 1.0 = 21.0\text{ t CO2e}$
    - $E_{CH4} = 10.0 \times 0.0002 \times 28.0 = 0.056\text{ t CO2e}$
    - $E_{Total} = E_{CO2} + E_{CH4} = 21.0 + 0.056 = 21.056\text{ t CO2e}$
* **Boundary Case (TC-M03-002):** $EF_{CH4} = 0.0 \implies E_{Total} = 21.0\text{ t CO2e}$
* **Invalid Input Case (TC-M03-003):** Missing $EF_{CO2}$ record for target coal category $\implies$ Throws `MISSING_EMISSION_FACTOR`.
* **Provenance Case (TC-M03-004):** Assure $E_{CO2}$ and $E_{CH4}$ physical gas masses remain uncollapsed in trace snapshots.

### MODEL-04: Parameterized (IPCC Tier 3) Model
* **Happy Path Formula (TC-M04-001):**
  - *Inputs:* $AD = 50.0\text{ t coal}$ (`TEST_ONLY_SYNTHETIC`), Carbon Content $CC = 0.75$ (`TEST_ONLY_SYNTHETIC`), Oxidation Fraction $OF = 0.98$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:*
    - $EF_{calc} = CC \times OF \times \frac{44}{12} = 0.75 \times 0.98 \times 3.6667 = 2.695\text{ t CO2 / t}$
    - $E = 50.0 \times 2.695 = 134.75\text{ t CO2}$
* **Boundary Case (TC-M04-002):** Carbon content $CC = 0.0 \implies E = 0.0\text{ t CO2}$
* **Invalid Input Case (TC-M04-003):** Carbon Content $CC = 1.5$ (impossible chemical fraction $>1.0$) $\implies$ Throws `INVALID_INPUT` / `MODEL_CONSTRAINT_VIOLATION`.
* **Provenance Case (TC-M04-004):** Verify lab analysis parameters are stored inside the snapshot.

### MODEL-05: Composite Model
* **Happy Path Formula (TC-M05-001):**
  - *Inputs:* Process A ($E_A = 10.0\text{ t CO2e}$), Process B ($E_B = 15.5\text{ t CO2e}$)
  - *Algebraic Oracle:* $E_{Total} = E_A + E_B = 10.0 + 15.5 = 25.5\text{ t CO2e}$
* **Boundary Case (TC-M05-002):** One child process emissions set to zero ($E_A = 0.0$) $\implies E_{Total} = 15.5\text{ t CO2e}$
* **Invalid Input Case (TC-M05-003):** Temporal discrepancy between Child A (2024 period) and Child B (2025 period) $\implies$ Throws `INCOMPATIBLE_METHODOLOGY`.
* **Provenance Case (TC-M05-004):** Verify child execution logs and snapshots are retained within the nested structure.

### MODEL-06: Dynamic State-Transition Model
* **Happy Path Formula (TC-M06-001):**
  - *Inputs:* Initial carbon stock $S_0 = 100.0\text{ t}$ (`TEST_ONLY_SYNTHETIC`), Decay rate $k = 0.1\text{ yr}^{-1}$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:*
    - Year 1 Emissions: $E_1 = S_0 \times k = 100.0 \times 0.1 = 10.0\text{ t C}$
    - Year 1 Ending Stock: $S_1 = S_0 \times (1 - k) = 100.0 \times 0.9 = 90.0\text{ t C}$
    - Year 2 Emissions: $E_2 = S_1 \times k = 90.0 \times 0.1 = 9.0\text{ t C}$
* **Boundary Case (TC-M06-002):** Decay rate $k = 0.0 \implies$ Year 1 and Year 2 emissions remain $0.0\text{ t}$.
* **Invalid Input Case (TC-M06-003):** Iteration decay rate $k = -0.5 \implies$ Throws `INVALID_INPUT` / `MODEL_CONSTRAINT_VIOLATION`.
* **Provenance Case (TC-M06-004):** Confirm snapshot records historical transition stock levels for each time-step.

### MODEL-07: Project Reduction Model
* **Happy Path Formula (TC-M07-001):**
  - *Inputs:* Baseline Emissions $E_B = 150.0\text{ t CO2e}$ (`TEST_ONLY_SYNTHETIC`), Project Emissions $E_P = 90.0\text{ t CO2e}$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:* Net Reduction $R = E_B - E_P = 150.0 - 90.0 = 60.0\text{ t CO2e}$
* **Boundary Case (TC-M07-002):** Project emissions match baseline ($E_P = 150.0$) $\implies$ Net Reduction $R = 0.0\text{ t CO2e}$
* **Invalid Input Case (TC-M07-003):** Missing baseline run reference $\implies$ Throws `INVALID_INPUT` / `MISSING_PARAMETER`.
* **Provenance Case (TC-M07-004):** Ensure snapshots of both baseline and active scenarios are stored in the results payload.

### MODEL-08: Mass Balance Model
* **Happy Path Formula (TC-M08-001):**
  - *Inputs:* Mass Input $M_{in} = 100.0\text{ t}$ (`TEST_ONLY_SYNTHETIC`), Mass Output $M_{out} = 40.0\text{ t}$ (`TEST_ONLY_SYNTHETIC`), Carbon fractions: $C_{in} = 0.5$ (`TEST_ONLY_SYNTHETIC`), $C_{out} = 0.1$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:*
    - Carbon Input: $C_{in, total} = 100.0 \times 0.5 = 50.0\text{ t C}$
    - Carbon Output: $C_{out, total} = 40.0 \times 0.1 = 4.0\text{ t C}$
    - Released Carbon: $C_{released} = 50.0 - 4.0 = 46.0\text{ t C}$
    - $CO2$ Emissions: $E_{CO2} = 46.0 \times \frac{44}{12} = 168.667\text{ t CO2}$
* **Boundary Case (TC-M08-002):** Input carbon perfectly balances output ($C_{in, total} = C_{out, total}$) $\implies E_{CO2} = 0.0\text{ t}$.
* **Invalid Input Case (TC-M08-003):** Carbon Fraction $C_{in} = 1.2 \implies$ Throws `INVALID_INPUT` / `MODEL_CONSTRAINT_VIOLATION`.
* **Provenance Case (TC-M08-004):** Verify chemical balance properties are preserved in the execution trace.

### MODEL-09: Intensity Model
* **Happy Path Formula (TC-M09-001):**
  - *Inputs:* Absolute Emissions $E = 5000.0\text{ t CO2e}$ (`TEST_ONLY_SYNTHETIC`), Production Output $P = 2500.0\text{ tons}$ (`TEST_ONLY_SYNTHETIC`)
  - *Algebraic Oracle:* Intensity $I = \frac{E}{P} = \frac{5000.0}{2500.0} = 2.0\text{ t CO2e / ton product}$
* **Boundary Case (TC-M09-002):** Absolute emissions $E = 0.0 \implies I = 0.0\text{ t CO2e / ton product}$
* **Invalid Input Case (TC-M09-003):** Production Output $P = 0.0 \implies$ Throws `MODEL_CONSTRAINT_VIOLATION` (Division by Zero).
* **Provenance Case (TC-M09-004):** Confirm absolute emission numerator and production denominator are both preserved in output snapshots.

### MODEL-10: Multi-Facility Aggregation Model
* **Happy Path Formula (TC-M10-001):**
  - *Inputs:* Facility A ($E_A = 100.0\text{ t CO2e}$), Facility B ($E_B = 250.0\text{ t CO2e}$)
  - *Algebraic Oracle:* $E_{aggregated} = E_A + E_B = 100.0 + 250.0 = 350.0\text{ t CO2e}$
* **Boundary Case (TC-M10-002):** Both facility results set to zero $\implies E_{aggregated} = 0.0\text{ t CO2e}$
* **Invalid Input Case (TC-M10-003):** Overlapping physical boundary scopes (Facility B is a subsidiary process unit inside Facility A, creating double-counting) $\implies$ Throws `RECONCILIATION_FAILED`.
* **Provenance Case (TC-M10-004):** Verify that child facility run IDs are preserved inside the aggregation snapshot.

---

## 7. Validation Tests

The engine enforces strict, fail-explicit validation rules.

* **TC-VAL-001 (Missing ActivityData):** Execute a calculation run with `activity_data_refs` set to empty $\implies$ Throws `INVALID_INPUT`.
* **TC-VAL-002 (Invalid Numeric Value):** Inject negative value ($AD = -50.0$) where the methodology strictly prohibits negative mass inputs $\implies$ Throws `INVALID_INPUT`.
* **TC-VAL-003 (Unsupported Unit):** Match a volumetric activity of `cubic_meters` against a methodology expecting only `kilograms` $\implies$ Throws `INVALID_UNIT`.
* **TC-VAL-004 (Incompatible Unit):** Calculate emissions with an EF numerator mismatch (e.g., $EF = t\text{ CO2 / ton}$, but activity input in `liters`) with no conversion factors present $\implies$ Throws `INVALID_UNIT`.
* **TC-VAL-005 (Missing Parameter):** Execute dynamic MODEL-04 with dynamic parameters unmapped $\implies$ Throws `MISSING_PARAMETER`.
* **TC-VAL-006 (Missing EF):** Execute a grid electricity consumption run for a year with no registered national emission factor record $\implies$ Throws `MISSING_EMISSION_FACTOR`.
* **TC-VAL-007 (Missing GWP):** Compute emissions using custom fluorinated gases where the selected GWP dataset has no registered multipliers $\implies$ Throws `MISSING_GWP`.
* **TC-VAL-008 (Incompatible Model):** Execute a simple combustion run using an Aggregation model contract $\implies$ Throws `INCOMPATIBLE_METHODOLOGY`.
* **TC-VAL-009 (Temporal Incompatibility):** Attempt to run a 2026 reporting period calculation using an emission factor whose valid date range ended in 2024 $\implies$ Throws `MISSING_EMISSION_FACTOR`.
* **TC-VAL-010 (Missing Regulatory Context):** Run a compliance inventory report without linking active rule credentials evaluated by `EC-RRM-001` $\implies$ Throws `REGULATORY_CONTEXT_MISSING`.

---

## 8. Negative Value Testing

Negative values are evaluated according to strict methodological context rather than applying generalized code assumptions:

* **Strictly Forbidden:** Negative feedstock raw inputs in Stationary Combustion models (MODEL-03) or Mass Balance models (MODEL-08) $\implies$ Throws `INVALID_INPUT` / `MODEL_CONSTRAINT_VIOLATION`.
* **Conditionally Allowed:** Negative value parameters are allowed for specific physical process offsets (e.g., carbon capture sinks, dynamic forest depletion stocks, grid feedback imports) provided the methodology explicitly governs and authorizes those bounds.
* **Review/Audit State:** If a negative input is encountered with no matching methodological rule, the engine halts calculations and transitions the run to `REQUIRES_REVIEW` status, alerting compliance officers instead of executing silent overrides.

---

## 9. Parameter Resolution Testing

* **TC-PAR-001 (Unresolved Parameter Precedence):**  
  * *Objective:* Evaluate the statement *"laboratory $\rightarrow$ national registry $\rightarrow$ global default"* inside `EC-CES-001`.
  * *Findings:* Upstream statutory documents do not establish a universal, hard-coded parameter precedence rule. To prevent illegal parameter evaluation drift, the engine must flag this as **`PARAMETER_PRECEDENCE_UNRESOLVED`**.
  * *Normative Rule:* The target methodology (`EC-MTH-001`) must explicitly declare parameter selections and tiers within its metadata contract. The engine reads this mapping rather than applying built-in assumptions.

---

## 10. Unit Normalization Tests

* **TC-NORM-001 (Valid Conversion):** Convert $12.5\text{ kilotons}$ of fuel to metric tons ($t$) using a registered multiplier of $1000.0$ $\implies$ Yields $12500.0\text{ t}$ with no precision drift.
* **TC-NORM-002 (Incompatible Dimension):** Attempt to convert $100.0\text{ liters}$ of diesel to `megawatt-hours (MWh)` without an density or calorific conversion constant $\implies$ Throws `INVALID_UNIT`.
* **TC-NORM-003 (Missing Conversion):** No conversion factor registered for unique localized fuel variants $\implies$ Throws `INVALID_UNIT`.
* **TC-NORM-004 (Ambiguous Conversion):** Overlapping or conflicting conversion factors found for identical units within the same registry database $\implies$ Throws `INVALID_UNIT` / `RECONCILIATION_FAILED`.

---

## 11. Emission Factor Selection Tests

The selector engine evaluates geography, activity context, sector boundaries, and dates during factor query checks.

* **TC-EF-001 (Exact Match):** Match activity (`ACT-COAL`), jurisdiction (`VN`), year (`2025`), and methodology (`METH-MOIT-2023`) $\implies$ Resolves the unique correct coefficient ($2.15\text{ t CO2 / t}$).
* **TC-EF-002 (Valid Historical Match):** Query a factor for a 2023 compliance audit, matching the active factor published in 2023 $\implies$ Selects the 2023 historical value correctly, ignoring the newer 2025 factor.
* **TC-EF-003 (Expired Factor Block):** Attempt to run a 2026 report using a factor whose `effective_to` date ended in 2025 $\implies$ Throws `MISSING_EMISSION_FACTOR`.
* **TC-EF-004 (Conflicting Overlaps):** Two active factors published by different ministries matching identical activity, region, and dates $\implies$ Throws `RECONCILIATION_FAILED` / `BLOCKED` conflict states.
* **TC-EF-005 (Spatial Resolution Selection):** Query factors for a facility in Hanoi. Selects Hanoi local grid factor ($0.812\text{ t/MWh}$) first, ignoring national grid defaults ($0.822\text{ t/MWh}$) to preserve spatial resolution.

---

## 12. GWP Selection Tests

* **TC-GWP-001 (Valid Selection):** Query GWP dataset for a methodology requiring IPCC AR5 100-Year horizon multipliers $\implies$ Successfully loads multipliers ($CH_4 = 28.0$, $N_2O = 265.0$).
* **TC-GWP-002 (Assessment Basis Mismatch):** Attempt to load a methodology requiring IPCC AR6 values using an AR5 dataset context $\implies$ Throws `MISSING_GWP`.
* **TC-GWP-003 (Horizon Mismatch):** Query GWP datasets with 20-Year sensitivity criteria when the methodology mandates 100-Year compliance metrics $\implies$ Throws `MISSING_GWP`.
* **TC-GWP-004 (Conflicting Datasets):** Multi-ministry guidelines overlap, creating conflicts between AR4 and AR5 enforcement $\implies$ Throws `RECONCILIATION_FAILED` and halts calculations.

---

## 13. Temporal Tests

Evaluates left-closed, right-open interval boundaries $[t_{start}, t_{end})$ to verify timing mechanics:

* **TC-TEMP-001 (Exact Start Date):** Activity occurs on `2025-01-01T00:00:00Z` $[t_{start} = \text{2025-01-01})$. Valid match confirmed.
* **TC-TEMP-002 (Exact End Date):** Activity occurs on `2026-01-01T00:00:00Z` $[t_{end} = \text{2026-01-01})$. Excluded from interval (right-open boundary check) $\implies$ Throws `MISSING_EMISSION_FACTOR`.
* **TC-TEMP-003 (Open-Ended Validity):** Factor validity has no set end date $[2025-01-01, \infty)$ $\implies$ Matches and validates calculation for any activity date occurring after 2025-01-01.

---

## 14. Straddling Period Test

* **TC-TEMP-004 (Straddling Period Segmentation):**
  * *Objective:* Verify the engine's ability to handle activities that span across regulatory transition dates (e.g., fuel invoice spanning from June to August, where a new emission factor is mandated on July 1st).
  * *Preconditions:*  
    - Factor A ($EF_A = 2.0\text{ t / t}$) is valid for period $[2025-01-01, 2025-07-01)$.
    - Factor B ($EF_B = 2.5\text{ t / t}$) is valid for period $[2025-07-01, 2026-01-01)$.
  * *Inputs:* Activity fuel invoice of $120.0\text{ t}$ spanning `2025-06-01` to `2025-08-01` (60 days total, exactly 30 days in Factor A period and 30 days in Factor B period).
  * *Expected Behavior:* The engine segments the activity into two distinct sub-periods based on the number of days:
    - Sub-period A: $60.0\text{ t}$ coal mapped to Factor A.
    - Sub-period B: $60.0\text{ t}$ coal mapped to Factor B.
  * *Algebraic Oracle:*
    - $E_A = 60.0 \times 2.0 = 120.0\text{ t CO2}$
    - $E_B = 60.0 \times 2.5 = 150.0\text{ t CO2}$
    - $E_{Total} = 120.0 + 150.0 = 270.0\text{ t CO2}$
  * *Verification:* Assures the engine splits and calculates periods correctly rather than applying a single, averaged factor across the invoice.

---

## 15. Composite / Aggregation Tests

* **TC-M05-COMP (Hierarchy Lineage Check):** Verify that executing a composite MODEL-05 calculation preserves all child process run IDs, raw activity values, and factor selections in unflattened data nodes.
* **TC-M10-DUP (Duplicate Inclusions Block):** Inject identical child results into a MODEL-10 Aggregation run $\implies$ Engine validation flags duplicate IDs, aborts execution, and throws `RECONCILIATION_FAILED`.

---

## 16. Allocation Tests

MODEL-08 tests verify that shared physical emissions balance mathematically.

* **TC-M08-ALC (Exact Allocation):** Allocating $100.0\text{ t}$ emissions across Process A ($60\%$) and Process B ($40\%$) $\implies$ Process A gets $60.0\text{ t}$, Process B gets $40.0\text{ t}$. Allocated sum matches original total ($60 + 40 = 100.0\text{ t}$).
* **TC-M08-ERR (Incomplete/Over Allocation):**
  - Allocate Process A ($70\%$) and Process B ($40\%$) $\implies$ Allocated sum ($110\%$) exceeds $100\%$ system limits. Aborts execution and throws `RECONCILIATION_FAILED`.
  - Allocate Process A ($40\%$) and Process B ($40\%$) $\implies$ Allocated sum ($80\%$) fails to reconcile totals. Aborts execution and throws `RECONCILIATION_FAILED`.

---

## 17. Intensity Tests

* **TC-M09-INT (Numerator Preservation):** Compute intensity ratio. Verification checks confirm that absolute emission metrics are preserved as primary compliance outputs rather than being overwritten by intensity metrics.
* **TC-M09-ZERO (Zero Denominator Check):** Execute intensity calculation with production output set to $0.0$ $\implies$ Throws `MODEL_CONSTRAINT_VIOLATION` (avoids NaN or Infinity outputs).

---

## 18. Dynamic Model Tests

* **TC-M06-DYN (Dynamic State Reconstruction):**
  - *Objective:* Reconstruct decay-model calculations.
  - *Verification:* The engine must successfully reproduce the Year 5 ending stock and emission values starting from a frozen Year 2 snapshot stock, validating that iterative state variables remain perfectly reproducible across separate calculation runs.

---

## 19. Project Reduction Tests

* **TC-M07-RED (Reduction Boundary Balance):** Execute reduction checks. Verification verifies that the baseline and active project runs share identical spatial boundaries and temporal standards, throwing `INCOMPATIBLE_METHODOLOGY` on mismatching dimensions.

---

## 20. Precision and Rounding

* **TC-PRC-001 (Rounding Policy Unresolved):**  
  * *Objective:* Evaluate default rounding rules.
  * *Findings:* National guidelines and compliance circulars do not enforce a single, universal rounding standard (e.g., Banker's vs. Half-Up).
  * *Controlled Handling:* Flagged as **`ROUNDING_POLICY_UNRESOLVED`**. The engine preserves raw double-precision variables throughout intermediate calculations, applying rounding rules only in final report rendering phases.

---

## 21. Provenance Tests

* **TC-PROV-001 (Missing Provenance Block):** Execute calculation where matched registry coefficients have `status: "DRAFT"` (missing source publication metadata and signed review stamps) $\implies$ Throws `PROVENANCE_INCOMPLETE`.

---

## 22. Snapshot Tests

* **TC-SNAP-001 (Registry Update Isolation):**
  - *Objective:* Verify that historical results are unaffected by subsequent database updates.
  - *Steps:* Execute a run and save its `CalculationSnapshot`. Update the source registry's emission factor coefficient from $2.15$ to $2.50$. Re-execute calculation query using the snapshot pointer.
  - *Assertion:* The calculation must yield identical results based on the frozen value ($2.15$), proving complete registry isolation.

---

## 23. Idempotency Tests

* **TC-IDEM-001 (Mathematical Equivalence):** Run identical calculation requests 100 times consecutively across different servers $\implies$ Every execution must yield identical numeric outputs down to the defined decimal precision, regardless of dynamic transaction timestamps or generated run IDs.

---

## 24. Fail-Closed Tests

* **TC-FAIL-001 (Fail-Closed Boundaries):**  
  Verify that under no circumstances does the engine execute the following unsafe actions:
  - Silently substitute a zero value (`0.0`) for missing activity readings.
  - Apply default emission factors or arbitrary GWP values when lookup queries fail.
  - Execute calculations with dimensionally incompatible units.
  - Bypass conflicting factor parameters or overlapping date ranges.
  - Mutate historical calculation run outputs or snapshot arrays.

---

## 25. Traceability Tests

* **TC-TRACE-001 (Trace Output Check):** Verifies that successful execution payloads contain clear `WHY`, `HOW`, and `SOURCE` tracing blocks mapping matched legal regulations, physical calculation steps, and legislative publication references.

---

## 26. Coverage Matrix

| Compliance Requirement | Upstream Document | Test ID(s) | Expected Behavior | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Law 1-15 (Logic)** | `EC-CONTEXT-001` | `TC-FAIL-001`, `TC-IDEM-001` | Immutable, deterministic, fail-closed execution. | **CONFIRMED** |
| **Data Entities** | `EC-DM-001` | `TC-VAL-001`, `TC-VAL-002` | Validates canonical activity and facility schemas. | **CONFIRMED** |
| **Rule Applicability** | `EC-RRM-001` | `TC-VAL-010` | Requires valid legal rule bindings. | **CONFIRMED** |
| **Date Boundaries** | `EC-TEMP-001` | `TC-TEMP-001` to `TC-TEMP-004` | Exercises left-closed, right-open temporal intervals. | **CONFIRMED** |
| **Sector Profiles** | `EC-SPM-001` | `TC-EF-005` | Matches factor queries to process sectors. | **CONFIRMED** |
| **Method Steps** | `EC-MTH-001` | `TC-VAL-008` | Sequenced declarative step tracking. | **CONFIRMED** |
| **Factor Registries** | `EC-EFR-001` | `TC-EF-001` to `TC-EF-005` | Resolves factors without hardcoded constants. | **CONFIRMED** |
| **GWP Datasets** | `EC-GWP-001` | `TC-GWP-001` to `TC-GWP-004` | Multiplies physical gas to CO2e equivalents. | **CONFIRMED** |
| **Engine Execution** | `EC-CES-001` | `TC-M01-001` to `TC-M10-004` | Deterministic pipeline execution of models. | **CONFIRMED** |

---

## 27. Test Data Policy

* **Source Data:** Standard reference parameters published in official ministerial circulars are mapped to specific database entities with complete legal citations.
* **Synthetic Test Data:** Fixtures created for checking mathematical formulas or error paths must use arbitrary values explicitly labeled with `TEST_ONLY_SYNTHETIC` markers to prevent confusion.

---

## 28. Test Oracle

Expected mathematical and validation results are generated strictly from:
1. **Algebraically derivable equations:** Calculated using double-precision verification formulas.
2. **Governed source constraints:** Specific limits published in official decrees.
3. **Deterministic invariants:** Assertions verifying that output values perfectly conserve mass and energy.

AI models are strictly barred from acting as numerical oracles.

---

## 29. Test Naming

Tests follow a strict, alphanumeric naming taxonomy:
* `TC-M{MODEL_ID}-{NUM}`: Model execution tests (e.g., `TC-M01-001`).
* `TC-VAL-{NUM}`: Input validation tests.
* `TC-EF-{NUM}`: Factor selection tests.
* `TC-GWP-{NUM}`: GWP selection tests.
* `TC-TEMP-{NUM}`: Temporal and straddling-period tests.
* `TC-PROV-{NUM}`: Provenance tests.
* `TC-SNAP-{NUM}`: Snapshot-isolation tests.
* `TC-IDEM-{NUM}`: Idempotency tests.

---

## 30. Implementation Boundary

`EC-TEST-001` defines the formal verification catalog, inputs, expected outputs, and error states.

### Under Verification Governance:
- Test naming taxonomies, test case parameters, and expected results.
- Positive and negative verification assertions.
- Dynamic straddling period segmentation validations.
- Coverage mapping tables.

### Outside Verification Boundaries:
- Writing TypeScript test files or runtime test suites.
- Executing build compilations or lint processes.

---

## 31. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-TST-001` | Rounding Ambiguity | Rounding standard (Banker's vs. Half-Up) remains unaligned, causing minor differences in final decimal aggregates. | `EC-UCM-002` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-TST-002` | Parameter Precedence Gaps | Lack of explicit hierarchical guidelines regarding laboratory testing vs. default parameters. | `EC-MTH-002` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-TST-003` | Recalculation Baseline Oracles | Establishing verified historical baseline datasets for long-term project reduction verification. | `EC-CES-002` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |

---

## 32. Reconciliation

This Verification Specification is reconciled against the ENERIX Carbon ecosystem:
* Test models map directly to the ten models of `EC-UCM-001`.
* Error codes align with the canonical categories defined in `EC-CES-001`.
* Temporal test dates utilize the left-closed, right-open interval mechanics of `EC-TEMP-001`.

No conflicts or contradictions have been detected.

---

## 33. Acceptance Criteria

`EC-TEST-001` is accepted only if:

- [x] **A.** All ten mathematical models (`MODEL-01` to `MODEL-10`) have positive, boundary, and negative test cases.
- [x] **B.** Date intervals and straddling periods are explicitly tested using synthetic timelines.
- [x] **C.** Selection, conflicts, and overlaps of factors and GWPs are tested.
- [x] **D.** Verification checks confirm that absolute physical gas masses remain uncollapsed.
- [x] **E.** Complete snapshot isolation and absolute execution idempotency are verified.
- [x] **F.** Error validations assert that the engine fails explicitly and never applies silent fallbacks or zero substitutions.
- [x] **G.** Synthetic test data is clearly flagged with `TEST_ONLY_SYNTHETIC` metadata tags.
- [x] **H.** Generative AI possesses zero authority to act as a numerical calculation oracle.
- [x] **I.** Fully compatible with all upstream regulatory, temporal, data model, and engineering specifications.

---

## 34. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX QA Working Group | Initial formal specification of the Calculation Test Corpus (`EC-TEST-001`). |

---
**Status Declaration:** `TEST_CORPUS_ALIGNED_WITH_OPEN_ISSUES`
