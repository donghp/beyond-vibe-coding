# ENERIX Carbon — Global Warming Potential (GWP) Dataset Specification
## Document ID: EC-GWP-001
**Title:** ENERIX Carbon GWP Dataset Specification — Formal Model & Registry Specification  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Data Architecture & Environmental Standards Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DM-001` (Canonical Domain Model Specification)
- `EC-KM-001` (Knowledge Matrix & Authority Mapping Specification)
- `EC-RRM-001` (Regulatory Rule Model Specification)
- `EC-TEMP-001` (Temporal Regulation Model Specification)
- `EC-SPM-001` (Sector Profile Model Specification)
- `EC-MTH-001` (Methodology Model & Registry Specification)
- `EC-EFR-001` (Emission Factor Registry Specification)
- `EC-UCM-001` (Universal Calculation Model Specification)

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-GWP-001` |
| **Document Title** | ENERIX Carbon GWP Dataset Specification |
| **Artifact Class** | Formal Core Registry & GWP Standards Specification |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Carbon GWP & Standard Metrics Committee |
| **Repository Location** | `/carbon/docs/methodology/EC-GWP-001.md` |
| **Applicability** | Platform-wide |

---

## 2. Purpose

The purpose of **EC-GWP-001** is to define the canonical governed model and schema representation for Global Warming Potential (GWP) datasets used by ENERIX Carbon.

In environmental accounting, calculating carbon equivalence ($CO_2e$) requires multiplying the raw mass emissions of individual greenhouse gases (such as $CH_4$, $N_2O$) by their respective Global Warming Potential multipliers. These multipliers are periodically revised by the Intergovernmental Panel on Climate Change (IPCC) across consecutive Assessment Reports (SAR, TAR, AR4, AR5, AR6) and are bound to specific time horizons (e.g., 20-year, 100-year, or 500-year horizons). 

To prevent arithmetic drift, maintain legislative compliance, and secure historical reproducibility, the GWP Dataset Registry acts as the sole governed authority for **approved GWP dataset values**.

---

## 3. Scope

This specification governs the metadata structures, parameters, validation contracts, selection mechanisms, and relational dependencies of GWP datasets.

### In Scope:
- Core schemas and dataset identity representations for GWP dataset collections.
- Mapping gas species ($CO_2$, $CH_4$, $N_2O$, fluorinated gases) to their numeric multipliers under designated assessment reports and time horizons.
- Selection contexts (`GwpDatasetSelection`) and temporal evaluation constraints.
- Provenance tracking, conflict resolution models, and historical run snapshot requirements.

### Out of Scope:
- Raw spreadsheet import scripting or database implementation codes.
- Direct statutory rule processing (governed by `EC-RRM-001`).
- Formulation of universal emission factor constants (governed strictly by `EC-EFR-001`).
- Direct mathematical conversion execution (governed by `EC-UCM-001`).

---

## 4. Governing Principles

The GWP Dataset Model is anchored in five primary technical axioms:

1. **Approved Dataset Authority (The "GWP-as-Source" rule):** The GWP registry is the sole source of record for approved global warming potentials. No individual methodology, sector profile, or calculation engine module may contain hard-coded numeric GWP constants.
2. **Explicit Basis Alignment:** Every GWP value is intrinsically linked to a declared IPCC Assessment Report (SAR, TAR, AR4, AR5, AR6) and time horizon (typically 100-year). Constants may never be mixed or matched across different reports within a single calculation run.
3. **Decoupling of Definition and Selection:** The static, immutable GWP dataset structure is decoupled from its dynamic selection context (`GwpDatasetSelection`) to support calculation-run transparency.
4. **Historical Snapshot Preservation:** Once a GWP dataset version is selected and finalized within a `CalculationRun`, its parameters are frozen into an immutable run snapshot, ensuring old audits remain reproducible.
5. **Absolute Species Division:** Raw physical gas species mass metrics are kept strictly separate from the carbon-equivalence metric ($CO_2e$). GWP acts as the transition coefficient, and final $CO_2e$ aggregations are executed exclusively by the calculation core.

---

## 5. GWP Dataset Definition

A **GWP Dataset** is a governed, version-controlled collection of Global Warming Potential multipliers for declared greenhouse gas species under a declared scientific assessment basis and time horizon. 

---

## 6. Dataset Identity

Every GWP dataset is identified by a unique, version-controlled metadata structure:

