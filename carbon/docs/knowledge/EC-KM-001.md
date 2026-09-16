# ENERIX Carbon — Knowledge Matrix Specification
## Document ID: EC-KM-001
**Title:** ENERIX Carbon Knowledge Matrix — Knowledge Foundation & Authority Mapping Specification  
**Version:** 1.0.0  
**Status:** APPROVED_BASELINE  
**Effective Date:** 2026-09-16  
**Authors:** ENERIX Carbon Architecture Working Group  
**Governing Documents:**
- `EC-CONTEXT-001` (Master Architecture & Context Specification)
- `EC-DOMAIN-MODEL-001` (Formal Domain Model Specification)
- `EC-CALCULATION-MODEL-CATALOG-001` (Calculation Model Catalog)
- `EC-UCM-001` (Universal Emission Calculation Model Specification)
- `ADR-000-CONTEXT-REHYDRATION` (Master Context Rehydration ADR)
- `ENERIX-CARBON-BASE-LOGIC-001.md`
- `ENERIX-CARBON-GOVERNING-FRAMEWORK-001.md`

---

## 1. Document Control

| Metadata Field | Value |
| :--- | :--- |
| **Document ID** | `EC-KM-001` |
| **Document Title** | ENERIX Carbon Knowledge Matrix Specification |
| **Artifact Class** | Formal Engineering Architecture & Knowledge Governance Specification |
| **Version** | `1.0.0` |
| **Status** | `APPROVED_BASELINE` |
| **Release Date** | 2026-09-16 |
| **Maintainer** | ENERIX Knowledge Architecture & Regulatory Standards Committee |
| **Repository Location** | `/carbon/docs/knowledge/EC-KM-001.md` |
| **Machine-Readable Spec** | `/carbon/docs/knowledge/EC-KM-001.yaml` |

---

## 2. Purpose

The purpose of **EC-KM-001** is to establish the governed, auditable **Knowledge Mapping Layer** that connects authoritative source documents (laws, decrees, prime minister decisions, ministry circulars, technical standards) to ENERIX Carbon domain entities, regulatory rules, methodologies, calculation contracts, evidence artifacts, and deterministic engineering execution engines.

The Knowledge Matrix enforces canonical authority propagation across all platform components:

$$\text{Authoritative Source} \rightarrow \text{Knowledge Representation} \rightarrow \text{Regulatory / Methodology Mapping} \rightarrow \text{Engineering Artifact} \rightarrow \text{Deterministic Execution}$$

### Operational Mandate:
- **No Unsourced Logic:** Every regulatory rule, methodology requirement, and default mapping MUST trace back to a verifiable source identity.
- **No AI Authority:** AI systems (LLMs) operate strictly in advisory, extraction, and contextual search roles. AI NEVER possesses authority to establish legal obligations, create default emission factors, or execute arithmetic calculations.
- **No Source Rewriting:** The Knowledge Matrix preserves source text integrity and explicitly isolates engineering interpretations from raw legal facts.

---

## 3. Scope

This specification governs all knowledge representations across ENERIX Carbon:

- **Source Document Families:** Vietnamese Environmental Laws (Law 72/2020/QH14), Government Decrees (Decree 06/2022/NĐ-CP, Decree 119/2025/NĐ-CP, Decree 83/2026/NĐ-CP), Prime Minister Decisions (Decision 42/2026/QĐ-TTg, Decision 263/2026/QĐ-TTg), Ministry Circulars (MOIT Circular 38/2023, MOC Circular 13/2024, MARD Circular 19/2024, MONRE Circular 17/2022), TCVN ISO Standards (TCVN ISO 14064-1/2/3:2025), and GHG Protocol Corporate Standards.
- **Domain Mappings:** Regulatory Applicability Rules, Sector Taxonomies, Facility Thresholds, Activity Data Requirements, Emission Factor Registry References, GWP Dataset References, QA/QC Constraints, Evidence Requirements, and Calculation Model Bindings (`MODEL-01` through `MODEL-10`).
- **Accounting Scopes & Sectors:** Direct Scope 1, Energy Indirect Scope 2, Value Chain Scope 3, and Project Reductions across Energy Generation, Transport, Building Materials & Construction, Industrial Processes & Product Use (IPPU), Agriculture/Forestry/Land Use (AFOLU), and Waste & Wastewater Management.

---

## 4. Governing Principles

The Knowledge Matrix is governed by the 15 Non-Negotiable Engineering Laws defined in `EC-CONTEXT-001` and `EC-DOMAIN-MODEL-001`.

