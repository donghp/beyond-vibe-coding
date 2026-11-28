# BVC RAG Failure Diagnosis and Evaluation Standard

**Document ID:** BVC-RAG-DIAG-STD-001  
**Version:** 0.1.0  
**Status:** Proposed research standard  
**Owner:** Dong Hong · Beyond Vibe Coding  
**Related research:** [Layer6 RAGEC external review](EXTERNAL_RESEARCH_REVIEW_LAYER6_RAG_ERROR_CLASSIFICATION.md)

## 1. Purpose

This standard defines how a BVC RAG implementation should record, diagnose, classify, prioritize, and verify failures.

It adopts the useful RAGEC idea of tracing an incorrect answer through intermediate pipeline artifacts, while extending the model to cover the wider production boundary: source governance, authorization, query processing, context assembly, post-generation verification, security, orchestration, and runtime.

The standard is intentionally version 0.1.0. It is a proposed BVC baseline, not an established industry standard.

## 2. Normative principles

1. **Evidence before labels.** A failure type must be supported by observable artifacts or an explicitly qualified human judgment.
2. **Separate outcome from cause.** Incorrect, incomplete, unsupported, unsafe, and unavailable are user-visible outcomes; they are not pipeline-stage names.
3. **Preserve causal structure.** Store the earliest demonstrated failure, root cause, contributing causes, and downstream symptoms separately.
4. **Allow multiple labels.** A single incident may contain several contributing error types, including errors from multiple stages.
5. **Keep uncertainty visible.** An LLM-generated label is a hypothesis until calibrated against validated examples or reviewed by a qualified human.
6. **Version the experiment.** Every result must be reproducible from its run manifest, source data, model versions, code, and configuration.
7. **Treat security separately.** Unauthorized disclosure, tenant crossing, and prompt injection are security incidents with severity and escalation requirements.
8. **Verify the intervention.** A fix is not accepted merely because a prompt or configuration changed; the original failure must be tested again.

## 3. Diagnostic taxonomy

### 3.1 Comparable RAGEC core

Retain RAGEC identifiers E1–E16 and meanings for comparison with the published work:

- Chunking: E1 Overchunking; E2 Underchunking; E3 Context Mismatch.
- Retrieval: E4 Missed Retrieval; E5 Low Relevance; E6 Semantic Drift.
- Reranking: E7 Low Recall; E8 Low Precision.
- Generation: E9 Abstention Failure; E10 Fabricated Content; E11 Parametric Overreliance; E12 Incomplete Answer; E13 Misinterpretation; E14 Contextual Misalignment; E15 Chronological Inconsistency; E16 Numerical Error.

Do not silently redefine these identifiers. If BVC needs a new category, allocate a BVC-specific identifier and describe its mapping to RAGEC where possible.

### 3.2 BVC production extensions

| BVC ID | Layer | Failure type | Example evidence |
|---|---|---|---|
| S0-01 | Source / corpus | Missing or incomplete source coverage | Required authoritative document is absent from the indexed corpus. |
| S0-02 | Source / corpus | Source authority conflict | A secondary or superseded source is treated as authoritative. |
| S0-03 | Source / corpus | Freshness / version failure | Retrieved document is expired, superseded, or outside its effective period. |
| S0-04 | Source / corpus | Extraction fidelity failure | OCR, table, layout, or parsing omitted or corrupted material. |
| S0-05 | Source / corpus | Index lifecycle inconsistency | Updated or deleted source is not reflected in all associated chunks/index records. |
| Q-01 | Query processing | Intent or constraint loss | Query rewrite or decomposition removes a date, entity, comparison, or condition. |
| Q-02 | Query processing | Ambiguity not resolved | System selects an interpretation without adequate evidence. |
| Q-03 | Query processing | Query transformation drift | Expanded or rewritten query changes the user's meaning. |
| C-01 | Context assembly | Evidence omitted | Relevant retrieved passage does not reach the generator. |
| C-02 | Context assembly | Token truncation | Passage, table, citation, or instruction is silently cut off. |
| C-03 | Context assembly | Evidence ordering / position failure | Evidence is present but ordering or compression harms its use. |
| C-04 | Context assembly | Source conflict not represented | Contradictory or differently dated sources are combined without resolution. |
| V-01 | Verification | Citation missing or invalid | Answer has no source, cites an unknown chunk, or cites a chunk not passed to the model. |
| V-02 | Verification | Claim-to-source mismatch | Citation exists but does not support the claim attached to it. |
| V-03 | Verification | Unsupported claim not caught | Post-generation validation fails to reject or flag unsupported claims. |
| SEC-01 | Security | Authorization leakage | A user receives evidence outside their access scope. |
| SEC-02 | Security | Tenant isolation failure | Evidence from another tenant is included in retrieval or generation. |
| SEC-03 | Security | Indirect prompt injection | Retrieved content is treated as privileged instruction. |
| SEC-04 | Security | Sensitive data disclosure | Personal, confidential, or restricted content is exposed improperly. |
| ORCH-01 | Orchestration | Tool-selection failure | Agent selects an irrelevant or unauthorized tool. |
| ORCH-02 | Orchestration | State / checkpoint inconsistency | A workflow resumes with stale, incomplete, or corrupted state. |
| ORCH-03 | Orchestration | Retry / termination failure | Retry loop, premature stop, or uncontrolled repeated tool calls. |
| OPS-01 | Runtime | Dependency or provider failure | Timeout, rate limit, model unavailable, or infrastructure failure. |
| OPS-02 | Runtime | Version / configuration drift | Model, prompt, tokenizer, index, or package version changes without controlled evaluation. |