- **`gwp_dataset_id`:** Globally unique string identifier matching pattern `GWP-{SOURCE_ID}-{HORIZON_ID}-{YEAR_CODE}` (e.g., `GWP-IPCC-AR5-100Y-2013`).
- **`dataset_version`:** SemVer version string (e.g., `1.0.0`) tracking structural corrections.
- **`name`:** Official descriptive title (e.g., *"IPCC Fifth Assessment Report 100-Year Horizon Dataset"*).
- **`description`:** Summary of dataset parameters and scientific source origin.
- **`authority_class` / `jurisdiction`:** Administrative and statutory tier bounds derived from `EC-KM-001`.
- **`status`:** Active lifecycle indicators (`DRAFT`, `REVIEW`, `GOVERNED`, `ACTIVE`, `EXPIRED`, `SUPERSEDED`, `RETIRED`, `REQUIRES_REVIEW`, `BLOCKED`).
- **`effective_from` / `effective_to`:** Chronological validity dates matching `EC-TEMP-001` left-closed, right-open interval boundaries.
- **`supersedes` / `superseded_by`:** Relational pointers tracing dataset evolution.
- **`provenance`:** Structural logs detailing creator, reviewer, registration timestamps, and verification hashes.

---

## 7. Assessment / Basis

The basis represents the formal scientific boundary of the GWP dataset. Supported standard parameters include:

* **Assessment Report Standard:**
  - `IPCC-SAR` (Second Assessment Report, 1995)
  - `IPCC-TAR` (Third Assessment Report, 2001)
  - `IPCC-AR4` (Fourth Assessment Report, 2007)
  - `IPCC-AR5` (Fifth Assessment Report, 2013)
  - `IPCC-AR6` (Sixth Assessment Report, 2021)
* **Time Horizon:**
  - `20_YEAR_TIME_HORIZON` (Near-term climate sensitivity)
  - `100_YEAR_TIME_HORIZON` (Standard global compliance reporting default)
  - `500_YEAR_TIME_HORIZON` (Long-term stabilization modeling)

*Compliance Constraint:* The platform does not enforce a hard-coded default (e.g., forcing IPCC AR5) unless explicitly mandated by the governing methodology/source. GWP datasets are loaded based on regulatory selections.

---

## 8. Gas Value Model

Individual entries within a GWP dataset bind a physical gas species to its scientific conversion multiplier, structured as follows:

```yaml
GwpGasValue:
  gas_species: "CH4"
  gwp_value: 28.0
  unit_semantics: "t CO2e / t Gas"
  assessment_basis: "IPCC-AR5"
  time_horizon: "100_YEAR_TIME_HORIZON"
  source_reference: "IPCC-AR5-WG1:Chapter_8:Table_8.A.1"
```

No actual numerical values for GWP constants may be invented or hard-coded into the specification body of `EC-GWP-001.md`.

---

## 9. Gas vs. CO2e

GWP values are conversion multipliers associated with a physical, chemical greenhouse gas species:

$$\text{Gas Species Mass } (t\text{ }Gas) \times \text{GWP} = \text{Equivalent Mass } (t\text{ }CO_2e)$$

To preserve scientific precision, the system enforces the following boundaries:
- **CO2e (Carbon Dioxide equivalent):** Treated strictly as an *equivalent reporting metric*, never as a physical chemical gas species.
- **Species Separation:** GWP multipliers convert individual physical gases (such as methane $CH_4$ or nitrous oxide $N_2O$) to $CO_2e$. Pure carbon dioxide $CO_2$ retains a fixed GWP multiplier of exactly `1.0` in all datasets.

---

## 10. Methodology Binding

The Methodology specification declares the GWP criteria, while the GWP Dataset specification owns and validates the actual dataset parameters:

$$\text{Methodology (EC-MTH-001)} \implies \text{Declares GWP Requirements} \implies \text{Registry Queries \& Fetches Approved Dataset}$$

This prevents individual methodologies from maintaining separate or hard-coded GWP values, unifying all multipliers under a single registry.

---

## 11. Regulatory Binding

Statutory rules evaluated via the Regulatory Rule Model (`EC-RRM-001`) may dictate which assessment report standard is legally mandated for a reporting period. The GWP Dataset registry consumes these evaluation outputs, acting as the metadata registry without interpreting law itself.

---

## 12. Temporal Validity

GWP datasets enforce strict chronological effective boundaries following `EC-TEMP-001` left-closed, right-open interval boundaries $[t_{start}, t_{end})$:

* **`effective_from`:** Inclusive date on which the dataset legally enters into force (`00:00:00 UTC+7`).
* **`effective_to`:** Exclusive date on which the dataset is retired or replaced.
* **Open-Ended Validity:** Indicated with `effective_to` set to `NULL`, defining the interval $[t_{start}, \infty)$.

