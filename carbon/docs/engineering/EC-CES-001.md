# ENERIX Carbon — Deterministic Calculation Engine Specification
## Document ID: EC-CES-001
**Title:** ENERIX Carbon Deterministic Calculation Engine Specification — Formal Engine & Execution Contract  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Engineering & Systems Architecture Committee  
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
- `EC-CALCULATION-MODEL-CATALOG-001.yaml` (Calculation Model Catalog)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-CES-001` |
| **Document Title** | ENERIX Carbon Deterministic Calculation Engine Specification |
| **Artifact Class** | Formal Core Engine & Execution Contract |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Carbon Engineering & Architecture Board |
| **Repository Location** | `/carbon/docs/engineering/EC-CES-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-CES-001** is to define the canonical architecture and execution contract for the ENERIX Carbon deterministic calculation engine.

In corporate greenhouse gas inventory systems, calculations must be completely transparent, fully auditable, and scientifically irreproducible under strict peer-review criteria. The platform mandates that the execution of calculations is governed by a **deterministic mathematical engine**, strictly separating statutory rules and registries from calculation runtime logic. 

**Generative AI is NOT a calculation authority.** AI models are strictly barred from participating in or modifying mathematical computations, acting solely as advisory or retrieval assistants outside the trust boundary.

---

## 3. Scope

This specification governs the core input contracts, pipeline execution phases, error conditions, validation matrices, snapshot standards, and reproducibility criteria of the calculation engine.

### In Scope:
- The canonical `CalculationRequest` schema and input structure.
- The 14-stage execution pipeline (context resolution, validation, unit normalization, parameter mapping, model routing, calculations, and snapshot freezing).
- Detailed model execution contracts for `MODEL-01` to `MODEL-10`.
- Multi-gas conversions, EF and GWP query execution, composite sub-calculations, allocations, intensities, and child aggregation lineage.
- Idempotency boundaries, immutable result lifecycles, and cryptographic snapshot hashing.

### Out of Scope:
- Concrete programming language syntax (e.g., specific JavaScript/TypeScript function implementations).
- Database physical schema queries, indexing, or transaction logs.
- Direct statutory rule interpretation (handled exclusively by `EC-RRM-001` / `EC-MTH-001`).
- User interface (UI) rendering, report generation templates, or client API protocols.

---

## 4. Engine Principles

The ENERIX Carbon calculation engine is anchored in ten deterministic pillars:

1. **Strict Determinism:** For any given set of frozen inputs, matched factors, and calculation parameters, the engine must produce identical mathematical outputs down to the defined decimal precision.
2. **Complete Auditable Reproducibility:** Historical calculations must be reconstructible at any time. The engine achieves this by querying isolated, write-once snapshots rather than active registries.
3. **Fail-Explicitly (No Silent Fallbacks):** Any missing data, unit incompatibility, or validation failure must abort the run immediately and return explicit, categorized error payloads.
4. **Unit-Aware Dimensional Verification:** Calculations require strict, dimensional verification of units across inputs, emission factors, and output results.
5. **Separation of Concerns:** The calculation engine possesses zero authority to interpret legislation, alter emission factor values, or modify GWP parameters. It acts as a deterministic executor of already-resolved contracts.
6. **Side-Effect Control:** Executing a calculation must never alter the state of any central registry, user session parameter, or other historical run records.
7. **Gas Species Isolation:** Gas calculations must remain segregated down to individual chemical components ($CO_2$, $CH_4$, $N_2O$, etc.) before equivalent carbon ($CO_2e$) is derived.
8. **Lineage Preservation:** Aggregations and composite models must preserve raw child records and intermediate math steps to enable deep auditor drill-downs.
9. **Zero-AI Dependency:** AI components may help retrieve and normalize source files, but they are physically isolated from the deterministic execution pipeline.
10. **Immutable Finalization:** Once a calculation run enters the `REPORTED` or `APPROVED` state, its results and snapshot are permanently frozen against any modifications.

---

## 5. Calculation Request

Every calculation event is initiated by a canonical **`CalculationRequest`** structure, defining all necessary input variables and metadata:

