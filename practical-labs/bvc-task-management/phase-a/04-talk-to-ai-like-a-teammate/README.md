# Phase A · Lesson A4 — Talk to AI Like a Teammate

**Project:** BVC Task Management  
**Learning level:** Beginner  
**Estimated time:** 15–20 minutes  
**Status:** Response and Code-view evidence received — Prompt #0003 run in GAIS; all eight required sections supplied; learner review in progress; independent file-integrity verification remains NOT VERIFIED  
**Lesson Index:** [Phase A — Meet AI & Build Your First App](../README.md) · [Practical Labs Home](../../../README.md)  
**Previous:** [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)  
**Next:** [Phase B — Build Your First Task](../../phase-b/README.md)

---

## 00. Lesson Information

**One practical outcome:** You can give AI one everyday request and review its structured understanding and proposed plan before any implementation begins.

**Starting state:** Complete A1 and A2. In A3, save the BVC Task Management Project Instructions in the same GAIS project and run Prompt #0002. The Human Owner has supplied the A3-02 Instructions editor screenshot, confirmed the Save changes action, and supplied the Prompt #0002 response alongside a GAIS Code view screenshot. The specific technical-version claims in that response remain unverified because Gemini stated that no project files were read during that response. A3's close/reopen and independent file-integrity checks remain open.

**Scope boundary:** This lesson is a read-only communication exercise. It does not authorize a Task Management feature, source-code changes, or Phase B implementation.

## 01. What You Will Achieve

You will practice turning a simple everyday need into a clear task that AI can explain back to you.

You will learn to check whether AI:
- Understands the result you actually want.
- Separates what you asked for from what it is merely assuming.
- Keeps unrelated features out of the request.
- Identifies information that is missing.
- Suggests ways to check the result without pretending those suggestions are approved requirements.

You do not need programming knowledge or special prompt-engineering vocabulary.

## 02. Why It Matters

Imagine asking a friend to help you remember tomorrow's work. Saying “make me a useful app” leaves many things open. Saying “I want to add one task by entering its title, then see it in a simple list” gives a much clearer starting point.

But even a clear request does not automatically answer every question. Should the task remain after the app is closed? Can it be edited? Does it need a due date? Those are separate decisions.

A good teammate asks, explains, and checks before acting. AI should do the same.

## 03. Before You Start

- Open the same BVC Task Management project you used in A1–A3.
- Confirm that the project's **Custom instructions** card is visible in GAIS Chat settings.
- Use the **Chat** area for this exercise. Do not start a new app or use Remix.
- Keep the example free of passwords, API keys, customer details, or confidential information.
- Remember: the feature described below is only a practice scenario. It is not approved for implementation.

## 04. Step-by-Step Guide

### Step 1 — Open the existing project chat

**Do this**  
Open your existing BVC Task Management project in Google AI Studio and use its Chat conversation area.

**Why**  
The exercise should use the same project context and saved Project Instructions as A3.

**Check**  
Make sure you are not in a different GAIS app or project.

### Step 2 — Open Prompt #0003 on GitHub

**Do this**  
Open [BVCTM-PROMPT-0003 — Task Understanding & Read-Only Planning Exercise](../../prompts/BVCTM_PROMPT_0003_TASK_UNDERSTANDING_AND_READ_ONLY_PLAN.md).

**Why**  
The complete prompt is prepared for you. You do not need to invent technical instructions or decide which files AI should change.

**Check**  
The heading shows BVCTM-PROMPT-0003 and says that the exercise is read-only.

### Step 3 — Copy the complete prompt

**Do this**  
Copy the complete text inside the prompt's copyable block, from its opening instruction through the final reminder.

**Check**  
Do not copy only the title or the first few paragraphs.

### Step 4 — Paste and run it in GAIS Chat

**Do this**  
Return to the existing BVC Task Management project, paste the prompt into the Chat message box, and send it.

**Do not**  
- Ask AI to build the task feature.
- Click Remix to create another app.
- Ask AI to generate or edit application code.
- Connect a database or external service.

**What you should see**  
AI should return a structured explanation with the eight sections listed in Prompt #0003. It should say that this read-only exercise is permitted while feature implementation is not authorized.

### Step 5 — Review the response

Read the response and ask:

- Did AI restate the request in everyday language?
- Did it keep the request to one title-only task shown in a simple list?
- Did it avoid assuming permanent saving, due dates, priorities, projects, editing, or deletion?
- Did it distinguish facts from assumptions and unknown information?
- Did it label acceptance criteria as suggestions?
- Did it say what should be inspected before a later implementation?
- Did it clearly say that Prompt #0003 does not authorize implementation?

A confident answer is not automatically a correct answer. Check each point against the prompt and the project information actually available to GAIS.

### Step 6 — Check the project was not changed

After the response, switch from **Preview** to **Code** and inspect the **File Explorer**.

**Expected result**  
No application code or project file should have been changed by this exercise.

**Observed A4-02 evidence:** The Human Owner supplied a follow-up screenshot showing the GAIS response beside **Code** view, with the File Explorer open and `app/layout.tsx` selected. The visible scaffold tree includes the same core paths recorded at A2: `app/globals.css`, `app/layout.tsx`, `app/not-found.tsx`, `app/page.tsx`, `hooks/use-mobile.ts`, and `lib/utils.ts`, plus root configuration files. This is a post-exercise observation, not an independent before/after diff.

