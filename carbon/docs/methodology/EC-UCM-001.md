# ENERIX Carbon — Universal Emission Calculation Model (UCM)
## Document ID: EC-UCM-001
**Title:** ENERIX Carbon Universal Emission Calculation Model — Formal Calculation Contract Specification  
**Version:** 1.1.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Architecture Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DOMAIN-MODEL-001` (Formal Domain Model Specification)
- `EC-CALCULATION-MODEL-CATALOG-001` (Calculation Model Catalog)
- `ADR-000-CONTEXT-REHYDRATION` (Master Context Rehydration ADR)
- `ENERIX-CARBON-BASE-LOGIC-001.md`
- `ENERIX-CARBON-GOVERNING-FRAMEWORK-001.md`

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-UCM-001` |
| **Document Title** | ENERIX Carbon Universal Emission Calculation Model Specification |
| **Artifact Class** | Formal Engineering Methodology & Calculation Contract |
| **Version** | `1.1.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Carbon Domain Architecture & Standards Committee |
| **Repository Location** | `/carbon/docs/methodology/EC-UCM-001.md` |
| **Machine-Readable Spec** | `/carbon/docs/methodology/EC-UCM-001.yaml` |

---

## 2. Purpose

The purpose of **EC-UCM-001** is to formally establish the **Universal Calculation Contract and Calculation Semantics** that all deterministic calculation execution engines in ENERIX Carbon MUST implement.

This document defines **what a valid greenhouse gas emission calculation IS**, specifying:
1. The invariant pipeline stages from raw input ingestion to immutable provenance recording.
2. The exact contract boundaries between Activity Data, Unit Normalization, Methodologies, Emission Factors, GWPs, Calculation Models, and Evidence artifacts.
3. The deterministic execution rules, multi-gas handling, aggregation logic, allocation constraints, and failure behaviors.

> **CRITICAL ARCHITECTURAL DIRECTIVE:** This document governs the specification of calculation validity. It does NOT implement engine code, create backend services, or alter legal source documents. The deterministic execution engine must conform to this contract without exception.

---

## 3. Scope

This specification applies platform-wide across all sectors, greenhouse gas species, inventory scopes, and calculation model classes within ENERIX Carbon:

- **Sector Coverage:** Energy Generation & Supply, Transport, Construction & Building Materials, Industrial Processes & Product Use (IPPU), Agriculture/Forestry/Land Use (AFOLU), Waste & Wastewater Management, Industrial Parks, Commercial Buildings, Data Centers.
- **Gas Species:** Carbon Dioxide ($CO_2$), Methane ($CH_4$), Nitrous Oxide ($N_2O$), Hydrofluorocarbons ($HFCs$), Perfluorocarbons ($PFCs$), Sulfur Hexafluoride ($SF_6$), Nitrogen Trifluoride ($NF_3$).
- **Accounting Scopes:** Direct Emissions (Scope 1), Energy Indirect Emissions (Scope 2), Value Chain Indirect Emissions (Scope 3), Project Reductions / Offsets.
- **Model Classes:** MODEL-01 (`SIMPLE_FACTOR`), MODEL-02 (`FACTOR_WITH_CONVERSION`), MODEL-03 (`MULTI_GAS`), MODEL-04 (`PARAMETERIZED`), MODEL-05 (`COMPOSITE`), MODEL-06 (`DYNAMIC`), MODEL-07 (`PROJECT_REDUCTION`), MODEL-08 (`MASS_BALANCE` / Allocation), MODEL-09 (`MEASUREMENT_BASED`), MODEL-10 (`ENERGY_FLOW_CONVERSION`).

---

## 4. Governing Principles

ENERIX Carbon is an auditable, regulatory-aware carbon engineering system governed by the strict **Authoritative Sequence**:

$$\text{Human Intent} \rightarrow \text{Domain Knowledge} \rightarrow \text{Context Engineering} \rightarrow \text{Engineering Judgment} \rightarrow \text{Formal Specification} \rightarrow \text{Domain Model} \rightarrow \text{Regulatory Applicability} \rightarrow \text{Methodology} \rightarrow \text{Calculation Model} \rightarrow \text{Calculation Contract} \rightarrow \text{Deterministic Engine} \rightarrow \text{Result} \rightarrow \text{QA/QC} \rightarrow \text{Evidence/Provenance} \rightarrow \text{Report}$$

### Core Invariants:
1. **AI is NOT Calculation Authority (LAW-006):** Artificial Intelligence models (LLMs) are strictly advisory. Arithmetic calculation execution is 100% deterministic code.
2. **Legal Source is NOT an AI Answer (LAW-001):** Legal inventory obligations must be evaluated against structured, temporal legal rules derived from official government instruments.
3. **No Silent Invented Values (LAW-007, LAW-008):** The engine MUST NOT invent calculation formulas, default emission factors, or GWP values, nor silently override parameters or substitute missing inputs with zeros.
4. **Historical Immutability (LAW-005):** Executed calculation runs freeze all underlying factors, parameters, and rules into an unalterable historical snapshot.

---

## 5. Terminology

| Term | Formal Specification Definition |
| :--- | :--- |
| **Activity Data (AD)** | Quantified measurement of human activity resulting in GHG emissions or removals (e.g. kWh electricity, liters diesel, tonnes cement). |
| **Emission Factor (EF)** | Coefficient relating activity data to GHG emissions produced per physical or energy unit. |
| **Global Warming Potential (GWP)** | Factor describing the radiative forcing impact of one mass unit of a given GHG relative to $CO_2$ over a defined timescale (e.g. 100-year horizon). |
| **Calculation Model** | Abstract mathematical structure defining input requirements, formulas, process parameters, and output schemas (MODEL-01 through MODEL-10). |
| **Methodology** | Approved technical MRV guideline (e.g., MOIT Circular 38/2023, ISO 14064-1) defining required activity data, factors, and applicable calculation models for specific sectors. |
| **Regulatory Rule** | Granular applicability condition derived from official legal instruments (Decree 06/2022, Decision 42/2026/QĐ-TTg) evaluating mandatory reporting thresholds and dates. |
| **Evidence** | Verifiable physical or digital artifact (utility bill, meter log, CEMS lab test) validating the authenticity of activity data or parameters. |
| **Provenance** | Immutable lineage trace connecting calculated emissions outputs back to raw activity data, factors, methodologies, legal rules, and physical evidence. |
| **CalculationRun** | Formal domain entity recording an executed calculation instance, its input snapshot, results, engine version, and cryptographic audit hash. |
| **Raw Unit vs. Normalized Unit** | Raw unit is the native unit of input ingestion (e.g. kWh, mmBTU, gallons); Normalized unit is the standard SI/MKS unit required by the calculation model (e.g. TJ, tonnes, $m^3$). |

---

## 6. Authority Boundaries

To eliminate authority collapse, ENERIX Carbon strictly separates domain responsibilities across distinct operational layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          1. LEGAL AUTHORITY                            │
│  Owns: Official Law, Decree, Prime Minister Decision, Circular texts   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Derives
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      2. REGULATORY APPLICABILITY                       │
│  Owns: Temporal evaluation of facility obligation & thresholds         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Binds
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      3. METHODOLOGY AUTHORITY                          │
│  Owns: Approved MRV methods, required activity units, gas scope bounds │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Defines
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      4. CALCULATION MODEL CONTRACT                     │
│  Owns: Abstract mathematical formula, variable contracts, constraints  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Feeds Parameters
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    5. FACTOR & PARAMETER REGISTRY                      │
│  Owns: Versioned EF datasets, IPCC GWP datasets, NCV tables            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Executes
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    6. DETERMINISTIC EXECUTION ENGINE                   │
│  Owns: Pure arithmetic evaluation, unit conversion, snapshot freezing  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Validates & Audits
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        7. QA/QC & PROVENANCE                           │
│  Owns: Verification rules, evidence linkage, audit hash generation     │
└────────────────────────────────────────────────────────────────────────┘
```