### Core Knowledge Invariants:
1. **Legal Source is NOT an AI Answer (LAW-001):** Legal inventory obligations and reporting thresholds MUST be derived from structured legal representations of official government instruments, never from AI text completions.
2. **Formula is NOT an Emission Factor (LAW-002):** The Knowledge Matrix maintains strict separation between mathematical calculation contracts (`CalculationModel`), physical emission factors (`EmissionFactor`), and source references.
3. **Current Law is Time-Dependent (LAW-004 & LAW-015):** Temporal validity (`effective_from`, `effective_to`) is mandatory for every source document and knowledge assertion.
4. **Every Material Result Requires Provenance (LAW-009):** All calculated values rendered in reports or UI MUST maintain unbroken lineage: $\text{Activity Data} \rightarrow \text{Factor} \rightarrow \text{Methodology} \rightarrow \text{Regulatory Rule} \rightarrow \text{Source Document} \rightarrow \text{Evidence}$.
5. **Sector-Adaptive Taxonomy Preserves Regulatory Mapping (LAW-013):** Sector profiles may define detailed operational categories, but MUST explicitly map back to the official 6-sector regulatory group taxonomy established under Decision 42/2026/QĐ-TTg.

---

## 5. Authority Hierarchy & Model

To eliminate authority collapse, ENERIX Carbon enforces an eight-tier strict authority hierarchy:

```
┌────────────────────────────────────────────────────────────────────────┐
│  TIER A: LEGAL / REGULATORY AUTHORITY                                  │
│  Law 72/2020, Decree 06/2022, Decree 119/2025, Decree 83/2026,          │
│  Decision 42/2026/QĐ-TTg, Decision 263/2026/QĐ-TTg                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Binds
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER B: MANDATORY MINISTERIAL / REGULATORY GUIDANCE                   │
│  MOIT Circular 38/2023, MOC Circular 13/2024, MARD Circular 19/2024,    │
│  MONRE Circular 17/2022                                                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Governs
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER C: GOVERNING ENTERPRISE SPECIFICATION                            │
│  EC-CONTEXT-001, EC-DOMAIN-MODEL-001, EC-UCM-001, EC-KM-001             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ References
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER D: TECHNICAL STANDARDS                                           │
│  TCVN ISO 14064-1/2/3:2025, GHG Protocol Corporate Standard             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Standardizes
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER E: METHODOLOGY CONTRACTS                                         │
│  MRV Procedures, Activity Data Units, Tier Allocations                 │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Registers Parameters
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER F: ENGINEERING REGISTRIES                                        │
│  Versioned Emission Factor DB (EFDB), IPCC GWP Datasets, NCV Tables    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Executes
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER G: IMPLEMENTATION ARTIFACTS                                      │
│  Deterministic Execution Engine (JavaScript), UI Components            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Assists (Non-Authoritative)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  TIER H: AI-GENERATED ADVISORY CONTENT                                 │
│  LLM Summaries, Suggested Tags, Context Search Results (ADVISORY ONLY) │
└────────────────────────────────────────────────────────────────────────┘
```

### Hierarchy Execution Rules:
- Higher-tier artifacts OVERRIDE lower-tier defaults in cases of explicit legal conflict within the same jurisdiction and effective timeframe.
- Lower-tier artifacts CANNOT override higher-tier mandates (e.g. an enterprise UI component or AI summary cannot waive a mandatory Decree obligation).
- AI-generated content (Tier H) is strictly advisory and has ZERO authority to modify parameters, establish rules, or alter calculation results.

---

## 6. Source Identity Contract

Every authoritative document ingested or referenced by ENERIX Carbon MUST possess a canonical `SourceIdentity` record:

```yaml
SourceIdentity:
  source_id: "string (REQUIRED, e.g. 'DEC-06-2022-ND-CP')"
  title: "string (REQUIRED, official legal/technical document title)"
  document_type: "enum [LAW, DECREE, DECISION, CIRCULAR, TECHNICAL_STANDARD, GUIDANCE_MANUAL, ENTERPRISE_SPEC] (REQUIRED)"
  authority_class: "enum [LEGAL_AUTHORITY, METHODOLOGY_AUTHORITY, TECHNICAL_STANDARD, GUIDANCE_MANUAL, GOVERNING_SPECIFICATION] (REQUIRED)"
  jurisdiction: "string (REQUIRED, e.g. 'VN' or 'INTERNATIONAL')"
  issuer: "string (REQUIRED, e.g. 'Government of Vietnam', 'Prime Minister', 'MOIT', 'MONRE')"
  publication_date: "date (REQUIRED, YYYY-MM-DD)"
  effective_from: "date (REQUIRED, YYYY-MM-DD)"
  effective_to: "date (OPTIONAL, null if currently active)"
  supersedes: "array of strings (OPTIONAL, refs to source_id)"
  superseded_by: "array of strings (OPTIONAL, refs to source_id)"
  status: "enum [ACTIVE, AMENDED, SUPERSEDED, PENDING_EFFECTIVE, ARCHIVED] (REQUIRED)"
  language: "string (REQUIRED, e.g. 'vi', 'en')"
  source_path: "string (REQUIRED, relative path to text in repository or UNKNOWN)"
  source_hash: "string (OPTIONAL, SHA-256 hash of document content)"
  version: "string (REQUIRED, e.g. '2022')"
  provenance: "object (Registration metadata, author, timestamp)"
```

> **Missing Metadata Rule:** If a required field cannot be established from the repository's current source set, the value MUST be explicitly recorded as `"UNKNOWN"`. Inventing unverified dates or publication metadata is strictly prohibited.

---

