# RAG-011 — Why Retrieval Fails

**Phase:** Improving Retrieval  
**Status:** Planned  
**Version:** 0.1.0  
**Author:** Dong Hong · Beyond Vibe Coding

## Research purpose

Diagnose retrieval failures across source quality, parsing, query formulation, filters, embeddings, ranking, and evaluation.

## Learning objectives and core questions

1. How are false negatives and false positives produced?
2. How do metadata filters harm recall?
3. How should retrieval failures be triaged?

## Core concepts

- Retrieval Failure
- Recall
- Precision
- Query Mismatch
- Filter Errors
- Diagnostics

## Planned technical treatment

- Explain the underlying mechanism before introducing tools.
- Separate general concepts from product-specific behavior.
- Include diagrams or worked examples where they clarify a process.
- Identify failure modes and engineering trade-offs.
- Use code or experiments only when they test a specific claim or teach a reproducible mechanism.
- Record sources, version details, assumptions, and limitations.

## Research integration: diagnosing retrieval and pipeline failures

Use the [Layer6 RAGEC review](../../../research/EXTERNAL_RESEARCH_REVIEW_LAYER6_RAG_ERROR_CLASSIFICATION.md) as a comparative taxonomy, not as an unquestioned universal distribution. Distinguish evidence missing from source/chunks, evidence preserved but not retrieved, and evidence retrieved but lost at reranking or context assembly. Use the [BVC RAG Failure Diagnosis and Evaluation Standard](../../../research/RAG_FAILURE_DIAGNOSIS_AND_EVALUATION_STANDARD_V0.1.md) to record first observed failure, root cause, contributing labels, downstream symptoms, and evidence separately.

## Evidence requirements

Create an episode-specific claim-to-source table before drafting. Prefer original papers, official documentation, standards, and reproducible experiments. Do not invent benchmark values or production case studies.

## Publication status

This is a research brief and roadmap item. It is not a completed manuscript and has not been published.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*

Copyright © 2026 **Dong Hong · Beyond Vibe Coding**. All rights reserved.