```yaml
CalculationRequest:
  calculation_run_id: "RUN-2026-0001"
  facility_id: "FAC-STEEL-01"
  reporting_period: "2025"
  activity_data_refs:
    - "ACT-STEEL-COAL-2025"
    - "ACT-STEEL-ELEC-2025"
  methodology_ref: "METH-MOC-STEEL-2024"
  calculation_model_ref: "MODEL-05"
  emission_factor_refs:
    - "EFR-VN-COAL-MOIT-2025"
    - "EFR-VN-GRID-MOIT-2025"
  gwp_dataset_ref: "GWP-IPCC-AR5-100Y-2013"
  parameter_refs:
    - "PARAM-STEEL-NCV-COAL"
  regulatory_context_ref: "REG-DECISION-501-2025"
  temporal_context_ref: "TEMP-REPORT-2025"
  evidence_refs:
    - "EV-STEEL-COAL-BILL-2025"
  engine_version: "1.0.0"
```

The request does not duplicate data points; instead, it uses immutable references to ensure structural integrity.

---

## 6. Execution Pipeline

The execution engine processes calculations through a strict, 14-stage deterministic pipeline. This pipeline structurally implements and unifies the execution sequence defined across `EC-UCM-001`, `EC-MTH-001`, and `EC-EFR-001`:

```
 [1. Context Resolution] ──► [2. Input Validation] ──► [3. Unit Normalization]
                                                             │
 [6. Structure Resolution] ◄── [5. Model Resolution] ◄── [4. Parameter Resolution]
             │
 [7. Deterministic Exec] ──► [8. Gas Mass Gen] ──► [9. GWP Application]
                                                           │
 [12. Provenance Trace] ◄── [11. QA/QC Audit] ◄── [10. CO2e Mass Gen]
             │
 [13. Snapshot Freeze] ──► [14. Finalization]
```

Each stage must complete with zero errors to permit transition to the subsequent phase.

---

## 7. Context Resolution

In **Stage 1 (Context Resolution)**, the engine resolves all physical entities and metadata schemas pointed to by the `CalculationRequest`.

- **Context Isolation:** The engine retrieves data records from active databases and registries using read-only operations.
- **Bound Check:** It verifies that all referenced entities (Facility, ActivityData, Methodology, EF, GWP, Regulatory Context) are structurally valid, active, and unlocked.

The engine does not evaluate legal applicability rules; it consumes resolved context and fails if dependencies are missing.

---

## 8. Input Validation

In **Stage 2 (Input Validation)**, the engine performs extensive deterministic validation before executing any mathematical logic. It must check for:

* **Missing Inputs:** Aborts if required activity data, EF, GWP, or parameters are absent.
* **Invalid Numerics:** Aborts on non-numeric entries, negative values (where disallowed), or extreme outliers (outside methodology physical limits).
* **Dimensional Unit Incompatibilities:** Ensures that the activity data denominator matches the selected emission factor denominator (e.g., activity in `MWh` matched against an EF in $t\text{ }CO_2/MWh$).
* **Temporal Discrepancy:** Verifies that physical activity dates fall within the valid temporal boundaries $[t_{start}, t_{end})$ of the methodology and selected factors.
* **Provenance Gaps:** Rejects the run if referenced factors, GWPs, or methodologies lack necessary provenance validation metadata.

Any validation failure terminates execution immediately, triggering explicit error categories (defined in Section 22). Silent default fallbacks are strictly prohibited.

---

## 9. Unit Normalization

In **Stage 3 (Unit Normalization)**, the engine resolves physical unit scale differences by converting raw input metrics into methodology-defined canonical units:

$$\text{Raw Value } (u_{source}) \xrightarrow{\text{Normalization Equation}} \text{Normalized Value } (u_{target})$$

- **Conversion Registry:** The engine uses pre-approved, immutable physical conversion factors (e.g., $1\text{ liter of gasoline} = 0.00075\text{ metric tons}$).
- **Conversion Lineage:** The engine retains the scale adjustment parameters, conversion equations, and source constants within the metadata execution trace to prevent round-off audit discrepancies.

---

## 10. Parameter Resolution

In **Stage 4 (Parameter Resolution)**, the engine maps methodology parameters and constant references to their actual values:

