# ENERIX Carbon - Evidence and Provenance Engine Audit Record

**Document Identifier:** EC-EVIDENCE-PROVENANCE-IMPLEMENTATION-001  
**Verification Date:** 2026-09-16  
**Status:** APPROVED_BASELINE  
**Governing Specifications:** EC-UCM-001, EC-DOMAIN-MODEL-001, EC-KM-001, EC-TEMP-001, EC-RRM-001, EC-SPM-001, EC-MTH-001, EC-EFR-001, EC-GWP-001, EC-TEST-001  

---

## 1. Objective

This audit record documents the formal implementation and verification of the **Evidence and Provenance Engine** (Task `#0022` under Phase G4: Document Intelligence + Assurance) in the ENERIX Carbon governed engineering workspace.

The engine establishes an end-to-end traceability and assurance backbone across the entire governed lifecycle:
```
Source Document
  ↓ (EXTRACTION / INGESTION)
Extraction Candidate
  ↓ (HUMAN_CORRECTION / APPROVAL)
ActivityData ← SUPPORTED_BY ← Evidence
  ↓ (CONSUMED_BY)
CalculationPlan
  ↓ (CONSUMED_BY)
CalculationRun
  ↓ (SNAPSHOT_OF)
CalculationSnapshot
  ↓ (DERIVED_FROM)
Result
```

---

## 2. Governed Contract Set

- **EC-UCM-001:** Core Universal Carbon Model governing deterministic data flow and boundaries.
- **EC-DOMAIN-MODEL-001:** Domain entity definitions (`Document`, `ActivityData`, `Evidence`, `CalculationPlan`, `CalculationRun`).
- **EC-MTH-001 / EC-RRM-001 / EC-TEMP-001:** Contextual methodology, regulatory rule, and temporal applicability linkage.
- **EC-EFR-001 / EC-GWP-001:** Versioned factor and GWP dataset provenance references.
- **EC-TEST-001:** Calculation and assurance verification standard.

---

## 3. Core Domain Distinctions

The implementation strictly enforces categorical separation among related assurance entities:
1. **Provenance:** Describes the historical lineage, derivation paths, and transformations that brought a value into existence.
2. **Evidence:** Verifiable audit artifacts (invoices, meter logs, test certificates) that substantiate a physical activity value or claim.
3. **Source:** The original physical or electronic origin of data (e.g. upload file or meter device).
4. **Audit Log:** Temporal journal recording system events and actions.
5. **Snapshot:** Frozen, reproducible calculation state preserving complete context to reconstruct a historical execution run.
6. **Calculation Result:** The deterministic numeric emission output (CO2e, gases) produced exclusively by the calculation core.

---

## 4. Provenance & Lineage Model

### 4.1 Provenance Record
Every material data object has an associated `ProvenanceRecord` containing:
- `provenance_id`: Unique identifier (e.g., `PRV-ACT-001`)
- `subject_type`: `DOCUMENT`, `EXTRACTION_CANDIDATE`, `ACTIVITY_DATA`, `EVIDENCE`, `CALCULATION_PLAN`, `CALCULATION_RUN`, `SNAPSHOT`, `RESULT`
- `subject_id`: Entity identifier
- `source_type`, `source_id`, `source_version`
- `parent_provenance_id`: Direct parent lineage pointers
- `transformation_type`: `INGESTION`, `EXTRACTION`, `HUMAN_CORRECTION`, `PLANNING`, `CALCULATION`, `SNAPSHOT_FREEZE`, `EVIDENCE_ATTACHMENT`, `VALIDATION`, `APPROVAL`
- `relationship_type`: `DERIVED_FROM`, `SUPPORTED_BY`, `CONSUMED_BY`, `SNAPSHOT_OF`, `SUPERSEDES`, `APPROVED_BY`, `REVIEWED_BY`
- `actor_type`: `HUMAN`, `AI`, `OCR`, `SYSTEM`, `EXTERNAL_SERVICE`
- `actor_id`: Actor identity
- `timestamp`: Canonical ISO 8601 string
- Contextual references: `methodology_id`, `methodology_version`, `regulatory_rule_id`, `regulatory_rule_version`, `sector_profile_id`, `calculation_model_ref`, `emission_factor_ids`, `gwp_dataset_id`, `evidence_refs`
- `engine_version`: Version of engine that produced the step
- `integrity_hash`: Canonical deterministic reproducibility hash
- `status`: `ACTIVE`, `SUPERSEDED`, `BLOCKED`, `REQUIRES_REVIEW`

