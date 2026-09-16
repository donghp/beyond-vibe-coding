# ENERIX Carbon — Methodology Model & Registry (MMR)
## Document ID: EC-MTH-001
**Title:** ENERIX Carbon Methodology Model & Registry — Core Technical Specification  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Methodology & Environmental Accounting Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` (Canonical Domain Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping Specification)
- `EC-RRM-001` (Regulatory Rule Model Specification)
- `EC-TEMP-001` (Temporal Regulation Model Specification)
- `EC-SPM-001` (Sector Profile Model Specification)
- `EC-UCM-001` (Universal Calculation Model Specification)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-MTH-001` |
| **Document Title** | ENERIX Carbon Methodology Model & Registry Specification |
| **Artifact Class** | Formal Methodology Architecture & Technical Specification |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Environmental Accounting & Methodological Standards Board |
| **Repository Location** | `/carbon/docs/methodology/EC-MTH-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-MTH-001** is to define the canonical governed model and schema representation for carbon-accounting methodologies within the ENERIX Carbon platform.

A carbon-accounting methodology bridges raw legal applicability decisions and deterministic mathematical execution. It defines *how* a specific calculation must be mathematically constructed, structured, and validated to satisfy statutory compliance standards. This specification establishes a standardized, declarative metadata contract that guarantees that methodologies remain inspectable, version-controlled, trace-proven, and decoupled from the runtime execution codebase.

---

## 3. Scope

This specification governs the core schemas, structures, step sequences, validations, and relational dependencies of carbon-accounting methodologies.

### In Scope:
- Methodology Identity, metadata fields, and authority parameters.
- Logical step sequences, boundary mappings, and gas applicability boundaries.
- Activity data inputs, emission source classes, and parameter contracts.
- Explicit mapping rules binding methodologies to universal calculation models (`MODEL-01` to `MODEL-10`).
- Temporal lifecycle versioning rules and selection state representations.

### Out of Scope:
- Runtime AST execution engines or linter code.
- Specific database indexing plans, tables, or columns.
- Hard-coded numerical values for GWP constants or emission factors.
- Direct statutory rule interpretation (governed by `EC-KM-001` and `EC-RRM-001`).

---

## 4. Governing Principles

The Methodology Model is guided by five core architectural tenets:

1. **Methodological Isolation (The "No Arithmetic" rule):** A Methodology is a *declarative metadata definition*; it does not execute arithmetic calculations or hard-code formulas. Math execution is handled solely by `EC-UCM-001`.
2. **Bidirectional Lineage Trace:** Every methodology must maintain an unbroken traceable path, linking backwards to its legal authority (`EC-KM-001`) and forwards to its selected calculation model.
3. **Decoupling of Applicability and Construction:** Determining *whether* a regulation applies to a facility (`EC-RRM-001`) is isolated from determining *how* the emissions must be computed (`EC-MTH-001`).
4. **Historical Version Stability:** Once a methodology version is marked as `GOVERNED`, it is 100% immutable. Corrections spawn a new version, ensuring prior compliance audits remain perfectly reproducible.
5. **Species Segregation Integrity:** Methodologies concerning greenhouse gases must maintain a strict wall against criterion air pollutants to satisfy ISO 14064-1 compliance limits.

---

## 5. Methodology Identity

Every carbon-accounting methodology is defined by a unique, version-controlled identity container structured as follows:

- **`methodology_id`:** String identifier matching pattern `METH-{AUTHORITY}-{SECTOR_REF}-{YEAR}` (e.g., `METH-MOC-CEMENT-2024`).
- **`methodology_version`:** SemVer string (e.g., `1.0.0`) tracking structural updates.
- **`name`:** Official descriptive title (Vietnamese/English).
- **`description`:** Summary of methodological scope and operations.
- **`status`:** Active state indicators (`DRAFT`, `ACTIVE`, `SUPERSEDES`, `REPLACED`, `RETIRED`).
- **`authority_class`:** Statutory tier (`TIER_A` or `TIER_B`) derived from `EC-KM-001`.
- **`jurisdiction`:** ISO geographic or administrative code (e.g., `VN`).
- **`source_refs`:** Array of legal citations (e.g., `["Circular-13-2024-TT-BXD"]`).
- **`effective_from` / `effective_to`:** Dates defining statutory validity intervals.
- **`supersedes` / `superseded_by`:** References to predecessor/successor methodology entries.
- **`provenance`:** Structural logs detailing extraction metadata, authors, and review stamps.

---

## 6. Source Authority

Methodologies represent technical procedures originating from authorized legislative or scientific bodies:

* **Statutory / Legislative Circulars:** (e.g., MOIT Circular 38/2023, MOC Circular 13/2024). Holds absolute precedence inside national compliance pathways.
* **National Standards:** TCVN ISO 14064-1/2/3 guidelines.
* **International Frameworks:** IPCC 2006 Guidelines, GHG Protocol Corporate Standard. Used where local regulatory guidelines are missing.
* **Enterprise Custom Methods:** Governed corporate accounting standards (valid only for voluntary, non-compliance scopes).

Each parameter within the methodology must record its statutory weight:
- **`MANDATORY`:** Legally non-negotiable.
- **`RECOMMENDED` / `OPTIONAL`:** Standard alternatives where primary parameters are unmeasurable.
- **`REFERENCE`:** Baseline theoretical estimates.

---

## 7. RegulatoryRule Relationship (`EC-RRM-001`)

The division of labor between `RegulatoryRule` and `Methodology` is defined as:

$$\text{RegulatoryRule (RRM)} \implies \text{Applicability Decision} \implies \text{Binds} \implies \text{Methodology (MMR)}$$

| Specification | Core Semantic Boundary | Key Logical Question | Output |
| :--- | :--- | :--- | :--- |
| **`EC-RRM-001` (RRM)** | Statutory Law & Predicates | *"Is facility F legally subject to the national GHG inventory program?"* | `APPLICABLE` |
| **`EC-MTH-001` (MMR)** | Technical Construction & Steps | *"How must facility F calculate, validate, and report its emissions?"* | `MethodologySelection` |

---

## 8. CalculationModel Relationship (`EC-UCM-001`)

Methodologies select and parameterize existing calculation model contracts but do not fork them:

$$\text{Methodology (MMR)} \longrightarrow \text{Binds} \longrightarrow \text{UCM CalculationModel (MODEL-01..10)}$$

The methodology defines the *formula parameters* (e.g., fuel quantity, calorific values, oxidation factors), while the universal calculation engine executes the formulas using the standard mathematical types of `EC-UCM-001`.

---

## 9. Applicability

A methodology has strict applicability metadata filters to prevent calculation mismatches:

- **Sector / Subsector:** (e.g., Cement / Clinker production).
- **Facility Type:** (e.g., Coal-fired thermal power utility).
- **Activity / Process Type:** (e.g., Stationary combustion, process decarbonation).
- **Gas Species:** (e.g., $CO_2$ only vs. $CO_2 + CH_4 + N_2O$).
- **Reporting Period / Jurisdiction:** The valid temporal and administrative context.

---

## 10. Method Step Model

To support transparent UI step-guiding and auditability, a methodology is structured as an inspectable sequence of declarative steps:

```
METHOD_STEP_SEQUENCE (METH-MOC-CEMENT-2024)
 ├── STEP_01: DEFINE_INVENTORY_BOUNDARIES (Facility gate, clinker kiln process)
 ├── STEP_02: IDENTIFY_EMISSION_SOURCES (SRC-KILN-01, SRC-GRINDER-02)
 ├── STEP_03: COLLECT_ACTIVITY_DATA (Fossil fuel quantities, limestone inputs)
 ├── STEP_04: APPLY_NORMALIZATION (Convert mass metrics to wet/dry basis)
 ├── STEP_05: SELECT_METHODOLOGICAL_TIER (Tier 3 fuel testing vs. Tier 1 defaults)
 ├── STEP_06: BIND_CALCULATION_MODEL (MODEL-10 Energy Flow Contract)
 ├── STEP_07: APPLY_EMISSION_FACTORS (Retrieve valid MONRE regional factors)
 ├── STEP_08: APPLY_GWP_CONVERSIONS (IPCC AR5 CO2e multipliers)
 ├── STEP_09: EXECUTE_QA_QC_VALIDATIONS (limestone to clinker mass reconciliation)
 └── STEP_10: COMPILE_COMPLIANCE_REPORT (MOC Form-01 XML output)