- **Source Precedence:** Resolves parameters in strict hierarchy order:
  1. *Facility-Specific parameters:* Derived from actual laboratory tests or localized measurements (IPCC Tier 3 / Circular Tier A).
  2. *Regional/National constants:* Sourced from official ministerial registries (Tier B).
  3. *Global default values:* Sourced from IPCC databases (Tier C).
- **Client Separation:** Arbitrary parameters submitted dynamically by the client interface are blocked from overriding governed registry variables.

---

## 11. Model Resolution

In **Stage 5 (Model Resolution)**, the engine evaluates the calculation request to map the target calculation to its correct architectural execution model:

$$\text{Calculation Request} \longrightarrow \text{Methodology Requirements} \longrightarrow \text{Route to Model-01 \dots Model-10}$$

Routing is strictly deterministic, relying on metadata mappings within `/carbon/docs/methodology/EC-CALCULATION-MODEL-CATALOG-001.yaml`.

---

## 12. Model Execution Contracts

The engine implements and executes ten canonical, standardized models based on `EC-UCM-001` structures. The mathematical formulation, inputs, outputs, and validation rules for each model are formalized below.

### MODEL-01: Simple Factor Model
Used for direct coefficient scaling (e.g., grid electricity consumption).
* **Inputs:** Activity Data Value ($AD$), Unit ($u_{AD}$).
* **Parameters:** Emission Factor Value ($EF$), Unit ($u_{EF}$).
* **Mathematical Equation:**
  $$E = AD \times EF$$
* **Validation Constraint:** The denominator of $u_{EF}$ must be dimensionally equivalent to $u_{AD}$.
* **Output:** Mass of Greenhouse Gas ($E$).

### MODEL-02: Factor with Conversion Model
Enforces energy-to-mass or volumetric conversions before applying emission factor scales.
* **Inputs:** Physical Activity Data ($AD_{vol}$), Unit ($u_{vol}$).
* **Parameters:** Conversion Constant ($CC$, e.g., Density or Net Calorific Value), Emission Factor ($EF_{energy}$).
* **Mathematical Equation:**
  $$E = AD_{vol} \times CC \times EF_{energy}$$
* **Validation Constraint:** $CC$ conversion units must reconcile $u_{vol}$ with the energy denominator of $EF_{energy}$.

### MODEL-03: Multi-Gas Combustion Model
Applies multiple gas-specific factors to a single fuel activity parameter (e.g., stationary boiler coal burning emitting $CO_2$, $CH_4$, $N_2O$).
* **Inputs:** Fuel Consumption Activity Data ($AD$).
* **Parameters:** Array of gas-specific factors ($EF_{g}$ where $g \in \{CO_2, CH_4, N_2O\}$).
* **Mathematical Equation:**
  $$E_g = AD \times EF_g \quad \forall g$$
* **Validation Constraint:** All gas-specific factors must share an identical denominator unit.
* **Output:** A set of individual gas emissions $[E_{CO2}, E_{CH4}, E_{N2O}]$.

### MODEL-04: Parameterized (IPCC Tier 3) Model
Executes calculations where factors are dynamically calculated at run-time based on fuel quality parameters.
* **Inputs:** Raw Activity Data ($AD$), Parameter Inputs ($x_1, \dots, x_n$, e.g., carbon content, moisture fraction).
* **Parameters:** Governed formula metadata reference.
* **Mathematical Equation:**
  $$EF_{dynamic} = f(x_1, \dots, x_n)$$
  $$E = AD \times EF_{dynamic}$$
* **Validation Constraint:** Formula parameters must fall within physical boundaries (e.g., $0 \le \text{carbon content fraction} \le 1$).

### MODEL-05: Composite Model
Calculates hierarchical emissions by nesting and aggregating child processes (e.g., facility-wide iron production combining stationary combustion, purchased energy, and process calcination).
* **Inputs:** Array of child `CalculationRequests` ($CR_1, \dots, CR_n$).
* **Mathematical Equation:**
  $$E_{composite} = \sum_{i=1}^{n} \text{ExecuteEngine}(CR_i)$$
* **Validation Constraint:** Child runs must resolve to the same temporal and physical control boundary.
* **Lineage:** Sub-results, parameters, and intermediate steps must remain unflattened within the composite output.