Dataset selection evaluates these boundaries against the reporting period or activity period parameters declared in calculation runs.

---

## 13. Dataset Versioning

GWP datasets are strictly immutable to secure past audit trails. Any changes to:
- A gas multiplier value.
- The assessment report standard or time horizon basis.
- Statutory applicability ranges.
- Temporal validity boundaries.

require generating a new dataset version (e.g., `V1.1.0` replacing `V1.0.0`). Overwriting active records is strictly blocked.

---

## 14. GWP Selection

A **GwpDatasetSelection** represents the discrete event of selecting and matching a GWP dataset for a calculation run. It is decoupled from the static, immutable dataset definition:

- **Selection Key:** `SEL-GWP-{RUN_ID}-{PERIOD_ID}`.
- **Tracked Parameters:** Target facility, reporting period, selected methodology, matching regulatory rules, selected dataset ID, selection reason, review metadata, and audit validation states.

---

## 15. Why / How / Source Traceability

Every calculation output must emit an inspectable GWP selection trace:

* **`WHY` (Justification):** Explains why the dataset matches (e.g., *"Facility is subject to MOC Circular 13/2024 which mandates IPCC AR5 GWP multipliers"*).
* **`HOW` (Selection Trace):** Details the exact matching parameters (e.g., *"Matched regulatory framework: VN-National-Program, reporting year: 2025"*).
* **`SOURCE` (Provenance Citation):** Explicit citation (e.g., *"IPCC Fifth Assessment Report, WG1, Chapter 8, Table 8.A.1"*).

---

## 16. Provenance

To satisfy international compliance audits (such as ISO 14064-1), each GWP dataset record must store:

- Primary source document ID.
- Table and row references.
- Publishing authority and release date.
- Verification hash matching the official IPCC publication.

Datasets lacking provenance are permanently locked under `DRAFT` status.

---

## 17. Status Model

GWP datasets undergo a strict status transition sequence:

```
 [DRAFT] ──► [REVIEW] ──► [GOVERNED] ──► [ACTIVE] ──► [EXPIRED]
                              │            │
                              └──► [BLOCKED] ◄┘
```

Only datasets in `ACTIVE` or `GOVERNED` states are permitted to participate in calculations.

---

## 18. Quality / Uncertainty

Where the publishing scientific source provides uncertainty margins for GWP multipliers, they must be stored in the registry:

- **`uncertainty_margin_percent`:** Standard percentage margin (e.g., $CH_4$ AR5 100-Yr has a $\pm 30\%$ uncertainty range).
- **`statistical_distribution`:** (e.g., `Normal`, `LogNormal`).

*Boundary Check:* The registry stores the uncertainty metadata. It does not calculate uncertainty, nor does it convert these parameters into arbitrary confidence scores.

---

## 19. Conflict Model

A GWP conflict is recorded when multiple active datasets match the same context:

```yaml
GwpDatasetConflict:
  conflict_id: "CONF-GWP-2026-03"
  dataset_id_a: "GWP-IPCC-AR4-100Y-2007"
  dataset_id_b: "GWP-IPCC-AR5-100Y-2013"
  affected_context: "National reporting program overlap"
  temporal_context: "2025-Q4"
  conflict_description: "Joint ministerial guidelines overlap, creating conflict between IPCC AR4 and AR5 enforcement."
  resolution_status: "OPEN_CONTROLLED"
  resolution_authority: "NATIONAL_GHG_INVENTORY_STEERING_BOARD"
```

The system blocks execution of the calculation run and alerts the audit user, preventing silent, arbitrary GWP selection.

---

## 20. Historical Snapshot

Every executed `CalculationRun` freezes its matched GWP values into a write-once calculation snapshot containing:
* `gwp_dataset_id` and `dataset_version`.
* The exact numeric multiplier values and gases used during execution.
* The matching temporal and geographic context.
* Full source provenance references.

Historical report generation queries this immutable snapshot, protecting calculations against updates to the central dataset registry.

---

## 21. EF Relationship (`EC-EFR-001`)

The registry enforces strict separation of mathematical duties:

$$\text{EmissionFactor} \ne \text{GwpDataset}$$

* **Emission Factors (`EC-EFR-001`):** Convert activity data to raw physical gas mass (e.g., $kg\text{ }CH_4/\text{MWh}$).
* **GWP Dataset (`EC-GWP-001`):** Converts raw physical gas mass to equivalent emissions ($t\text{ }CO_2e$).
The platform never collapses these two functions to protect audit granularity.