> **AI Role:** AI assistance is strictly confined to retrieval, text search, user navigation, and draft suggestions. AI NEVER has authority over calculation execution, regulatory status, or factor selection.

---

## 7. Universal Calculation Contract

Every calculation executed within ENERIX Carbon follows a 13-stage deterministic pipeline:

$$\text{INPUTS} \rightarrow \text{VALIDATION} \rightarrow \text{NORMALIZATION} \rightarrow \text{PARAMETERS} \rightarrow \text{FORMULA/MODEL} \rightarrow \text{EXECUTION} \rightarrow \text{GAS RESULTS} \rightarrow \text{GWP APPLICATION} \rightarrow \text{CO2e RESULT} \rightarrow \text{QA/QC} \rightarrow \text{PROVENANCE} \rightarrow \text{EVIDENCE} \rightarrow \text{RESULT VERSION}$$

### Stage-by-Stage Specification:

1. **INPUTS Stage:** Ingests `CanonicalCalculationInput` containing raw activity values, facility attributes, reporting period, and metadata refs.
   - *Determinism:* 100% Deterministic. *Human Approval:* Not required if pre-approved.
2. **VALIDATION Stage:** Verifies input completeness, non-negative bounds, date validity, and structural compliance against `EC-DOMAIN-MODEL-001`.
   - *Failure Action:* Halts execution with explicit validation error. Silent fallback prohibited.
3. **NORMALIZATION Stage:** Converts raw activity units into standard calculation model units using versioned unit conversion rules.
   - *Determinism:* 100% Deterministic arithmetic.
4. **PARAMETERS Stage:** Fetches verified process parameters (e.g. NCV, Carbon Content, Oxidation Factor) from versioned registries.
   - *Rule:* Missing parameters trigger `MISSING_PARAMETER` error.
5. **FORMULA / MODEL Stage:** Binds normalized inputs to the specified `CalculationModel` contract (MODEL-01 to MODEL-10).
6. **EXECUTION Stage:** Evaluates numerical expressions using pure arithmetic.
   - *Authority:* Deterministic Execution Engine.
7. **GAS RESULTS Stage:** Computes mass quantities for each active gas species ($CO_2, CH_4, N_2O$, etc.) in metric tonnes.
8. **GWP APPLICATION Stage:** Multiplies individual gas mass quantities by corresponding GWP factors from the bound GWP dataset snapshot.
9. **CO2e RESULT Stage:** Aggregates gas-specific $CO_2e$ values into total facility/activity emissions ($tCO_2e$).
10. **QA/QC Stage:** Executes range validation, unit consistency checks, and arithmetic sanity verification.
11. **PROVENANCE Stage:** Generates the unbroken audit trail linking input data, factors, formulas, and rules.
12. **EVIDENCE Stage:** Links verified physical evidence records to the calculation run.
13. **RESULT VERSION Stage:** Freezes all parameters into an immutable `CalculationRun` snapshot with SHA-256 audit signature.

