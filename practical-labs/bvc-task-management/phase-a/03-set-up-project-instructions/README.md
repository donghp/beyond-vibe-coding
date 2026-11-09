# Phase A · Lesson A3 — Set Up Project Instructions

**Project:** BVC Task Management  
**Learning level:** Beginner  
**Status:** Evidence review in progress — Human Owner confirms that Save changes was completed; A3-02 Instructions editor screenshot and the BVCTM-PROMPT-0002 response have been supplied; close/reopen and independent before/after file-change verification remain pending  
**Estimated time:** 10–15 minutes, subject to practical review  
**Previous:** [A2 — Inspect Your First Web App Scaffold](../02-create-your-first-blank-web-app/README.md)  
**Next:** [A4 — Talk to AI Like a Teammate](../04-talk-to-ai-like-a-teammate/README.md)

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase A Index](../README.md) · [← A2 — Inspect Your First Web App Scaffold](../02-create-your-first-blank-web-app/README.md) · **A3 of A4** · [A4 — Talk to AI Like a Teammate →](../04-talk-to-ai-like-a-teammate/README.md)

---

## 00. Lesson Information

**One practical outcome:** Configure the BVC Task Management Project Instructions in the same GAIS project, confirm that the Human Owner completed the save action, and ask AI to explain the main rules without changing application files.

**Starting state:** You have created the blank web app and inspected its visible scaffold in Lesson A2.

**Scope boundary:** This lesson configures instructions for the AI. It does not build Task Management features or change the generated application code.

## 01. What You Will Achieve

You will give the AI a clear set of project rules before asking it to build anything.

These rules explain:
- What BVC Task Management is.
- Which project documents it must respect.
- Which technology and files it must preserve.
- What it must not do.
- How it should check and report its work.
- Why it must keep BVC separate from unrelated projects such as EFIN and ENERIXON FIN.

At the end, you will ask the AI to explain the instructions back to you. It must not change any files during that check.

## 02. Why It Matters

Imagine asking a new teammate to help with your work without explaining what the project is, which tools it uses, or which rules must be followed.

The teammate would have to guess.

Project Instructions give AI that missing background and the working rules. They do not replace a task prompt: they explain how to work, while a task prompt explains what to do now.

> **Project Instructions tell AI how to work. Task Prompts tell AI what to do.**

## 03. Before You Start

- Complete Lesson A2.
- Open the same BVC Task Management scaffold project in GAIS.
- Use the canonical file [PROJECT_INSTRUCTIONS_V0.1.md](../../PROJECT_INSTRUCTIONS_V0.1.md).
- Do not paste passwords, API keys, private account information, or customer data.
- Do not ask AI to create a task form, database, sign-in screen, or other feature in this lesson.

The scaffold screenshot has shown Next.js-related files and TypeScript / TSX files. Exact versions and dependencies are not established by that screenshot. The Project Instructions deliberately tell AI to inspect the actual files rather than guess.

## 04. Step-by-Step Guide

### Step 1 — Open Chat settings

**Do this**  
Open the project settings area in Google AI Studio.

**Where**  
Use the settings gear in your GAIS project. The exact position or labels may change; follow the controls shown by your current interface.

**Why**  
Project Instructions are configured for the AI conversation, not by editing application source code.

**What you should see**  
The Chat settings panel and a System instructions section.

**Check**  
Confirm that you are still in the BVC Task Management scaffold project.

**If it looks different**  
Do not guess another menu path. Stop and share a screenshot of the screen you see.

### Step 2 — Open Custom instructions

**Do this**  
Open the Custom instructions editor under System instructions.

**Where**  


**Why**  
This editor is where you provide the project's durable working rules to the AI.

**What you should see**  
An Instructions panel with a large text area.

**Check**  
Make sure the panel belongs to the BVC Task Management project, not another GAIS app.

### Step 3 — Copy the canonical Project Instructions

**Do this**  
Open the complete [BVC Task Management Project Instructions v0.1](../../PROJECT_INSTRUCTIONS_V0.1.md) and copy all of its contents.

**Why**  
Using one canonical file avoids different versions being pasted into different project sessions.

**Type or choose**  
Copy the entire Markdown content, starting at “PROJECT INSTRUCTIONS” and ending at “Human in Control. AI as Executor.”

