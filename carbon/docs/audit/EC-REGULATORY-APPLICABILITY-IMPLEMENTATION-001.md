# ENERIX Carbon - Regulatory Applicability Engine Audit Report
## Document ID: EC-REGULATORY-APPLICABILITY-IMPLEMENTATION-001
## Status: REGULATORY_APPLICABILITY_IMPLEMENTATION_ALIGNED
## Verification Date: 2026-09-16

---

### 1. Executive Summary
This document registers the formal implementation and verification audit of the ENERIX Carbon **Regulatory Applicability Engine** under `/carbon/engine/regulatory-engine.js`. 

The implementation has been verified against the authoritative contracts:
*   **EC-RRM-001** (Regulatory Rule Model Specification)
*   **EC-TEMP-001** (Temporal Validity Model Specification)
*   **EC-SPM-001** (Sector Profile Model Specification)
*   **EC-KM-001** (Regulatory Knowledge Matrix Specification)

All **20 canonical verification scenarios** (TC-REG-01 to TC-REG-20) have passed with 100% algebraic, temporal, and structural integrity.

---

### 2. Architectural Alignment Map

| Specification Section | Core Structural Requirement | Implementation Mechanism in `regulatory-engine.js` |
| :--- | :--- | :--- |
| **EC-RRM-001 Section 4** | AST Inspectable Predicate Tree | Nested operator evaluates `AND`, `OR`, `NOT` recursively on conditions. |
| **EC-RRM-001 Section 5** | Three-Valued Logic (Kleene) | Leaf missing fields return `unknown`; `AND` / `OR` evaluate Kleene's truth tables safely. |
| **EC-RRM-001 Section 6** | Mandatory & Applicability Separation | `applicability_status` and `mandatory_status` returned as independent result fields. |
| **EC-TEMP-001 Section 4** | $[from, to)$ Left-closed, Right-open | `overlaps` validated via `(from <= end) && (to === null \|\| to > start)`. |
| **EC-TEMP-001 Section 6** | Straddling Period Review | Cross-boundary periods trigger `REQUIRES_REVIEW` and output structured segments. |
| **EC-SPM-001 Section 3** | Taxonomy Mapping States | Mappings evaluated through `TAXONOMY_REGISTRY` mapping states (`EXACT`, `MAPPED`, `PARTIAL`, `AMBIGUOUS`). |
| **EC-SPM-001 Section 5** | Incomplete & Ambiguous Mappings | Mapping state `PARTIAL` or `AMBIGUOUS` triggers administrative review (`REQUIRES_REVIEW`). |

---

### 3. Rule Predicate AST Evaluation Architecture
The engine evaluates JSON-structured predicate ASTs without executing opaque code.
*   **Logical Nodes**: `AND`, `OR`, `NOT`
*   **Comparison Operators**: `EQUALS`, `NOT_EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN`, `LESS_THAN_OR_EQUAL`, `IN`, `NOT_IN`, `BETWEEN`, `EXISTS`, `NOT_EXISTS`
*   **Fail-Closed Principle**: If a required attribute path is missing in the `facilityContext`, evaluation returns `unknown` rather than defaulting to `false` or `not applicable`.

---

### 4. Temporal Validity Framework & Boundaries
The engine represents time in ISO-8601 strings, checking left-closed, right-open $[from, to)$ boundaries.
*   **Exclusive `effective_to`**: Rules ending exactly on `period_start` (e.g., `2026-09-25`) are evaluated as inactive, preventing false overlaps.
*   **Straddle Split**: If a rule transition boundary lies inside the reporting period, the engine flags `REQUIRES_REVIEW` and returns structured segments for sequential chronological periods.

---

### 5. Multi-Ministry Conflicts & Overlaps
*   **`ISSUE-RRM-001` (Circular 13 vs Circular 17)**: If a facility has `is_dual_use_heat: true` under `SEC-03-CONSTRUCTION`, both MOC and MONRE rules are triggered. The engine detects this overlap, avoids arbitrary precedence, and halts execution returning `REQUIRES_REVIEW` with an explicit conflict warning.

---

### 6. Audit Traceability Matrix (20 Scenarios)

| Test ID | Scenario Name | Context Attributes | Expected Compliance Result | Verified Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-REG-01** | Clearly Applicable Rule | Sector Energy, Consumption = 1200 TOE | `APPLICABLE`, `MANDATORY` | **PASSED** |
| **TC-REG-02** | Clearly Non-applicable Rule | Sector Energy, Consumption = 500 TOE | `NOT_APPLICABLE`, `NOT_MANDATORY` | **PASSED** |
| **TC-REG-03** | Unknown Condition | Sector Energy, Consumption = null | `UNKNOWN`, `UNKNOWN` | **PASSED** |
| **TC-REG-04** | Requires-Review Condition | Sector Waste (Partial Mapping) | `REQUIRES_REVIEW`, `REQUIRES_REVIEW` | **PASSED** |
| **TC-REG-05** | Blocked Condition / Escalation | Sector Nonexistent (Unmapped) | `REQUIRES_REVIEW`, `REQUIRES_REVIEW` | **PASSED** |
| **TC-REG-06** | Mandatory/Applicability Separation | Sector Construction, Methodology Rule | `APPLICABLE`, `NOT_MANDATORY` | **PASSED** |
| **TC-REG-07** | Effective_From Boundary | Period ends before rule starts | Rule excluded from candidate set | **PASSED** |
| **TC-REG-08** | Effective_To Boundary | Period starts on/after rule expiry | Rule excluded from candidate set | **PASSED** |
| **TC-REG-09** | Open-ended Rule | null `effective_to` far in future | Overlaps and evaluates normally | **PASSED** |
| **TC-REG-10** | Straddling Period | Reporting period straddles start | `REQUIRES_REVIEW` + structured segments | **PASSED** |
| **TC-REG-11** | Historical Rule | Reporting Period 2025 | Selects active historical rule QD-13 | **PASSED** |
| **TC-REG-12** | Amended Rule Traceability | Metadata reference check | Rule preserves link to superseded rule | **PASSED** |
| **TC-REG-13** | Replaced Rule Progression | Progression link check | Rule preserves link to replacing rule | **PASSED** |
| **TC-REG-14** | Conflicting Rules | Dual-use heat plant in Construction | `REQUIRES_REVIEW` + Multi-Ministry Conflict | **PASSED** |
| **TC-REG-15** | Ambiguous Sector Mapping | Sector Ambiguous (Multi-Code) | `REQUIRES_REVIEW` + Ambiguous Mapping | **PASSED** |
| **TC-REG-16** | Multi-Sector Facility | SEC-03-CONSTRUCTION | Maps correctly to internal codes | **PASSED** |
| **TC-REG-17** | Missing Jurisdiction | Jurisdiction omitted | Falls back to national VN candidates | **PASSED** |
| **TC-REG-18** | Missing Effective Date Rule | null effective date | Excluded from candidates (fails-closed) | **PASSED** |
| **TC-REG-19** | Provenance Failure | Missing facility ID context | Throws strict `FAIL_CLOSED` error | **PASSED** |
| **TC-REG-20** | Repeated Evaluation | Identical context evaluated 50x | Exact identical outcomes (deterministic) | **PASSED** |

---

### 7. Governance Log and Conclusion
The ENERIX Carbon Regulatory Applicability Engine satisfies all verification constraints. It operates as a deterministic, inspectable numerical and logical authority, preventing subjective or generative AI hallucinations of legal requirements.

**Final Implementation Alignment Status**: `REGULATORY_APPLICABILITY_IMPLEMENTATION_ALIGNED`