---

## 8. Canonical Input Contract

A valid calculation input object MUST conform to the `CanonicalCalculationInput` specification:

```yaml
CanonicalCalculationInput:
  # Identifiers & Scope
  facility_id: "string (REQUIRED)"
  reporting_period: "string (REQUIRED, e.g. '2025-Q1' or '2025-01-01/2025-12-31')"
  source_category: "string (REQUIRED, e.g. 'Stationary Combustion')"
  scope: "enum [SCOPE_1, SCOPE_2, SCOPE_3] (REQUIRED)"

  # Raw Activity Input
  activity_data_id: "string (OPTIONAL, ref to ActivityData.id)"
  activity_data_value: "number (REQUIRED, must be >= 0 unless reduction model)"
  activity_data_unit: "string (REQUIRED, e.g. 'kWh', 'liters', 'tonnes')"

  # Model & Methodology Binding
  methodology_id: "string (REQUIRED, ref to Methodology.id)"
  calculation_model_id: "string (REQUIRED, ref to CalculationModel.id)"

  # Factor & Parameter References
  emission_factor_id: "string (CONDITIONAL, required for factor-based models)"
  gwp_dataset_id: "string (REQUIRED, ref to GwpDataset.id)"
  custom_parameters: "object (OPTIONAL, key-value map of process parameters)"

  # Legal & Evidence Binding
  regulatory_rule_id: "string (OPTIONAL, ref to RegulatoryRule.id)"
  evidence_ids: "array of strings (OPTIONAL, refs to Evidence.id)"

  # Version Control
  calculation_version: "string (REQUIRED, e.g. '1.0.0')"
```

---

## 9. Unit Normalization Contract

Unit normalization transforms native raw inputs into standard calculation units:

$$\text{Value}_{\text{normalized}} = \text{Value}_{\text{raw}} \times \text{Factor}_{\text{conversion}}$$

### Contract Rules:
1. **Source & Target Explicit Alignment:** Raw unit and target unit must belong to compatible dimension classes (e.g., Mass $\rightarrow$ Mass, Volume $\rightarrow$ Volume, Energy $\rightarrow$ Energy).
2. **Cross-Dimension Conversions:** Conversions requiring physical properties (e.g., Volume to Energy using Net Calorific Value $NCV$) MUST explicitly reference a versioned parameter object.
3. **Rounding & Precision:** Normalization preserves double-precision floating-point numbers ($64$-bit IEEE 754) during intermediate calculations. Arbitrary early rounding is strictly forbidden.
4. **Invalid Conversion Failure:** If no valid conversion rule exists between raw and target units, the engine MUST raise an `INVALID_UNIT` exception.

---

## 10. Methodology Contract

The `Methodology` object acts as the technical orchestrator between regulatory requirements and mathematical calculation models.

### Responsibilities of Methodology:
- Specifies supported calculation scopes (Scope 1, Scope 2, Scope 3).
- Identifies mandatory gas species to be evaluated.
- Binds approved `CalculationModel` IDs (e.g. `MODEL-03`).
- Mandates required activity data units and Tier quality thresholds (Tier 1 Default, Tier 2 National, Tier 3 Facility-specific).
- References default national or IPCC emission factor registries.

---

## 11. Emission Factor Contract

An `EmissionFactor` entity defines physical emission intensity:

$$\text{EF} = \frac{\text{Mass of GHG Emitted}}{\text{Unit of Activity Data}}$$

### Contractual Requirements:
- **Version & Temporal Bounds:** Must specify `valid_from` and `valid_to` dates. Factors outside the reporting period cannot be applied.
- **Source Authority:** Must state source publication (e.g. MONRE Annual Grid Factor, IPCC EFDB, MOIT Circular 38/2023).
- **Tier Classification:** Must explicitly declare data quality tier (`TIER_1`, `TIER_2`, `TIER_3`).
- **Gas Specificity:** Must identify target gas species or indicate `MULTI_GAS` structure.

---

## 12. GWP Contract

Global Warming Potential (GWP) values normalize non-$CO_2$ gases into Carbon Dioxide Equivalent ($CO_2e$):

$$\text{Emissions}_{\text{CO2e}} = \text{Mass}_{\text{gas}} \times \text{GWP}_{\text{gas}}$$

### Contractual Requirements:
- **Registry Reference:** Calculations MUST reference an explicit, versioned `GwpDataset` (e.g. `IPCC_AR5_100YR`, `IPCC_AR6_100YR`).
- **Fixed Baseline:** $CO_2$ GWP is identically $1.0$.
- **Historical Immutability:** Once a calculation run is completed, the GWP values used are frozen in the snapshot and cannot be modified by subsequent GWP dataset updates.

---

## 13. Formula / Model Contract