Do not copy only the first few sections.

**Check**  
Before pasting, confirm that you copied the complete file and that it names BVC Task Management.

### Step 4 — Paste the instructions

**Do this**  
Paste the copied text into the GAIS Instructions editor.

**What you should see**  
The editor contains the headings and rules from the canonical file, including Project Identity, Project Authority, Scope Control, Technology and Scaffold, File Integrity, Security and Privacy, Project Isolation, UI/UX Compliance, Verification, and Stop Conditions.

**Check**  
Compare the first and last sections with the canonical GitHub file.

### Step 5 — Save the instructions

**Do this**  
Use the Save changes control shown by the GAIS editor.

**Why**  
Pasting text into the editor is not the same as saving it.

**What you should see**  
The editor closes or returns to the preceding settings view. Follow the current GAIS behavior; do not assume the interface will look identical for every account.

**Owner confirmation**  
The Human Owner confirms that the Save changes action was completed.

**Screenshot evidence — Figure A3-02**

![Actual Google AI Studio Instructions editor showing the BVC Task Management Project Instructions text and the Save changes control](../../../assets/screenshots/phase-a/a3-02-gais-project-instructions-saved.jpg)

*Figure A3-02. The supplied screenshot shows the Instructions editor with the BVC Task Management Project Instructions text visible. The Save changes control appears disabled in the captured state. Together with the Human Owner's confirmation that Save changes was completed, record this as OWNER-CONFIRMED + OBSERVED. The screenshot alone does not prove that the editor was closed and reopened or that every saved line was independently re-read.*

**Recommended verification**  
After the save, close the editor if it remains open. Reopen **Custom instructions** and confirm that the text is still present. Capture that separate screen as A3-02R. This additional check is not yet evidenced by the supplied A3-02 image.

### Step 6 — Ask AI to explain the instructions

**Do this**  
Open the project chat and run the read-only prompt [BVCTM-PROMPT-0002 — Project Instructions Understanding Check](../../prompts/BVCTM_PROMPT_0002_PROJECT_INSTRUCTIONS_UNDERSTANDING_CHECK.md).

**Why**  
The point is to check whether the AI can explain the rules before it is asked to build anything.

**Important**  
This is a read-only understanding check. The prompt explicitly prohibits file creation, modification, renaming, and deletion.

**What you should see**  
The AI summarizes the project identity, Human Owner authority, Beginner boundary, Project Isolation Rule, verification rules, and facts that remain UNKNOWN.

**Evidence in this project**  
The Human Owner ran BVCTM-PROMPT-0002 in the BVC Task Management GAIS project and supplied the resulting ten-part response. The response correctly describes several governance and scope rules. However, it labels framework and dependency details as inspected while also stating that no project files were read in that turn. Treat those technical version claims as NOT VERIFIED until they are checked against the actual project files or runtime.

### Step 7 — Check that no application files changed

**Do this**  
Look at the GAIS Code / File Explorer area after the understanding check. The Human Owner supplied a screenshot showing the GAIS project chat beside Code view, with `app/page.tsx` open and the scaffold heading visible.

**Why**  
The lesson is about instructions, not implementation.

**What you should see**  
The application file tree should remain unchanged by this read-only check.

**Evidence limitation in this project**  
The supplied Prompt #0002 response says that no files were changed and that no project files were read during that response. The supplied GAIS screenshot shows the Code view and `app/page.tsx` alongside the response, but it is a single after-response view, not a before/after comparison. Record the result as AI-REPORTED + OWNER-SUPPLIED SCREENSHOT; independent file integrity remains NOT VERIFIED.

**Check**  
Compare the visible file tree with the scaffold recorded in Lesson A2.

If files have changed, stop. Do not accept the result as a successful instructions check.

## 05. Complete Prompt

Use the canonical [BVCTM-PROMPT-0002](../../prompts/BVCTM_PROMPT_0002_PROJECT_INSTRUCTIONS_UNDERSTANDING_CHECK.md).

Do not write a feature-building prompt in this lesson.

## 06. See the Real Result

Record the four A3 checkpoints separately. Do not promote an owner report or an AI statement into independent verification.

