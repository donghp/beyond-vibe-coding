# ENERIX Carbon Regulatory Update Lifecycle Specification
# Version: 3.0.0
# Target Operation Year: 2027 Baseline

## 1. Overview
The ENERIX Carbon Regulatory Update Lifecycle defines the rigorous, step-by-step state machine required to ingest, analyze, test, and promote legal and regulatory changes originating from official sources (such as `vanban.chinhphu.vn`) into production calculation and reporting engines.

No new regulation or rule update may directly alter production calculation results or compliance behavior without traversing this complete lifecycle.

---

## 2. Regulatory Update Lifecycle States

```
DISCOVER
  ↓
INGESTED
  ↓
PARSED
  ↓
CHANGE_DETECTED
  ↓
IMPACT_ANALYSIS
  ↓
RULE_DRAFT
  ↓
REVIEW_REQUIRED
  ↓
TESTED
  ↓
APPROVED
  ↓
PROMOTED
  ↓
ACTIVE (Production Runtime)
  ↓ [Superseded by newer regulation]
SUPERSEDED / REPEALED
```

### State Definitions:
1. **DISCOVER**: New official document or amendment published on `vanban.chinhphu.vn` or authorized gazettes.
2. **INGESTED**: Document metadata, official PDF attachment, and provenance hashes securely fetched and stored in the Official Source Registry.
3. **PARSED**: Document sections, articles, effective dates, and numerical thresholds extracted into structured text and semantic tokens.
4. **CHANGE_DETECTED**: Automated diff engine compares parsed text against existing active rules, identifying additions, modifications, or revocations.
5. **IMPACT_ANALYSIS**: System classifies impact across system domains (Content, Regulatory Content, Workflow, Data Model, Rule Engine, Calculation, Reporting, Master Data, Parameter Change).
6. **RULE_DRAFT**: Engineers/Compliance officers draft executable rule definitions in YAML/TypeScript matching the regulation.
7. **REVIEW_REQUIRED**: Mandatory peer review and legal/compliance expert sign-off.
8. **TESTED**: Rule executed against test harness with historical datasets, regression suites, and `as_of_date` simulation (including future effective date testing).
9. **APPROVED**: Compliance committee sign-off.
10. **PROMOTED**: Rules staged for upcoming effective date release.
11. **ACTIVE**: Rule active in production for reporting periods matching its effective window.
12. **SUPERSEDED**: Replaced by a newer active regulation; retained for historical query and immutability.
13. **REPEALED**: Formally revoked without replacement.

---

## 3. AI Governance & Autonomous Boundaries

### Permitted AI Capabilities:
- **DISCOVER**: Scanning portal feeds or OCR indexes for new publications.
- **SUGGEST**: Proposing initial structured metadata and rule drafts from raw legal texts.
- **TRANSLATE**: Assisting bilingual terminology alignment.
- **EXPLAIN**: Summarizing legal impacts for compliance officers.
- **RELATE**: Linking new circulars to parent decrees and affected sectors.
- **DETECT**: Highlighting delta changes between document versions.

### Strictly Prohibited Autonomous AI Actions (Human-in-the-Loop Required):
- **CANONICALIZE**: AI may not independently declare a document official source of truth.
- **FREEZE**: AI may not freeze or unfreeze compliance baselines.
- **DEPRECATE**: AI may not retire or deprecate active regulatory rules.
- **RETIRE**: AI may not archive historical records.
- **REDEFINE**: AI may not redefine legal definitions or emission thresholds.
- **PROMOTE**: AI may **NEVER** autonomously promote drafted rules to ACTIVE production status. All promotions require manual cryptographic or multi-signature human approval.

---

## 4. Historical Immutability & Temporal Guardrails
- Calculations performed for reporting year `Y` are permanently bound to the exact rule version active at the calculation timestamp (`as_of_date`).
- Future effective rules (e.g., Decision 42/2026/QĐ-TTg prior to 2026-09-25) are stored in `FUTURE_EFFECTIVE` state and cannot contaminate historical calculations.
