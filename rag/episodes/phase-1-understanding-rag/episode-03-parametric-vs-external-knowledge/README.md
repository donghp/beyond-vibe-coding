# RAG-003 — Parametric vs. External Knowledge

**Phase:** I — Understanding RAG  
**Status:** Planned  
**Version:** 0.1.0  
**Author:** Dong Hong · Beyond Vibe Coding

## Central question

Where does an AI system's usable knowledge come from, how is it represented, and how can it be updated or controlled?

## Learning objectives

- Explain parametric knowledge stored in model parameters.
- Explain external knowledge stored in documents, indexes, databases, APIs, or other systems.
- Distinguish pretraining, fine-tuning, retrieval, and tool access.
- Understand freshness, provenance, authorization, and update boundaries.

## Research questions

1. What does it mean for knowledge to be encoded in model parameters?
2. What can and cannot be inferred from a model's response about its training data?
3. How do external indexes and systems provide knowledge at inference time?
4. How do retrieval and tool calling differ?
5. What are the security and governance implications of external knowledge access?

## Planned outputs

A conceptual diagram showing model parameters, external knowledge stores, retrieval/tool interfaces, and the inference-time boundary. Include clear caveats about the limits of treating model weights as a database.