### MODEL-06: Dynamic State-Transition Model
Models process emissions where chemical reactions or carbon depletion states evolve across multiple chronological time-steps (e.g., landfill methane decay curves).
* **Inputs:** Historical baseline activity, Time Steps ($t_0 \dots t_n$).
* **Parameters:** Decay constant ($k$), oxidation factor ($OX$).
* **Mathematical Equation:**
  $$S_{t} = S_{t-1} \times (1 - \text{decay\_rate}) + \text{Input}_t$$
  $$E_t = S_{t} \times \text{ReactionCoefficient} \times (1 - OX)$$
* **Validation Constraint:** Iteration loop state variables must remain versioned, immutable, and reproducible.

### MODEL-07: Project Reduction Model
Calculates carbon avoidance or sequestration offsets (e.g., energy efficiency project savings).
* **Inputs:** Baseline Calculation Request ($CR_{baseline}$), Project Calculation Request ($CR_{project}$).
* **Mathematical Equation:**
  $$E_{baseline} = \text{ExecuteEngine}(CR_{baseline})$$
  $$E_{project} = \text{ExecuteEngine}(CR_{project})$$
  $$\text{Net Reduction } (R) = E_{baseline} - E_{project}$$
* **Validation Constraint:** Baseline and Project scenarios must use identical boundary parameters and temporal horizons.

### MODEL-08: Mass Balance Model
Calculates emissions based on material flows entering and leaving the system boundary (e.g., limestone calcination carbon releases).
* **Inputs:** Mass of Inputs ($M_{in}$), Mass of Outputs ($M_{out}$), Carbon Fraction of Inputs ($C_{in}$), Carbon Fraction of Outputs ($C_{out}$).
* **Mathematical Equation:**
  $$E_{CO2} = (M_{in} \times C_{in} - M_{out} \times C_{out}) \times \frac{44}{12}$$
* **Validation Constraint:** Mass inputs must balance mathematically. Any unaccounted carbon output must trigger a validation warning.

### MODEL-09: Intensity Model
Calculates carbon intensity relative to production physical outputs (e.g., emissions per ton of crude steel manufactured).
* **Inputs:** Absolute Carbon Emissions ($E_{absolute}$), Physical Production Output ($P$).
* **Mathematical Equation:**
  $$I = \frac{E_{absolute}}{P}$$
* **Validation Constraint:** Production denominator ($P$) must be greater than zero. Absolute emissions must remain preserved in the parent entity.

### MODEL-10: Multi-Facility Aggregation Model
Consolidates emissions across separate corporate organizational boundaries or reporting periods.
* **Inputs:** Set of approved historical results ($R_1 \dots R_n$).
* **Mathematical Equation:**
  $$E_{total} = \sum_{j=1}^{n} R_j$$
* **Validation Constraint:** Prevents double-counting by verifying that target facilities' boundary definitions and periods do not overlap.

---

## 13. Multi-Gas Execution

In **Stage 8 (Gas Result Generation)**, the engine separates carbon equivalence calculations into raw chemical components:

- The engine evaluates activity parameters to produce mass results for each distinct, physical greenhouse gas species ($CO_2$, $CH_4$, $N_2O$, $SF_6$, $NF_3$, $HFCs$, $PFCs$).
- Intermediate physical gas emissions are stored in the execution trace array and cannot be combined or discarded.

---

## 14. GWP Execution

In **Stage 9 (GWP Application)**, the engine converts raw chemical mass outputs into carbon equivalence ($CO_2e$):

$$\text{Gas Output } (E_g) \times \text{GWP}_g = \text{Equivalent CO2e Contribution } (E_{CO2e, g})$$

- **Source Trace:** Multipliers are queried dynamically from the GWP Dataset Registry (`EC-GWP-001`). Hard-coded GWP variables inside engine code are strictly banned.
- **CO2 Baseline:** The conversion multiplier for Carbon Dioxide ($CO_2$) is locked to exactly `1.0` in all datasets.

---

## 15. Emission Factor Execution

In **Stage 7 (Deterministic Execution)**, the engine fetches approved factor records from `EC-EFR-001` and applies them to normalized activity values.

- The engine matches spatial, temporal, activity, and methodology criteria against active registry variables.
- It extracts the exact numerical coefficient, scale, and denominator basis.
- If multiple factors match, or query results are ambiguous, the engine stops execution and flags a conflict.