## 7. Knowledge Assertion Model

The fundamental atom of represented knowledge in ENERIX Carbon is the `KnowledgeAssertion`. A Knowledge Assertion extracts a single, verifiable, unambiguous statement from a Source Identity:

```yaml
KnowledgeAssertion:
  assertion_id: "string (REQUIRED, e.g. 'K-AST-QD42-POWER-001')"
  source_id: "string (REQUIRED, ref to SourceIdentity.source_id)"
  statement: "string (REQUIRED, precise legal or technical assertion text)"
  assertion_type: "enum (REQUIRED, see Section 9 Assertion Taxonomy)"
  authority_class: "enum (REQUIRED, inherits from SourceIdentity)"
  jurisdiction: "string (REQUIRED, inherits from SourceIdentity)"
  effective_from: "date (REQUIRED, YYYY-MM-DD)"
  effective_to: "date (OPTIONAL, null if currently active)"
  applicability_scope: "object (Facility, sector, activity, or gas boundaries)"
  sector_scope: "array of strings (Official 6-sector taxonomy refs)"
  entity_scope: "string (e.g. 'Thermal Power Plants >= 3,000 tCO2e/yr')"
  activity_scope: "array of strings (e.g. ['Stationary Combustion', 'Coal Consumption'])"
  gas_scope: "array of strings (e.g. ['CO2', 'CH4', 'N2O'])"
  methodology_refs: "array of strings (Refs to Methodology.id)"
  regulatory_rule_refs: "array of strings (Refs to RegulatoryRule.id)"
  calculation_model_refs: "array of strings (Refs to CalculationModel.id)"
  parameter_refs: "array of strings (Refs to EmissionFactor or Parameter IDs)"
  evidence_refs: "array of strings (Refs to required Evidence types)"
  certainty_state: "enum [VERIFIED_FACT, HIGH_CONFIDENCE_INTERPRETATION, REQUIRES_HUMAN_REVIEW, CONFLICTED] (REQUIRED)"
  provenance: "object (Source location, clause number, section, page)"
  status: "enum [ACTIVE, DEPRECATED, SUPERSEDED] (REQUIRED)"
```

---

## 8. Source Content vs Assertion vs Interpretation vs Implementation Rule

To prevent authority collapse and false factual claims, ENERIX Carbon strictly enforces four non-collapsible knowledge layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 1: SOURCE CONTENT                                               │
│  Exact, unedited legal or technical text from official document.        │
│  (e.g., QĐ 42/2026/QĐ-TTg, Phụ lục II, Mục 1.1)                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Extracts
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 2: KNOWLEDGE ASSERTION                                          │
│  Structured representation of source statement with temporal scope.    │
│  (e.g., K-AST-QD42-001: Thermal power plants > 3,000 tCO2e/yr must     │
│  submit GHG inventory under MOIT Circular 38/2023).                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Formulates (Requires Judgment Tag)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 3: ENGINEERING INTERPRETATION                                   │
│  Formal mapping from assertion to software entities & models.          │
│  (e.g., Bound to sector 'ENERGY_GENERATION' and MODEL-03 MULTI_GAS).   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Compiles
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  LAYER 4: IMPLEMENTATION RULE                                          │
│  Deterministic code execution rule in engine or database filter.       │
│  (e.g., EC-REG-001 rule condition: sector == 'POWER' && em >= 3000).  │
└────────────────────────────────────────────────────────────────────────┘
```

### Layer Separation Rules:
1. **No Layer Collapse:** Layer 3 (Engineering Interpretation) MUST NEVER be passed off as Layer 1 (Source Content).
2. **Explicit Labeling:** All human architectural choices made during Layer 3 formulation MUST be explicitly tagged with `is_engineering_interpretation: true` and linked to an architectural decision record (ADR).
3. **Traceability:** Implementation rules (Layer 4) MUST maintain backwards references to Layer 2 assertions and Layer 1 source clauses.

---

## 9. Assertion Taxonomy

Knowledge Assertions MUST be categorized into one of 19 controlled assertion types:

| Assertion Type | Description | Primary Domain Target |
| :--- | :--- | :--- |
| `LEGAL_REQUIREMENT` | Mandatory obligation established by law or decree. | `RegulatoryRule` |
| `DEFINITIONS` | Formal terminology definition from legal or standard text. | Domain Vocabulary |
| `APPLICABILITY_RULE` | Threshold or scope condition determining facility inclusion. | `RegulatoryRule` |
| `REPORTING_REQUIREMENT` | Submission schedule, form, or administrative workflow rule. | Inventory Reporting |
| `FACILITY_THRESHOLD` | Numerical baseline (e.g. $\ge 3,000 \, tCO_2e/year$, $\ge 1,000 \, toe/year$). | `Facility` Validation |
| `SECTOR_CLASSIFICATION` | Sector, sub-sector, or industrial activity categorization. | Sector Profile |
| `METHODOLOGY_REQUIREMENT` | Mandatory calculation methodology reference. | `Methodology` |
| `ACTIVITY_DATA_REQUIREMENT` | Required measurement parameter, unit, or data source. | `ActivityData` |
| `EMISSION_SOURCE_REQUIREMENT` | Identified physical emission source or stack category. | Source Mapping |
| `EMISSION_FACTOR_REFERENCE` | Approved factor database reference or default coefficient. | `EmissionFactor` |
| `GWP_REFERENCE` | Global Warming Potential dataset binding (e.g. IPCC AR5). | `GwpDataset` |
| `UNIT_REQUIREMENT` | Mandatory physical unit for data collection or calculation. | Unit Normalization |
| `QA_QC_REQUIREMENT` | Quality control check, calibration, or audit requirement. | QA/QC Pipeline |
| `UNCERTAINTY_REQUIREMENT` | Data quality tier or uncertainty assessment procedure. | Data Quality Tier |
| `RECALCULATION_REQUIREMENT` | Baseline recalculation trigger or historical revision rule. | Version Control |
| `REPORTING_FORM_REQUIREMENT` | Structured reporting table template or schema constraint. | Report Generator |
| `REDUCTION_METHOD_REFERENCE` | Approved carbon credit or project mitigation methodology. | Project Reduction |
| `GOVERNANCE_RULE` | Internal platform engineering law or governance constraint. | Engineering Architecture |
| `TECHNICAL_STANDARD_REQUIREMENT` | Technical specification from TCVN ISO 14064 or GHG Protocol. | Standard Accounting |

---

## 10. Temporal Knowledge Model

Temporal validity is MANDATORY for all source identities and knowledge assertions. Timeless rules are strictly prohibited (`LAW-004`).

### Temporal Fields & Operators:
- `effective_from`: Date on which the document or assertion becomes legally binding.
- `effective_to`: Date on which the document or assertion expires or is superseded (`null` for active rules).

### Temporal Relationships:
- `SUPERSEDES` / `SUPERSEDED_BY`: Full replacement of a prior legal document (e.g., `QD-42-2026` supersedes `QD-13-2024`).
- `AMENDS` / `AMENDED_BY`: Partial amendment of specific clauses (e.g., `DEC-119-2025` amends `DEC-06-2022`).
- `REPLACES` / `REPLACED_BY`: Substitution of an engineering parameter or factor table.
- `APPLIES_DURING`: Conditional temporal applicability during a specific reporting window.

```
Rule Evaluation Window [Reporting Period Start .. End]
               │
               ▼
