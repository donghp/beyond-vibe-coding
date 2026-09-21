# ENERIX Carbon Effective-Date Engine Specification
# Version: 3.0.0
# Target Operation Year: 2027 Baseline

## 1. Objective
The Effective-Date Engine ensures that ENERIX Carbon selects and executes the correct regulatory rule set based on the applicable temporal context, jurisdiction, sector, and facility parameters, while strictly enforcing historical immutability.

---

## 2. Temporal & Effective-Date Resolution Logic

### Core Principles:
1. **Effective Date Primacy**: A rule is eligible for execution only if `as_of_date >= effective_from` and (`effective_to IS NULL OR as_of_date <= effective_to`).
2. **Future Effective Handling**: Rules with `effective_from > current_system_date` (e.g., Decision 42/2026/QĐ-TTg before its 2026-09-25 effective date) are classified as `FUTURE_EFFECTIVE`. They cannot be applied to production calculations unless an explicit test harness `as_of_date` simulator is activated.
3. **Controlled Simulation (`as_of_date`)**: The evaluation engine accepts an optional `as_of_date` parameter in test mode, allowing auditors and developers to simulate compliance posture at any historical or future point in time (e.g., testing 2027 mandates ahead of time).

---

## 3. Applicable-Rule Resolver Algorithm

When a calculation or compliance check is requested for a facility `F`, reporting period `P`, and date `D`:

1. **Input Context**:
   - `facility_id`: Identifier of reporting entity
   - `jurisdiction`: ISO country code (e.g., `"VN"`)
   - `sector`: Industrial sector (e.g., `"ENERGY"`, `"MANUFACTURING"`)
   - `reporting_year`: e.g., `2027`
   - `as_of_date`: Evaluation date `D` (defaults to current system date)

2. **Query Pipeline**:
   - Filter Official Source Registry and Rule Registry where `jurisdiction == VN` and `sector IN rule.applicability.sectors`.
   - Filter rules where `effective_from <= as_of_date` AND (`effective_to IS NULL OR effective_to >= as_of_date`).
   - If `as_of_date` is prior to a rule's `effective_from`, the rule is excluded from production resolution.

3. **Immutability Binding**:
   - Once a calculation is finalized for period `P`, the exact `rule_id` and `version` hashes used are immutably bound to the calculation record. Subsequent updates to emission factors or laws will generate new calculation runs rather than altering historical records.