```

No executable code blocks are permitted within these steps. They remain strictly declarative metadata.

---

## 11. Activity Data Requirements

The methodology defines structural data validation contracts for its activities, consuming definitions mapped in `EC-DM-001`:

- **`activity_identifier`:** Unique code referencing the required dataset.
- **`data_type`:** `Numeric` (measurements) or `Categorical` (fuel types).
- **`unit`:** Canonical physical unit (e.g., `t`, `tOE`, `MWh`, `m3`).
- **`periodicity`:** Minimum data collection frequency (e.g., `Monthly`, `Batch`).
- **`required_status`:** `MANDATORY` or `OPTIONAL`.
- **`quality_constraints`:** Acceptable accuracy tolerances ($\pm 2\%$) or temperature/pressure standard normalization targets.
- **`evidence_requirements`:** Mandatory audit verification files.

---

## 12. Emission Source Requirements

Methodologies bind to specific physical structure classes:

* **Stationary Combustion:** (Boilers, kilns, auxiliary fuel burners).
* **Indirect Electricity:** (Grid imports, corporate shared power substations).
* **Process Emissions:** (Limestone decarbonation, process-gas venting).
* **Fugitive Sources:** (Refrigerant leaks, wastewater handling).

*Division of Species:* Only greenhouse gas emission sources are included. Ambient criteria air pollutants are strictly blocked.

---

## 13. Gas Coverage

A methodology declares mandatory and optional gas coverage profiles:

- **Combustion Processes:** Requires $CO_2$, $CH_4$, and $N_2O$.
- **Process Decarbonation:** Requires $CO_2$ only.
- **Waste Digestion:** Requires $CH_4$ and $CO_2$.

*Normalization Boundary:* All individual species must be tracked as raw mass metrics (e.g., $kg\text{ }CH_4$) and converted to equivalent metrics ($t\text{ }CO_2e$) using versioned GWP datasets, satisfying `EC-UCM-001` core properties.

---

## 14. Parameter Requirements

Methodologies list required physical-chemical constants:

- **Net Calorific Value / Lower Heating Value (NCV/LHV):** Expressed in `TJ/kt` or `MJ/kg`.
- **Carbon Content / Carbon Emission Factor:** Expressed in `t C/TJ`.
- **Oxidation Factor / Fraction:** Expressed as a multiplier (e.g., `0.99`).
- **Limestone CaCO3 Content Purity:** Percentage decimal.

These definitions specify the parameter type, name, and unit, while the actual numeric values are fetched from governed factor registries at runtime.

---

## 15. Emission Factor (EF) Binding

The methodology does not store numeric factor values. Instead, it defines an **Emission Factor Requirement Contract**:

$$\text{Methodology} \implies \text{Emission Factor Requirement} \implies \text{Query: } \text{EFR-Grid-Electricity-Hanoi-2025} \implies \text{Registry Value}$$

This prevents outdated factors from corrupting historical report generation.

---

## 16. GWP Binding

Methodologies define GWP references through explicit metadata markers:

```yaml
GwpDatasetReference:
  methodology_id: "METH-MOC-CEMENT-2024"
  gwp_dataset_standard: "IPCC-AR5"
  gwp_application_basis: "100_YEAR_TIME_HORIZON"
  gwp_enforcement_status: "MANDATORY"