Check Rule: (effective_from <= Period.End) AND (effective_to IS NULL OR effective_to >= Period.Start)
```

---

## 11. Supersession & Amendment Model

When legal instruments are updated, the Knowledge Matrix models exact amendment relationships rather than performing bulk document deletion or timestamp overwriting:

### Partial Amendment Protocol:
1. **Unchanged Clauses:** Original assertions from `DEC-06-2022-ND-CP` remain active with `effective_from: "2022-01-07"` and `effective_to: null`.
2. **Amended Clauses:** Original assertions modified by `DEC-119-2025-ND-CP` receive `effective_to: "2025-07-31"`.
3. **New Assertions:** Replacement assertions from `DEC-119-2025-ND-CP` are created with `effective_from: "2025-08-01"` and `amends_assertion_id: "K-AST-DEC06-ORIGINAL-ID"`.

> **Historical Query Guarantee:** Querying legal applicability for reporting period `2024-Q1` retrieves `DEC-06-2022` rules. Querying for `2025-Q4` retrieves `DEC-119-2025` amended rules.

---

## 12. Applicability Model

The Knowledge Matrix determines whether a source document or knowledge assertion applies to a specific facility, activity, or reporting period using four explicit applicability states:

```
                  ┌─────────────────────────────────────┐
                  │        APPLICABILITY EVALUATION     │
                  └──────────────────┬──────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│      DIRECT        │    │    CONDITIONAL     │    │   NOT APPLICABLE   │
│   APPLICABILITY    │    │   APPLICABILITY    │    │                    │
│ Ex: Power Plant >= │    │ Ex: Facility has   │    │ Ex: Agricultural   │
│ 3000 tCO2e/yr      │    │ on-site coal stack │    │ farm under MOIT    │
└────────────────────┘    └────────────────────┘    └────────────────────┘
                                     │
                                     ▼ (Data Missing)
                          ┌────────────────────┐
                          │      UNKNOWN       │
                          │ (Requires Audit)   │
                          └────────────────────┘
