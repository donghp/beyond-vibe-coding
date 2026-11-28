# RAG-004 — How a Question Flows Through RAG

**Phase:** I — Understanding RAG  
**Status:** Planned  
**Version:** 0.1.0  
**Author:** Dong Hong · Beyond Vibe Coding

## Central question

What happens between the moment a user submits a question and the moment a RAG application returns an evidence-grounded response?

## Learning objectives

- Trace the query-time path from identity and request validation to retrieval and generation.
- Distinguish query preprocessing, authorization filters, candidate retrieval, reranking, context assembly, and response handling.
- Understand where observability and failure handling belong.
- Recognize that not every RAG pipeline uses every optional stage.

## Research questions

1. How is user identity and access scope established before retrieval?
2. How are queries normalized, rewritten, or decomposed?
3. Where do lexical, dense, and hybrid retrievers fit?
4. When are metadata filters and rerankers applied?
5. How are evidence, instructions, and token budgets assembled?
6. How are citations and traceable source references returned?
7. What should be logged without exposing sensitive content?

## Planned output

A sequence diagram with trust boundaries, optional stages, and failure points. Use a single consistent example from user query to grounded answer.
