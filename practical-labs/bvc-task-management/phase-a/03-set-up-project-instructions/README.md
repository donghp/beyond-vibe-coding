# Phase A · Lesson A3 — Set Up Project Instructions

**Project:** BVC Task Management  
**Learning level:** Beginner  
**Status:** Evidence review in progress — Human Owner confirms the Custom Instructions were saved; the GAIS Chat settings card and Prompt #0002 response have been supplied; independent before/after file-change verification remains pending  
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
Evidence update: the Human Owner confirms that the instructions were saved. A later owner-supplied screenshot shows the GAIS Chat settings page with the **Custom instructions** card and a preview of the BVC Task Management instructions. Record the save as OWNER-CONFIRMED and the visible card as OBSERVED evidence. The screenshot is not an independent audit of GAIS storage, but it is stronger evidence than a populated editor alone.

### Step 5 — Save the instructions

**Do this**  
Use the Save changes control shown by the GAIS editor.

**Why**  
Pasting text into the editor is not the same as saving it.

**What you should see**  
Return to Chat settings, where GAIS displays the **Custom instructions** card.

**Evidence in this project**  
The Human Owner confirms that Save changes was completed. The supplied follow-up screenshot shows the Custom instructions card with a preview beginning `PROJECT INSTRUCTIONS — BVC TASK MANAGEMENT — VERSION 0.1`. Record this as OWNER-CONFIRMED save plus OBSERVED card display.

**Check**  
Open the card again and confirm that the saved text is still present. When the interface behaves differently, follow the current on-screen labels rather than assuming the save succeeded.

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
Look at the GAIS Code / File Explorer area after the understanding check.

**Why**  
The lesson is about instructions, not implementation.

**What you should see**  
The application file tree should remain unchanged by this read-only check.

**Evidence limitation in this project**  
The supplied Prompt #0002 response says that no files were changed, but it also says no project files were inspected during that turn. This is an AI-reported statement, not an independent before/after comparison. Do not treat it as proof of file integrity.

**Check**  
Compare the visible file tree with the scaffold recorded in Lesson A2.

If files have changed, stop. Do not accept the result as a successful instructions check.

## 05. Complete Prompt

Use the canonical [BVCTM-PROMPT-0002](../../prompts/BVCTM_PROMPT_0002_PROJECT_INSTRUCTIONS_UNDERSTANDING_CHECK.md).

Do not write a feature-building prompt in this lesson.

## 06. See the Real Result

Record the four A3 checkpoints separately. Do not promote an owner report or an AI statement into independent verification.

- **A3-01 — Instructions editor populated:** an owner-supplied screenshot showed the Project Instructions text in the GAIS editor. **OBSERVED.**
- **A3-02 — Instructions saved:** the Human Owner confirms that Save changes was completed. A follow-up screenshot shows the GAIS Chat settings **Custom instructions** card with the BVC Task Management instructions preview. **OWNER-CONFIRMED + OBSERVED.**
- **A3-03 — Understanding check:** BVCTM-PROMPT-0002 was run in the BVC Task Management GAIS project and the ten-part response was supplied. **EXECUTION REPORTED; RESPONSE RECEIVED.** Review the internal inconsistency between detailed technical-version claims and the statement that no project files were read. Those version claims remain **NOT VERIFIED**.
- **A3-04 — File integrity:** GAIS reported that no project files were changed. An independent before/after file-tree comparison or equivalent file-change evidence has not yet been supplied. **NOT VERIFIED.**

Suggested screenshot captions:

*Figure A3-01. Google AI Studio Instructions editor containing the BVC Task Management Project Instructions.*

*Figure A3-02. Google AI Studio Chat settings displaying the saved Custom instructions card.*

Capture and store any additional evidence from the actual GAIS session. Do not use a generated illustration as evidence of a real GAIS screen.

## 07. Check Your Work

- [x] The complete canonical Project Instructions were copied into the BVC Task Management GAIS project.
- [x] The Human Owner confirms that Save changes was completed.
- [x] The Custom instructions card is visible in the supplied GAIS Chat settings screenshot.
- [x] BVCTM-PROMPT-0002 was run and its response was received.
- [x] The response was reviewed for project identity, authority, scope, isolation, and verification rules.
- [ ] Independently compare the application file tree or file-change history before and after Prompt #0002.
- [ ] Verify any technical-version claims against the actual manifests or runtime before treating them as facts.
- [ ] Capture and synchronize the A3 evidence assets to the repository.

**Completion rule:** A3 has meaningful owner-confirmed and observed evidence for saving the instructions and receiving the understanding-check response. Keep the lesson in evidence review until the file-integrity check is independently supported. Do not claim technical versions are verified from the Prompt #0002 response alone.

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
