# BVC Practical Labs Authoring Standard

**Document ID:** BVC-PL-AS-001  
**Version:** 0.2.0  
**Status:** Human Owner approved for Practical Labs use; repository publication pending PR review  
**Supersedes:** Dong Hong Style — Practical Lab Authoring Standard v0.1.0 as the current authoring standard  
**Audience:** Practical Lab authors, reviewers, and maintainers  
**Applies to:** All reader-facing BVC Practical Labs

---

## 1. Purpose

This Standard defines one consistent way to design, write, review, and maintain every BVC Practical Lab lesson.

A reader who has never programmed before must be able to understand the purpose of a lesson, follow the instructions, see the expected result, and check whether the result is real.

> **BVC — Learn by Building**  
> **One lesson = one practical outcome.**

Do not teach code first. Help the learner solve a familiar problem, use AI one step at a time, and verify what actually happened.

## 2. Core teaching principles

### 2.1 Everyday First
Begin with a familiar human situation. Explain the problem and the value of solving it before introducing technical terms.

### 2.2 One Lesson, One Outcome
Each lesson must have one primary, observable learner outcome. Do not combine unrelated product features or engineering topics into one lesson.

### 2.3 One Step, One Action
Each numbered step asks the learner to perform one main action. Split unrelated clicks, settings, prompts, file changes, and verification into separate steps.

### 2.4 Prepare Before Asking AI
The learner should not be required to invent technical instructions, identify unknown files, or debug an avoidable omission. Authors prepare complete prompts, context, boundaries, expected results, and checks in advance.

### 2.5 Show the Result Early
Let the learner see a useful or meaningful result as early as the task safely permits.

### 2.6 Human in Control
AI is a collaborator and executor, not the product owner. The learner reviews the plan, result, and evidence and decides whether the result is acceptable.

### 2.7 Verify Before Claiming
A confident AI response, generated code, or successful build is not proof that the requested behavior works.

### 2.8 Project Isolation
Each Practical Lab project has its own identity, approved context, Project Instructions, prompt sequence, and source of truth. Do not mix project-specific files or conventions.

### 2.9 Honest Evidence
Separate OBSERVED, VERIFIED, UNKNOWN, NOT VERIFIED, and INFERENCE. Never turn a design idea or screenshot into a claim of implemented functionality.

## 3. Standard lesson structure

Every lesson uses the following structure. A section may be brief, but it must not be omitted when needed for independent and safe practice.

| Order | Section | Required content |
|---:|---|---|
| 00 | Lesson Information | Lesson ID, title, phase, level, status, version, prerequisites, estimated time when known |
| 01 | What You Will Achieve | One clear, observable outcome |
| 02 | Why It Matters | Everyday reason the learner should care |
| 03 | Before You Start | Genuine prerequisites, starting state, tools, safety notes, and exclusions |
| 04 | Step-by-Step Guide | One action per step, with verified UI guidance |
| 05 | Complete Prompt | Prepared, copyable prompt package when AI action is required |
| 06 | See the Real Result | Authentic screenshot or observed output with a useful caption |
| 07 | Check Your Work | Simple checklist and explicit acceptance conditions |
| 08 | Common Mistakes & Recovery | Likely problems, safe recovery, and stop conditions |
| 09 | What You Have Learned | Plain-language recap |
| 10 | Continue Learning | Previous, Next, Lesson Index, and truthful progress position |

The standard order is consistent. Authors may combine short adjacent sections where doing so improves readability, but must preserve all required information.

## 4. Required structure inside each numbered step

Use this pattern:

### Step N — [Action-oriented title]

**Do this**  
Describe one concrete action.

**Where**  
Name the page, panel, tab, menu, or control only when its current label and location have been observed.

**Why**  
Explain the reason in plain language.

**Type or choose**  
Provide exact, complete text or the exact verified option. Put prompts and commands in copyable fenced blocks.

**What you should see**  
Describe the expected visible outcome without promising unverified behavior.

**Check**  
Give the learner a simple way to compare the result with the expected outcome.

**If it looks different**  
Give one safe recovery path. If the difference cannot be resolved without guessing, tell the learner to stop and provide a screenshot or exact message.

