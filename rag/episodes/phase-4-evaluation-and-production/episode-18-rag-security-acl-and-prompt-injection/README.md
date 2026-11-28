# RAG-018 — RAG Security: ACL, Data Leakage, and Prompt Injection

**Phase:** Evaluation and Production  
**Status:** Planned · Research brief  
**Author:** Dong Hong · Beyond Vibe Coding

## Research purpose

Threat-model data retrieval and generation, focusing on authorization, tenant isolation, untrusted content, and indirect prompt injection.

## Learning objectives and research questions

1. Where must authorization be enforced?
2. How can retrieved instructions attack the model or tools?
3. How should adversarial testing and audit logging work?

## Core concepts

- ACL
- RBAC
- Tenant Isolation
- Data Leakage
- Prompt Injection
- Indirect Prompt Injection
- Threat Modeling

## Technical treatment

Explain mechanisms before selecting tools. Compare alternatives under clearly stated workloads. Include evaluation design, security controls, failure modes, and operational trade-offs where relevant. Use code and experiments when they demonstrate a mechanism or test a claim.

## Research integration: security as a cross-cutting failure dimension

The Layer6 RAGEC paper explicitly limits its taxonomy and excludes adversarial-input and corpus-fault scenarios. BVC therefore treats ACL leakage, tenant isolation, indirect prompt injection, and sensitive-data disclosure as cross-cutting security incidents—not merely ordinary answer-quality labels. See the [BVC RAG Failure Diagnosis and Evaluation Standard](../../../research/RAG_FAILURE_DIAGNOSIS_AND_EVALUATION_STANDARD_V0.1.md) and the [Layer6 RAGEC critical review](../../../research/EXTERNAL_RESEARCH_REVIEW_LAYER6_RAG_ERROR_CLASSIFICATION.md).

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