The mathematical structure of a calculation model is represented as a formal contract containing:
- `model_id`: Canonical ID (`MODEL-01` through `MODEL-10`).
- `formula_expression`: Inspectable symbolic expression.
- `input_variables`: Declared variable symbols.
- `parameter_requirements`: Required constants or parameters.
- `output_variables`: Output gas and total $CO_2e$ variables.
- `constraints`: Mathematical bounds (e.g. non-negativity, mass balance closure).

---

## 14. Multi-Gas Contract

Calculations MUST evaluate emissions at the individual gas species level prior to $CO_2e$ aggregation:

$$\begin{aligned}
E_{CO2} &= AD \times EF_{CO2} \\
E_{CH4} &= AD \times EF_{CH4} \\
E_{N2O} &= AD \times EF_{N2O}
\end{aligned}$$

The engine MUST retain individual gas mass quantities in metric tonnes alongside total $CO_2e$. Gas quantities MUST NEVER be discarded or overwritten during calculation execution.

---

## 15. CO2e Aggregation Contract

Total Carbon Dioxide Equivalent ($tCO_2e$) is calculated by summing the GWP-weighted contributions of all evaluated gas species:

$$\text{Total } CO_2e = \sum_{g \in \text{Gases}} \left( E_g \times \text{GWP}_g \right)$$

### Aggregation Rules:
1. **Unit Uniformity:** Individual gas masses $E_g$ must be normalized to metric tonnes ($t$) before applying GWP.
2. **Gas Preservation:** The output object MUST report both gas-level breakdown ($tCO_2, tCH_4, tN_2O$) and aggregated $tCO_2e$.
3. **Precision:** Aggregated $tCO_2e$ is maintained at full double-precision until final reporting output formatting.

---

## 16. Composite Calculation Contract

A `COMPOSITE` calculation (`MODEL-05`) aggregates multiple child sub-calculations across equipment, process stacks, or facility sub-units:

$$E_{\text{composite}} = \sum_{i=1}^{N} E_{\text{child}, i}$$

### Invariants for Composite Calculations:
- **Child Traceability:** Every child sub-calculation $E_{\text{child}, i}$ retains its own complete, independent `CalculationRun` record and provenance.
- **Parent Lineage:** The parent composite calculation run records explicit references to all child `CalculationRun` IDs (`child_run_ids`).
- **Unit Homogeneity:** All child outputs MUST be normalized to $tCO_2e$ prior to summation.

---

## 17. Dynamic Calculation Contract

A `DYNAMIC` calculation (`MODEL-06`) models time-dependent decay, stock accumulation, or state-based emissions over sequential periods:

$$E_t = f(S_t, k, r)$$

where $S_t$ is accumulated material stock at time $t$, $k$ is decay constant, and $r$ is generation rate.

### Invariants for Dynamic Calculations:
- **State Preservation:** State variables ($S_t$) must be versioned and immutably recorded for each time step.
- **Reproducibility:** Re-evaluating period $t$ requires loading the verified state snapshot from period $t-1$.
- **Explicit Time Steps:** Time intervals ($\Delta t$) must be explicitly defined (annual, monthly).

---

## 18. Reduction / Project Calculation Contract

A `PROJECT_REDUCTION` calculation (`MODEL-07`) quantifies net greenhouse gas emission reductions achieved by carbon offset or mitigation projects:

$$\text{Net ER} = E_{\text{baseline}} - E_{\text{project}} - E_{\text{leakage}}$$

### Invariants for Reduction Calculations:
- **Dual Provenance:** Baseline emissions ($E_{\text{baseline}}$) and project emissions ($E_{\text{project}}$) must be calculated using their respective, fully verified calculation contracts.
- **Leakage Accounting:** Off-site leakage emissions ($E_{\text{leakage}}$) must be explicitly accounted for or formally verified as zero ($0$).
- **Non-Negative Claim:** If $E_{\text{project}} + E_{\text{leakage}} > E_{\text{baseline}}$, Net ER is zero ($0$) or reported as net increase; negative reduction credits cannot be generated.

---

## 19. Allocation Contract

An `ALLOCATION` calculation (`MODEL-08` / Mass Balance) partitions shared facility or process emissions across co-products, business units, or sub-facilities:

$$E_i = E_{\text{total}} \times f_{\text{allocation}, i} \quad \text{where} \quad \sum_{i=1}^{M} f_{\text{allocation}, i} = 1.0$$

### Allocation Rules:
1. **Reconciliation Guarantee:** The sum of all allocated emissions MUST equal 100% of the source total ($E_{\text{total}}$). Silent emission leakage or double-counting is prohibited.
2. **Allocation Basis:** The allocation factor $f_{\text{allocation}, i}$ must be derived from an approved physical basis (mass, energy content, volume) or economic value basis.
3. **Residual Reconciliation Check:** The engine verifies $\left| E_{\text{total}} - \sum E_i \right| < 10^{-6}$.

---

## 20. Intensity Contract

An `INTENSITY` calculation computes specific emission performance per unit of activity output:

$$\text{Intensity} = \frac{\text{Absolute Emissions } (tCO_2e)}{\text{Activity Output } (\text{Physical Unit})}$$

### Contract Rules:
- **Non-Substitution:** Intensity metrics MUST NEVER replace absolute emissions reporting. Both absolute $tCO_2e$ and intensity values are presented concurrently.
- **Denominator Transparency:** The denominator unit (e.g. tonnes clinker, MWh generated, $m^2$ floor area) must be explicitly specified and verified.

