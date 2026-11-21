# Case Study: 417,153,568 Tokens for USD 5.014844

**Subject:** DeepSeek V4-Flash used as the model provider for Codex in VS Code  
**Historical usage window:** 2026-08-29 through 2026-09-01  
**Evidence basis:** Author-provided Amount/Usage CSV and Cost/Billing CSV  
**Status:** CSV totals reconciled; project-outcome attribution remains separate

## 1. Executive summary

The author's exported DeepSeek billing reports reconcile to:

| Measure | Result |
|---|---:|
| Total billed tokens | 417,153,568 |
| API requests (both API-key groups) | 962 |
| Reconciled API cost | USD 5.014844192 |
| Input cache-hit tokens | 413,217,024 |
| Input cache-miss tokens | 2,443,289 |
| Output tokens | 1,493,255 |
| Input tokens | 415,660,313 |
| Input cache-hit rate | 99.4124% |

The token reconciliation is:

```text
413,217,024 + 2,443,289 + 1,493,255
= 417,153,568
```

The two CSV reports reconcile exactly to USD 5.014844192.

This is a provider-billed historical usage result. It does not independently establish the quality, scope, or acceptance status of the software project. Those claims require repository, test, change and acceptance evidence.

## 2. Daily cost reconciliation

| Date | Requests | Tokens | Cost (USD) |
|---|---:|---:|---:|
| 2026-08-29 | 280 | 89,214,600 | 1.054423904 |
| 2026-08-30 | 276 | 145,536,189 | 1.528417988 |
| 2026-08-31 | 328 | 157,308,595 | 1.975376212 |
| 2026-09-01 | 78 | 25,094,184 | 0.456626088 |
| **Total** | **962** | **417,153,568** | **5.014844192** |

The Cost CSV and the token-category cost recomputation agree exactly.

## 3. Token mix and cache hit rate

Input tokens:

```text
Input = Cache Hit + Cache Miss
      = 413,217,024 + 2,443,289
      = 415,660,313
```

```text
Cache Hit Rate = 413,217,024 / 415,660,313
               = 99.4124%
```

The historical billing categories and costs:

| Category | Tokens | Cost (USD) | Share of cost |
|---|---:|---:|---:|
| Cache Hit | 413,217,024 | 3.371224192 | 67.22% |
| Cache Miss | 2,443,289 | 0.566604280 | 11.30% |
| Output | 1,493,255 | 1.077015720 | 21.48% |
| **Total** | **417,153,568** | **5.014844192** | **100%** |

A high cache-hit rate reduces the unit price of repeated input; it does not make cached tokens free. The absolute cost of cache hits remains material because the cached volume is very large.

## 4. Historical unit prices reflected in the Amount CSV

USD per million tokens:

| Category | Off-peak | Peak |
|---|---:|---:|
| Input Cache Hit | 0.007 | 0.014 |
| Input Cache Miss | 0.22 | 0.44 |
| Output | 0.66 | 1.32 |

These are the rates reflected by this historical export. They must not be presented as current DeepSeek pricing.

## 5. Peak and Off-peak mix

The usage report classifies:

| Tier | Tokens | Token share | Cost (USD) | Cost share |
|---|---:|---:|---:|---:|
| Off-peak | 348,496,364 | 83.54% | 3.816337904 | 76.10% |
| Peak | 68,657,204 | 16.46% | 1.198506288 | 23.90% |

A counterfactual in which the same Peak workload is billed at the corresponding Off-peak rates would halve the cost of that Peak portion:

```text
Peak cost observed                     = USD 1.198506288
Equivalent cost at Off-peak rates      = USD 0.599253144
Counterfactual difference              = USD 0.599253144
```

This is a pricing simulation, not an observed saving or proof that the same workload could have been delayed without operational impact.

The provider schedule is date- and timezone-sensitive. Use DeepSeek's official pricing page for the applicable date and holiday rules.

## 6. API-key attribution

The report attributes 958 requests and 417,152,049 tokens to the API key named for the Codex configuration, with USD 5.014473 in cost. A second key accounts for 4 requests, 1,519 tokens and USD 0.000372 in cost.

This supports the claim that nearly all reported usage was attributed to the Codex-configured key. The key label alone does not prove every request originated in the VS Code interface. A redacted configuration screenshot and client-side evidence are needed to strengthen that chain.

Do not publish account IDs, API-key fragments, payment identifiers or private project material.

## 7. Input/output ratio: interpretation and limitations

Across the full report:

- Input tokens: 415,660,313.
- Output tokens: 1,493,255.
- Input/output ratio: approximately 278.4:1.
- Average across 962 requests: approximately 432,079 input tokens and 1,552 output tokens per request.

This ratio is input-heavy and merits investigation, but it is not a quality score.

Coding agents may send tool definitions, instructions, previous turns and tool results as input. They may emit relatively short tool calls while the tools perform file reads, searches, edits and terminal work. Therefore a low output/input ratio can describe useful agent orchestration or wasteful context and retry loops.

The CSV is aggregated; it does not expose request-level traces, task IDs, tool-call counts, file reads, accepted tasks, test outcomes or rework. It cannot identify which explanation applies.

## 8. Counterfactual: what if cache-hit input had been priced as cache miss?

Using the historical tier distribution and replacing each cache-hit token with the corresponding cache-miss price produces a modeled total of approximately USD 107.60, compared with the actual USD 5.014844.

The modeled difference is approximately USD 102.58.

This is an analytical counterfactual based on the same token volumes and corresponding historical Peak/Off-peak unit prices. It is not a no-cache experiment, a guaranteed saving, or a credit/refund.

## 9. What this case study demonstrates

Supported by the CSV exports:
- The aggregate token total and cost reconcile.
- The usage was overwhelmingly cache-hit input.
- Both Peak and Off-peak billing tiers appear in the period.
- Most usage was attributed to the API key named for Codex.
- The input/output ratio was highly input-heavy.

Not established by these CSVs alone:
- That all usage came from the VS Code UI.
- That 417 million tokens represent newly processed input.
- That a specific number of software features or tasks was accepted.
- That output quality was high.
- That DeepSeek is cheaper than another provider for an equivalent workload.
- That prompt optimization caused the observed cache-hit rate.

## 10. Next experiment

Use the current workflow as Baseline A. Compare it with:

- B: explicit task contracts and narrower context selection.
- C: task contracts, context manifests, stable-prefix discipline, output contracts, and scheduling of deferrable work.

Keep the repository snapshot, model, task, reasoning configuration, tool permissions and acceptance criteria constant. Repeat runs with documented cache-warm/cache-cold conditions.

Measure cost per accepted task, API requests per accepted task, input tokens per accepted task, rework, test results and acceptance. Do not claim optimization success from token ratios alone.

## 11. References

- [DeepSeek Codex integration](https://api-docs.deepseek.com/quick_start/agent_integrations/codex/)
- [DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek context caching](https://api-docs.deepseek.com/guides/kv_cache/)
- [BVC AI Cost Optimization Standard](../standard/AI_COST_OPTIMIZATION_STANDARD.md)

## 12. Beyond Vibe Coding

This experiment illustrates a broader BVC principle: controlling an AI executor requires more than choosing a model with a low unit price. Developers need bounded tasks, relevant context, durable project state, observed changes and evidence-based acceptance.

For the broader engineering method, see **[BEYOND VIBE CODING: A Practical Guide to Building Real-World Software with AI](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)** by Dong Hong.