---

## 16. Composite Execution

When executing **MODEL-05 (Composite)**, the engine retains hierarchical dependency lineages:

- The parent calculation executes child requests recursively.
- Child processes emit their own discrete `ResultSet` packages, detailing localized activity values, matched factors, and GWP selections.
- The parent composites these inputs to calculate facility totals, preserving child records within the trace array to prevent auditing blindspots.

---

## 17. Dynamic Execution

Under **MODEL-06 (Dynamic)**, calculations are executed across segmented chronological intervals:

- The engine structures iterative loops where previous time-step outputs form the basis of current calculation inputs.
- All interim decay states, parameters, and time increments must be recorded as versioned array entries to guarantee complete recalculation reproducibility.

---

## 18. Project Reduction Execution

Under **MODEL-07 (Reduction)**, baseline and active project calculations are kept strictly isolated:

- The baseline scenario is computed and snapshot as a separate, distinct run.
- The project scenario is computed and snapshot.
- The avoidance calculation computes net subtraction.
- The engine does not generate carbon credits or offsets directly; it outputs physical avoidance calculations.

---

## 19. Allocation Execution

Under **MODEL-08 (Mass Balance/Allocation)**, shared physical emissions are allocated across processes using explicit ratios:

$$\text{Allocated Result } (E_i) = E_{total} \times \text{Allocation Ratio } (R_i)$$

- **Mass Conservation (Reconciliation Check):** The engine executes verification audits to ensure the sum of allocated components matches the system total:
  $$\sum_{i=1}^{m} E_i = E_{total}$$
  Any discrepancies from numerical rounding must be corrected at the margin rather than silently creating or destroying carbon totals.

---

## 20. Intensity Execution

Under **MODEL-09 (Intensity)**, physical carbon density is computed alongside absolute inventory totals:

- Absolute emissions are calculated and snapshot.
- The production denominator (e.g., physical tons of steel or square meters of floor space) is normalized.
- Intensity ratios are calculated as secondary metrics. The absolute inventory remains the primary compliance result.

---

## 21. Aggregation Execution

Under **MODEL-10 (Aggregation)**, the engine consolidates historical, finalized calculation records:

- It extracts absolute carbon and gas-specific emissions from frozen snapshots.
- It performs direct additions across shared dimensions (e.g., aggregating Scope 1 stationary emissions across 10 corporate facilities).
- The engine validates that no facility boundaries overlap and no double-counting occurs.

---

## 22. Error Contract

The calculation engine uses explicit, typed exceptions. Any warning, validation failure, or arithmetic discrepancy aborts execution and returns a structured error envelope. Silent defaults or fallback coefficients are strictly prohibited.

| Error Category | Code | Description | Trigger Conditions |
| :--- | :--- | :--- | :--- |
| **Invalid Input** | `INVALID_INPUT` | Input activity data is non-numeric, negative, or physically impossible. | Out-of-bounds readings, alphabetical strings in activity inputs. |
| **Missing Parameter** | `MISSING_PARAMETER` | Required methodology parameter constant cannot be resolved. | Dynamic formula parameter or laboratory parameter is undefined. |
| **Missing Emission Factor** | `MISSING_EMISSION_FACTOR` | Registry query returns zero matched factors for target activity and date. | Date out of scope, invalid jurisdiction code. |
| **Missing GWP** | `MISSING_GWP` | Registry query returns zero matched multipliers for target gas and basis. | Required assessment report standard is not present in the database. |
| **Invalid Unit** | `INVALID_UNIT` | Dimensional incompatibility between inputs, conversions, and factors. | Matching activity in `liter` directly against an EF in $t/MWh$. |
| **Incompatible Methodology** | `INCOMPATIBLE_METHODOLOGY` | Calculation request parameters contradict methodology definitions. | Using Tier 3 parameterized logic when methodology forces Tier 1 default constants. |
| **Model Constraint Violation**| `MODEL_CONSTRAINT_VIOLATION`| Arithmetic inputs break mathematical model constraints. | Division by zero in Intensity models, negative inputs in mass balances. |
| **Regulatory Context Missing** | `REGULATORY_CONTEXT_MISSING` | Regulatory rule properties required for legal selection are unresolved. | Reporting year lacks matching ministerial mandate. |
| **Provenance Incomplete** | `PROVENANCE_INCOMPLETE` | Matched registry coefficients lack verified source and citation metadata. | Attempting to use a factor with `DRAFT` status. |
| **Evidence Incomplete** | `EVIDENCE_INCOMPLETE` | Input activity records lack required compliance verification files. | Missing commercial invoices or meter certificates. |
| **Reconciliation Failed** | `RECONCILIATION_FAILED` | Mass balance allocations or aggregations fail conservation checks. | Allocated outputs sum to a value different from system totals. |