---

## 21. Aggregation Contract

Aggregation combines calculated emission runs across temporal periods, facility boundaries, or organizational scopes:

$$E_{\text{aggregated}} = \sum_{k \in \text{Runs}} E_{\text{run}, k}$$

### Rules for Aggregation:
1. **Duplicate Prevention:** The engine must check for overlapping activity data periods or duplicate `CalculationRun` entries.
2. **Version Harmony:** All aggregated runs must use compatible methodology standards and scope definitions.
3. **Superseded Handling:** Superseded or invalidated calculation runs MUST be excluded from totals.

---

## 22. Validation Contract

Pre-calculation validation MUST be executed deterministically prior to calculation execution:

| Validation Rule ID | Validation Check | Failure Action |
| :--- | :--- | :--- |
| `VAL-001` | Required inputs present (`facility_id`, `activity_data_value`, `methodology_id`). | Raise `INVALID_INPUT` |
| `VAL-002` | Activity data value $\ge 0$ (unless reduction model). | Raise `INVALID_INPUT` |
| `VAL-003` | Raw unit compatible with target model unit. | Raise `INVALID_UNIT` |
| `VAL-004` | Emission factor present and valid for reporting period (`valid_from` $\le t \le$ `valid_to`). | Raise `MISSING_EMISSION_FACTOR` |
| `VAL-005` | GWP dataset reference valid and loaded. | Raise `MISSING_GWP` |
| `VAL-006` | Process parameters present and within physical bounds. | Raise `MISSING_PARAMETER` |
| `VAL-007` | Methodology compatible with facility sector and scope. | Raise `INCOMPATIBLE_METHODOLOGY` |
| `VAL-008` | Model constraints satisfied (e.g. mass balance closure). | Raise `MODEL_CONSTRAINT_VIOLATION` |

---

## 23. QA/QC Contract

Post-calculation QA/QC rules verify output integrity:
1. **Arithmetic Verification:** Re-evaluates mathematical formula using frozen snapshot parameters to confirm exact match.
2. **Range Outlier Check:** Compares output intensity against historical facility baseline or industry benchmark ranges ($\pm 3 \sigma$).
3. **Completeness Check:** Confirms all active gas species specified by the methodology are populated.
4. **Reconciliation Verification:** Verifies child-to-parent sums for composite and allocation models.

---

## 24. Provenance Contract

Every completed calculation run MUST generate a complete, traceable `ProvenanceRecord`:

```json
{
  "calculation_run_id": "RUN-2025-EVN-00192",
  "facility_id": "FAC-EVN-001",
  "reporting_period": "2025-Q1",
  "methodology_ref": "METH-MOIT-38-01 (Circular 38/2023/TT-BCT)",
  "regulatory_rule_ref": "RULE-DEC42-POWER-001 (Decision 42/2026/QĐ-TTg)",
  "calculation_model_ref": "MODEL-03 (MULTI_GAS)",
  "activity_data_snapshot": {
    "raw_value": 1500000,
    "raw_unit": "kWh",
    "normalized_value": 1500000,
    "normalized_unit": "kWh",
    "evidence_id": "EVID-BILL-2025-01"
  },
  "emission_factor_snapshot": {
    "ef_id": "EF-MONRE-GRID-2024",
    "value_CO2": 0.6712,
    "unit": "kg CO2 / kWh",
    "source": "MONRE Grid EF 2024"
  },
  "gwp_dataset_snapshot": {
    "dataset_id": "IPCC_AR5_100YR",
    "CO2": 1,
    "CH4": 28,
    "N2O": 265
  },
  "calculated_results": {
    "CO2_tonnes": 1006.8,
    "CH4_tonnes": 0.0,
    "N2O_tonnes": 0.0,
    "total_CO2e_tonnes": 1006.8
  },
  "engine_version": "1.1.0-det",
  "executed_at": "2026-09-16T07:13:00Z",
  "audit_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}
```

---

## 25. Evidence Contract

Evidence records store metadata for physical or digital artifacts substantiating activity data:
- `evidence_id`: Unique identifier (e.g. `EVID-BILL-2025-01`).
- `evidence_type`: `UTILITY_BILL`, `FUEL_INVOICE`, `METER_LOG`, `CALIBRATION_CERTIFICATE`, `LAB_TEST`, `PRODUCTION_RECORD`.
- `hash_signature`: SHA-256 hash of the uploaded document artifact.
- `verification_status`: `PENDING`, `VERIFIED`, `REJECTED`.

> **Evidence Rule:** Attaching evidence establishes auditable traceability; it does NOT alter the mathematical execution of the calculation contract.

---

## 26. Reproducibility and Versioning

To guarantee 100% historical reproducibility:
1. **Immutable Snapshot:** Once created, a `CalculationRun` record is append-only and read-only.
2. **Version Pinning:** Re-executing a historical run MUST use the exact `engine_version`, `methodology_version`, `emission_factor_snapshot`, and `gwp_dataset_snapshot` stored in the original run.
3. **Recalculation Protocol:** Modifying an input, factor, or methodology creates a NEW `CalculationRun` object that references the original run via `supersedes: "RUN-ORIGINAL-ID"`.

---

## 27. Calculation Lifecycle

A calculation run transitions through eight formal lifecycle states:

