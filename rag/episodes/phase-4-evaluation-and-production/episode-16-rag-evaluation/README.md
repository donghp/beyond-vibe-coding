# RAG-016 — RAG Evaluation: From Retrieval Metrics to RAGAS

**Phase:** Evaluation and Production  
**Status:** Planned · Research brief  
**Author:** Dong Hong · Beyond Vibe Coding

## Research purpose

Design a RAG evaluation protocol across retrieval, context quality, answer grounding, and end-to-end task performance.

## Learning objectives and research questions

1. How are Recall@K, Precision@K, MRR, and NDCG interpreted?
2. How do Faithfulness, Answer Relevancy, Context Precision, and Context Recall differ?
3. How are gold datasets and evaluator reliability established?

## Core concepts

- Recall@K
- Precision@K
- MRR
- NDCG
- Faithfulness
- Answer Relevancy
- Context Precision
- Context Recall
- RAGAS
- ARES

## Technical treatment

Explain mechanisms before selecting tools. Compare alternatives under clearly stated workloads. Include evaluation design, security controls, failure modes, and operational trade-offs where relevant. Use code and experiments when they demonstrate a mechanism or test a claim.

## Research integration: diagnosis and evaluator reliability

The [Layer6 RAGEC review](../../../research/EXTERNAL_RESEARCH_REVIEW_LAYER6_RAG_ERROR_CLASSIFICATION.md) demonstrates why evaluator accuracy must itself be measured: its reported agreement is 57.8% for stage attribution and 40.3% for error-type classification against human labels. Treat LLM-as-a-judge output as a fallible measurement, not ground truth. The [BVC RAG Failure Diagnosis and Evaluation Standard](../../../research/RAG_FAILURE_DIAGNOSIS_AND_EVALUATION_STANDARD_V0.1.md) defines human-adjudicated samples, multi-dimensional outcome labels, confidence, and reproducibility requirements.

## Evidence requirements

Use primary research, official documentation, standards, or reproducible experiments. Record dataset, configuration, metric definitions, version, limitations, and source-to-claim mapping. Do not invent metrics or case studies.

## Status

This file is a research brief, not a completed manuscript or publication.

---

*Dong Hong · Beyond Vibe Coding*

**Learn continuously. Understand deeply. Build thoughtfully. Improve every day.**

**AI is a tool. Engineering is our capability.**

---

*For readers who would like to explore this engineering mindset further, my book* **[Beyond Vibe Coding: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** *is available on Google Play Books.*

Copyright © 2026 **Dong Hong · Beyond Vibe Coding**. All rights reserved.