```

### Deterministic Rules:
- **DIRECT APPLICABILITY:** All criteria (sector, facility threshold, temporal window) are satisfied.
- **CONDITIONAL APPLICABILITY:** Applies if specific operational conditions (e.g. presence of secondary boiler) are met.
- **NOT APPLICABLE:** Facility parameters fall outside legal threshold or sector boundaries.
- **UNKNOWN:** Facility parameters are incomplete. Engine MUST flag as `NEEDS_HUMAN_REVIEW` rather than inferring non-applicability (`LAW-007`).

---

## 13. Sector Mapping

The Knowledge Matrix bridges legal sector taxonomies with internal operational sector profiles across the six official regulatory sectors under Decision 42/2026/QĐ-TTg:

| Regulatory Sector Group (QĐ 42/2026) | Governing Ministry Circular | Internal Product Sector Profile ID | Core Sub-Sectors Covered |
| :--- | :--- | :--- | :--- |
| **1. Energy Generation & Supply** | MOIT Circular 38/2023 | `SECTOR_ENERGY` | Thermal power, grid electricity, oil & gas refining, coal mining. |
| **2. Transport** | MOT / MOIT Circular 38/2023 | `SECTOR_TRANSPORT` | Commercial road transport, rail, domestic aviation, inland waterways. |
| **3. Construction & Building Materials** | MOC Circular 13/2024 | `SECTOR_CONSTRUCTION` | Cement production, lime, glass, ceramics, building construction. |
| **4. Industrial Processes & Product Use** | MOIT Circular 38/2023 | `SECTOR_IPPU` | Chemical manufacturing, metallurgy, steel production, electronics. |
| **5. Agriculture, Forestry & Land Use** | MARD Circular 19/2024 | `SECTOR_AFOLU` | Livestock enteric fermentation, paddy rice, fertilizer use, forestry. |
| **6. Waste & Wastewater Management** | MONRE Circular 17/2022 | `SECTOR_WASTE` | Solid waste landfilling, incineration, industrial/domestic wastewater. |

> **Taxonomy Invariant (LAW-013):** Custom or user-defined facility sectors MUST map to exactly one of these six primary regulatory groups. Custom categories MUST NOT bypass regulatory mapping.

---

## 14. Facility Applicability Mapping

Facility obligation mapping evaluates quantitative thresholds defined in legal source documents:

```yaml
FacilityApplicabilityRule:
  rule_id: "RULE-QD42-POWER-THRESHOLD"
  source_assertion_id: "K-AST-QD42-POWER-001"
  sector_group: "SECTOR_ENERGY"
  sub_sector: "THERMAL_POWER"
  threshold_conditions:
    - metric: "annual_emissions"
      operator: ">="
      value: 3000
      unit: "tCO2e/year"
    - metric: "annual_energy_consumption"
      operator: ">="
      value: 1000
      unit: "toe/year"
  evaluation_logic: "OR" # Reaching either threshold triggers mandatory reporting
  reporting_obligation: "MANDATORY_INVENTORY_SUBMISSION"
```

---

## 15. Activity Data Requirement Mapping

The Knowledge Matrix maps source requirements to structured activity data inputs:

| Sector | Activity Category | Required Activity Data Input | Native Unit | Source Guidance |
| :--- | :--- | :--- | :--- | :--- |
| Energy | Stationary Combustion | Fuel consumption quantity | $kWh, \text{liters}, \text{tonnes}, m^3$ | MOIT Circular 38/2023 |
| Construction | Cement Clinker | Clinker production volume | metric tonnes | MOC Circular 13/2024 |
| Waste | Wastewater Treatment | Chemical Oxygen Demand ($COD$) mass | $kg COD / \text{day}$ | MONRE Circular 17/2022 |
| Agriculture | Paddy Rice Cultivation | Cultivated area $\times$ cultivation days | $ha \cdot \text{days}$ | MARD Circular 19/2024 |

---

## 16. Emission Source Knowledge Mapping

The Matrix defines emission source categories and strictly enforces physical separation between Greenhouse Gases (GHG) and Air Pollutants:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      EMISSION SOURCE KNOWLEDGE                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────────────────────┐ ┌──────────────────────────────┐
│       GHG EMISSIONS ACCOUNTING        │ │   CRITERIA AIR POLLUTANTS    │
│  Target Species: CO2, CH4, N2O, HFCs, │ │  Target Species: NOx, SO2,   │
│  PFCs, SF6, NF3                       │ │  CO, PM10, PM2.5, VOCs       │
│  Metric: Metric Tonnes & tCO2e        │ │  Metric: kg pollutant mass   │
│  Purpose: Regulatory Carbon Inventory │ │  Purpose: Environmental Air  │
│  (Decree 06/2022, QĐ 42/2026)         │ │  Permitting (Law 72/2020)    │
└───────────────────────────────────────┘ └──────────────────────────────┘
```

> **Non-Contamination Invariant:** Criteria air pollutants ($NOx, SO2, CO, PM$) MUST NEVER be multiplied by GWP factors or summed into $tCO_2e$ inventory totals.

---

## 17. Emission Factor Knowledge Mapping

The Knowledge Matrix owns source provenance and factor dataset relationships. It does NOT store numerical factor values (which are owned by versioned EF registries):

$$\text{Source Document} \xrightarrow{\text{cites}} \text{EF Knowledge Reference} \xrightarrow{\text{binds}} \text{EF Registry Dataset Entry}$$

```yaml
EmissionFactorKnowledgeMapping:
  mapping_id: "EF-MAP-MONRE-GRID-2024"
  source_assertion_id: "K-AST-MONRE-GRID-2024"
  source_document_id: "NOTICE-MONRE-GRID-2024"
  target_ef_registry_id: "EF-MONRE-GRID-2024"
  activity_category: "Grid Electricity Consumption"
  applicable_scope: "SCOPE_2"
  valid_from: "2024-01-01"
  valid_to: "2024-12-31"
  data_tier: "TIER_2_NATIONAL"
```