- **A3-01 — Instructions editor populated:** an owner-supplied screenshot showed the Project Instructions text in the GAIS editor. **OBSERVED.**
- **A3-02 — Save action:** the Human Owner confirms that Save changes was completed. The supplied screenshot shows the Instructions editor and the Save changes control in a disabled state. **OWNER-CONFIRMED + OBSERVED; close/reopen check pending.**

![Actual Google AI Studio Instructions editor showing the BVC Task Management Project Instructions text and the Save changes control](../../../assets/screenshots/phase-a/a3-02-gais-project-instructions-saved.jpg)

*Figure A3-02. The screenshot shows the Instructions editor with the BVC Task Management Project Instructions text visible. The Save changes control appears disabled in the captured state. It is not a separate post-save close/reopen verification.*
- **A3-03 — Understanding check:** BVCTM-PROMPT-0002 was run in the BVC Task Management GAIS project. The Human Owner supplied the ten-part response and a GAIS screenshot showing the response alongside Code view. **OWNER-REPORTED EXECUTION; RESPONSE RECEIVED; SCREENSHOT OBSERVED.** The response's specific technical-version and dependency claims remain **NOT VERIFIED** because its final report states that no project files were read during that response.
- **A3-04 — File integrity:** GAIS reported that no project files were changed. An independent before/after file-tree comparison or equivalent file-change evidence has not yet been supplied. **NOT VERIFIED.**

Suggested screenshot captions:

*Figure A3-01. Google AI Studio Instructions editor containing the BVC Task Management Project Instructions.*

*Figure A3-02. Google AI Studio Instructions editor displaying the BVC Task Management Project Instructions text.*

Capture and store any additional evidence from the actual GAIS session. Do not use a generated illustration as evidence of a real GAIS screen.

## 07. Check Your Work

- [x] The complete canonical Project Instructions were copied into the BVC Task Management GAIS project.
- [x] The Human Owner confirms that Save changes was completed.
- [x] The Instructions editor with the project rules is visible in the supplied screenshot.
- [ ] Close and reopen Custom instructions to verify that the complete text remains present.
- [x] BVCTM-PROMPT-0002 was run and its response was received.
- [x] The ten-part response was received and reviewed for project identity, authority, scope, isolation, and verification rules.
- [x] A GAIS screenshot showing the response beside Code view and `app/page.tsx` was supplied.
- [ ] Independently compare the application file tree or file-change history before and after Prompt #0002.
- [ ] Verify any technical-version claims against the actual manifests or runtime before treating them as facts.
- [ ] Capture and synchronize the A3 evidence assets to the repository.

**Completion rule:** A3 has owner-confirmed evidence that the save action was completed and an observed screenshot of the populated Instructions editor. Keep the lesson in evidence review until the close/reopen and file-integrity checks are supported. Do not claim technical versions are verified from the Prompt #0002 response alone.

## 08. Common Mistakes & Recovery

| What you may see | What it means | Safe next action |
|---|---|---|
| Only part of the instructions appears | The copied content may be incomplete | Compare with the canonical file and paste the complete content |
| Save changes is not available | The editor may not have an unsaved change or the UI may differ | Stop and inspect the current screen; do not claim it was saved |
| AI claims a framework version without evidence | It is guessing or relying on unsupported context | Ask it to mark the version UNKNOWN and inspect the actual manifest |
| AI proposes a Task Management feature | The understanding check has drifted into implementation | Remind it that this is read-only and do not accept any file changes |
| Files change during the check | The read-only boundary was not respected | Stop and inspect the actual diff or file history before continuing |

## 09. What You Have Learned

You have learned that:
- AI needs project context and rules before doing project work.
- Project Instructions are different from a one-time task prompt.
- The project must have one clear source of truth.
- AI should inspect technology and files rather than guess.
- Project Isolation helps prevent information from unrelated projects from leaking into the current project.
- Instructions guide the AI but do not technically lock its access to files.

## 10. Continue Learning

- **Previous:** [A2 — Inspect Your First Web App Scaffold](../02-create-your-first-blank-web-app/README.md)
- **Next:** [A4 — Talk to AI Like a Teammate](../04-talk-to-ai-like-a-teammate/README.md)
- **Lesson Index:** [Phase A — Meet AI & Build Your First App](../README.md)
- **Progress:** Lesson A3 of A4.

---

**BVC — Learn by Building.**  
*Give AI the project rules before giving it the work.*
