# BVC-ACO-001 — AI Cost Optimization Standard

**Status:** Proposed / Experimental  
**Version:** 1.0.0  
**Owner:** Beyond Vibe Coding  
**Scope:** AI-assisted software development using coding agents and metered model APIs  
**Normative language:** MUST, MUST NOT, SHOULD, SHOULD NOT and MAY express requirement strength for this proposed standard.

## 1. Purpose

Establish a repeatable method to control AI-agent cost while preserving engineering quality, project authority, security, traceability and acceptance.

The objective is not minimum token volume at any cost. The objective is the lowest reasonable cost per accepted engineering outcome.

## 2. Governing principles

1. **Outcome over volume:** Token counts are telemetry, not proof of engineering value.
2. **Relevant context:** Provide the minimum sufficient context for the task, not the minimum possible context.
3. **Stable prefix:** Keep reusable instructions structurally stable where the client/provider supports prefix caching.
4. **Explicit task contract:** Define objective, scope, constraints, acceptance and evidence.
5. **Provider-aware scheduling:** Schedule deferrable work around published pricing windows, subject to deadlines and availability.
6. **Model-task fit:** Choose a model appropriate to task complexity and risk.
7. **Measurement:** Attribute cost to tasks and accepted outcomes wherever possible.
8. **Human accountability:** Human owners retain responsibility for scope, review and consequential acceptance.

## 3. Control areas

### ACO-01 — Prompt Structure

Each non-trivial coding task SHOULD specify:
- Objective.
- Scope.
- Relevant context.
- Constraints.
- Expected execution approach.
- Acceptance criteria.
- Required evidence.
- Output contract.

Prompts MUST NOT be considered successful merely because they are syntactically structured or use YAML.

### ACO-02 — Context Selection

The agent or task owner SHOULD identify:
- Mandatory sources.
- Conditional sources.
- Excluded sources.
- Authoritative source of truth.
- Freshness and provenance requirements.

The agent MUST NOT silently treat stale, untrusted or conflicting material as authoritative.

### ACO-03 — Cache Optimization

Where provider prefix caching is available:
- Stable content SHOULD precede variable task content.
- Stable section order SHOULD be preserved.
- Dynamic noise SHOULD be kept out of stable sections.
- Cache hit/miss telemetry SHOULD be collected.
- Cache hits MUST NOT be assumed without evidence.

Cache retention and matching behavior are provider-specific and MUST be checked against current documentation.

### ACO-04 — Task Decomposition

Tasks SHOULD be decomposed into bounded units with independently verifiable outcomes.

Teams SHOULD avoid both:
- Oversized tasks that create uncontrolled context and broad changes.
- Excessively fragmented tasks that repeat setup and context overhead.

### ACO-05 — Model Selection

Model choice SHOULD consider:
- Task complexity.
- Reasoning requirements.
- Tool-use reliability.
- Context needs.
- Verification burden.
- Total cost per accepted outcome.

The lowest unit price MUST NOT be treated as the only selection criterion.

### ACO-06 — Execution Scheduling

Deferrable workloads MAY be scheduled during provider-defined lower-price periods.

Examples include batch documentation, non-urgent repository analysis, test generation and planned code review.

Urgent fixes, security incidents, production recovery and deadline-critical tasks MUST NOT be delayed solely to reduce model cost.

Scheduling logic MUST use the provider's published timezone, holiday exceptions and effective date.

### ACO-07 — Output Budget

The task SHOULD specify a useful output contract, such as:
- Summary of material changes.
- Changed files.
- Test/build evidence.
- Known limitations.
- Unresolved items.

Output limits MUST NOT suppress information required for safe review, debugging, architecture or security analysis.

### ACO-08 — Cost Measurement

Where supported, collect:
- Model/provider identifier.
- Request timestamp and pricing tier.
- Input cache-hit tokens.
- Input cache-miss tokens.
- Output tokens.
- API cost.
- Task identifier.
- API request count.
- Tool-call count where available.
- Rework count.
- Acceptance result.

Credentials, personal data and confidential source content MUST NOT be included in public telemetry.

### ACO-09 — Outcome Verification

The primary efficiency KPI SHOULD be:

```text
Cost per Accepted Task = Total Attributable API Cost / Accepted Tasks
```

Supporting metrics SHOULD include:
- Input tokens per accepted task.
- Output tokens per accepted task.
- Cache-hit rate.
- API calls per accepted task.
- Rework rate.
- Test pass rate.
- Median time to accepted completion.

Token ratios MUST NOT be used alone to rank agent quality.

## 4. Task prompt contract

A reusable contract is provided in [task-contract.yaml](../templates/task-contract.yaml).

## 5. Minimum operating procedure

1. Select the task and identify its risk.
2. Define scope and acceptance criteria.
3. Select only relevant project context.
4. Preserve stable prompt prefixes where beneficial.
5. Select a model fit for the task.
6. Schedule only deferrable work according to current provider rates.
7. Execute within authorized tool and repository boundaries.
8. Verify actual changes and run required checks.
9. Attribute token usage and cost to the task.
10. Record acceptance and limitations.

## 6. Compliance levels

| Level | Description |
|---|---|
| L0 — Unmeasured | No reliable token/cost attribution |
| L1 — Metered | Input/output and cost recorded |
| L2 — Context-aware | Context selection and prompt contracts used |
| L3 — Cache-aware | Prefix stability and cache telemetry reviewed |
| L4 — Outcome-measured | Cost per accepted task and quality tracked |
| L5 — Continuously optimized | Controlled benchmarks drive reviewed changes |

A level is a maturity description, not a certification.

## 7. Limitations

- Providers change models, prices, cache semantics and schedules.
- IDE agents may add system instructions, tool definitions and context that are not directly controlled by the user.
- Billing exports may aggregate multiple requests or omit task identifiers.
- Cache-hit rate does not show context relevance.
- Task acceptance is meaningful only when criteria and evidence are trustworthy.
- Cross-provider comparisons require equivalent workloads, model settings, quality criteria and accounting scope.

## 8. Review

Review this standard when provider pricing, API protocols, model behavior, agent clients or measurement capabilities materially change.