```

The GWP numerical multiplier values (e.g., $CH_4 = 28$) are stored in the GWP registry, not inside the methodology file.

---

## 17. Unit Requirements

Methodologies enforce physical measurement standards to prevent calculation errors:

- **Raw Inputs:** Mass or volume measurements (e.g., `liter`, `kg`, `m3`).
- **Normalized Outputs:** Unified mass metrics (e.g., metric tons `t`).
- **Energy Contexts:** Normalized energy equivalents (e.g., `TJ` or `tOE`).

All conversions must be executed using verified conversion factors defined in standard registries, following `EC-UCM-001` guidelines.

---

## 18. Calculation Model Binding

A methodology binds to one or more of the ten core calculation models of the platform. The binding specifies a **Selection Strength**:

- **`REQUIRED`:** No other model contract can be executed (e.g., Tier 3 mass balance for process chemistry).
- **`ALLOWED`:** Alternative models may be applied if tier parameters are met.
- **`CONDITIONAL`:** Valid based on operational scale (e.g., simple emission factors for auxiliary plants under 100 $tCO_2e$).
- **`DEFAULT`:** The fallback model.

No arbitrary priority weights (e.g., `Priority: 1`) are used.

---

## 19. QA/QC

Methodologies extend, but do not replace, the core quality validations of `EC-UCM-001`:

* **Mass-Reconciliation Checks:** (e.g., Coal combustion rates must correlate with clinker thermal outputs within statutory margins).
* **Chemical Balance Audits:** (e.g., Carbon inputs in coal + limestone must balance against carbon outputs in clinker + stack emissions).
* **Outlier Boundaries:** Flagging input values falling outside typical physical operating conditions (e.g., clinker kiln temperatures falling below $1000^\circ\text{C}$).

---

## 20. Uncertainty

Methodologies define statistical data quality constraints where mandated:

- **Measurement Uncertainty Limits:** Mandating physical instrumentation tolerances (e.g., billing meters with $\pm 1.5\%$ uncertainty).
- **Statistical Propagation:** Referencing standard propagation techniques (e.g., standard deviation combination as defined in IPCC Volume 1, Chapter 3).
- **Uncertainty Tiers:** Mapping Tier 1 (defaults with high uncertainty) to Tier 3 (measurements with low uncertainty).

No numeric constants are hard-coded in the methodology definitions.

---

## 21. Recalculation

A methodology defines the criteria and triggers under which historical compliance inventories must be recalculated:

* **Inventory Boundary Modifications:** Adding or removing a subsidiary site unit.
* **Methodology Revision Updates:** Major updates to the ministerial circular calculations.
* **Significant Activity Data Corrections:** Discovering a physical measurement meter error exceeding the materiality threshold (e.g., $\pm 5\%$).
* **Emission Factor Revisions:** Retroactive corrections to regional electricity grid factors.

---

## 22. Reporting

Methodologies map required calculated variables to statutory report sections:

- **Target Report:** (e.g., `MOC-BXD-CLINKER-REPORT-ANNUAL`).
- **Mandatory Variables:** Scope 1 emissions, Scope 2 emissions, specific emission intensity ($t\text{ }CO_2e/\text{ton clinker}$).
- **Submission Destination:** Designated provincial DOIT or national MONRE database registries.

---

## 23. Evidence

Required physical evidence items are mapped programmatically:

* **Fuel Combustion:** Purchase invoices + fuel weighbridge delivery logs + laboratory analysis certification reports.
* **Power Imports:** Power distribution bills + monthly digital grid meter logs.
* **Process Limestone:** Limestone quarry extraction records + process SCADA feedstock feeds.

---

## 24. Versioning & Temporality

Methodology versions are governed under strict temporal boundaries to preserve data integrity:

* **Strict Immutability:** Once promoted to `ACTIVE`, a methodology file is locked. Updates spawn a new version (e.g., `V1.1.0` replacing `V1.0.0`).
* **Temporal Mappings (`EC-TEMP-001`):**
  * `effective_from`: Inclusive start date of technical validity.
  * `effective_to`: Exclusive end date of technical validity (null if currently active).
  * `supersedes` / `superseded_by`: Lineage tracking.

Historical reporting runs retrieve the archived methodology version matching the reporting calendar year.

---

## 25. Methodology Conflicts

When overlapping guidelines or multi-ministry mandates create a technical conflict at a facility, the system records a **Methodology Conflict**:

```yaml
MethodologyConflict:
  conflict_id: "CONF-METH-2026-01"
  affected_methodology_ids: ["METH-MOIT-POWER-2023", "METH-MOC-CEMENT-2024"]
  affected_facility_id: "FAC-HD-COGEN-001"
  temporal_context: "2025-Q4"
  conflict_description: "Overlap in cogeneration steam accounting between MOIT and MOC circular formulas."
  resolution_status: "OPEN_CONTROLLED_AMBIGUITY"
  resolution_authority: "JOINT_MINISTERIAL_COMPLIANCE_BOARD"
