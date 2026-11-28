# RAG-002 — Prompting vs. RAG vs. Fine-Tuning vs. Long Context

**Phase:** I — Understanding RAG  
**Status:** Planned  
**Version:** 0.1.0  
**Author:** Dong Hong · Beyond Vibe Coding

## Central question

When an AI application needs different behavior, more information, or access to external knowledge, should the design change instructions, retrieve external evidence, adapt model weights, or provide a larger context?

## Learning objectives

- Distinguish prompt engineering, retrieval augmentation, fine-tuning, and long-context inference.
- Explain what each method changes and what it leaves unchanged.
- Understand that these approaches can be complementary rather than mutually exclusive.
- Select an approach based on data freshness, privacy, task behavior, context size, latency, cost, and evaluation.

## Planned comparison dimensions

- Primary mechanism.
- What is modified: instructions, external data path, model parameters, or input context.
- Knowledge freshness and update workflow.
- Private-data and authorization boundaries.
- Training and inference cost.
- Latency and context constraints.
- Evaluation method.
- Failure modes and maintenance burden.

## Research questions

1. What problems are solved by better instructions alone?
2. When does retrieval provide a better external knowledge boundary?
3. What kinds of behavior or task adaptation justify fine-tuning?
4. When is long-context prompting sufficient without a retrieval index?
5. How do these methods combine in real system designs?
6. Which task requirements make SQL, APIs, or rules engines more appropriate than all four?

## Guardrails

Do not claim that fine-tuning is a reliable way to keep frequently changing factual knowledge current. Do not claim that long context guarantees the model will use every supplied passage correctly. Do not position RAG as universally superior.

## Planned output

A decision matrix and worked examples. Any performance or cost comparison must be backed by a reproducible experiment rather than invented numbers.