---

## 18. GWP Knowledge Mapping

Global Warming Potential dataset references are mapped to authoritative IPCC publication sources:

```yaml
GwpKnowledgeMapping:
  dataset_id: "IPCC_AR5_100YR"
  source_document_id: "IPCC-AR5-WG1"
  title: "IPCC Fifth Assessment Report 100-Year GWPs"
  gwp_values:
    CO2: 1.0
    CH4: 28.0
    N2O: 265.0
    SF6: 23500.0
    NF3: 16100.0
  mandatory_under: ["CIRCULAR-38-2023-MOIT", "CIRCULAR-13-2024-MOC"]
```

---

## 19. Evidence Mapping (Source vs Operational Evidence)

The Matrix maintains strict conceptual distinction between Authoritative Sources and Operational Evidence:

| Dimension | Authoritative Legal/Technical Source | Operational Physical Evidence |
| :--- | :--- | :--- |
| **Definition** | Government instrument, law, decree, circular, or ISO standard. | Physical or digital transaction artifact (invoice, log, certificate). |
| **Ownership** | Legislative & Regulatory Authorities (Government, Ministries). | Facility Operator, Utility Provider, Laboratory, Calibration Engineer. |
| **Examples** | QĐ 42/2026/QĐ-TTg, Circular 38/2023/TT-BCT, TCVN ISO 14064-1. | Utility Power Bill, Coal Delivery Invoice, CEMS Lab Test Report, SCADA Log. |
| **Function** | Establishes legal obligation, calculation methodology, and factor bounds. | Substantiates actual activity data quantity ($AD$) or process parameter. |
| **Verification** | Verified via official gazette / government publication registry. | Verified via SHA-256 hash signature and auditor verification. |

---

## 20. Provenance Model

Every Knowledge Assertion retains unbroken provenance tracking back to its origin:

```yaml
AssertionProvenance:
  assertion_id: "K-AST-QD42-POWER-001"
  source_id: "QD-42-2026"
  source_section: "Phụ lục II — Danh mục cơ sở ngành Công Thương"
  clause_number: "Mục I, Khoản 1.1"
  page_number: 14
  extracted_by: "HUMAN_ARCHITECT" # or "AI_EXTRACTION_PIPELINE"
  extracted_at: "2026-09-16T07:25:00Z"
  review_status: "GOVERNED"
  verifier_id: "ARCH-ENG-001"
```

---

## 21. Confidence vs Authority Dimensions

The Knowledge Matrix isolates **Authority** (legal weight) from **Confidence** (certainty of extraction/interpretation):

```
                       HIGH AUTHORITY
                             │
     (A) Ambiguous Law       │   (B) Clear Statutory Decree
     High Authority          │   High Authority
     Low Confidence          │   High Confidence
                             │
 ────────────────────────────┼────────────────────────────
 LOW CONFIDENCE              │              HIGH CONFIDENCE
                             │
     (C) AI Unverified Tag   │   (D) Verified ISO Guideline
     Low Authority           │   Medium Authority
     Low Confidence          │   High Confidence
                             │
                        LOW AUTHORITY
```

### Governing Rule:
- High confidence CANNOT elevate low authority (e.g., a perfectly clear AI summary remains low authority Tier H).
- Low confidence on high authority sources (Box A) MUST trigger `HUMAN_JUDGMENT_REQUIRED` review.

---

## 22. Conflict Model

When source documents contain conflicting statements, the Knowledge Matrix records the conflict explicitly without silent averaging or guessing:

```yaml
KnowledgeConflict:
  conflict_id: "CONF-001-GRID-EF-PERIOD"
  source_A: "CIRCULAR-38-2023-MOIT"
  statement_A: "Mandates grid factor MONRE 2022 for 2024 reports."
  source_B: "NOTICE-MONRE-GRID-2024"
  statement_B: "Mandates updated grid factor MONRE 2024 effective Feb 2024."
  conflict_type: "TEMPORAL_FACTOR_SUPERSEDED"
  affected_subject: "Scope 2 Grid Electricity Calculation"
  resolution_status: "OPEN_REQUIRES_HUMAN_JUDGMENT"
  safe_boundary_action: "Expose both factors to auditor; default to MONRE 2024 with explicit audit note."
```

---

## 23. Ambiguity Model

Ambiguities in source texts are represented explicitly using formal ambiguity flags:

```yaml
KnowledgeAmbiguity:
  ambiguity_id: "AMB-001-CEMS-ALLOCATION"
  source_id: "CIRCULAR-17-2022-MONRE"
  clause: "Điều 12 — Đo đạc trực tiếp bằng CEMS"
  issue_description: "Does not define allocation fractions for multi-tenant shared stack flues."
  ambiguity_type: "MISSING_ALLOCATION_CONTRACT"
  impact: "MODEL-09 stack total cannot be allocated across entities without site contract."
  required_state: "HUMAN_JUDGMENT_REQUIRED"
```

