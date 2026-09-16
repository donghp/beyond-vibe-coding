# ENERIX Carbon — Emission Factor Registry (EFR)
## Document ID: EC-EFR-001
**Title:** ENERIX Carbon Emission Factor Registry — Formal Model & Registry Specification  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Data Architecture & Emission Standards Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` (Canonical Domain Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping Specification)
- `EC-RRM-001` (Regulatory Rule Model Specification)
- `EC-TEMP-001` (Temporal Regulation Model Specification)
- `EC-SPM-001` (Sector Profile Model Specification)
- `EC-MTH-001` (Methodology Model & Registry Specification)
- `EC-UCM-001` (Universal Calculation Model Specification)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-EFR-001` |
| **Document Title** | ENERIX Carbon Emission Factor Registry |
| **Artifact Class** | Formal Core Registry & Emission Standards Specification |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Carbon Emission Factor & Standards Committee |
| **Repository Location** | `/carbon/docs/methodology/EC-EFR-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-EFR-001** is to define the canonical governed model and schema representation for storing, versioning, selecting, validating, and tracing Emission Factors used by ENERIX Carbon.

In environmental accounting, emission factors are highly volatile and geographically sensitive. Factors are subject to regulatory updates, periodic research updates, and tier-based adjustments. The Emission Factor Registry acts as the sole, audit-secure authority for **approved numeric emission factor values** across all calculation runs, guaranteeing that factors are selected correctly and remain fully reproducible without changing past calculations.

---

## 3. Scope

This specification governs the core metadata schemas, applicability rules, validation parameters, and relational lineages of the Emission Factor Registry.

### In Scope:
- Core schemas and value contracts for emission factor coefficients.
- Factor identity codes and double-taxonomy bindings.
- Selection contexts (`EmissionFactorSelection`) and temporal evaluation logic.
- Provenance tracking, duplicate detection rules, conflict resolution structures, and historical calculation snapshot requirements.

### Out of Scope:
- Direct raw data scraping or spreadsheet loading engines.
- General database table schemas, SQL indices, or performance tuning.
- Direct mathematical calculation logic (governed strictly by `EC-UCM-001`).
- Specific statutory rules deciding legal applicability (governed by `EC-RRM-001`).

---

## 4. Governing Principles

The Emission Factor Registry is anchored in five primary technical axioms:

1. **Approved Value Authority (The "Registry-as-Source" rule):** The registry is the sole source of record for approved factor values. No individual calculation module or sector profile may contain hard-coded numeric factor constants.
2. **Mandatory Provenance Trace:** A factor without explicit, traceable source authority and legislative/scientific publication context cannot transition to the `GOVERNED` state.
3. **Decoupling of Schema and Value Selection:** An emission factor's static schema is strictly isolated from its dynamic selection context (`EmissionFactorSelection`) to allow flexible calculation-run audits.
4. **Historical Snapshot Preservation:** Once a factor version is used in an active, finalized `CalculationRun`, its parameters are frozen into a write-once calculation snapshot, ensuring complete historical reproducibility.
5. **Separation of Physical Species:** Natural gas species must remain strictly distinct from equivalent values ($CO_2e$). No single $CO_2e$ factor may be silently fragmented into artificial gas components.

---

## 5. EF Definition

Within ENERIX Carbon, an **Emission Factor (EF)** is defined as a versioned, governed, and source-provenance-bound mathematical coefficient. It converts a physical activity quantity (e.g., liters of gasoline consumed, metric tons of coal burned) into an equivalent greenhouse gas emission mass (expressed in metric tons or kilograms) within a declared technical methodology and temporal window.

---

## 6. EF Identity

Every emission factor is identified by a unique, version-controlled metadata structure:

- **`emission_factor_id`:** Globally unique, string identifier matching pattern `EFR-{JURISDICTION_ID}-{SCOPE_ID}-{CATEGORY_CODE}-{YEAR_CODE}` (e.g., `EFR-VN-GRID-MOIT-2025`).
- **`factor_version`:** SemVer version string (e.g., `1.0.0`) tracking material corrections.
- **`name`:** Descriptive Vietnamese and English title (e.g., *"National grid electricity factor — 2025"*).
- **`description`:** Explanatory text summarizing scope and data parameters.
- **`status`:** Core operational lifecycles (`DRAFT`, `ACTIVE`, `SUPERSEDES`, `REPLACED`, `RETIRED`, `REQUIRES_REVIEW`, `BLOCKED`).
- **`jurisdiction` / `authority_class`:** Identifies administrative bounds and statutory authority tiers derived from `EC-KM-001`.
- **`source_refs`:** Array pointers to primary legislative source files.
- **`effective_from` / `effective_to`:** Strict validity dates matching `EC-TEMP-001` standards.
- **`supersedes` / `superseded_by`:** Relational pointers tracing factor evolution.
- **`provenance`:** Structural audit log tracking author, reviewer, registration date, and cryptographic file hashes.

---

## 7. Factor Value Contract

The numeric values of coefficients are structured under strict contracts to ensure data exchange precision:

```yaml
FactorValueContract:
  value: 0.8123
  unit_denominator: "MWh"
  unit_numerator: "t"
  gas: "CO2e"
  basis: "GRID_CONSUMPTION_AVERAGE"
  uncertainty_percent: 2.5
  precision_decimal_places: 4
  source_reference: "Circular-38-2023-TT-BCT:Appendix_2"