```
[DRAFT] ──> [DATA_REVIEW] ──> [READY] ──> [CALCULATING] ──> [CALCULATED]
                                                                  │
                                                                  ▼
[REPORTED] <── [APPROVED] <── [QA_REVIEW] <───────────────────────┘
```

### State Definitions:
- `DRAFT`: Raw input created; validation incomplete.
- `DATA_REVIEW`: Activity data and evidence undergoing review.
- `READY`: All inputs, factors, and parameters validated.
- `CALCULATING`: Deterministic engine executing formula.
- `CALCULATED`: Arithmetic complete; gas and $CO_2e$ results populated.
- `QA_REVIEW`: QA/QC outlier checks and reconciliation undergoing audit.
- `APPROVED`: Formal approval by authorized carbon auditor.
- `REPORTED`: Incorporated into official ministry inventory submission.
- *Exception States:* `BLOCKED` (validation failure), `NEEDS_RECALCULATION` (factor update), `SUPERSEDED` (replaced by newer run).

---

## 28. Error Contract

When validation or calculation execution fails, the engine MUST return a structured error response:

```json
{
  "error_code": "MISSING_EMISSION_FACTOR",
  "message": "No valid emission factor found for activity 'Diesel Combustion' in period '2025-Q1' under MOIT Circular 38/2023.",
  "facility_id": "FAC-EVN-001",
  "activity_data_id": "ACT-00129",
  "timestamp": "2026-09-16T07:13:00Z",
  "recoverable": false
}
```

### Standardized Error Codes:
`INVALID_INPUT`, `MISSING_PARAMETER`, `MISSING_EMISSION_FACTOR`, `MISSING_GWP`, `INVALID_UNIT`, `INCOMPATIBLE_METHODOLOGY`, `MODEL_CONSTRAINT_VIOLATION`, `REGULATORY_CONTEXT_MISSING`, `PROVENANCE_INCOMPLETE`, `EVIDENCE_INCOMPLETE`, `RECONCILIATION_FAILED`.

---

## 29. Authority Separation Matrix

| System Action | Primary Authority | Supporting Layer | Strictly Prohibited Authority |
| :--- | :--- | :--- | :--- |
| **Evaluate Mandatory Reporting** | Official Law / Prime Minister Decision | `RegulatoryRule` dataset | AI LLM Answer |
| **Select MRV Methodology** | Ministry Circular (MOIT, MOC, MARD) | `Methodology` registry | UI script / Client override |
| **Formulate Math Structure** | `EC-UCM-001` / Model Catalog | `CalculationModel` contract | Stochastic algorithm |
| **Supply Factor Values** | National / IPCC Factor Registry | Versioned EF dataset | AI Text Completion |
| **Execute Arithmetic** | Deterministic Execution Engine | 64-bit Floating Point CPU | AI LLM Math |
| **Audit & QA/QC** | Qualified Carbon Auditor | Automated QA/QC Rules | Unverified User Input |

---

## 30. MODEL-01..MODEL-10 Mapping Matrix

The Universal Calculation Model maps all 10 cataloged calculation models into a unified contract structure:

| Model ID | Model Name | Typical Domain Purpose | Core Formula Structure | Stateful? | Multi-Gas? | Uses EF? | Uses GWP? | Reconciles Allocation? |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **MODEL-01** | `SIMPLE_FACTOR` | Grid electricity, standard transport | $E = AD \times EF$ | No | Optional | Yes | Yes | N/A |
| **MODEL-02** | `FACTOR_WITH_CONVERSION` | Volumetric fuel to energy combustion | $E = AD \times EF \times Conv$ | No | Optional | Yes | Yes | N/A |
| **MODEL-03** | `MULTI_GAS` | Stationary/Mobile fuel combustion | $E_g = AD \times EF_g; CO_2e = \sum E_g GWP_g$ | No | Yes | Yes | Yes | N/A |
| **MODEL-04** | `PARAMETERIZED` | Wastewater treatment, chemical reactions | $E = f(AD, P_1, P_2, EF_{basis})$ | No | Yes | Yes | Yes | N/A |
| **MODEL-05** | `COMPOSITE` | Facility total across multiple stacks | $E_{total} = \sum E_{child, i}$ | No | Yes | Indirect | Indirect | Yes |
| **MODEL-06** | `DYNAMIC` | Landfill waste decay, forestry stock | $E_t = f(S_t, k, r)$ | **Yes** | Yes | Yes | Yes | N/A |
| **MODEL-07** | `PROJECT_REDUCTION` | Solar offset, energy efficiency projects | $ER = E_{base} - E_{proj} - E_{leak}$ | No | Yes | Yes | Yes | N/A |
| **MODEL-08** | `MASS_BALANCE` | Steel, refining, chemical balance | $E = Mass_{In}C_{In} - Mass_{Out}C_{Out}$ | No | Yes | Optional | Yes | **Yes** |
| **MODEL-09** | `MEASUREMENT_BASED` | CEMS stack continuous monitoring | $E = Conc \times Flow \times Hours$ | No | Yes | No | Yes | N/A |
| **MODEL-10** | `ENERGY_FLOW_CONVERSION` | Industrial boilers, thermal power | $E = Vol \times NCV \times CC \times OF \times \frac{44}{12}$ | No | Yes | Yes | Yes | N/A |

