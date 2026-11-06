# Phase A · Lesson A3 — Set Up Project Instructions

**Project:** BVC Task Management  
**Learning level:** Beginner  
**Status:** Draft — owner-supplied GAIS editor screenshot observed; save and understanding check not yet verified  
**Estimated time:** 10–15 minutes, subject to practical review  
**Previous:** [A2 — Create Your First Blank Web App](../02-create-your-first-blank-web-app/README.md)  
**Next:** [A4 — Talk to AI Like a Teammate](../04-talk-to-ai-like-a-teammate/README.md)

---

## 00. Lesson Information

**One practical outcome:** Your GAIS project has the BVC Task Management Project Instructions saved, and the AI can explain the main rules without changing any application files.

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
Use the settings gear shown in the supplied GAIS screenshot. In the Chat settings view, the supplied screenshot shows the System instructions area.

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
The supplied GAIS screenshots show a Custom instructions card that opens an Instructions editor.

**Why**  
This editor is where you provide the project's durable working rules to the AI.

**What you should see**  
A large text area in the Instructions panel.

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

**Evidence note**  
The Human Owner supplied a screenshot showing the Project Instructions text populated in the GAIS Instructions editor. This is OBSERVED evidence of the editor content only; it does not prove that the Save action completed.

### Step 5 — Save the instructions

**Do this**  
Use the Save changes control shown by the GAIS editor.

**Why**  
Pasting text into the editor is not the same as saving it.

**What you should see**  
The editor closes or returns to its previous settings state. The exact post-save behavior must be confirmed in the current GAIS session.

**Check**  
Reopen the Instructions editor and confirm that the text is still present.

**If it looks different**  
Do not assume the save succeeded. Check the content, save again if the control is available, and capture the actual result.

### Step 6 — Ask AI to explain the instructions

**Do this**  
Open the project chat and run the read-only prompt [BVCTM-PROMPT-0002 — Project Instructions Understanding Check](../../prompts/BVCTM_PROMPT_0002_PROJECT_INSTRUCTIONS_UNDERSTANDING_CHECK.md).

**Why**  
The point is to check whether the AI can explain the rules before it is asked to build anything.

**Important**  
This is a read-only understanding check. The prompt explicitly prohibits file creation, modification, renaming, and deletion.

**What you should see**  
The AI summarizes the project identity, current learning boundary, observed technology, project isolation, and verification rules. Facts not visible in the actual project should be marked UNKNOWN.

### Step 7 — Check that no application files changed

**Do this**  
Look at the GAIS Code / File Explorer area after the understanding check.

**Why**  
The lesson is about instructions, not implementation.

**What you should see**  
No new or modified application files as a result of the read-only check.

**Check**  
Compare the visible file tree with the scaffold recorded in Lesson A2.

If files have changed, stop. Do not accept the result as a successful instructions check.

## 05. Complete Prompt

Use the canonical [BVCTM-PROMPT-0002](../../prompts/BVCTM_PROMPT_0002_PROJECT_INSTRUCTIONS_UNDERSTANDING_CHECK.md).

Do not write a feature-building prompt in this lesson.

## 06. See the Real Result

Required evidence checkpoints:

- **A3-01 — Instructions editor populated:** owner-supplied screenshot currently observed in the conversation; repository asset synchronization is pending.
- **A3-02 — Instructions saved:** capture after reopening the editor and confirming the saved text.
- **A3-03 — AI understanding check:** capture the actual AI response to BVCTM-PROMPT-0002.
- **A3-04 — File tree unchanged:** capture or record the before/after comparison showing no application files changed during the check.

Do not mark A3-02, A3-03, or A3-04 complete until actual evidence is supplied.

## 07. Check Your Work

- [ ] The complete canonical Project Instructions were copied.
- [ ] The text was pasted into the correct BVC Task Management GAIS project.
- [ ] Save changes was performed.
- [ ] The editor was reopened and the saved text was confirmed.
- [ ] AI correctly summarized the project's purpose and authority.
- [ ] AI correctly identified the learning boundary.
- [ ] AI did not guess unverified versions or dependencies.
- [ ] AI correctly explained Project Isolation, including EFIN and ENERIXON FIN.
- [ ] The AI understanding check made no application file changes.
- [ ] The actual evidence checkpoints were captured.

**Completion rule:** A3 is complete only when the instructions are saved, the AI understanding check is reviewed, and the file tree remains unchanged. A populated editor alone is not enough.

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

- **Previous:** [A2 — Create Your First Blank Web App](../02-create-your-first-blank-web-app/README.md)
- **Next:** [A4 — Talk to AI Like a Teammate](../04-talk-to-ai-like-a-teammate/README.md)
- **Lesson Index:** [Phase A — Meet AI & Build Your First App](../README.md)
- **Progress:** Lesson A3 of A4.

---

**BVC — Learn by Building.**  
*Give AI the project rules before giving it the work.*