---

## 23. QA / QC Audit

The engine executes automated validation audits during **Stage 11 (QA/QC)** before writing calculation outputs:

- **Input Completeness:** Verifies that all validation checks in Stage 2 completed successfully.
- **Unit Consistency:** Assures that dimensional analysis calculations balance perfectly.
- **Arithmetic Verification:** Re-evaluates formulas to confirm arithmetic accuracy.
- **Metadata Check:** Confirms that matching factors and GWP datasets have been logged in the execution trace.

Any failure in these checks triggers a `QA_QC_FAILED` state, halting the calculation and alerting the audit user.

---

## 24. Provenance Traceability

To fulfill third-party auditor standards, every calculation output must emit a complete metadata provenance record:

- `calculation_run_id`: Unique identifier tracking the specific execution run.
- `engine_version`: Version number of the calculation engine core.
- `model_version`: Active version number of the UCM model component.
- `methodology_version` / `ef_version` / `gwp_version`: Tracks referenced schemas and registries.
- `input_references`: Array of raw physical inputs and activity data records.
- `formula_reference`: Pointer to the exact mathematical model used (`MODEL-01` to `MODEL-10`).
- `source_evidence`: Array of physical verification documents (e.g., invoices, meter certificates).

---

## 25. Calculation Snapshot

In **Stage 13 (Snapshot Freeze)**, the engine serializes all matched inputs, constants, and metadata into a write-once, immutable **Calculation Snapshot**:

```yaml
CalculationSnapshot:
  snapshot_id: "SNAP-RUN-2026-0001"
  timestamp: "2026-09-16T08:51:48Z"
  raw_activity_data:
    - id: "ACT-STEEL-COAL-2025"
      value: 1250.5
      unit: "t"
  frozen_emission_factor:
    id: "EFR-VN-COAL-MOIT-2025"
    version: "1.0.0"
    value: 2.15
    unit_numerator: "t CO2"
    unit_denominator: "t"
  frozen_gwp_dataset:
    id: "GWP-IPCC-AR5-100Y-2013"
    version: "1.0.0"
    multipliers:
      CO2: 1.0
      CH4: 28.0
      N2O: 265.0
  reproducibility_hash: "sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
```

The system reproduces calculations using this snapshot, protecting audit trails against future registry updates.

---

## 26. Result Contract

The output of a successful calculation is returned in a structured, hierarchical **`ResultSet`** payload:

```yaml
ResultContract:
  calculation_run_id: "RUN-2026-0001"
  status: "CALCULATED"
  total_co2e: 2688.575
  gas_results:
    - gas: "CO2"
      mass: 2688.575
      unit: "t"
    - gas: "CH4"
      mass: 0.0
      unit: "t"
  provenance_trace:
    - step_id: "STEP-01"
      action: "MODEL-01_EXECUTION"
      output: 2688.575
  qa_qc_status: "PASSED"
```

The run status transitions through a strict sequence:

```
 [CALCULATED] ──► [QA_REVIEW] ──► [APPROVED] ──► [REPORTED]
```

Final report queries filter results by `REPORTED` or `APPROVED` status to prevent incomplete data from leaking into official disclosures.

---

## 27. Immutability

Historical results and their corresponding snapshots are strictly immutable. Any correction to activity inputs, emission factors, or GWP datasets requires creating a new calculation run, generating a new `calculation_run_id`. Modifying or overwriting finalized database records is strictly blocked.

---

## 28. Idempotency

The calculation engine enforces complete idempotency:

$$\text{ExecuteEngine}(I, V, C) \equiv \text{ExecuteEngine}(I, V, C)$$

