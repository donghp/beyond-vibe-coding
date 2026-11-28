# RAG Series — Evidence Register

**Purpose:** Track authoritative sources and the claims they can support. This is a curated starting register, not a claim that every episode has completed research.

| ID | Source | Type | Appropriate use | Caveat |
|---|---|---|---|---|
| SRC-001 | Lewis et al. (2020), [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) | Original research paper | Original RAG formulation; parametric and non-parametric memory; original experimental setup | Do not assume every modern retrieve-and-prompt product uses the original training architecture. |
| SRC-002 | [RAGAS Documentation](https://docs.ragas.io/) | Evaluation framework documentation | Metric definitions and framework implementation | Metrics and APIs evolve; use version-specific docs and validate metric suitability. |
| SRC-003 | [ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems](https://arxiv.org/abs/2311.09476) | Research paper | RAG evaluation dimensions and evaluation methodology | Research results depend on experimental setup and should not be generalized blindly. |
| SRC-004 | [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | Security guidance | Prompt injection and LLM application threat modeling | Verify the applicable edition and item numbering when writing. |
| SRC-005 | [Sentence Transformers: Retrieve & Re-Rank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html) | Official project documentation | Bi-Encoder retrieval and Cross-Encoder reranking pattern | Implementation examples are framework-specific. |
| SRC-006 | [Qdrant Documentation](https://qdrant.tech/documentation/) | Official product documentation | Vector search, filtering, hybrid retrieval, indexing operations | Product-specific behavior; compare other systems where necessary. |
| SRC-007 | [Azure AI Search Documentation](https://learn.microsoft.com/en-us/azure/search/) | Official product documentation | Hybrid search, semantic ranking, index lifecycle | Azure implementation is not a universal architecture standard. |
| SRC-008 | [Weaviate Documentation](https://weaviate.io/developers/weaviate) | Official product documentation | Hybrid search and vector database concepts | Product-specific behavior. |
| SRC-009 | [Microsoft Learn: Retrieval-Augmented Generation](https://learn.microsoft.com/en-us/azure/foundry/concepts/retrieval-augmented-generation) | Official technical documentation | RAG architecture and implementation concepts | Platform-specific details should be identified as such. |
| SRC-010 | [Google Cloud: Retrieval-Augmented Generation](https://cloud.google.com/use-cases/retrieval-augmented-generation) | Official technical overview | RAG concepts and application patterns | Vendor overview, not a neutral benchmark. |

| SRC-011 | Leung et al. (2026), [Classifying and Addressing the Diversity of Errors in Retrieval-Augmented Generation Systems](https://aclanthology.org/2026.eacl-long.147/) | Peer-reviewed research paper (EACL 2026) | RAG failure taxonomy, stage-oriented diagnosis, human annotations, reference pipeline, and diagnostic limitations | RAGEC reports 57.8% stage agreement and 40.3% error-type accuracy against human labels; distributions depend on dataset and pipeline. Review the [companion source repository](https://github.com/layer6ai-labs/rag-error-classification) and pin the exact commit/configuration before reproduction. |
| SRC-012 | [Layer6 AI Labs — RAG Error Classification source repository](https://github.com/layer6ai-labs/rag-error-classification) | Research code and annotated data | Inspect taxonomy implementation, stage prompts, classification logic, configurations, and released human-annotated examples | The public main branch is an implementation snapshot, not automatically the exact experimental commit. Check source/dataset licenses and reconcile paper parameters with code before reproducing results. |

## Evidence requirements

For each episode, add an episode-specific evidence table. Record:
- Claim or research question.
- Source ID and exact URL.
- Source version/date.
- What the source actually establishes.
- Limitations or conflicting evidence.
- Whether the claim is established, implementation-specific, empirical, or a recommendation.

Do not use this register as a substitute for reading the cited source. Re-check changing documentation when an episode is researched.