These extension IDs are proposed BVC labels, not labels from the Layer6 paper.

## 4. Incident record

Each incident should have a stable ID and enough data to reconstruct what happened. Sensitive values should be redacted or pseudonymized.

Recommended fields:

| Field | Required | Purpose |
|---|---|---|
| incident_id | Yes | Stable ID for the failure case. |
| run_id / trace_id | Yes | Link the incident to a complete execution trace. |
| query_id | Yes | Stable identifier for the test query. |
| query_class | Yes | Factual, multi-hop, comparison, temporal, summary, unanswerable, etc. |
| outcome | Yes | Incorrect, incomplete, unsupported, wrong abstention, unsafe, unavailable, or operational failure. |
| first_observed_stage | Yes | Earliest stage with observable failure evidence. |
| root_cause | Yes / pending | Best-supported initiating or systemic cause; may remain unresolved. |
| contributing_labels | Yes | Zero or more RAGEC and BVC labels. |
| downstream_symptoms | Recommended | Later effects caused or amplified by upstream failure. |
| evidence_refs | Yes | Chunk IDs, source IDs, rankings, prompt/model references, logs, or screenshots. |
| confidence | Yes | High, medium, low, or unclassified, with rationale. |
| impact / severity | Yes | User, business, security, and operational impact. |
| intervention | After diagnosis | Controlled fix or mitigation. |
| regression_test_id | After remediation | Test proving the failure no longer reproduces under stated conditions. |
| reviewer / adjudication | Recommended | Human reviewer, decision, and review date. |

### 4.1 Example YAML record

```yaml
schema_version: "0.1.0"
incident_id: "RAG-INC-000123"
run_id: "run-2026-11-28-001"
trace_id: "trace-redacted-001"
query_id: "q-0042"
query_class:
  - temporal
  - multi_document
outcome: "incorrect"
first_observed_stage: "retrieval"
root_cause:
  status: "probable"
  label: "S0-03"
  explanation: "The index contains a superseded policy version."
contributing_labels:
  - "E4"
  - "C-04"
downstream_symptoms:
  - "E13"
evidence_refs:
  source_ids: ["policy-2025", "policy-2026"]
  document_versions: ["2025-01", "2026-01"]
  retrieved_chunk_ids: ["policy-2025-12"]
  context_chunk_ids: ["policy-2025-12"]
  prompt_version: "answer-v3"
  model_revision: "pinned-model-revision"
confidence:
  level: "medium"
  basis: "Trace confirms wrong source version; authority rule needs owner review."
severity:
  level: "high"
  rationale: "A policy answer can affect employee decisions."
intervention:
  status: "planned"
  action: "Rebuild index with effective-date and active-version filters."
regression_test:
  status: "pending"
  test_id: "rag-policy-version-0042"
review:
  status: "needs_human_review"
```