For any given input values ($I$), versioned registry parameters ($V$), and context variables ($C$), re-executing the calculation must yield identical numeric results, regardless of when or where the execution occurs.

---

## 29. Security / Trust Boundary

The calculation engine executes within a secure trust boundary, meaning:
- It does not trust dynamic user inputs defining calculation rules, jurisdictions, or statutory parameters.
- It receives pre-verified, read-only context resolved in Stage 1.
- Regulatory rules and authority classifications must be verified in the database before entering the execution pipeline.

---

## 30. Observability / Audit Logs

To support compliance verification, the engine emits real-time observability logs, detailing:
* **Validation events:** Logged output of Input Validation checks.
* **Selection events:** Selection parameters for EF and GWP datasets.
* **Execution traces:** Step-by-step intermediate calculations and variables.
* **Error diagnostics:** Trace logs tracking any aborted runs.

These logs are strictly read-only and are archived alongside the calculation run.

---

## 31. Performance Boundary

The calculation engine is designed to run locally and natively within the application repository, minimizing execution latency. It avoids premature distributed processing, microservice communication, or external RPC queues, executing fast, database-native transactions.

---

## 32. Implementation Boundary

The engine governs the metadata structures, pipeline phases, validation constraints, and mathematical models of calculations.

### Under Engine Governance:
- `CalculationRequest` schema and context resolution.
- Mathematical execution of `MODEL-01` to `MODEL-10`.
- Validation checks, unit normalization equations, and error contracts.
- Provenance tracking, snapshot compilation, and execution observability logging.

### Outside Engine Boundaries:
- Database physical engines (PostgreSQL/Supabase).
- Direct user interface (UI) components or layout configurations.
- API endpoints, gateway routes, or authentication handlers.

---

## 33. Machine-Readable Model

The declarative schema configurations for validating calculation execution properties are located in the companion YAML document `/carbon/docs/engineering/EC-CES-001.yaml`.

---

## 34. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-CES-001` | Round-off Accumulation | Selecting standard rounding parameters (e.g., Banker's rounding) to prevent arithmetic discrepancies in large composite aggregations. | `EC-UCM-002` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-CES-002` | Allocation Boundary Seeding | Managing shared baseline values when calculating physical co-product allocations in industrial plants. | `EC-DM-002` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-CES-003` | Dynamic State Iterations | Defining memory boundary thresholds for dynamic recursive decay steps spanning more than 50 years. | `EC-CES-002` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |

---

## 35. Reconciliation

This Engine Specification is reconciled against the ENERIX Carbon baseline:
* Input entities and facility boundaries match the canonical definitions in `EC-DM-001`.
* Model formulas and error types align with `EC-UCM-001` and the calculation models.
* EF and GWP parameters match the registry schemas defined in `EC-EFR-001` and `EC-GWP-001`.
* Temporal logic enforces the left-closed, right-open interval boundaries defined in `EC-TEMP-001`.

No contradictions or conflicts have been detected.

---

## 36. Acceptance Criteria

`EC-CES-001` is accepted only if:

- [x] **A.** The calculation engine is strictly deterministic and reproducible.
- [x] **B.** The engine does not evaluate or interpret legal applicability rules.
- [x] **C.** The engine does not own or modify methodology schemas, emission factor registries, or GWP values.
- [x] **D.** Mathematical models `MODEL-01` to `MODEL-10` are representable and auditable.
- [x] **E.** Validation checks fail explicitly; silent fallback values are strictly blocked.
- [x] **F.** Unit normalization uses pre-approved, immutable conversion factors.
- [x] **G.** Physical gas species mass metrics are kept strictly separate from the equivalent carbon metric ($CO_2e$).
- [x] **H.** Aggregations and composite processes preserve physical child lineages.
- [x] **I.** Completed calculations and snapshots are strictly immutable.
- [x] **J.** Generative AI possesses zero authority to participate in or alter mathematical calculations.
- [x] **K.** Fully compatible with all upstream regulatory, temporal, data model, and methodology specifications.

---

## 37. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Engineering Working Group | Initial formal specification of the Deterministic Calculation Engine (`EC-CES-001`). |

---
**Status Declaration:** `CALCULATION_ENGINE_SPEC_ALIGNED_WITH_OPEN_ISSUES`
