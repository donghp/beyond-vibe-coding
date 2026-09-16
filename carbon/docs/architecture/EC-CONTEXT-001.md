---
document_id: "EC-CONTEXT-001"
title: "ENERIX Carbon — Master Architecture & Context Specification"
product: "ENERIX Carbon"
version: "1.1.0"
status: "APPROVED_BASELINE"
effective_date: "2026-09-16"
governing_documents:
  - "ENERIX-CARBON-BASE-LOGIC-001.md"
  - "ENERIX-CARBON-GOVERNING-FRAMEWORK-001.md"
  - "ENERIX-CARBON-REGULATORY-REGISTRY-001.yaml"
---

# ENERIX Carbon — Master Architecture & Context Specification
## EC-CONTEXT-001

> **Core System Principle:** ENERIX Carbon is a regulatory-aware, methodology-driven, sector-adaptive, evidence-bound and deterministic carbon engineering platform. It is an auditable engineering platform, not a simple calculator or generic dashboard.

---

## 1. Product Identity & Purpose

**ENERIX Carbon** is designed specifically for Vietnamese organizations, facilities, industrial operations, and carbon projects to meet strict national greenhouse-gas (GHG) reporting obligations and international MRV (Measurement, Reporting, Verification) standards.

### Key Objectives
1. **Regulatory Obligation Determination:** Automatically evaluate facility applicability against national laws (Decrees 06/2022, 119/2025, 83/2026; Decision 42/2026/QĐ-TTg).
2. **Standardized Activity Data Normalization:** Ingest, structure, and validate activity inputs across 6 official sectors (Energy, Transport, Construction, Industrial Processes, Agriculture/Forestry/Land Use, Waste).
3. **Methodology Binding & Model Resolution:** Dynamically bind activity data to ministry circulars (MOIT Circular 38/2023, MOC Circular 13/2024, MARD Circular 19/2024, MONRE Circular 17/2022) and international standards (TCVN ISO 14064-1/2/3:2025, GHG Protocol).
4. **Deterministic Calculation Execution:** Perform verifiable, arithmetic emissions calculations across all scopes and gases (CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃).
5. **Full Traceability & Provenance:** Maintain an immutable audit chain from Final CO₂e Result → Calculation Run → Activity Data → Emission Factor → Methodology → Regulatory Rule → Source Legal Instrument → Verification Evidence.

---

## 2. The 15 Non-Negotiable Engineering Laws

Every module, component, function, and interface in ENERIX Carbon MUST adhere strictly to the following 15 Engineering Laws:

| Law ID | Law Name | Core Engineering Rule |
| :--- | :--- | :--- |
| **LAW-001** | **Legal Source is Not an AI Answer** | AI LLM outputs are advisory only; legal sources MUST link to official, structured regulatory documents. |
| **LAW-002** | **Formula is Not an Emission Factor** | Calculation formulas and numerical emission factors are distinct domain entities with separate lifecycle and provenance. |
| **LAW-003** | **Example is Not a Universal Factor** | Illustrative values from textbooks or sample reports cannot be used as default factors without regulatory backing. |
| **LAW-004** | **Current Law is Time-Dependent** | Applicability is evaluated against temporal ranges (`effective_from`, `effective_to`), never static boolean flags. |
| **LAW-005** | **Historical Calculations are Immutable** | Completed calculation runs freeze all factors, rules, and parameters used into an immutable historical record. |
| **LAW-006** | **AI is Advisory; Engine is Authoritative** | AI assists in text extraction and navigation; arithmetic execution is 100% deterministic code. |
| **LAW-007** | **No Silent Substitution of Missing Values** | Missing data or factors must produce explicit validation errors or warnings, never silent default assumptions. |
| **LAW-008** | **No Hard-Coded Emission Factors / GWPs** | All factors and GWP datasets must be loaded dynamically from versioned registry datasets. |
| **LAW-009** | **Every Result Requires Full Provenance** | Every output metric must maintain an explicit, unbroken lineage trace back to source documents and evidence. |
| **LAW-010** | **Regulatory Applicability Precedes Methodology** | Legal inventory obligation must be determined prior to technical methodology selection. |
| **LAW-011** | **Methodology Precedes Calculation Execution** | A valid methodology contract must be bound before any numerical calculation engine executes. |
| **LAW-012** | **Architecture Must Survive DB Migration** | Repository-native JSON/YAML schema must directly mirror relational PostgreSQL/Supabase database tables. |
| **LAW-013** | **Sector Taxonomy Preserves Regulatory Mapping** | Sub-sectors and activities must map to the 6 official sector groups established in Decision 42/2026/QĐ-TTg. |
| **LAW-014** | **Evidence & Source Traceability Required** | Calculation inputs must link to physical evidence artifacts (invoices, meter logs, test certificates). |
| **LAW-015** | **Temporal Date Bounds for Regulation** | Rule evaluation strictly compares reporting period start/end dates against rule effective dates. |

