# Beyond Vibe Coding — RAG Research Method

**Document ID:** BVC-RAG-RES-001  
**Version:** 1.0.0  
**Status:** Active editorial standard  
**Owner:** Dong Hong

## 1. Purpose

This method governs research, technical explanation, evidence handling, and writing for the RAG & Agentic RAG Learning Series.

The goal is to help readers understand the computer science and engineering mechanisms behind retrieval-augmented systems—not merely to connect frameworks or reproduce vendor tutorials.

## 2. Research principles

1. **Understand the problem.** State the problem, workload, assumptions, and constraints before proposing an architecture.
2. **Discover the mechanism.** Explain what each component does and why it exists.
3. **Verify the evidence.** Prefer original research, official technical documentation, standards, source code, and reproducible experiments.
4. **Build intuition.** Use examples and diagrams without removing important caveats.
5. **Apply engineering.** Explain trade-offs involving quality, latency, cost, security, complexity, and maintainability.

## 3. Source hierarchy

Use sources in this order, subject to relevance:

1. Peer-reviewed research papers and original technical papers.
2. Official standards and security guidance (for example, OWASP).
3. Official product and framework documentation for implementation-specific behavior.
4. Maintainer-authored technical articles and source repositories.
5. Reputable engineering publications and practitioner case studies.
6. Community discussions as leads, not sole proof of material technical claims.

A vendor document can establish what that vendor's product supports; it does not establish that the approach is universally best.

## 4. Claim classification

Every important technical claim should be classifiable as one of:

- **Established concept:** supported by stable, well-known mechanisms or primary literature.
- **Implementation-specific:** true for a named tool, API, model, or version.
- **Empirical result:** measured under stated dataset, workload, configuration, and method.
- **Design recommendation:** an engineering judgment with explicit assumptions and trade-offs.
- **Open question:** unsettled or context-dependent; uncertainty must be stated.

Do not present an implementation-specific behavior as a universal RAG property.

## 5. Evidence and citations

For every material claim:
- Keep a source URL, title, publisher/author, publication or access date, and claim supported.
- Prefer the original paper over summaries when discussing research results.
- Cite exact versions and dates for changing APIs or product capabilities.
- Distinguish measured results from illustrative examples.
- Never fabricate a benchmark, customer case study, quotation, or source.
- Keep a claim-to-source relationship in the episode evidence notes.

## 6. Experiments and benchmarks

A benchmark must document:
- Research question and hypothesis.
- Dataset origin, size, licensing, and preparation.
- Query set and ground-truth construction.
- Models, embedding models, rerankers, indexes, and versions.
- Chunking, retrieval, Top-K, filters, and prompt configuration.
- Hardware, deployment, concurrency, and measurement conditions.
- Metrics, repeated runs, aggregation, and uncertainty.
- Cost and latency scope.
- Limitations and threats to validity.

Never generalize one small experiment into a universal ranking of RAG techniques.

## 7. Technical depth

Where relevant, explain:
- Data structures and transformations.
- Query and document representations.
- Ranking and scoring mechanisms.
- Retrieval candidates versus final evidence.
- Context construction and token budget.
- Evaluation design.
- Security boundaries and trust assumptions.
- Lifecycle operations: update, deletion, re-indexing, and rollback.

## 8. Architecture neutrality

Do not assume RAG is the right answer to every knowledge problem.

Compare with alternatives where relevant:
- SQL and structured queries.
- APIs and application services.
- Search engines and lexical retrieval.
- Rules engines and deterministic workflows.
- Long-context prompting.
- Fine-tuning.
- Graph databases and graph analytics.

Choose the simplest approach that meets demonstrated requirements.

## 9. Writing standards

- Write in clear, precise international English for the English edition.
- Define a term on first use when it may be unfamiliar.
- Distinguish similar terms; do not use terminology as decoration.
- Use examples consistently and label illustrative data.
- State failure modes and limitations.
- Include code only when it teaches a concrete, runnable mechanism.
- Use diagrams to explain processes, boundaries, or trade-offs.
- Keep beginner episodes focused; link forward to deep dives instead of overloading them.

## 10. Standard footer

Every public-facing Markdown article in this series should end with the approved author, brand, and book footer. The repository's internal governance files may omit the sales paragraph when it would be inappropriate.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*

Copyright © 2026 **Dong Hong · Beyond Vibe Coding**. All rights reserved.
