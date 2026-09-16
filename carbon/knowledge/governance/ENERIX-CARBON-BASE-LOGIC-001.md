---
document_id: "EC-BASE-001"
title: "ENERIX Carbon — Official Base Logic"
product: "ENERIX Carbon"
version: "1.0"
status: "BASELINE"
baseline_date: "2026-09-16"
primary_regulatory_source: "42/2026/QĐ-TTg"
secondary_regulatory_sources:
  - "06/2022/NĐ-CP"
  - "119/2025/NĐ-CP"
  - "83/2026/NĐ-CP"
primary_source_file: "004.Quyết-định-42-2026-QĐ-TTg.md"
---

# ENERIX Carbon — Official Base Logic

## 1. Purpose

This document defines the engineering Base Logic for ENERIX Carbon as derived from the Vietnamese regulatory source set, with **Decision 42/2026/QĐ-TTg** as the current regulatory classification baseline for facilities required to perform greenhouse-gas inventories.

The signed legal instruments remain the authoritative legal sources. This document is an **engineering representation** of those sources for application logic, data modelling, validation, traceability and reporting.

## 2. Product Identity

**Product:** ENERIX Carbon

**Purpose:** Regulatory-aware greenhouse-gas inventory and emissions engineering platform for Vietnamese organizations, facilities and projects.

**Deployment model for demo:** repository-native / static application; no mandatory server database.

**Production principle:** the calculation engine must be deterministic, versioned and evidence-bound.

## 3. Regulatory Classification Baseline

### 3.1 Current Decision

Decision **42/2026/QĐ-TTg**, dated 10 August 2026, issues the updated list of sectors and emission facilities required to conduct greenhouse-gas inventories.

Effective date: **25 September 2026**.

The Decision expressly references Decree 06/2022/NĐ-CP as amended by Decree 119/2025/NĐ-CP and Decree 83/2026/NĐ-CP.

### 3.2 Supersession

Decision **13/2024/QĐ-TTg** ceases to have effect when Decision 42/2026/QĐ-TTg takes effect.

ENERIX Carbon must therefore support temporal applicability rather than a single boolean current flag.

Recommended rule model:

```text
RegulatoryRule
    + effective_from
    + effective_to
    + reporting_period
    + calculation_period
    + legal_source
```

### 3.3 Transitional handling

A facility that was included in the previous 2024 list but is not included in the updated 2026 list follows the transition rule stated in Decision 42/2026/QĐ-TTg. The application must therefore distinguish:

- historical obligation;
- current obligation;
- future reporting obligation;
- transitional status.

The engine must never overwrite historical regulatory status merely because a new list becomes effective.

## 4. Mandatory Inventory Sector Taxonomy

Decision 42/2026/QĐ-TTg establishes six sector groups in Appendix I:

1. **Energy**
   - Energy production industry
   - Energy consumption in industry, commerce, services and residential use
   - Coal mining
   - Oil and natural-gas extraction

2. **Transport**
   - Energy consumption in transport

3. **Construction**
   - Energy consumption in the construction sector
   - Industrial processes in construction-material production

4. **Industrial Processes**
   - Chemical production
   - Metal production
   - Electronics industry
   - Production and use of substitutes for ozone-depleting substances
   - Other industrial production and industrial processes identified by the regulation

5. **Agriculture, Forestry and Land Use**
   - Livestock
   - Forestry and land-use change
   - Crop production
   - Energy consumption in agriculture, forestry and fisheries
   - Other agricultural emission sources identified by the regulation

6. **Waste**
   - Solid-waste landfill
   - Biological treatment of solid waste
   - Wastewater treatment and discharge
   - Waste burning / incineration

These six groups are the primary **regulatory sector classification** used by ENERIX Carbon.

## 5. Facility Registry

Appendices II, III and IV contain the facility-level lists.

The system must model a facility as a first-class regulatory entity.

```text
Facility
├── facility_id
├── legal_name
├── address
├── province
├── sector_id
├── sub_sector_id
├── business_activity
├── regulatory_source
├── effective_from
├── effective_to
└── regulatory_status
```

The source list contains facility name, address and principal production/business activity. These fields are therefore part of the minimum regulatory master-data model.

## 6. Regulatory Status Engine

ENERIX Carbon must not use a permanent field such as only:

```text
is_mandatory_reporting = true
```

Instead use:

```text
FacilityRegulatoryStatus
├── facility_id
├── status
├── legal_source
├── effective_from
├── effective_to
├── reporting_period
├── reason
└── evidence
```