This example is illustrative; it is not a real incident.

## 5. Evidence collection by stage

### 5.1 Source and corpus

Record source identity, source authority, owner, source URI, retrieval time, effective date, document version, content hash, extraction status, permissions, deletion state, and indexing status.

A source record should be traceable to the chunks derived from it. A document update must not leave stale chunks active.

### 5.2 Chunking and parsing

Record parser and OCR versions, document structure, page/section/table identity, tokenizer name and revision, chunk size in the actual unit (tokens, words, characters, or structure units), overlap, chunk ID, source offsets, parent document ID, and extraction warnings.

Never record “128 tokens” if the implementation counts words. Unit semantics must be explicit.

### 5.3 Query processing and retrieval

Record original query, normalized query, rewritten/decomposed subqueries, filters, principal/tenant authorization scope, embedding model revision, vector normalization, similarity metric, candidate IDs, raw scores, ranks, and Top-K.

This information is required to distinguish:
- Evidence absent from the corpus.
- Evidence present in the corpus but lost during parsing/chunking.
- Evidence preserved but not retrieved.
- Evidence retrieved but ranked below the cutoff.
- Evidence filtered out by authorization or metadata rules.

### 5.4 Reranking and context assembly

Record original retrieval rank, reranker rank/score, candidate cutoff, selected IDs, final context order, token counts, context budget, truncation, compression, deduplication, and excluded-chunk reasons.

The diagnostic question is not only “Was the right chunk retrieved?” but also “Was the right evidence actually delivered to the generator?”

### 5.5 Generation and verification

Record system/developer prompt version, model and tokenizer revisions, generation settings, context IDs, raw answer, citations, claim-level evidence mapping where possible, validator output, abstention outcome, and latency/cost.

Evaluate correctness, completeness, faithfulness, relevance, citation validity, numerical/temporal consistency, and abstention separately. A single correctness label is insufficient for diagnosis.

## 6. Diagnostic procedure

1. **Confirm the outcome.** Determine whether the answer is wrong, incomplete, unsupported, unsafe, unanswerable, or operationally unavailable.
2. **Verify the reference.** Confirm that the ground-truth answer and supporting source are authoritative, current, and sufficient.
3. **Reconstruct the trace.** Recover the exact source versions, chunk IDs, retrieval candidates, ranks, reranker output, final context, prompt, and model versions.
4. **Test evidence preservation.** Determine whether the required information survived extraction and chunking.
5. **Test retrieval.** Measure whether relevant evidence appeared in the candidate set and at what rank.
6. **Test reranking.** Determine whether relevant candidates were demoted or removed, and whether irrelevant candidates were promoted.
7. **Test context assembly.** Inspect truncation, ordering, compression, source conflicts, and metadata preservation.
8. **Test generation.** Map each material answer claim to evidence; identify fabrication, misinterpretation, incompleteness, numerical/temporal error, or unjustified abstention.
9. **Check cross-cutting risks.** Review authorization, tenant boundaries, prompt injection, source freshness, state transitions, and runtime failures.
10. **Assign labels.** Record first observed failure, root-cause hypothesis, contributing labels, downstream symptoms, and confidence separately.
11. **Apply a controlled intervention.** Prefer one isolated change per experiment where feasible; define a regression test before changing the system.
12. **Verify and monitor.** Re-run the failing case and a representative regression set, then monitor for shifted error distributions or newly exposed downstream failures.

## 7. Evaluation protocol

### 7.1 Outcome evaluation

Do not collapse all response quality into one scalar. Maintain separate labels or measures for:
- Factual correctness.
- Completeness.
- Relevance to the query.
- Faithfulness to supplied evidence.
- Citation correctness and claim support.
- Abstention quality.
- Numerical and temporal correctness.
- Security and authorization compliance.

### 7.2 Retrieval and reranking metrics

Use appropriate metrics for the workload:
- Recall@K and evidence Recall@K.
- Precision@K.
- MRR and NDCG.
- Candidate coverage before reranking.
- Evidence retention after reranking.
- Query-class and source-domain breakdowns.

A high Recall@K does not prove that the final generator context contains sufficient evidence. A reranker can reduce recall while increasing precision; evaluate the actual trade-off.

### 7.3 Context and generation metrics