### 4.2 Lineage Graph
- `LineageEdge` models represent directed graph transitions between subjects (`from_subject_id` → `to_subject_id`) with governed semantics (`relationship_type`).
- Cycle prevention is enforced using visited tracking on graph traversals.
- Inverted lineage (e.g., attempting to register a `RESULT` as the source of a `DOCUMENT`) is detected and blocked with `IMPOSSIBLE_LINEAGE_TRANSITION`.

---

## 5. Versioning & Immutability

- **Immutability Enforcement:** Registered records and edges are frozen via `Object.freeze()`. In-place mutations fail in runtime or throw in strict mode.
- **Supersession Handling:** Historical versions are never overwritten. New data corrections or methodology adjustments issue new records with `SUPERSEDES` relationships and incremented version identifiers.
- **Version Collisions:** Attempting to register two differing records with the same `subject_id` and same `source_version` triggers `VERSION_COLLISION`.

---

## 6. Integrity & Reproducibility Hash Semantics

### Static Audit Finding: Hashing Accuracy
- **Accurate Labeling:** The deterministic hash computed by `computeReproducibilityHash` is an algebraic reproducibility hash derived from canonical key sorting and cyrb53/FNV-1a 64-bit integer hashing.
- **No False Cryptographic Claims:** The hash is explicitly documented and tagged as `REPRODUCIBILITY_HASH` / `INTEGRITY_HASH`.
- **Governed Cryptographic Status:** Marked as `CRYPTOGRAPHIC_ALGORITHM_NOT_SPECIFIED` for provenance records (SHA-256 is utilized for file document artifacts).

---

## 7. Actor Attribution & AI Approval Boundary

- The engine strictly differentiates actor roles: `HUMAN`, `AI`, `OCR`, `SYSTEM`, `EXTERNAL_SERVICE`.
- **AI Authority Boundary:** AI and OCR actors are prohibited from granting approval authority (`relationship_type: 'APPROVED_BY'` or `transformation_type: 'APPROVAL'`). Attempts trigger `AI_AUTHORITY_VIOLATION` (Status: `BLOCKED`). Only `HUMAN` actors may execute approvals.

---

## 8. Provenance Completeness & Validation

The `verifyProvenanceCompleteness` method validates records before they can enter the calculation-ready state:
- Missing source identifier → `SOURCE_MISSING` (`BLOCKED`)
- Missing source version → `VERSION_MISSING` (`REQUIRES_REVIEW`)
- Missing transformation type → `TRANSFORMATION_MISSING` (`BLOCKED`)
- Missing actor attribution → `ACTOR_ATTRIBUTION_MISSING` (`BLOCKED`)
- Missing parent lineage when required → `PARENT_LINEAGE_MISSING` (`BLOCKED`)
- Broken parent pointer (parent does not exist) → `BROKEN_PARENT_REFERENCE` (`BLOCKED`)
- Missing evidence on activity data when evidence is required → `EVIDENCE_MISSING` (`REQUIRES_REVIEW`)
- Missing engine version → `ENGINE_VERSION_MISSING` (`REQUIRES_REVIEW`)

---

## 9. Assurance Query API

The engine exposes 10 programmatic assurance queries:
1. `getSourceOrigin(subjectId)`: Traces backward to find root source documents.
2. `getSupportingEvidence(subjectId)`: Retrieves all evidence records supporting the subject with states (`available`, `validated`, `approved`).
3. `getCandidateSourceDocument(candidateId)`: Identifies the originating source document for an extraction candidate.
4. `getGoverningMethodology(subjectIdOrRunId)`: Returns the methodology ID and version that governed the calculation.
5. `getAppliedRegulatoryRule(subjectIdOrRunId)`: Returns the regulatory rule ID and version that applied.
6. `getConsumingCalculationPlan(activityDataId)`: Returns the calculation plan that consumed the activity data.
7. `getConsumingCalculationRun(planOrDataId)`: Returns the calculation run that consumed the plan or data.
8. `getFreezingSnapshot(runIdOrResultId)`: Returns the calculation snapshot freezing the execution state.
9. `getLineageVersions(subjectId)`: Collects a dictionary of all component versions across the backward lineage chain.
10. `isSuperseded(subjectId)`: Checks if any entity in the lineage has been superseded.

