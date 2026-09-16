---
artifact_id: EC-FRM-001
artifact_type: ENERIX Carbon Governing Framework
version: 1.0.0
status: draft-for-engineering-baseline
effective_date: 2026-09-16
product: ENERIX Carbon
runtime_target: https://donghp.github.io/beyond-vibe-coding/carbon/
architecture_mode: repository-native / zero-backend demo
purpose: >
  Canonical engineering framework for turning Vietnamese GHG regulatory sources,
  technical methodologies, standards, master data, evidence and deterministic
  calculation rules into an auditable, versioned carbon calculation product.
source_of_truth_policy: >
  Original legal/standard documents remain authoritative. Markdown/YAML artifacts
  are machine-readable derivatives and structured engineering interpretations.
---

# ENERIX Carbon — Governing Framework
## EC-FRM-001

> **Product principle:** ENERIX Carbon is an engineering system, not a calculator page.
> Its job is to convert authoritative knowledge into reproducible, explainable and auditable calculations.

## 1. Canonical product objective

ENERIX Carbon shall support:
1. regulatory applicability and obligation determination;
2. GHG inventory data collection and normalization;
3. methodology and calculation-rule selection;
4. deterministic calculation of gas-specific emissions and CO2e;
5. project/baseline/reduction calculations where applicable;
6. evidence, provenance, quality and uncertainty tracking;
7. reporting and verification-ready outputs;
8. future integration with energy, SCADA, IoT, Solar, BESS and ENERIX FIN.

## 2. Authority hierarchy

The system MUST preserve the distinction between five authority classes:

```text
LAW / DECREE / DECISION / CIRCULAR → LEGAL / REGULATORY REQUIREMENT
TECHNICAL STANDARD / MINISTRY METHODOLOGY → CALCULATION / MRV METHOD
EMISSION FACTOR / GWP / UNIT DATASET → NUMERICAL PARAMETER
DETERMINISTIC ENGINE → EXECUTED RESULT
EVIDENCE / VERIFICATION RECORD → PROVABILITY OF RESULT
```

Neither an LLM answer nor a copied example is a calculation authority.

## 3. Source classes

- Vietnamese legal sources: Law 72/2020/QH14, Decrees 06/2022, 119/2025, 83/2026; Decisions 42/2026, 263/2026.
- Ministry technical methodologies: Circulars 38/2023 (MOIT), 13/2024 (MOC), 19/2024 (MARD), 17/2022 (MONRE).
- Standards / references: TCVN ISO 14064-1/2/3:2025, GHG Protocol Corporate Standard, GHG Protocol VN Handbook.

## 4. Temporal law model

ENERIX Carbon MUST NOT use `latest_document_wins` as the sole rule.
Every regulatory rule MUST have `effective_from`, `effective_to`, `transition_rule`, `reporting_period_rule`.

## 5. Regulatory object model

The canonical legal-data graph is `RegulatoryInstrument` (Document, Article, Clause, Appendix, AmendmentRelationship, SourceEvidence) and `RegulatoryRule` (ApplicabilityCondition, Obligation, RequiredData, MethodologyRef, ValidationRule, EvidenceRequirement).

## 6. Facility compliance model

Facility regulatory status MUST be historical and versioned.

## 7. Methodology model

A methodology defines authority, legal basis, version, applicability, boundary rules, data requirements, calculation models, QA/QC, uncertainty, and reporting/evidence rules.

## 8. Calculation model & Classes

Universal abstraction:
`GasEmission_g = f(ActivityData, Parameters, EmissionFactor, Conversion, Methodology)`
`CO2e = Σ(GasEmission_g × GWP_g)`

Model Classes:
- `MODEL-01 SIMPLE_FACTOR`: AD × EF
- `MODEL-02 FACTOR_WITH_CONVERSION`: AD × EF × conversion
- `MODEL-03 MULTI_GAS`: gas-specific results → GWP → CO2e
- `MODEL-04 PARAMETERIZED`: f(AD, parameters, EF basis)
- `MODEL-05 COMPOSITE`: Σ(sub-model results)
- `MODEL-06 DYNAMIC`: time-dependent / stock-flow / decay model
- `MODEL-07 PROJECT_REDUCTION`: baseline - project / approved reduction

## 9. Non-negotiable engineering laws

- LAW-01: Legal source is not an AI answer.
- LAW-02: Formula is not an emission factor.
- LAW-03: Example is not a universal factor.
- LAW-04: Current law is time-dependent.
- LAW-05: Historical calculations are immutable snapshots.
- LAW-06: AI is advisory; deterministic engine is authoritative for arithmetic.
- LAW-07: No silent substitution of missing values.
- LAW-08: No hard-coded emission factors or GWP values.
- LAW-09: Every material result requires provenance.
- LAW-10: Regulatory applicability precedes methodology selection.
- LAW-11: Methodology selection precedes calculation execution.
- LAW-12: Product architecture must survive migration from repository data to PostgreSQL/Supabase.
