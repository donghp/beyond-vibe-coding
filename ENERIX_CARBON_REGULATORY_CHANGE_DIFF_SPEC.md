# ENERIX Carbon Regulatory Change & Diff Specification
# Version: 3.0.0
# Target Operation Year: 2027 Baseline

## 1. Objective
To formally represent and track structural changes between regulatory versions, ensuring transparency when laws, decrees, circulars, or emission factor baselines are updated.

---

## 2. Change Diff States
Every regulatory update produces a structural diff classified into one of the following states:

1. **ADDED**: A brand new rule, mandate, or emission category introduced by a new regulation (e.g., new reporting requirement under Decision 42/2026/QĐ-TTg).
2. **CHANGED**: Modification of an existing rule's threshold, emission factor, formula, or reporting deadline (e.g., amending Decree 06 via Decree 83/2026/NĐ-CP).
3. **REMOVED**: Deletion of a previously active requirement or exemption.
4. **EFFECTIVE**: Transition of a future-dated rule into active operational status upon reaching its effective date.
5. **SUPERSEDED**: Replacement of an older regulation by a newly enacted superior statute.
6. **REPEALED**: Formal revocation of a regulation without direct replacement.

---

## 3. Diff Audit Trail & Reporting Integration
- All regulatory diffs are recorded in the system audit log with cryptographic source hashes.
- Public Regulatory and Product Regulatory Check pages render these diffs to provide enterprise users with instant clarity on regulatory evolution for the 2027 operating baseline.