---

## 31. Canonical CalculationRun Entity

The canonical conceptual runtime object `CalculationRun` strictly mirrors the schema established in `EC-DOMAIN-MODEL-001.yaml`:

```yaml
CalculationRun:
  id: "string (Primary Key)"
  facility_id: "string (Foreign Key -> Facility.id)"
  reporting_period: "string"
  methodology_id: "string (Foreign Key -> Methodology.id)"
  model_id: "string (Foreign Key -> CalculationModel.id)"
  activity_data_snapshot: "object (Frozen ActivityData attributes)"
  emission_factor_snapshot: "object (Frozen EmissionFactor attributes)"
  gwp_dataset_snapshot: "object (Frozen GwpDataset attributes)"
  parameters_snapshot: "object (Frozen process parameters)"
  calculated_emissions:
    CO2_tonnes: "number"
    CH4_tonnes: "number"
    N2O_tonnes: "number"
    total_CO2e_tonnes: "number"
  executed_at: "datetime"
  engine_version: "string"
  audit_hash: "string (SHA-256 Signature)"
  supersedes: "string (Optional, Foreign Key -> CalculationRun.id)"
```

---

## 32. Why / How / Source Trace

Every material calculation result rendered in the UI or exported in reports MUST support the standard **Why / How / Source Trace**:

1. **WHY (Regulatory Basis):** Identifies why the calculation applies (e.g. *"Mandatory inventory under Decision 42/2026/QĐ-TTg, Sector: Energy, Threshold: >3,000 tCO2e/year"*).
2. **HOW (Calculation Mechanics):** Explains how the numerical output was derived (e.g. *"Executed MODEL-03 (MULTI_GAS) using formula $E_g = AD \times EF_g$ and IPCC AR5 100-year GWP values"*).
3. **SOURCE (Authoritative References):** Cites exact authoritative source documents for all inputs (e.g. *"Methodology: MOIT Circular 38/2023; Grid EF: MONRE 2024 Notice; Activity Evidence: Invoice #EVN-99120"*).

---

## 33. Testability Requirements

The Universal Calculation Contract requires formal test coverage across 14 deterministic execution suites:

1. **Deterministic Input/Output Verification:** Identical inputs produce identical outputs down to 6 decimal places.
2. **Unit Normalization Test Suite:** Tests conversion accuracy across all valid unit pairs (e.g. kWh $\rightarrow$ TJ, liters $\rightarrow m^3$).
3. **Multi-Gas Breakdown Test Suite:** Verifies individual gas mass calculation prior to GWP multiplication.
4. **GWP Dataset Switching Test Suite:** Validates output changes when toggling between IPCC AR4, AR5, and AR6 datasets.
5. **Composite Summation Test Suite:** Confirms parent total equals sum of child calculations.
6. **Dynamic State Transition Test Suite:** Verifies historical stock decay calculations across multi-year series.
7. **Allocation Reconciliation Test Suite:** Verifies $\sum E_i = E_{total}$ within $10^{-6}$ tolerance.
8. **Project Reduction Bounds Test Suite:** Ensures net reductions cannot exceed baseline emissions.
9. **Validation Error Suite:** Verifies engine raises exact expected error codes for missing or invalid inputs.
10. **Snapshot Immutability Test Suite:** Confirms modifying registry factors does not change historical run snapshots.
11. **Cryptographic Audit Hash Test Suite:** Confirms audit hash changes if any snapshot parameter is altered.
12. **Range Outlier Detection Suite:** Verifies QA/QC flags values exceeding $\pm 3\sigma$.
13. **Temporal Validity Bounds Suite:** Verifies factors outside effective date bounds are rejected.
14. **Zero Silent Fallback Verification:** Confirms missing factors or parameters halt execution without silent default substitution.

---

## 34. Worked Symbolic Examples

### Example A: Simple Factor (`MODEL-01`)
$$E_{\text{CO2e}} = AD \times EF$$
- $AD = 500,000 \text{ kWh}$
- $EF = 0.6712 \text{ kg CO2e / kWh} = 0.0006712 \text{ tCO2e / kWh}$
- $E_{\text{CO2e}} = 500,000 \times 0.0006712 = 335.60 \text{ tCO2e}$

### Example B: Factor with Conversion (`MODEL-02`)
$$E = AD \times NCV \times EF$$
- $AD = 10,000 \text{ liters Diesel}$
- $NCV = 0.000038 \text{ TJ / liter}$
- $EF = 74.1 \text{ tCO2e / TJ}$
- $E = 10,000 \times 0.000038 \times 74.1 = 28.158 \text{ tCO2e}$

### Example C: Multi-Gas Combustion (`MODEL-03`)
$$\begin{aligned}
E_{\text{CO2}} &= 1,000 \text{ tonnes Coal} \times 1.98 \text{ tCO2/t Coal} = 1,980 \text{ tCO2} \\
E_{\text{CH4}} &= 1,000 \text{ tonnes Coal} \times 0.00001 \text{ tCH4/t Coal} = 0.01 \text{ tCH4} \\
E_{\text{N2O}} &= 1,000 \text{ tonnes Coal} \times 0.0000015 \text{ tN2O/t Coal} = 0.0015 \text{ tN2O} \\
\text{Total } CO_2e &= (1,980 \times 1) + (0.01 \times 28) + (0.0015 \times 265) = 1,980 + 0.28 + 0.3975 = 1,980.6775 \text{ tCO2e}
\end{aligned}$$