---

## 3. Authority Separation Architecture

To prevent authority corruption or hallucination, ENERIX Carbon enforces strict separation across four distinct authorities:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          1. LEGAL AUTHORITY                            │
│  Answers: "Which legal instrument and rule applies to this facility?"  │
│  Sources: Decrees 06/2022, 119/2025, 83/2026; Decision 42/2026/QĐ-TTg   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Evaluates Applicability
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      2. METHODOLOGY AUTHORITY                          │
│  Answers: "Which technical MRV method and formula must be used?"      │
│  Sources: Circulars 38/2023, 13/2024, 19/2024; ISO 14064; GHG Protocol │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Binds Model & Factors
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      3. CALCULATION AUTHORITY                          │
│  Answers: "What is the exact deterministic numerical emissions result?"│
│  Engine: Pure JavaScript execution engine (No AI, No stochastic logic) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Generates Provenance Trace
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          4. AI ASSISTANCE                              │
│  Answers: "How can the user discover, interpret, and navigate data?"   │
│  Scope: Text search, document Q&A, data extraction (Strictly Advisory) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Repository-Native Architecture

ENERIX Carbon operates as a **zero-backend, repository-native application**.

- **Source Knowledge:** Stored in structured Markdown, YAML, and JSON files inside `/carbon/data`, `/carbon/regulatory`, `/carbon/knowledge`, and `/carbon/evidence`.
- **Client Engine:** Pure client-side JavaScript execution engine running in the browser.
- **Persistence:** Local browser state (`localStorage` / `IndexedDB`) for user inputs and custom runs.
- **Relational Compatibility:** Every file-based schema is strictly normalized to allow seamless migration to PostgreSQL / Supabase if backend infrastructure is added in the future (LAW-012).

---

## 5. Domain Model Summary (10 Core Entities)

The system models 10 core domain entities:

1. **RegulatoryDocument:** Legal instruments (Laws, Decrees, Decisions, Circulars).
2. **RegulatoryRule:** Granular legal applicability rules with temporal validity (`effective_from`, `effective_to`).
3. **Facility:** Regulated industrial or commercial sites with sector classifications and geographical attributes.
4. **ActivityData:** Metered or recorded inputs (e.g., kWh electricity, liters diesel, tonnes coal).
5. **EmissionFactor:** Versioned emission factors linked to authoritative sources (MONRE, IPCC, EFDB).
6. **GwpDataset:** Global Warming Potential values per gas (IPCC AR4, AR5, AR6).
7. **Methodology:** Approved MRV methodology guidelines (MOIT, MOC, MARD, MONRE, ISO).
8. **CalculationModel:** Abstract calculation contracts defining inputs, formulas, and parameters (MODEL-01 to MODEL-10).
9. **Evidence:** Physical/digital documentation verifying activity data and parameters (utility bills, calibration certificates).
10. **CalculationRun:** Immutable execution records storing calculated results, intermediate steps, and complete provenance snapshots.

---

## 6. Calculation Model Catalog (10 Standard Models)

ENERIX Carbon standardizes calculation logic into 10 explicit model classes:

- **MODEL-01 SIMPLE_FACTOR:** $E = AD \times EF$
- **MODEL-02 FACTOR_WITH_CONVERSION:** $E = AD \times EF \times Conversion$
- **MODEL-03 MULTI_GAS:** $E_{gas} = AD \times EF_{gas}$; $CO_2e = \sum (E_{gas} \times GWP_{gas})$
- **MODEL-04 PARAMETERIZED:** $E = f(AD, Parameters, EF_{basis})$
- **MODEL-05 COMPOSITE:** $E_{total} = \sum SubModel_i$
- **MODEL-06 DYNAMIC:** $E_t = f(Stock_t, Decay_k, Rate_r)$
- **MODEL-07 PROJECT_REDUCTION:** $ER = Baseline\_E - Project\_E - Leakage\_E$
- **MODEL-08 MASS_BALANCE:** $E = Mass_{In} - Mass_{Out} - Mass_{Accumulated}$
- **MODEL-09 MEASUREMENT_BASED:** $E = Concentration \times FlowRate \times Hours$
- **MODEL-10 ENERGY_FLOW_CONVERSION:** $E = Volume \times NCV \times CC \times OF \times EF$

---

## 7. Traceability & Provenance Standard

Every calculation output in ENERIX Carbon generates a structured provenance object containing:
- `calculation_id`
- `timestamp`
- `facility_id`
- `reporting_period`
- `model_id` & `model_version`
- `methodology_id` & `methodology_version`
- `regulatory_rule_id` & `regulatory_document_ref`
- `activity_data_ref` & `evidence_id`
- `emission_factor_id` & `factor_source`
- `gwp_dataset_id`
- `intermediate_steps`
- `audit_hash`