If you see an unexpected file or change, stop and report it. Compare before/after evidence where available. If you cannot make a reliable comparison, record file integrity as NOT VERIFIED; do not rely only on AI saying that it changed nothing.

### Step 7 — Save your learning evidence

Capture the actual GAIS response and the visible Code / File Explorer state after the exercise.

Suggested checkpoint names:
- **A4-01:** AI's response to Prompt #0003.
- **A4-02:** Project file view after the read-only exercise.

Do not use a generated image as proof of an actual GAIS result.

**Current evidence status:** A4-01 response text and screenshot have been supplied. A4-02 Code / File Explorer screenshot has now also been supplied; it shows `app/layout.tsx` open and the scaffold file tree. The two screenshot binaries have not yet been synchronized as repository assets. Independent file integrity remains NOT VERIFIED because no before/after file-tree export or diff was supplied.

**Evidence record:** [A4-01 — Prompt #0003 Response Evidence Note](A4-01_PROMPT_0003_EVIDENCE_NOTE.md).

**Evidence record:** [A4-01 — Prompt #0003 Response Evidence Note](A4-01_PROMPT_0003_EVIDENCE_NOTE.md).

## 05. Complete Prompt

Use the canonical [BVCTM-PROMPT-0003](../../prompts/BVCTM_PROMPT_0003_TASK_UNDERSTANDING_AND_READ_ONLY_PLAN.md).

For real write-capable work, follow the [BVC Task Prompt Standard](../../../standards/BVC_TASK_PROMPT_STANDARD_V0.1.md), including the seven-step process and the mandatory Prompt Readiness Gate.

## 06. What a Good Result Looks Like

A good response does not rush to write code. It explains the request, shows what is included and excluded, names assumptions and unknowns, and proposes checks that a Human Owner can review.

The two readiness decisions must stay separate:

| Activity | Required result |
|---|---|
| Understand and plan this communication exercise | READY for read-only analysis |
| Implement the example task feature | NOT READY / NOT AUTHORIZED by Prompt #0003 |

**Important:** Suggested acceptance criteria are not approved product requirements. A future implementation needs its own approved scope and authorization.

## 07. Check Your Work

- [ ] I used the existing BVC Task Management GAIS project.
- [ ] I used the Chat conversation area.
- [ ] I copied and ran the complete Prompt #0003.
- [ ] AI explained the request in plain language.
- [ ] AI separated included scope, excluded scope, assumptions, and unknowns.
- [ ] AI labeled acceptance criteria as proposals.
- [ ] AI identified what must be inspected before implementation.
- [ ] AI stated that implementation is not authorized.
- [ ] I checked the Code / File Explorer view for unexpected changes.
- [x] I supplied the actual Prompt #0003 response text and response screenshot.
- [ ] I captured the post-exercise Code / File Explorer state (A4-02).

**Review of the owner-supplied Prompt #0003 response**

- The response contains all eight required sections.
- The two Prompt Readiness Gate decisions are correct: read-only analysis is READY; feature implementation is NOT READY / NOT AUTHORIZED.
- The response correctly identifies project sources and technical facts it did not actually access as UNKNOWN / NOT VERIFIED.
- Treat blank-input handling, Enter-key submission, input clearing, duplicate-title behavior, single-versus-multiple tasks, and reset-on-refresh behavior as assumptions or PROPOSALS. They are not approved requirements.
- In particular, the response lists empty/whitespace validation and in-memory-only state under Included Scope. These are reasonable design proposals, but the original request does not explicitly approve those implementation details.
- The screenshot supplied for A4-01 shows the response beside **Preview**, not Code / File Explorer. It therefore does not prove file integrity or satisfy A4-02.
- Gemini's statement that no write actions were performed is AI-reported. Independent before/after file comparison remains NOT VERIFIED.

**Review result:** Structurally aligned with Prompt #0003; learner review is in progress. No product requirement or implementation scope is approved by this exercise.

## 08. Common Mistakes & Recovery

**I ask AI to build the feature immediately.**  
Stop. This lesson is only for understanding and planning. Prompt #0003 does not authorize implementation.

**AI assumes the task must be saved permanently.**  
Ask it to separate displaying a task from saving it. Persistence belongs to a separate requirement and learning milestone.

**AI adds due dates, priorities, projects, or user accounts.**  
Point to the explicit exclusions in Prompt #0003 and ask it to correct the scope without changing files.

**AI claims it inspected a file that it could not access.**  
Ask which exact source it actually opened. Treat unsupported claims as UNKNOWN / NOT VERIFIED.

**AI says “no files changed” without before/after evidence.**  
Record the statement as AI-reported, not independently verified. Inspect the actual project state.

## 09. What You Have Learned

- A clear task begins with one practical outcome.
- Context explains why the task matters.
- Boundaries prevent unrelated work from entering the request.
- Assumptions and unknowns must be visible.
- Acceptance criteria can be proposed without being approved.
- Understanding a task is not the same as receiving permission to implement it.

## 10. Continue Learning

- **Practical Labs Home:** [BEYOND VIBE CODING — Practical Labs](../../../README.md)
- **Lesson Index:** [Phase A — Meet AI & Build Your First App](../README.md)
- **Previous:** [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)
- **Next:** [Phase B — Build Your First Task](../../phase-b/README.md)
- **Progress:** Lesson A4 of A4.

---

**BVC — Learn by Building.**  
*Understand the work before asking AI to do the work.*