---

## 22. UCM Relationship (`EC-UCM-001`)

The Universal Calculation Model defines the conversion formulation, while the GWP registry supplies the approved inputs:

$$\text{Gas-Specific Output } (t) \times \text{GWP Registry Entry} = \text{CO2e Contribution } (t\text{ }CO_2e)$$

Conversion calculations are executed exclusively by the deterministic calculation engine of `EC-UCM-001`, never by the registry itself.

---

## 23. Temporal Relationship (`EC-TEMP-001`)

The GWP registry consumes date-interval overlap predicates and temporal transition rules defined in `EC-TEMP-001` to manage dataset versioning and selection validity windows.

---

## 24. Methodology Relationship (`EC-MTH-001`)

The Methodology specification defines the structural rules and requirements, while the Registry stores the actual approved GWP dataset values, preserving a strict division of authority:

$$\text{Methodology (EC-MTH-001)} \xrightarrow{\text{Queries}} \text{Registry (EC-GWP-001)}$$

---

## 25. CO2e Aggregation Boundary

Individual GWP factors are stored as gas-specific inputs.

Final aggregations and reporting summaries are handled exclusively by the calculation engine of `EC-UCM-001`. The GWP registry does not compute, aggregate, or store final facility-level emission totals.

---

## 26. Implementation Boundary

GWP governs the conceptual schemas, parameters, and version lifecycles of Global Warming Potentials.

### Under GWP Governance:
- Dataset metadata schemas, identities, and assessment bases.
- Gas boundaries, physical species distinctions, and spatial/jurisdictional bounds.
- Temporal selection rules and overlap predicates.
- Selection states, supersessions, versionings, and conflict models.
- Immutable calculation run snapshot definitions.

### Outside GWP Boundaries:
- Database engines, tables, SQL queries, or indexing.
- Mathematical calculators or report rendering templates.

---

## 27. Machine-Readable Model

Declarative schema contracts for programmatically validating GWP datasets are located in the companion YAML document `/carbon/docs/methodology/EC-GWP-001.yaml`.

---

## 28. Controlled Open Issues

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-GWP-001` | AR5 vs AR6 Transition Ambiguity | Deciding when to migrate historical baseline reports to AR6 multipliers under local regulatory programs. | `EC-TEMP-002` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-GWP-002` | Conflicting Ministerial GWP Mandates | Overlapping guidelines from different ministries creating conflicts between AR4 and AR5 enforcement. | `EC-RRM-002` | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-GWP-003` | Fluorinated Gas Gaps | Missing local standard coefficients for high-index fluorinated gas compounds ($HFCs$/$PFCs$) in local industrial databases. | `EC-GWP-002` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |

---

## 29. Reconciliation

The GWP Dataset Model is reconciled against the ENERIX Carbon baseline:
* Gas definitions align with the canonical types of `EC-DM-001`.
* Version and supersession mappings align with the interval semantics of `EC-TEMP-001`.
* Mapping boundaries align with `EC-MTH-001` and the ten models of `EC-UCM-001`.

---

## 30. Acceptance Criteria

`EC-GWP-001` is accepted only if:

- [x] **A.** GWP Datasets are modeled as versioned, governed, and immutable domain objects.
- [x] **B.** The static dataset definition is strictly decoupled from its selection context (`GwpDatasetSelection`).
- [x] **C.** Full source provenance is mandatory before a dataset can transition to `GOVERNED` status.
- [x] **D.** Temporal validity and effective dates enforce `EC-TEMP-001` left-closed, right-open interval boundaries.
- [x] **E.** Methodology defines the GWP requirements, while the registry stores the approved values.
- [x] **F.** GWP multipliers convert physical gas species to $CO_2e$, treating $CO_2e$ strictly as an equivalent reporting metric.
- [x] **G.** Historical calculation snapshots freeze matched GWP values to ensure 100% reproducibility.
- [x] **H.** Multi-dataset overlaps and conflicts are explicitly logged as `BLOCKED` states, preventing silent bypasses.
- [x] **I.** Fully compatible with the specifications of `EC-KM-001`, `EC-DM-001`, `EC-RRM-001`, `EC-TEMP-001`, `EC-SPM-001`, `EC-MTH-001`, `EC-EFR-001`, and `EC-UCM-001`.

---

## 31. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX GWP Working Group | Initial formal specification of GWP Datasets (`EC-GWP-001`). |

---
**Status Declaration:** `GWP_DATASET_ALIGNED_WITH_OPEN_ISSUES`