```

No numeric values may be hard-coded into the specification body of `EC-EFR-001.md`.

---

## 8. Unit and Dimensional Semantics

To prevent dimensional calculation mismatch errors, every factor must declare its numerator, denominator, and physical basis:

* **Numerator:** Metric unit of gas mass (typically metric tons `t` or kilograms `kg`).
* **Denominator:** Physical unit of physical activity matching the canonical units catalog (e.g., `MWh`, `liter`, `t`, `m3`, `tOE`).
* **Dimensional Basis:** Defines physical measurement states (e.g., *wet basis*, *dry basis*, *lower heating value (LHV)*, *gross calorific value (GCV)*).

*Dimensional Rule:* All conversion equations must treat $CO_2e$ as an equivalent metric representation, preventing it from being treated as a real physical gas.

---

## 9. Gas Semantics

The registry supports both:
1. **Gas-specific factors:** Factors defined for a single, pure physical gas species (e.g., $kg\text{ }CH_4/\text{ton waste}$).
2. **CO2e-based factors:** Multi-gas factors combined into an equivalent carbon metric directly by the publishing regulatory source.

*Preservation Boundary:* When a regulator publishes a combined $CO_2e$ factor, the system must record it exactly as published. Silent division of a $CO_2e$ factor into arbitrary, estimated gas species fractions is strictly prohibited.

---

## 10. Activity Applicability

Factors are bound to physical activity contexts to prevent incorrect selections based solely on unit matches:

$$\text{EmissionFactor} \longrightarrow \text{Applicability Context} \longrightarrow \text{Canonical ActivityData Entity}$$

Factor selection checks must validate:
- Expected input material classifications (e.g., anthracite coal vs. lignite coal).
- Measuring equipment constraints.
- Process scale boundaries.

---

## 11. Emission Source Applicability

Factors must declare applicability bounds limiting their execution to defined emission source classes:

- `stationary_combustion` (Boilers, gas turbines).
- `mobile_combustion` (Light service trucks, heavy freight rails).
- `purchased_electricity` (Regional utility grids).
- `industrial_process` (Process calcination releases).
- `waste` / `wastewater` (Landfills, anaerobic treatment lagoons).
- `agricultural` / `livestock` (Enteric fermentation, paddy field methane).

---

## 12. Methodology Binding

Methodologies define the factor rules, while the registry validates those rules:

$$\text{Methodology (EC-MTH-001)} \implies \text{Declares EF Requirements} \implies \text{Registry Checks \& Fetches Approved Value}$$

No factor may be loaded by the calculation engine without verifying that the methodology explicitly authorises the target registry query.

---

## 13. Sector Binding

Factors may have secondary, sector-specific applicability bounds (e.g., a specific energy factor valid only for cement manufacturers). Sector binding acts as an optional filter constraint but remains subordinate to formal activity applicability logic.

---

## 14. Jurisdiction

Factors enforce geographic and administrative jurisdiction boundaries:

- **`country`:** ISO geographic code (e.g., `VN`, `TH`, `JP`).
- **`authority`:** Regulating entity (e.g., `MONRE`, `MOIT`, `MOC`).
- **`region` / `province`:** Localized variations (e.g., grid factors specific to Northern vs. Southern Vietnam).

---

## 15. Temporal Validity

Following `EC-TEMP-001` left-closed, right-open interval boundaries $[t_{start}, t_{end})$:

* **`effective_from`:** Inclusive date on which the coefficient legally enters into force (`00:00:00 UTC+7`).
* **`effective_to`:** Exclusive date on which the coefficient is retired or replaced.
* **Open-Ended Validity:** Represented with `effective_to` set to `NULL`, defining the interval $[t_{start}, \infty)$.

---

## 16. Temporal Selection

Factors are selected by matching chronological metadata against the target physical run parameters:

$$\text{ActivityPeriod / EventDate (EC-DM-001)} \subseteq \text{EmissionFactor:EffectivePeriod}$$

If the methodology declares **Activity Date Binding** (the default temporal semantic), the engine queries the factor whose `effective_period` covers the physical activity date. If the source mandates an alternative binding logic (e.g., reporting period defaults), the engine overrides the default dynamically.

---

## 17. Versioning

To preserve audit trail historical reproducibility, emission factor values are strictly immutable. Any changes to:
- Numeric value coefficient.
- Units or measurement denominator.
- Gas basis or applicability parameters.
- Temporal effective dates.

require generating a new factor version (e.g., `V1.1.0` replacing `V1.0.0`). Overwriting existing records is strictly blocked.

---

## 18. Supersession

The registry uses relational properties to trace factor evolution lineage:
- **`SUPERSEDES` / `SUPERSEDED_BY`:** Links original and replacement factors.
- **`REPLACES` / `REPLACED_BY`:** Standard structural database replacements.

*Boundary Check:* Relational supersession is a technical taxonomy property. It does not decide or imply legal validity or retroactivity, which remains under the sole authority of legislative circulars.

---

## 19. Status

Factors undergo a strict status transition sequence:

```
 [DRAFT] ──► [REVIEW] ──► [GOVERNED] ──► [ACTIVE] ──► [EXPIRED]
                              │            │
                              └──► [BLOCKED] ◄┘