Include:
- Context precision and context recall.
- Relevant evidence coverage after truncation/compression.
- Faithfulness / claim support.
- Answer correctness and completeness.
- Citation precision, recall, and claim-to-source entailment.
- Abstention precision/recall or an equivalent risk-aware measure.
- Cost, latency, and token use per accepted task.

### 7.4 Evaluator quality

An LLM judge must itself be evaluated:
- Build a human-adjudicated gold subset stratified by domain and query class.
- Report agreement and confusion matrix, not just overall accuracy.
- Track false-positive and false-negative costs.
- Record model/version/prompt and temperature.
- Compare multiple judges or use deterministic checks where possible.
- Calibrate confidence; repeated identical answers alone are not calibrated probability.
- Preserve “uncertain / needs review” rather than forcing every case into a label.

### 7.5 Dataset stratification

Stratify tests by:
- Factual, multi-hop, comparison, summarization, temporal, numerical, and unanswerable queries.
- Domain and language.
- Source document structure, length, and extraction path.
- Version conflict and freshness scenarios.
- Authorization and tenant boundary.
- Single-turn and multi-turn.
- Text, tables, images, and other modalities where supported.

A curated benchmark with pre-chunked evidence may understate parsing/chunking failures. Report dataset properties alongside the result.

## 8. Reproducibility requirements

Every benchmark or incident-analysis run should pin:

- Repository commit and working-tree state.
- Dataset source, revision, checksum, and license.
- Model/tokenizer ID and immutable revision.
- Package lockfile and runtime.
- Hardware and concurrency.
- Chunking units and settings.
- Embedding pooling, normalization, and similarity metric.
- Retrieval filters, candidate Top-K, reranking model/cutoff.
- Context construction and truncation policy.
- Prompts, generation parameters, and evaluator versions.
- Random seed and number of repeated runs.
- Raw intermediate artifacts and their hashes.

A result without enough configuration and artifact lineage to reproduce it should be labelled **non-reproducible evidence**, not treated as a benchmark baseline.

## 9. Experiment and remediation discipline

- Change one major variable at a time when identifying a causal effect.
- Use ablations to isolate chunking, retrieval, reranking, context, and generation changes.
- Record both absolute counts and shares of each error class.
- A stage's share can increase simply because another stage improved; inspect absolute counts and denominators.
- Keep an unchanged control/baseline when feasible.
- Require the original failing query to pass after remediation.
- Test neighboring query classes to detect regressions.
- Define severity-based acceptance criteria, especially for security and authorization.

## 10. Mapping to the BVC RAG roadmap

| Episode | Standard integration |
|---|---|
| RAG-006 | Source identity, extraction fidelity, provenance, effective date, permission metadata. |
| RAG-007 | Overchunking, underchunking, context mismatch, structure-aware chunk diagnostics, tokenizer units. |
| RAG-008–009 | Embedding revision, normalization, similarity metric, filters, index consistency. |
| RAG-011 | End-to-end retrieval failure triage and evidence-preservation checks. |
| RAG-012–015 | Dense/sparse/hybrid retrieval, ranking, reranking, and query transformation diagnosis. |
| RAG-016 | Multi-dimensional evaluation, gold evidence, LLM-judge validation, metrics and uncertainty. |
| RAG-017 | Claim-level grounding, citation validity, freshness, version conflicts, abstention. |
| RAG-018 | ACL, tenant isolation, untrusted content, indirect prompt injection. |
| RAG-019 | Run manifests, observability, lifecycle, regression, runtime and cost. |
| RAG-020–024 | Agent planning, tool selection, state, checkpoint, retry, and orchestration failures. |

## 11. Acceptance criteria for a BVC RAG failure diagnosis

A diagnosis is accepted only when:
- The user-visible failure is described precisely.
- The relevant reference evidence is validated.
- The trace and source versions are available.
- The first observed failure is supported by artifacts.
- Root cause and contributing labels are separated.
- Uncertainty is recorded.
- Security/privacy impact has been evaluated.
- A regression test and remediation outcome are recorded.

A system that only says “hallucination detected” without reconstructing evidence flow has not completed an engineering-grade diagnosis.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*

Copyright © 2026 **Dong Hong · Beyond Vibe Coding**. All rights reserved.