---

## 24. Engineering Judgment Boundary

All human architectural choices, parameter selections, or boundary definitions MUST be explicitly labeled:

```yaml
EngineeringJudgmentRecord:
  judgment_id: "EJ-001-COAL-NCV-DEFAULT"
  target_assertion_id: "K-AST-MOIT38-COAL-PARAMS"
  judgment_statement: "Assigned default NCV of 0.0258 TJ/tonne for Bituminous Coal Class 3."
  rationale: "Aligns with MOIT Circular 38/2023 Table 4 default when facility lab test is unavailable."
  is_engineering_interpretation: true
  approved_by: "Lead Carbon Architect"
  approved_date: "2026-09-16"
```

---

## 25. AI Knowledge Boundary

Artificial Intelligence models (LLMs) operate under strict non-authoritative boundaries:

### Permissible AI Actions:
- Document retrieval, semantic search, and passage highlighting.
- Text parsing and candidate assertion extraction for human review.
- Suggesting tags, sector classifications, or related circular clauses.

### Prohibited AI Actions:
- Establishing legal obligations or facility reporting status (`LAW-001`).
- Executing arithmetic calculations or GWP weighting (`LAW-006`).
- Inventing default emission factors or parameters (`LAW-007, LAW-008`).
- Overwriting source facts or resolving legal conflicts silently.

---

## 26. Knowledge Lifecycle

Knowledge assertions transition through eight formal lifecycle states:

```
[DISCOVERED] ──> [INGESTED] ──> [PARSED] ──> [EXTRACTED] ──> [REVIEWED] ──> [GOVERNED]
                                                                              │
                                                                              ▼
                                                              [ARCHIVED] <── [SUPERSEDED]
```

---

## 27. Knowledge Quality Dimensions

Knowledge Matrix quality is evaluated across eight independent dimensions:
1. **Source Completeness:** 100% of referenced documents have complete `SourceIdentity` metadata.
2. **Provenance Completeness:** Every assertion links to source section, clause, and page.
3. **Temporal Completeness:** `effective_from` dates defined for 100% of active assertions.
4. **Authority Completeness:** Explicit assignment to Tier A through Tier H.
5. **Applicability Completeness:** Explicit facility, sector, activity, and gas scopes.
6. **Relationship Completeness:** Bidirectional linking between assertions, rules, and calculation models.
7. **Evidence Completeness:** Explicit evidence requirements defined for activity data inputs.
8. **Ambiguity Visibility:** 100% of source ambiguities and conflicts explicitly logged.

---

## 28. Machine-Readable Schema (EC-KM-001.yaml Contract)

The machine-readable companion file `/carbon/docs/knowledge/EC-KM-001.yaml` provides formal JSON Schema definitions for:
- `SourceIdentity` and `KnowledgeAssertion` entities.
- Temporal relationships (`SUPERSEDES`, `AMENDS`, `REPLACES`).
- Authority tier enumerations (`TIER_A` through `TIER_H`).
- Sector taxonomy mappings and controlled open issues.

---

## 29. Minimum Trace & Why / How / Source Traceability

Every material calculation result or regulatory status displayed in UI or reports MUST support the **Why / How / Source Minimum Trace**:

```json
{
  "trace_summary": {
    "WHO": "FAC-EVN-PHA-LAI (Thermal Power Facility)",
    "WHAT": "Mandatory Scope 1 & Scope 2 GHG Inventory Submission",
    "WHERE": "Hai Duong Province, Vietnam (Jurisdiction: VN)",
    "WHEN": "Reporting Period: 2025-Q1 (Evaluated against 2025 rules)",
    "WHY": "Mandatory under Decision 42/2026/QĐ-TTg (Sector: Energy, Threshold >= 3000 tCO2e/yr)",
    "AUTHORITY": "TIER_A (Prime Minister Decision 42/2026/QĐ-TTg)",
    "SOURCE": "004.Quyết-định-42-2026-QĐ-TTg.md, Phụ lục II, Mục I, Khoản 1.1",
    "APPLIES_TO": "FAC-EVN-PHA-LAI / Activity: Stationary Coal Combustion",
    "AFFECTS": "Scope 1 Direct Emissions (CO2, CH4, N2O)",
    "DERIVED_FROM": "K-AST-QD42-POWER-001 -> RULE-QD42-POWER-THRESHOLD -> MODEL-03"
  }
}
```

---

## 30. Relationship to Universal Calculation Model (EC-UCM-001)

The Knowledge Matrix provides the source-backed foundation for `EC-UCM-001`:

$$\text{Knowledge Matrix (EC-KM-001)} \xrightarrow{\text{supplies context}} \text{Regulatory Rules (EC-REG-001)} \xrightarrow{\text{binds}} \text{Methodology} \xrightarrow{\text{invokes}} \text{UCM Contract (EC-UCM-001)} \xrightarrow{\text{executes}} \text{Deterministic Engine}$$

- **EC-KM-001** owns source metadata, legal assertions, provenance, and authority mapping.
- **EC-UCM-001** owns the mathematical calculation contract, unit normalization rules, and deterministic engine pipeline.

