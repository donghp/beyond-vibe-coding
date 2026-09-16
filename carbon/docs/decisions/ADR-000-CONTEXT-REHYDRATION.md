# ADR-000: Master Context Rehydration & Implementation Reconciliation

- **Status:** APPROVED
- **Date:** 2026-09-16
- **Authors:** ENERIX Carbon Architecture Working Group
- **Governing Specification:** ENERIX Carbon V1.1 Master Engineering Specification
- **Product:** ENERIX Carbon

---

## 1. Context & Problem Statement

During task `#0001_ENERIX_Carbon`, an initial foundation skeleton for ENERIX Carbon was established within `/carbon/`. While this skeleton implemented basic calculation stubs, regulatory data objects, and UI pages, it required formal rehydration and alignment against the comprehensive **ENERIX Carbon V1.1 Master Specification**.

To ensure that ENERIX Carbon remains a true **regulatory-aware, methodology-driven, sector-adaptive, evidence-bound and deterministic carbon engineering platform** rather than a casual dashboard or simple calculator, a formal context rehydration and implementation reconciliation process is required.

---

## 2. Decision Drivers

1. **Strict Authority Separation:** Must explicitly prevent AI LLM logic from acting as a legal or calculation authority.
2. **15 Non-Negotiable Engineering Laws:** Must enforce all 15 laws (LAW-001 through LAW-015) across code, data, and user interface.
3. **Temporal Regulatory Engine:** Must eliminate single-boolean `is_mandatory` flags in favor of temporal applicability evaluation with date bounds (`effective_from`, `effective_to`).
4. **Complete Model Taxonomy:** Must formalize all 10 calculation model contracts (MODEL-01 through MODEL-10).
5. **Traceability & Provenance:** Must guarantee unbroken lineage from final CO₂e results down to raw physical evidence and source legal instruments.

---

## 3. Decision Outcome

We decision to **rehydrate the complete context** and perform a **thorough reconciliation audit** of the existing `#0001` implementation.

### Approved Context Deliverables:
1. `/carbon/carbon-context-manifest.yaml`
2. `/carbon/docs/architecture/EC-CONTEXT-001.md`
3. `/carbon/docs/data-model/EC-DOMAIN-MODEL-001.yaml`
4. `/carbon/docs/methodology/EC-CALCULATION-MODEL-CATALOG-001.yaml`
5. `/carbon/docs/architecture/EC-IMPLEMENTATION-AUDIT-001.md`
6. `/carbon/docs/architecture/EC-IMPLEMENTATION-STATUS-001.yaml`

---

## 4. Authority Matrix

| Domain / Question | Primary Authority | Secondary Reference | Prohibited Authority |
| :--- | :--- | :--- | :--- |
| **Legal Obligation & Status** | Signed Laws, Decrees, Decisions, Circulars | Structured `RegulatoryRule` | AI LLM Text Completion |
| **MRV Methodology & Formula** | Ministry Circulars, ISO 14064, GHG Protocol | `Methodology` YAML/JSON | hardcoded UI scripts |
| **Numerical Calculation** | Deterministic JavaScript Engine | Verified Model Contracts | Stochastic/LLM algorithms |
| **Knowledge & Discovery** | AI Assistance / Document Search | Keyword Search | Modifying calculations |

---

## 5. Consequences & Compliance

### Positive Consequences
- Guarantees 100% auditability and zero calculation hallucinations.
- Prepares system for effortless migration to PostgreSQL/Supabase (LAW-012).
- Ensures temporal accuracy during regulatory transitions (e.g. Decision 13/2024 -> Decision 42/2026/QĐ-TTg).

### Compliance
All future code edits, model extensions, and UI enhancements in `/carbon/` MUST strictly validate against the rehydrated context specifications created in this decision.