```

Only factors in `ACTIVE` or `GOVERNED` states are permitted to participate in calculations.

---

## 20. Approval / Governance

An emission factor transitions to `GOVERNED` only after completing a rigorous verification workflow:
1. **Source Verification:** Documented citation of the publishing legal decree or scientific study.
2. **Peer Review Audit:** Verification of accuracy, unit conversions, and metadata bindings.
3. **Approval Stamp:** Logged signature and cryptographically signed metadata record.

---

## 21. EF Selection

An **EmissionFactorSelection** represents the discrete event of selecting a factor for a calculation run. It is decoupled from the immutable factor definition:

* **Selection Key:** `SEL-EF-{RUN_ID}-{ACTIVITY_ID}`.
* **Tracked Parameters:** Target facility, activity period, selected methodology, matching geographic jurisdiction, selected factor ID, selection reason, review metadata, and validation stamps.

---

## 22. Why / How / Source Traceability

Every calculation output must emit an inspectable factor selection trace:

* **`WHY` (Justification):** Explains why the factor matches (e.g., *"Facility is located in Vietnam and consumed grid electricity during 2025"*).
* **`HOW` (Selection Trace):** Details the exact matching parameters (e.g., *"Matched activity: purchased_electricity, jurisdiction: VN, date: 2025-06-12"*).
* **`SOURCE` (Provenance Citation):** Explicit citation (e.g., *"Decision-501/QD-BCT (2025), Appendix 1, Line 3"*).

---

## 23. Provenance

To satisfy ISO 14064-1 third-party audit requirements, each factor record must store:

- Primary source document ID.
- Exact table and row references.
- Publishing authority and release date.
- Verification hash matching the official publication source (such as Mon Báo or Ministry databases).

Factors lacking provenance are permanently locked under `DRAFT` status.

---

## 24. Uncertainty / Quality

Where official legislative circulars or scientific research sources publish uncertainty margins, they must be stored in the registry:

- **`uncertainty_margin_percent`:** Standard percentage margin (e.g., $\pm 5\%$).
- **`statistical_distribution`:** (e.g., `Normal`, `LogNormal`, `Triangular`).

*Boundary Check:* The registry stores the published uncertainty variables. It does not calculate uncertainty, nor does it convert these parameters into arbitrary confidence scores.

---

## 25. Regional / Localization

The registry natively manages local and regional variations:

* **National default factors:** Unified baseline factors valid across the entire country.
* **Regional/Provincial factor variants:** High-resolution factors specific to local conditions (e.g., localized regional grid emission factors or customized coal quality constants).

The selector engine must evaluate the highest available spatial resolution first before falling back to national defaults.

---

## 26. Factor Conflicts

A factor conflict is recorded when multiple active coefficients match the same context:

```yaml
EmissionFactorConflict:
  conflict_id: "CONF-EF-2026-02"
  factor_id_a: "EFR-VN-COAL-MOIT-2025"
  factor_id_b: "EFR-VN-COAL-MOC-2025"
  affected_context: "Stationary combustion of bituminous coal"
  temporal_context: "2025-Q3"
  conflict_description: "MOIT and MOC publish conflicting net calorific carbon factors for identical coal grades."
  resolution_status: "OPEN_CONTROLLED"
  resolution_authority: "INTER_MINISTERIAL_RECONCILIATION_BOARD"