```

The system blocks the calculation run, transitioning the state to `BLOCKED` rather than silently defaulting.

---

## 26. Methodology Selection

A **MethodologySelection** represents the dynamic selection event of a methodology for a facility. It is decoupled from the immutable methodology definition:

- **Identity:** `SEL-{FACILITY_ID}-{REPORTING_PERIOD}`.
- **Attributes:** Selected methodology ID, reporting period, sector context, selected regulatory rules, validation status, audit evidence checklist, and compliance officer review stamps.

---

## 27. Why / How / Source Traceability

Every selected methodology emits an inspectable transparency trail:

* **`WHY` (Selection Trace):** Explains why this technical procedure applies (e.g., *"Facility operates clinker kilns and is subject to MOC Circular 13/2024"*).
* **`HOW` (Construction Trace):** Details how the steps are sequenced to calculate emissions.
* **`SOURCE` (Statutory Lineage):** References the exact article, clause, and page number of the governing legislative document.

---

## 28. Relationship to Knowledge Matrix (`EC-KM-001`)

The Knowledge Matrix holds the raw legislative text facts and source timestamps. The Methodology Model consumes these source IDs to ground its procedures in verified legal realities.

---

## 29. Relationship to RRM (`EC-RRM-001`)

The Regulatory Rule Model evaluates legal applicability. The Methodology Model is bound to RRM rules, acting as the technical execution block after a rule evaluates as `APPLICABLE`.

---

## 30. Relationship to Temporal Model (`EC-TEMP-001`)

The Temporal Regulation Model governs date-bounds. The Methodology Model consumes TRM intervals, overlap predicates, and period splitting rules to manage version lifecycles and straddling reporting periods.

---

## 31. Relationship to SPM (`EC-SPM-001`)

The Sector Profile Model maps facility activities to operational processes. The Methodology Model maps those processes to calculation models, preventing duplication of sector taxonomies.

---

## 32. Relationship to UCM (`EC-UCM-001`)

The Universal Calculation Model defines mathematical calculation components (`MODEL-01` to `MODEL-10`). The Methodology Model selects, structures, and feeds parameters to these components, ensuring a unified mathematical core.

---

## 33. Implementation Boundary

MMR governs the conceptual schemas and procedural steps of carbon accounting.

### Under MMR Governance:
- Methodology identity schemas, step structures, and applicability contexts.
- Boundary mapping rules and emission source class alignments.
- Parameter requirements, EF/GWP binding contracts, and model selections.
- Selection states, temporal versioning, and conflict models.

### Outside MMR Boundaries:
- Arithmetic calculation engines and database tables.
- UI forms, report exports, or third-party API integrations.

---

## 34. Machine-Readable Model

Declarative schema contracts for programmatically validating methodologies are located in the companion YAML document `/carbon/docs/methodology/EC-MTH-001.yaml`.

---

## 35. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-MTH-001` | Cogeneration Formula Overlap | Calculation overlap for industrial steam allocation between MOIT and MOC formulas remains unaligned. | `EC-MTH-002` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-MTH-002` | Tier 3 Laboratory Certification | Accreditation standards for local facility-level coal LHV testing laboratories are inconsistent. | `EC-SPM-002` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-MTH-003` | Carbon Capture (CCUS) accounting | Standardized methodologies for carbon sequestration under national reporting frameworks are currently missing. | `EC-RRM-003` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |

---

## 36. Reconciliation

The Methodology Model is fully reconciled against the ENERIX Carbon ecosystem:
* Core calculation models (`MODEL-01` to `MODEL-10`) match the catalogue of `EC-UCM-001`.
* Activity data and physical parameters match the definitions in `EC-DM-001`.
* Temporal transition rules align with `EC-TEMP-001`.

---

## 37. Acceptance Criteria

`EC-MTH-001` is accepted only if:

- [x] **A.** Methodology is distinct from `RegulatoryRule`.
- [x] **B.** Methodology is distinct from `CalculationModel` and `CalculationEngine`.
- [x] **C.** Methodology is distinct from Emission Factor registries and GWP datasets.
- [x] **D.** Method steps are inspectable, declarative, and non-executable.
- [x] **E.** Temporal applicability dates and version lifecycles are explicitly defined.
- [x] **F.** Historical methodology runs remain immutable and perfectly reproducible.
- [x] **G.** Physical measurement units match the standard platform catalogs.
- [x] **H.** Methodology conflicts and selection events are explicitly modeled.
- [x] **I.** Fully compatible with `EC-KM-001`, `EC-DM-001`, `EC-RRM-001`, `EC-TEMP-001`, `EC-SPM-001`, and `EC-UCM-001`.

---

## 38. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Accounting Working Group | Initial formal specification of the Methodology Model (`EC-MTH-001`). |

---
**Status Declaration:** `METHODOLOGY_MODEL_ALIGNED_WITH_OPEN_ISSUES`