## 5. Prompt Package requirement

Whenever a lesson asks AI to inspect, create, modify, test, or explain project artifacts, provide a prepared Prompt Package appropriate to that task.

A Prompt Package should contain:

1. Prompt ID and prompt title.
2. Objective — one clear task outcome.
3. Project context — only the relevant project facts.
4. Source of truth — the approved documents or files the AI must follow.
5. Technology constraints — observed stack and preservation requirements.
6. Authorized scope — permitted files and operations, or an explicit read-only boundary.
7. Forbidden scope — changes and features that are not allowed.
8. Expected output — concrete artifacts or visible behavior.
9. Acceptance criteria — conditions that can be checked.
10. Verification — the checks and evidence required.
11. Stop conditions — circumstances requiring the AI to stop and ask.
12. Final report — files changed, checks run, results, and limitations.

A prompt must never invent file names, framework versions, commands, dependencies, or UI controls.

If the actual file scope is unknown, the prompt must first request a read-only inspection and proposed file inventory. It must not authorize speculative edits.

See the companion [BVC Task Prompt Standard](BVC_TASK_PROMPT_STANDARD_V0.1.md) and [Task Prompt Template](../templates/TASK_PROMPT_TEMPLATE_V0.1.md).

## 6. Mandatory Prompt Readiness Gate

**No write-capable task prompt is ready for execution until every applicable gate below is satisfied.**

| Gate | Readiness question |
|---|---|
| Objective | Is there one clear outcome? |
| Context | Does AI have the relevant project and task context? |
| Source of truth | Are authoritative sources identified and current? |
| Current state | Has the existing scaffold, relevant code, or UI state been inspected? |
| Technology | Are the relevant framework, versions, dependencies, and conventions observed or explicitly UNKNOWN? |
| Scope | Are permitted operations and files explicit? |
| Exclusions | Are prohibited files, features, integrations, and future-level work clear? |
| Output | Is the expected result concrete? |
| Acceptance | Can the learner decide whether the task succeeded? |
| Verification | Are checks and evidence defined? |
| Authority | Is the task within the current authorization and approved task scope? |
| Stop conditions | Does AI know when to stop rather than guess? |

### Gate outcomes

- **READY:** Every applicable check is satisfied. The task may proceed within its authorization.
- **READ-ONLY PREPARATION ONLY:** More inspection is needed. AI may inspect and report but must not modify files.
- **NOT READY:** Context, authority, scope, or acceptance is missing. Stop and ask for the missing information or approval.

The Gate reduces avoidable rework. It does not guarantee that software will be free of defects.

## 7. Seven-step controlled task lifecycle

Teach the same sequence throughout Practical Labs:

1. **UNDERSTAND** — identify the learner's real need and intended result.
2. **INSPECT** — examine the current project, relevant files, instructions, and actual environment.
3. **PREPARE** — define context, scope, constraints, expected output, acceptance, and verification.
4. **AUTHORIZE** — confirm that the task and permitted changes are within the Human Owner-approved scope.
5. **EXECUTE** — let AI perform the bounded task.
6. **VERIFY** — inspect actual changes and run appropriate checks.
7. **ACCEPT** — the Human Owner or learner reviews evidence and decides whether to accept the result.

Do not skip inspection because a prompt sounds complete. Do not treat AI's final message as acceptance.

## 8. Screenshot and visual evidence standard

Use the rule:

> **Screenshot by checkpoint, not by click.**

A typical lesson may need 2–5 screenshots, but there is no fixed quota.

Good checkpoints include:
- The actual starting screen.
- A prompt immediately before submission, when exact wording matters.
- The actual generated result.
- A relevant file tree or settings view.
- A verification result or recovery example.

Requirements:
- Use screenshots captured from the real tool session.
- Preserve enough interface context for the reader to recognize the location.
- Add a concise figure number, caption, and callout when needed.
- Never use AI-generated images as evidence of a real tool interface.
- Never publish placeholder images as genuine evidence.
- Inspect for secrets, private account details, personal data, and customer information.
- Preserve owner-supplied originals; create separate redacted or annotated derivatives.

### Evidence labels

