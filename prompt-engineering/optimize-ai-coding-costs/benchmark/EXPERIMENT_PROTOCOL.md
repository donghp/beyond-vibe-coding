# Experiment Protocol — Prompt, Context and AI Cost Optimization

## 1. Objective

Measure whether prompt and context engineering reduce API cost per accepted coding task without degrading engineering quality.

## 2. Experiment arms

| Arm | Configuration |
|---|---|
| A — Baseline | Existing developer workflow; record all usage and outcomes |
| B — Prompt contract | Explicit objective, scope, constraints, acceptance and output contract |
| C — Context optimization | B plus mandatory/conditional/excluded context manifest and targeted retrieval |
| D — Full optimization | C plus stable-prefix discipline, output discipline and deferrable-task scheduling |

Do not change multiple uncontrolled variables and then attribute the entire effect to one technique.

## 3. Controlled variables

Keep constant where possible:
- Repository commit and workspace state.
- Task description and acceptance criteria.
- Model identifier and provider.
- Reasoning configuration.
- Tool permissions.
- Runtime and environment.
- Test commands.
- Acceptance reviewer and rubric.

Record unavoidable differences.

## 4. Cache conditions

Run and label:
- Cold / first-seen prefix condition.
- Warm / repeated matching prefix condition.

Because provider cache retention and matching are best-effort, record observed cache-hit and cache-miss counts rather than assuming the intended condition occurred.

## 5. Scheduling conditions

Record the exact request timestamp, timezone, provider pricing tier, model price version and any holiday exception. Do not infer a tier solely from local assumptions.

## 6. Required measurements

Per task:
- task_id
- experiment_arm
- repository_commit
- model_id
- start/end timestamps
- request_count
- input_cache_hit_tokens
- input_cache_miss_tokens
- output_tokens
- actual_api_cost_usd
- tool_call_count, if observable
- retry_count
- rework_count
- changed_files
- build_result
- test_result
- security_check_result, where applicable
- acceptance_status
- acceptance_evidence

## 7. Primary metric

```text
Cost per Accepted Task =
  Attributable API Cost / Number of Accepted Tasks
```

If no task is accepted in an arm, do not divide by zero; report cost and zero accepted outcomes.

## 8. Secondary metrics

- Input tokens per accepted task.
- Output tokens per accepted task.
- API requests per accepted task.
- Cache hit rate.
- Rework per task.
- Acceptance rate.
- Test pass rate.
- Median time to accepted completion.

## 9. Repetition and analysis

- Run multiple independent tasks representative of the workload.
- Repeat each arm enough times to expose variability.
- Report median and range, not only the best run.
- Separate warm-cache from cold-cache observations.
- Report failed and abandoned tasks; do not exclude them silently.
- Preserve raw exports and calculation scripts.
- Do not infer causality from a single before/after comparison.

## 10. Decision rule

An optimization is successful only when:
1. Cost per accepted task falls by a meaningful amount.
2. Acceptance and verification quality are not degraded.
3. Scope violations and security failures do not increase.
4. The result is repeatable across representative tasks.

## 11. Publication rule

Label all modeled savings as simulations. Label personal billing data as one observed case. Do not claim another provider would cost a particular amount unless an equivalent controlled workload and accounting method were used.
