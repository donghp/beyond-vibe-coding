# BVC Task Prompt Standard

**Document ID:** BVC-PL-TP-001  
**Version:** 0.1.0  
**Status:** Human Owner approved for Practical Labs use; repository publication pending PR review  
**Applies to:** Task prompts used in BVC Practical Labs

---

## 1. Purpose

A Task Prompt gives an AI assistant one specific job within one project.

The prompt should be prepared so that the learner does not have to guess what to ask, which files to change, what must stay untouched, or how to decide whether the result is correct.

> A good prompt does not replace good preparation. A complete prompt makes the task understandable, bounded, and checkable.

## 2. Prompt is not authority

A prompt explains a task; it does not automatically authorize it.

The AI must still follow:
1. Applicable approved project sources.
2. The active Task Contract or other Human Owner authorization.
3. Project Instructions.
4. The current Task Prompt.

If a prompt conflicts with a higher-authority source, stop and report the conflict. Do not obey the lower-authority instruction.

## 3. Seven-step prompt preparation and execution process

1. **UNDERSTAND** — identify the real need and the single outcome.
2. **INSPECT** — inspect the actual project, scaffold, relevant files, instructions, and current state.
3. **PREPARE** — define context, technology constraints, files, exclusions, outputs, acceptance, and verification.
4. **AUTHORIZE** — confirm that the requested work and file operations are permitted.
5. **EXECUTE** — perform the bounded task only after the Prompt Readiness Gate passes.
6. **VERIFY** — check actual files and behavior using the defined methods.
7. **ACCEPT** — the Human Owner or learner reviews evidence and decides whether to accept.

For a read-only task, preparation and execution may be combined when the requested inspection itself is fully clear. Do not combine inspection with writing when the scope is unknown.

## 4. Mandatory Prompt Readiness Gate

Before any write-capable task executes, verify all applicable items:

- [ ] One clear objective and one primary outcome.
- [ ] Relevant project context is available.
- [ ] Canonical source documents and their current versions are identified.
- [ ] Existing scaffold and relevant files have been inspected.
- [ ] Technology choices and versions are observed or explicitly UNKNOWN.
- [ ] Exact permitted file paths and operations are stated, or the task is explicitly read-only.
- [ ] Forbidden paths, features, services, and future-level work are stated.
- [ ] Expected output is concrete and reviewable.
- [ ] Acceptance criteria describe how success will be judged.
- [ ] Verification actions and required evidence are defined.
- [ ] Human Owner authorization exists for the requested changes.
- [ ] Stop conditions and final reporting requirements are explicit.

### Gate decision

**READY** — all applicable checks pass. Execute within scope.

**READ-ONLY PREPARATION ONLY** — inspect and report missing context or proposed files; do not write.

**NOT READY** — authority, context, scope, or acceptance is missing or conflicting. Stop and request direction.

The Prompt Readiness Gate reduces avoidable rework. It cannot guarantee that an AI-generated change will be defect-free.

## 5. Standard Task Prompt Package

Each complete prompt should include the following fields. For a very small read-only exercise, fields may be concise, but the scope and verification boundary must remain clear.

### 5.1 Prompt Identity
- Prompt ID.
- Prompt title.
- Project identifier.
- Related lesson and task.
- Version or revision where required.

### 5.2 Objective
State the one result that the task must produce. Avoid vague goals such as “make it better” or “complete the app”.

### 5.3 Project Context and Source of Truth
Identify only relevant context and approved documents. Do not claim that a file has been loaded if it is not available to the AI.

### 5.4 Technology Constraints
State the observed stack and what must be preserved. Exact versions must come from actual manifests or source evidence.

### 5.5 Authorized Scope
List permitted operations and exact file paths when known. If unknown, make the first stage read-only inspection and request approval of the proposed inventory.

### 5.6 Forbidden Scope
State files, features, integrations, data, dependencies, and actions that must not be changed.

### 5.7 Expected Output
Describe the file, UI, report, or other concrete result.

### 5.8 Acceptance Criteria
Define observable conditions that determine whether the output is correct.

### 5.9 Verification
Specify manual checks, commands, tests, and evidence that are actually available.

### 5.10 Stop Conditions
Require the AI to stop when it encounters a conflict, unknown structure, scope expansion, security risk, protected file, failed check, or missing permission.

### 5.11 Final Report
Require a concise report of:
- Actual files created, modified, and deleted.
- Scope compliance.
- Checks performed and actual results.
- Evidence and limitations.
- Unresolved issues and next permitted action.

## 6. Prompt ID and numbering

BVC Task Management prompts use the project-specific format:

~~~text
BVCTM-PROMPT-NNNN
~~~

Rules:
- Allocate IDs in ascending order.
- Check the current prompt index or highest allocated ID before assigning a new ID.
- Never reuse an allocated ID, even if a prompt is later withdrawn.
- Do not reuse identifiers from another project.
- Keep the prompt ID in the filename, title, metadata, and lesson reference.
- A lesson-only explanation or read-only check still receives an ID when it is maintained as a reusable canonical prompt.

The current initial scaffold prompt is BVCTM-PROMPT-0001. The Project Instructions understanding check is BVCTM-PROMPT-0002.

Other Practical Lab projects must use their own project prefix and numbering sequence.

## 7. Execution discipline

- Inspect before editing.
- Make the smallest change that satisfies the task.
- Do not modify unrelated files.
- Do not add dependencies or integrations without authorization.
- Do not guess a missing build command or file location.
- Do not claim that Preview, build, tests, or deployment passed unless the corresponding check actually ran.
- If an unexpected result appears, stop and report the evidence rather than generating a chain of speculative repair prompts.
- One bounded repair attempt is acceptable only when the active task scope permits it; otherwise ask the Human Owner.

## 8. Beginner prompt design

A Beginner should understand the prompt without learning prompt-engineering vocabulary.

Use plain language, short sections, and exact copyable instructions.

Explain technical terms outside the prompt when necessary. Do not make the learner complete complex placeholders or choose from many technical options unless the lesson explicitly teaches that choice.

## 9. Prompt review checklist

- [ ] Prompt ID is valid and unique.
- [ ] It belongs to the correct project.
- [ ] Objective is clear and bounded.
- [ ] Relevant context and authority are identified.
- [ ] Existing state has been inspected.
- [ ] Technology constraints are evidence-based.
- [ ] Authorized and forbidden file scopes are clear.
- [ ] Expected output and acceptance criteria are concrete.
- [ ] Verification and evidence are actionable.
- [ ] Stop conditions are explicit.
- [ ] Final report is required.
- [ ] Prompt Readiness Gate is READY before writes.

## 10. Companion materials

- [Task Prompt Template v0.1.0](../templates/TASK_PROMPT_TEMPLATE_V0.1.md)
- [BVC Project Instructions Standard v0.1.0](BVC_PROJECT_INSTRUCTIONS_STANDARD_V0.1.md)
- [BVC Practical Labs Authoring Standard v0.2.0](BVC_PRACTICAL_LABS_AUTHORING_STANDARD_V0.2.md)

---

**Understand. Inspect. Prepare. Authorize. Execute. Verify. Accept.**