- **OBSERVED** — directly visible in a supplied screenshot or actual file.
- **VERIFIED** — tested through an action with a recorded result.
- **UNKNOWN** — not known from the available evidence.
- **NOT VERIFIED** — not tested or not accessible.
- **INFERENCE** — reasoned interpretation; it must not replace an observation.

A Preview is not proof of persistence, security, production readiness, or deployment.

## 9. Lesson navigation and progress

Every lesson must provide:
- **Previous:** the preceding lesson, where one exists.
- **Next:** the next lesson in the approved learning path.
- **Lesson Index:** the relevant phase index.
- **Progress position:** the lesson's place in its phase, such as “Lesson A3 of A4”.

A progress label communicates location in the curriculum. Do not present it as a learner completion percentage or user analytics unless a real measurement exists.

## 10. Writing and accessibility

- Address the reader as “you”.
- Prefer short sentences and familiar words.
- Explain technical terms the first time they are needed.
- Avoid unexplained acronyms and dense paragraphs.
- Use descriptive headings and descriptive link text.
- Keep prompts complete and easy to copy.
- Make code and commands readable.
- Never blame a learner for a tool or model error.
- Distinguish what happened from what is inferred.
- Do not use color alone to communicate an important status.
- Keep screenshots legible and privacy-safe.

## 11. Learning-level boundaries

### Beginner — Build & Use
Use Google AI Studio Build mode and application Preview. Do not require an external database, Supabase, Authentication, RLS, GitHub, VS Code, or Localhost as prerequisites. Explain browser-storage limitations when relevant.

### Intermediate — Build & Connect
Introduce relational data, a database, authentication, authorization, and user-scoped security only within the approved product design and task scope.

### Advanced — Engineering & Delivery
Introduce source control, local development, testing, CI, deployment, release, and maintenance through their own outcomes and verification gates.

Do not move advanced setup into Beginner lessons merely because it is familiar to an engineer.

## 12. Publication readiness checklist

- [ ] One lesson has one primary practical outcome.
- [ ] All required lesson sections are present.
- [ ] Each step has one main action.
- [ ] Click paths and UI labels are supported by current observations.
- [ ] Prompts and commands are complete and copyable.
- [ ] Prompt Readiness Gate is satisfied for any write-capable prompt.
- [ ] Authorized scope and forbidden scope are clear.
- [ ] Expected results and acceptance criteria are stated.
- [ ] Verification and recovery instructions are provided.
- [ ] Screenshots are authentic, relevant, legible, and privacy-safe.
- [ ] All image and document links resolve.
- [ ] Previous, Next, and Lesson Index navigation is correct.
- [ ] Beginner / Intermediate / Advanced boundaries are respected.
- [ ] Unresolved product, UX, security, or architecture decisions remain clearly labeled.
- [ ] No unverified capability is described as implemented or accepted.
- [ ] Lesson status matches the available evidence.

## 13. Relationship to project governance

This Standard governs the educational experience and lesson quality. It does not replace or modify Product Definition, architecture, UX decisions, security requirements, Task Contracts, or application source code.

A Practical Lab lesson may explain an approved design, but it may not convert an OPEN proposal into an approved product decision.

Repository publication follows the Human Owner's branch, Pull Request, review, and merge process.

## 14. Companion standards and templates

- [BVC Project Instructions Standard v0.1.0](BVC_PROJECT_INSTRUCTIONS_STANDARD_V0.1.md)
- [BVC Task Prompt Standard v0.1.0](BVC_TASK_PROMPT_STANDARD_V0.1.md)
- [Practical Lesson Template v0.2.0](../templates/PRACTICAL_LESSON_TEMPLATE_V0.2.md)
- [Project Instructions Template v0.1.0](../templates/PROJECT_INSTRUCTIONS_TEMPLATE_V0.1.md)
- [Task Prompt Template v0.1.0](../templates/TASK_PROMPT_TEMPLATE_V0.1.md)
- [Historical Dong Hong Style Authoring Standard v0.1.0](DONG_HONG_STYLE_PRACTICAL_LAB_AUTHORING_STANDARD_V0.1.md)

---

**BVC — Learn by Building.**  
*One lesson. One practical outcome. Prepared instructions. Verified results. Human in Control.*