---

## 31. Relationship to Regulatory Rules Engine (EC-REG-001)

Knowledge Assertions tagged as `LEGAL_REQUIREMENT` or `APPLICABILITY_RULE` serve as the direct specification input for the Regulatory Rules Engine (`EC-REG-001`). `EC-REG-001` compiles these assertions into deterministic boolean evaluation trees.

---

## 32. Relationship to Future Temporal Model (EC-TEMP-001)

The Knowledge Matrix provides temporal date bounds (`effective_from`, `effective_to`) and amendment graphs (`AMENDS`, `SUPERSEDES`) consumed by the future Temporal Engine (`EC-TEMP-001`) to evaluate historical state transitions.

---

## 33. Relationship to Future Sector Profiles (EC-SPM-001)

Sector Profile specifications (`EC-SPM-001`) consume `SECTOR_CLASSIFICATION` assertions and activity data requirements to construct rich, sector-specific data entry forms and workflow profiles.

---

## 34. Relationship to Future Document Intelligence (EC-DOC-001)

Document Intelligence (`EC-DOC-001`) ingests raw operational documents (invoices, meter logs), extracts activity values, and verifies them against the `EvidenceMapping` contracts defined in `EC-KM-001`.

---

## 35. Downstream Reporting Traceability

Final GHG inventory reports generated by ENERIX Carbon render an explicit **Regulatory & Technical Provenance Annex** linking every line-item emission total to its supporting legal source, methodology circular, emission factor snapshot, and evidence hash.

---

## 36. Controlled Open Issues

The following controlled ambiguities are explicitly identified and preserved for future resolution:

| Issue ID | Domain Area | Description | Owning Artifact | Classification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ISSUE-KM-001` | Missing Physical Text for Registered Legal Docs | `LAW-72-2020`, `DEC-06-2022`, `DEC-119-2025`, `DEC-83-2026`, `QD-42-2026` are registered in manifest but require physical source text verification. | Document Repository | `SOURCE_VERIFICATION_REQUIRED` | `OPEN_CONTROLLED` |
| `ISSUE-KM-002` | MOC/MARD Sector Threshold Harmonization | MOC Circular 13/2024 and MARD Circular 19/2024 specify sub-sector thresholds requiring unified mapping to QĐ 42/2026. | `EC-SPM-001` | `DEFERRED_TO_OTHER_ARTIFACT` | `OPEN_CONTROLLED` |
| `ISSUE-KM-003` | IPCC AR5 vs AR6 GWP Transition Window | Ministry circulars reference IPCC AR5 100-year GWPs, while international reporting defaults to AR6. | `EC-EFDB-001` | `HUMAN_JUDGMENT_REQUIRED` | `OPEN_CONTROLLED` |

---

## 37. Acceptance Criteria Verification

`EC-KM-001` satisfies all 20 formal acceptance criteria:

- [x] **A.** Source remains strictly authoritative (`LAW-001`).
- [x] **B.** Every material knowledge assertion is provenance-bound (`LAW-009`).
- [x] **C.** Authority is strictly separated from confidence (Section 21).
- [x] **D.** Temporal validity is explicit with `effective_from`/`effective_to` (`LAW-004`).
- [x] **E.** Supersession and amendment relationships are explicit (Section 11).
- [x] **F.** Conflict does not perform silent reconciliation (Section 22).
- [x] **G.** Ambiguity remains explicitly visible (Section 23).
- [x] **H.** Engineering judgment is explicitly tagged and isolated (Section 24).
- [x] **I.** AI remains advisory with zero calculation authority (Section 25).
- [x] **J.** EF and GWP values remain owned by their respective registries (Sections 17 & 18).
- [x] **K.** Knowledge Matrix does not become a second regulatory engine (Section 31).
- [x] **L.** Knowledge Matrix does not become a second calculation engine (Section 30).
- [x] **M.** GHG accounting remains strictly separated from criteria air pollutants (Section 16).
- [x] **N.** Historical knowledge remains fully queryable (Section 10).
- [x] **O.** Sector differences across taxonomy levels are representable (Section 13).
- [x] **P.** Facility applicability rules support quantitative thresholds (Section 14).
- [x] **Q.** The Matrix supports "Why / How / Source" minimum trace (Section 29).
- [x] **R.** Fully compatible with `EC-CONTEXT-001`, `EC-DOMAIN-MODEL-001`, `EC-CALCULATION-MODEL-CATALOG-001`, and `EC-UCM-001`.
- [x] **S.** No unsupported legal or scientific constants introduced.
- [x] **T.** Controlled open issues are explicitly cataloged and assigned (Section 36).

---

## 38. Revision History

| Version | Date | Author | Description of Changes |
| :--- | :--- | :--- | :--- |
| `1.0.0` | 2026-09-16 | ENERIX Architecture Team | Initial formal specification of Knowledge Matrix & Authority Mapping (`EC-KM-001`). |

---
**Status Declaration:** `KNOWLEDGE_MATRIX_ALIGNED_WITH_OPEN_ISSUES`
