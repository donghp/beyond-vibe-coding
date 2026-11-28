# Research Questions and Open Technical Work

This register tracks cross-episode questions that require careful treatment.

## Indexing and lifecycle

- How should stable document identity be defined across source systems?
- When is content hashing sufficient to avoid unnecessary re-embedding?
- How should chunk-level IDs be derived and versioned?
- How are upserts, deletions, tombstones, and stale-chunk cleanup coordinated?
- How are metadata and ACL changes propagated without leaving stale permissions?
- What consistency guarantees are required during re-indexing and rollback?

## Retrieval

- When does BM25 outperform dense retrieval for a given corpus and query distribution?
- How should hybrid fusion parameters be tuned using a judged evaluation set?
- How do filters affect recall and ranking?
- When does a Cross-Encoder justify its latency and compute cost?
- What does retrieval diversity contribute beyond relevance?

## Context and generation

- How do context length, evidence ordering, and distractors affect answer quality?
- What is the impact of Lost in the Middle under different models and context sizes?
- When should evidence be compressed, summarized, or grouped?
- How should citations be mapped to source spans and verified?

## Evaluation

- How should a representative gold query set be constructed?
- Which retrieval metrics are appropriate for single-answer versus multi-evidence questions?
- How should answer correctness and faithfulness be separated?
- How do evaluator models introduce bias or variance?
- How should offline evaluation relate to online task success and user feedback?

## Security

- How should tenant isolation and ACL enforcement be implemented?
- How can indirect prompt injection be tested in retrieved content?
- What controls protect tools and downstream actions from untrusted evidence?
- How are data deletion, auditability, and privacy requirements handled?

## Agentic RAG

- What measurable conditions justify agentic orchestration over a deterministic pipeline?
- How should loops, retries, tool budgets, and stopping criteria be bounded?
- How should state, memory, and checkpoints be protected?
- How can graph retrieval be evaluated against lexical and dense baselines?