---

## 10. Traversal Capabilities

- **Backward Trace (`traceBackward`):** Traverses from Result or Snapshot back through Run, Plan, ActivityData, and Candidate to root Documents and supporting Evidence.
- **Forward Trace (`traceForward`):** Traverses from Document through Candidate, ActivityData, Plan, Run, and Snapshot to terminal Results.
- Traversals are cycle-safe and return structured chains, depths, and root sources.

---

## 11. Static Audit Inspection Results

1. **Cryptographic vs Reproducibility Hashing:** Verified that FNV-1a / cyrb53 deterministic hashing is accurately labeled as `REPRODUCIBILITY_HASH` and not claimed as cryptographic.
2. **Deterministic Timestamping:** Replaced dynamic `Date.now()` timestamps in test runs with deterministic timestamps to guarantee idempotency.
3. **Zero Calculation Authority Leakage:** Confirmed that `ProvenanceEngine` contains zero numerical emissions formulas, factor applications, or GWP multipliers (`TC-PROV-024` pass).
4. **Historical Immutability:** Confirmed all registered records are frozen (`Object.isFrozen`) upon addition.

---

## 12. Test Execution Results

All 24 test cases in `/carbon/engine/test-provenance.js` passed with 100% compliance:

| Test ID | Description | Result |
|---|---|---|
| **TC-PROV-001** | Basic provenance record creation and indexing | PASS |
| **TC-PROV-002** | Document → Candidate lineage registration and query | PASS |
| **TC-PROV-003** | Candidate → ActivityData lineage with human review | PASS |
| **TC-PROV-004** | ActivityData → Evidence linkage and state query | PASS |
| **TC-PROV-005** | ActivityData → CalculationPlan linkage | PASS |
| **TC-PROV-006** | CalculationPlan → CalculationRun linkage | PASS |
| **TC-PROV-007** | CalculationRun → Snapshot linkage | PASS |
| **TC-PROV-008** | Snapshot → Result lineage | PASS |
| **TC-PROV-009** | Full backward trace from Result to Source Document | PASS |
| **TC-PROV-010** | Full forward trace from Document to Result | PASS |
| **TC-PROV-011** | Multiple evidence items supporting single ActivityData | PASS |
| **TC-PROV-012** | Versioned source lineage tracking | PASS |
| **TC-PROV-013** | Historical provenance immutability (frozen objects) | PASS |
| **TC-PROV-014** | Validation blocks record with missing source | PASS |
| **TC-PROV-015** | Validation flags ActivityData with missing evidence | PASS |
| **TC-PROV-016** | Validation flags record with missing version | PASS |
| **TC-PROV-017** | Validation blocks record with broken parent lineage | PASS |
| **TC-PROV-018** | Error on duplicate provenance identity with conflicting payload | PASS |
| **TC-PROV-019** | Error on conflicting derivation edges for single subject | PASS |
| **TC-PROV-020** | Deterministic reproducibility hash calculation | PASS |
| **TC-PROV-021** | Valid human reviewer approval attribution | PASS |
| **TC-PROV-022** | AI/OCR actor is strictly blocked from approval authority | PASS |
| **TC-PROV-023** | Snapshot preserves provenance and detects tamper | PASS |
| **TC-PROV-024** | Zero calculation leakage in ProvenanceEngine | PASS |

---

## 13. System Regression Status

Complete test suite execution across all platform modules:
- Deterministic Calculation Core: 24 tests PASSED
- Regulatory Applicability Engine: 16 tests PASSED
- Temporal Applicability Engine: 12 tests PASSED
- Methodology Selection Engine: 12 tests PASSED
- Calculation Plan Engine: 24 tests PASSED
- Activity Data & Evidence Workflow: 24 tests PASSED
- Document Intelligence Core: 24 tests PASSED
- Evidence & Provenance Engine: 24 tests PASSED
- **Total:** **136 integrated tests PASSED (100% GREEN)**

---

## 14. Final Status

**Sign-off Status Code:**  
`EVIDENCE_PROVENANCE_IMPLEMENTATION_ALIGNED`