Recommended status values:

```text
MANDATORY
NOT_MANDATORY
TRANSITIONAL
HISTORICAL_MANDATORY
PENDING_EFFECTIVE_DATE
UNKNOWN_REQUIRES_REVIEW
```

## 7. Regulatory Decision Flow

```text
User / Facility
      ↓
Identify Facility
      ↓
Match Facility Registry
      ↓
Determine Sector
      ↓
Evaluate Regulatory Effective Date
      ↓
Evaluate Mandatory Inventory Status
      ↓
Determine Competent Authority
      ↓
Resolve Applicable Methodology
      ↓
Resolve Required Data
      ↓
Run Deterministic Calculation
      ↓
Generate Evidence / Trace
      ↓
Generate Regulatory Report
```

## 8. Authority Separation

ENERIX Carbon separates four authorities:

### Legal Authority
Answers: Which legal requirement applies?

### Methodology Authority
Answers: Which approved technical method applies?

### Calculation Authority
Answers: What is the deterministic numerical result?

### AI Assistance
Answers: How can the user discover, interpret and work with the knowledge and results?

AI must not silently replace the legal or calculation authority.

## 9. Source-of-Truth Rule

Each legal document is retained as a separate source artifact.

```text
Source Law / Decree / Decision / Circular
             ↓
Structured Regulatory Data
             ↓
Regulatory Rule
             ↓
Application Logic
```

No source document is overwritten by a later amendment.

For amendments, ENERIX Carbon maintains explicit relationships such as:

```text
AMENDS
AMENDED_BY
SUPERSEDES
REFERENCES
EFFECTIVE_FROM
EFFECTIVE_TO
```

## 10. Data Model — Regulatory Core

Minimum repository-native data objects:

```text
regulatory_documents
regulatory_articles
regulatory_relationships
regulatory_rules
regulatory_sector_classes
regulated_facilities
facility_regulatory_status
reporting_obligations
methodologies
methodology_versions
source_evidence
```

## 11. Repository-Native Mono DB

For the GitHub demo at: `https://donghp.github.io/beyond-vibe-coding/carbon/`

ENERIX Carbon operates without PostgreSQL or Supabase.

The legal Markdown documents are **source knowledge**, not executable code.

## 12. Deterministic Calculation Principle

Regulatory classification does not itself calculate emissions.

The calculation chain is:

```text
Regulatory Applicability
        ↓
Applicable Methodology
        ↓
Activity Data
        ↓
Parameters
        ↓
Emission Factor
        ↓
Gas-specific Emission
        ↓
GWP Dataset
        ↓
CO₂e
```

Generic abstraction:

```text
E_g = f(ActivityData, Parameters, EmissionFactor, Conversion, Methodology)

CO₂e = Σ(E_g × GWP_g)
```

## 13. Historical Reproducibility

Every completed calculation must be reproducible against its historical regulatory and master-data state.

Minimum calculation provenance:

```text
calculation_id
engine_version
regulatory_rule_version
methodology_version
factor_version
gwp_dataset_version
activity_data_version
evidence_refs
repository_commit
calculated_at
```

## 14. Facility Matching

Recommended matching states:

```text
EXACT_MATCH
CONFIRMED_MATCH
POSSIBLE_MATCH
NO_MATCH
REVIEW_REQUIRED
```

## 15. Regulatory Alerting

Alerts must be rule-driven: `EFFECTIVE_DATE_APPROACHING`, `MANDATORY_INVENTORY`, `TRANSITIONAL_STATUS`, `MISSING_REQUIRED_DATA`, `METHODOLOGY_NOT_RESOLVED`, `FACTOR_EXPIRED`, `EVIDENCE_MISSING`, `REPORTING_DEADLINE_APPROACHING`.

## 16. Architecture Principle — No Silent Legal Assumption

When the system cannot resolve a legal applicability rule with sufficient evidence, it must return `UNKNOWN_REQUIRES_REVIEW` rather than invent a result.

## 17. Canonical Relationship to Other Regulatory Sources

Decision 42/2026/QĐ-TTg is the current facility-list / mandatory-inventory classification source.

## 18. Engineering Rule

Never hard-code a legal classification or regulatory factor directly into UI code.

## 19. Baseline Declaration

As of 16 September 2026, ENERIX Carbon adopts Decision 42/2026/QĐ-TTg as the principal upcoming regulatory classification baseline for the 2026 updated mandatory-inventory facility list, effective 25 September 2026.