```

The system blocks execution of the calculation run and alerts the audit user, preventing silent arbitrary factor selection.

---

## 27. Duplicate Detection

To prevent registry bloat, the system executes conceptual duplicate detection checks based on key fields:

$$\text{Duplicate Key} = \{\text{Activity} \times \text{Gas} \times \text{Unit/Basis} \times \text{Methodology} \times \text{Jurisdiction} \times \text{EffectivePeriod} \times \text{Source}\}$$

Matching records are flagged for verification but never merged silently. Distinct source files must retain distinct database entries.

---

## 28. CO2e Factor Boundary

When a regulatory authority publishes combined equivalent factors (expressed as $kg\text{ }CO_2e/\text{unit}$), the registry preserves the record as a unified, CO2e-based factor.

It is strictly forbidden to imply or calculate artificial gas breakdowns (e.g., trying to guess $CH_4$ vs. $N_2O$ ratios) from a published $CO_2e$ factor unless explicitly guided by a verified methodology update.

---

## 29. Parameterized Factors

For advanced tier models (such as IPCC Tier 3), factors may depend on dynamic parameters or formula relations:

$$EF = f(x_1, x_2, \dots, x_n)$$

The registry defines the dynamic parameter interfaces and dependencies, while the calculation engine executes the formulas at runtime.

---

## 30. Factor Evidence

Factors may be supported by additional verification evidence artifacts:
- Scanned copies of official ministerial circulars.
- Laboratory lower heating value (LHV) test certificates.
- Direct digital meter calibration logs.

---

## 31. Historical Reproducibility

Every executed `CalculationRun` freezes its matched factors into a write-once calculation snapshot containing:
* `emission_factor_id` and `factor_version`.
* The exact numeric coefficient value and unit denominator used during execution.
* The matching temporal and geographic context.
* Full source provenance references.

Historical report generation queries this immutable snapshot, protecting calculations against updates to the central registry.

---

## 32. Relationship to Methodology (`EC-MTH-001`)

The Methodology specification defines the structural rules and requirements, while the Registry stores the actual approved numeric values, preserving a strict division of authority:

$$\text{Methodology (EC-MTH-001)} \xrightarrow{\text{Queries}} \text{Registry (EC-EFR-001)}$$

---

## 33. Relationship to RRM / Temporal (`EC-RRM-001` / `EC-TEMP-001`)

* **RRM (`EC-RRM-001`):** Decides legal applicability. The registry maps its factors to active RRM rule nodes.
* **Temporal Model (`EC-TEMP-001`):** Governs time boundaries. The registry consumes TRM interval overlap predicates to evaluate factor selections.

---

## 34. Relationship to SPM (`EC-SPM-001`)

The Sector Profile maps facility activities to operational processes. The registry maps its coefficients to these process definitions, preventing sector alone from overriding activity applicability criteria.

---

## 35. Relationship to UCM (`EC-UCM-001`)

The Universal Calculation Model maps mathematical structures (`MODEL-01` to `MODEL-10`). The registry feeds approved factor values to the execution modules, ensuring a unified mathematical core.

---

## 36. Implementation Boundary

EFR governs the conceptual schemas, parameters, and version lifecycles of emission factors.

### Under EFR Governance:
- Factor metadata schemas, identities, and unit denominational bases.
- Gas boundaries, physical species distinctions, and spatial/jurisdictional bounds.
- Temporal selection rules and overlap predicates.
- Selection states, supersessions, versionings, and conflict models.
- Immutable calculation run snapshot definitions.

### Outside EFR Boundaries:
- Database engines, tables, SQL queries, or indexing.
- Mathematical calculators or report rendering templates.

---

## 37. Machine-Readable Model

Declarative schema contracts for programmatically validating emission factors are located in the companion YAML document `/carbon/docs/methodology/EC-EFR-001.yaml`.

---

## 38. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-EFR-001` | Temporal EF Binding Ambiguity | Deciding when to bind a physical activity to its exact calendar-year default factor vs. its point-in-time publication date. | `EC-TEMP-002` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-EFR-002` | Conflicting Ministerial Constants | MOC and MOIT publish conflicting NCV values for local bituminous coal variants. | `EC-EFR-002` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-EFR-003` | Sequestration Factor Uncertainty | Establishing high-accuracy coefficients for carbon capture sink potentials under local conditions. | `EC-RRM-003` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |

---

## 39. Reconciliation

The Emission Factor Registry Model is reconciled against the ENERIX Carbon baseline:
* Unit and gas definitions align with the canonical types of `EC-DM-001`.
* Version and supersession mappings align with the interval semantics of `EC-TEMP-001`.
* Mapping boundaries align with `EC-MTH-001` and the ten models of `EC-UCM-001`.

---

## 40. Acceptance Criteria

`EC-EFR-001` is accepted only if:

- [x] **A.** Emission Factors are modeled as versioned, governed, and immutable domain objects.
- [x] **B.** The static factor definition is strictly decoupled from its selection context (`EmissionFactorSelection`).
- [x] **C.** Full source provenance is mandatory before a factor can transition to `GOVERNED` status.
- [x] **D.** Temporal validity and effective dates enforce `EC-TEMP-001` left-closed, right-open interval boundaries.
- [x] **E.** Methodology defines the factor requirements, while the registry stores the approved values.
- [x] **F.** Combined $CO_2e$ factors are preserved as unified, CO2e-based factors with no estimated gas decompositions.
- [x] **G.** Historical calculation snapshots freeze matched factor values to ensure 100% reproducibility.
- [x] **H.** Multi-factor overlaps and conflicts are explicitly logged as `BLOCKED` states, preventing silent bypasses.
- [x] **I.** Fully compatible with the specifications of `EC-KM-001`, `EC-DM-001`, `EC-RRM-001`, `EC-TEMP-001`, `EC-SPM-001`, `EC-MTH-001`, and `EC-UCM-001`.

---

## 41. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Registry Working Group | Initial formal specification of the Emission Factor Registry (`EC-EFR-001`). |

---
**Status Declaration:** `EMISSION_FACTOR_REGISTRY_ALIGNED_WITH_OPEN_ISSUES`
