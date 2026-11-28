# RAG-001 — What Is RAG? How AI Finds External Knowledge Before It Answers

**Phase:** I — Understanding RAG  
**Status:** Published  
**Version:** 1.1.0  
**Author:** Dong Hong · Beyond Vibe Coding

## Publication record

- **DEV.to (English primary):** https://dev.to/donghp/what-is-rag-how-ai-finds-external-knowledge-before-it-answers-3p76
- **Viblo (Vietnamese):** https://viblo.asia/p/bai-01-rag-la-gi-vi-sao-ai-can-tra-cuu-tri-thuc-ben-ngoai-XP4WE9prL7G

## Purpose

Introduce Retrieval-Augmented Generation as an architectural pattern that connects an LLM application to external knowledge through indexing, retrieval, context construction, and generation.

## Learning objectives

By the end of the episode, readers should be able to:

1. Explain the problem RAG addresses and its limitations.
2. Distinguish offline indexing from online query-time retrieval.
3. Explain the roles of parsing, cleaning, chunking, embeddings, searchable indexes, and metadata.
4. Distinguish keyword retrieval, vector retrieval, hybrid retrieval, Top-K selection, and optional reranking.
5. Explain how retrieved passages are assembled into context for generation.
6. Recognize versioning, effective-date, provenance, and access-control requirements.
7. Identify common failure modes, including indirect prompt injection.
8. Explain when RAG is useful and when SQL, APIs, deterministic rules, or another architecture may be more appropriate.

## Scope

This is a foundational conceptual episode. It does not attempt to provide a full code implementation, benchmark, production deployment guide, or complete treatment of advanced retrieval and agentic variants.

## Core architecture

**Indexing → Retrieval → Generation**

- Indexing prepares source knowledge for search.
- Retrieval identifies candidate evidence under query and access constraints.
- Generation uses the question, selected evidence, metadata, and instructions to produce a response.

## Key engineering lessons

- A fluent answer is not proof that the application has the right information.
- A vector database is one possible component, not the RAG architecture itself.
- Similarity and ranking are signals, not guarantees of correctness.
- Metadata must support version, effective-date, provenance, and authorization decisions.
- Retrieved content is untrusted data and must not be treated as privileged instructions.
- RAG does not eliminate hallucinations or replace evaluation.
- The right architecture depends on the data, workload, accuracy requirements, security boundaries, latency, and cost.

## Illustrative scenario

The article uses an employee leave-policy example to demonstrate version-aware retrieval:

- Employee Handbook 2023 — archived, illustrative value of 12 days.
- Leave Policy 2026 — active, illustrative value of 15 days.
- Leave Approval Procedure — illustrative HR portal workflow.

These values are explicitly illustrative and are not actual company policy or a benchmark.

## Figures

The English article uses seven figures:

1. What Is RAG?
2. Offline Indexing vs. Online Query-time.
3. Indexing: Prepare Knowledge for Search.
4. Retrieval: Keyword, Vector, and Hybrid.
5. Metadata Filtering and Version-aware Retrieval.
6. Generation: Evidence to Grounded Answers.
7. Reliability: Failure Modes and Engineering Checkpoints.

## Editorial refinement register

Follow-up technical refinements identified during review:
- Incremental indexing and document lifecycle: document identity, chunk updates, stale chunk deletion/deactivation, and metadata/ACL synchronization. Deep dive is assigned to Episodes 06 and 19.
- Reranking trade-offs: first-stage candidate retrieval versus pairwise Cross-Encoder scoring. Deeper treatment is assigned to Episode 14.
- Retrieval and generation evaluation: assigned to Episode 16.

These refinements should not turn the foundational article into an exhaustive implementation guide.

## Evidence starting points

- Lewis et al. (2020), [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401).
- [Microsoft Learn — Retrieval-Augmented Generation](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation).
- [Google Cloud — Retrieval-Augmented Generation](https://cloud.google.com/use-cases/retrieval-augmented-generation).
- [RAGAS Documentation](https://docs.ragas.io/).
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/).

See [EVIDENCE_REGISTER.md](../../../research/EVIDENCE_REGISTER.md). Verify current documentation and exact source claims before reusing them in later episodes.

## Change log

- 1.0.0 — Foundational English and Vietnamese publications.
- 1.1.0 — Added editorial record for seven figures and follow-up research refinements.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*

Copyright © 2026 **Dong Hong · Beyond Vibe Coding**. All rights reserved.
