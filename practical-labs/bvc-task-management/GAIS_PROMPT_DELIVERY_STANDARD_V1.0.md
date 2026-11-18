# BVC GAIS Prompt Delivery Standard — V1.0

**Status:** Proposed for Human Owner review
**Applies to:** All learner-facing prompts for Google AI Studio (GAIS) in BVC Practical Labs
**Language policy:** Vietnamese explanation first; execution prompt in the language best suited to the target AI/tool
**Operating principle:** Human in Control. AI as Executor.

---

## 1. Purpose

This standard ensures a beginner understands a GAIS task before sending an instruction to Gemini. A prompt is not merely text to copy. It is a bounded work order within a learning exercise.

Every GAIS prompt package must explain:
- why the task is necessary;
- what the learner is expected to achieve;
- what Gemini is allowed and forbidden to do;
- what result should be visible after execution;
- how the learner and reviewer will verify the result.

The goal is both product progress and learner capability. The learner should understand what changed and why, not only receive generated code.

## 2. Mandatory three-part delivery

Every prompt delivery must contain all three parts below.

### Part A — Vietnamese learner briefing

Write this section in clear Vietnamese suitable for a beginner. Explain technical terms when first introduced. Do not assume the learner knows the framework or platform internals.

Required headings:

1. **Bối cảnh:** project, phase, lesson, Prompt ID, Task ID, Contract and current state.
2. **Mục đích:** why this exercise is needed and what current limitation it addresses.
3. **Mục tiêu:** learning objectives, technical objectives and hands-on objectives.
4. **Kết quả mong muốn:** observable application behavior, expected artifacts and known non-goals.
5. **Gemini sẽ làm gì:** ordered explanation of the AI's work and checkpoints.
6. **Newbie cần làm gì:** exact actions before, during and after sending the prompt.
7. **Phạm vi và giới hạn:** allowed files, operations, budgets, prohibitions and stop conditions.
8. **Cách đánh giá:** acceptance checks, PASS/FAIL/NOT_RUN/NOT_VERIFIED meanings and required evidence.
9. **Kiến thức cần nắm:** beginner-friendly explanation of new concepts.
10. **Bước tiếp theo:** next learning step and what must be accepted first.

The briefing must not promise success or describe unperformed work as completed.

### Part B — Copy-ready execution prompt

Provide one clearly delimited prompt block that can be copied into the target GAIS conversation.

It must identify, as applicable:
- executor role and target Application ID;
- governing Project Instructions, Context Pack, approved Contract and decisions;
- task and expected outcome;
- exact authorized file and operation;
- file-count and diff budgets;
- prohibited files, services and features;
- ordered execution steps;
- stop conditions;
- verification requirements;
- mandatory post-run report format.

The execution prompt is an authority-bearing instruction only to the extent permitted by the governing Contract and explicit Human Owner decisions. It must never create, imply or expand authorization.

When a Contract requires a two-stage gate, keep the stages distinct. Stage 1 must not generate or apply implementation changes. Stage 2 must not begin until the exact required Owner gate instruction has been received.

### Part C — Vietnamese post-run review guide

Explain:
1. What Gemini must return.
2. What the learner should inspect in GAIS Code, File Explorer and Preview.
3. How to distinguish source review from actual runtime testing.
4. Common failure signals, scope violations and unsupported PASS claims.
5. Which screenshots, source snapshots, diffs and reports to retain.
6. What conditions are required before the next lesson or Owner acceptance.

## 3. Model recommendation

Every prompt package should state the recommended model based on the models currently available to the learner and the task's reasoning/coding needs.

Model availability changes over time and may differ by account tier. Verify the learner's current GAIS model menu before making a recommendation. Do not recommend removed or unavailable models. Distinguish visible menu labels from verified model capabilities.

Prefer the least costly or most accessible model that can reliably perform the bounded task. Recommend a higher-tier model only when task complexity justifies it and the learner has access.

## 4. Authority and safety rules

- Human Owner decisions and approved Contracts take precedence over this standard.
- Do not silently reconcile conflicting sources. Stop and identify the conflict.
- Never claim an AI response proves source integrity, runtime behavior, successful tests, deployment or acceptance.
- Use PASS only with actual evidence; otherwise use NOT_RUN or NOT_VERIFIED.
- Preserve existing data and user files. Do not clean up assets unless expressly authorized.
- Stop before any out-of-scope write.
- Do not connect a beginner GAIS application to GitHub unless an approved task explicitly requires it.
- Explain why an action is prohibited in learner-friendly language.

## 5. Prompt package quality checklist

Before delivery, the prompt author confirms:

- [ ] Vietnamese briefing is complete and beginner-friendly.
- [ ] Purpose, objectives and expected outcomes are explicit.
- [ ] Newbie's own actions are described.
- [ ] Model recommendation matches the learner's currently visible menu.
- [ ] Copy-ready prompt is complete, unambiguous and bounded.
- [ ] Contract scope and Owner authorization are not expanded.
- [ ] Stop conditions are clear and executable.
- [ ] Post-run evidence and review instructions are included.
- [ ] No PASS or completion is claimed in advance.
- [ ] The next step is explicit.

## 6. Reusable authoring template

Use this outline for every future GAIS prompt package:

### A. Vietnamese learner briefing
- Bối cảnh
- Mục đích
- Mục tiêu học tập / kỹ thuật / thực hành
- Kết quả mong muốn
- Gemini sẽ làm gì
- Newbie cần làm gì
- Phạm vi, giới hạn và stop conditions
- Tiêu chí đánh giá và bằng chứng
- Kiến thức mới cần hiểu
- Bước tiếp theo

### B. Copy-ready prompt
- Role and authority
- Target app and task identity
- Source documents
- Task and expected outcome
- Allowed operations / files / budgets
- Prohibited operations / files / features
- Execution sequence
- Stop conditions
- Verification
- Required report

### C. Vietnamese post-run review
- Expected response
- GAIS inspection steps
- Evidence checklist
- Failure and warning signals
- Acceptance and next-step conditions

---

**Governance note:** This standard defines how prompts are explained and presented to learners. It does not change any task Contract, project architecture, source of truth, model entitlement, implementation scope or Human Owner authority.