---

## 35. Implementation Boundary

### In Scope for EC-UCM-001:
- Calculation contract definition and stage specifications.
- Input, output, normalization, and validation rules.
- Model mapping, multi-gas, GWP, allocation, and reduction logic.
- Provenance, evidence, QA/QC, and versioning contracts.
- Error codes and authority separation matrix.

### Out of Scope for EC-UCM-001:
- Execution engine TypeScript/JavaScript source code (governed by future `EC-CES-001`).
- Database schema migrations or backend API server implementations.
- UI component design or user interface layouts.
- Primary legal source document editing or legislative interpretation.
- Document OCR, PDF extraction, or AI prompt engineering algorithms.

---

## 36. Artifact Relationships

The hierarchical relationship between ENERIX Carbon specification artifacts:

```
                  ┌────────────────────────┐
                  │      EC-CONTEXT-001    │
                  └───────────┬────────────┘
                              │
                  ┌───────────┴────────────┐
                  │    EC-DOMAIN-MODEL-001 │
                  └───────────┬────────────┘
                              │
                  ┌───────────┴────────────┐
                  │EC-CALCULATION-MODEL-   │
                  │CATALOG-001             │
                  └───────────┬────────────┘
                              │
                  ┌───────────┴────────────┐
                  │      EC-UCM-001        │  <=== (THIS SPECIFICATION)
                  └───────────┬────────────┘
                              │
                  ┌───────────┴────────────┐
                  │      EC-CES-001        │  (Engine Execution Spec)
                  └───────────┬────────────┘
                              │
                  ┌───────────┴────────────┐
                  │      EC-TEST-001       │  (Test Corpus & Validation)
                  └───────────┬────────────┘
                              │
                  ┌───────────┴────────────┐
                  │  Deterministic Engine  │  (JavaScript Execution Code)
                  └────────────────────────┘
```

---

## 37. Controlled Open Issues

The following controlled ambiguities are explicitly identified and preserved for future methodology clarification:

| Issue ID | Domain Area | Description | Current Safe Boundary |
| :--- | :--- | :--- | :--- |
| `ISSUE-UCM-001` | Multi-Tenant CEMS | Allocation of shared continuous stack emissions across independent legal entities operating on a single industrial site. | Requires explicit `MODEL-08` mass balance allocation agreement signed by all site entities. |
| `ISSUE-UCM-002` | Mid-Period Regulatory Transition | Facility reporting period straddles the effective date of a new ministry circular (e.g. Dec 2024 transition). | Calculation MUST split activity data into pre-transition and post-transition sub-periods. |
| `ISSUE-UCM-003` | Biogenic Carbon Netting | Reporting conventions for biogenic $CO_2$ emissions under national vs GHG Protocol standards. | Biogenic $CO_2$ is calculated and reported as a separate memo item, excluded from Scope 1 total $tCO_2e$. |

---

## 38. Acceptance Criteria

`EC-UCM-001` satisfies all formal acceptance criteria:

- [x] **A.** Defines one coherent universal calculation contract.
- [x] **B.** Represents MODEL-01 through MODEL-10 without modifying the core contract.
- [x] **C.** Activity Data is explicitly separated from physical Evidence.
- [x] **D.** Regulation is clearly separated from Methodology.
- [x] **E.** Methodology is clearly separated from Calculation Model.
- [x] **F.** Calculation Model is clearly separated from Calculation Engine code.
- [x] **G.** Emission Factors and GWPs are supplied through versioned registries rather than hardcoded.
- [x] **H.** Historical calculations are 100% reproducible via frozen snapshots.
- [x] **I.** Material calculation results maintain unbroken provenance.
- [x] **J.** Material results support Why / How / Source traceability.
- [x] **K.** Multi-gas calculations preserve individual gas mass results.
- [x] **L.** $CO_2e$ aggregation logic is explicitly defined.
- [x] **M.** Composite and allocation models preserve child-level traceability.
- [x] **N.** Dynamic models have explicit state and time step semantics.
- [x] **O.** Allocation models enforce 100% reconciliation to source totals.
- [x] **P.** Intensity metrics remain strictly distinct from absolute emissions.
- [x] **Q.** Validation failures are explicit with defined error codes.
- [x] **R.** Missing authoritative data triggers controlled failure rather than silent substitution.
- [x] **S.** QA/QC rules are defined independently from mathematical formulas.
- [x] **T.** Document does not invent unbacked regulatory or scientific facts.
- [x] **U.** Fully aligned with `EC-CONTEXT-001`, `EC-DOMAIN-MODEL-001`, and `EC-CALCULATION-MODEL-CATALOG-001`.
- [x] **V.** No implementation code introduced as a substitute for formal specification.
- [x] **W.** Open ambiguities explicitly cataloged in Controlled Open Issues.

---

## 39. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Architecture Team | Initial draft skeleton. |
| `1.1.0` | 2026-09-16 | ENERIX Domain Architecture | Complete formal specification of Universal Emission Calculation Model contract (`EC-UCM-001`). |

---
**Status Declaration:** `UCM_SPECIFICATION_ALIGNED_WITH_OPEN_ISSUES`
