# Phase A · Lesson A2 — Inspect Your First Web App Scaffold

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase A Index](../README.md) · [← A1 — Meet Google AI Studio](../01-meet-google-ai-studio/README.md) · [A3 — Set Up Project Instructions →](../03-set-up-project-instructions/README.md)  
> **Progress:** Lesson A2 of A4 · Inspect before you change.

**Project:** BVC Task Management  
**Learning level:** Beginner  
**Status:** Evidence observed — actual GAIS Code / File Explorer screenshot supplied and synchronized; manifest/version inspection remains pending  
**Estimated time:** 10–15 minutes

## 00. One practical outcome

You can find the Preview, Code view, File Explorer, and project configuration files in your own GAIS project. You can describe what you can actually see without guessing or changing the app.

**Important:** A1 already created the blank app with Prompt #0001. **Do not run Prompt #0001 again in A2.**

## 01. What you will do

1. Open the same BVC Task Management project you created in A1.
2. Switch to Code view.
3. Inspect the File Explorer and open a few project files.
4. Understand what the filenames tell you — and what they do not tell you.
5. Return to Preview and confirm that the blank scaffold still appears.

No programming knowledge is required. You are looking around, not writing code.

## 02. Before you start

- Complete [A1 — Meet Google AI Studio](../01-meet-google-ai-studio/README.md).
- Keep the same GAIS app open.
- Do not run Prompt #0001 again.
- Do not edit, rename, move, or delete any files.
- Do not install packages, change configuration, connect GitHub, or deploy.
- Never share API keys, passwords, private account information, or customer data.

## 03. Step-by-step guide

### Step 1 — Open the Code view

**Do this:** In your GAIS app workspace, select **Code** next to Preview.

**Why:** Preview shows the page. Code shows the files that make up the app.

**What you should see:** A File Explorer on the left and a code editor on the right.

**Check:** Make sure you are still in the BVC Task Management scaffold created in A1.

### Step 2 — Look at the File Explorer

**Do this:** Expand the `app` folder. Then look at the other folders and files in the project root.

**Observed in the actual owner-supplied screenshot:**

| File or folder | Plain-language explanation |
|---|---|
| `app/page.tsx` | The page shown at the main web address. |
| `app/layout.tsx` | The shared outer structure around pages. |
| `app/globals.css` | Shared visual styling rules. |
| `app/not-found.tsx` | The page shown when a requested page is not found. |
| `hooks/use-mobile.ts` | A reusable helper related to mobile screen behavior. |
| `lib/` | A place for shared helper code. |
| `package.json` | A project manifest listing scripts and software packages. |
| `tsconfig.json` | Settings used by the TypeScript language tools. |
| `next.config.ts` | Configuration for the Next.js framework. |

Your screen may contain additional files. The list above records files visible in the supplied screenshot; it is not a promise that every GAIS app has exactly the same structure.

**Figure A2-01 — Actual Google AI Studio Code view and File Explorer**

![Actual GAIS Code view showing the BVC Task Management scaffold file tree and tsconfig.json editor](../../../assets/screenshots/phase-a/a2-01-gais-code-file-explorer.jpg)

*Look at the left-hand File Explorer first. The filenames help identify where the application page, shared layout, styles, and project settings live. The open editor shows tsconfig.json; it does not prove the contents of every other file.*

### Step 3 — Open `app/page.tsx`

**Do this:** Select `app/page.tsx` in the File Explorer.

**Why:** This file contains the page content that the Preview displays.

**What you should see:** The actual source code for the scaffold inspection page.

**Check:** Find the text `BVC Task Management Scaffold Inspection`. Do not edit it.

### Step 4 — Open `package.json`

**Do this:** Select `package.json` in the project root.

**Why:** This file lists the scripts and software packages that the project declares.

**What to look for:** The `scripts` section contains available commands; `dependencies` and `devDependencies` list software packages.

**Important:** A version range in package.json is not always the exact installed version. Exact installed versions require checking the applicable lockfile or runtime package information.

**Check:** Read the file only. Do not change version numbers or scripts.

### Step 5 — Separate what is known from what is not yet known

| Question | What the supplied evidence tells us |
|---|---|
| Is this a web app? | Yes — the GAIS app was created as a web app. |
| Are TypeScript / TSX files visible? | Yes — files ending in `.ts` and `.tsx` are visible. |
| Are Next.js-related files visible? | Yes — for example, `next.config.ts` is visible. |
| What exact package versions are installed? | Not established by the File Explorer screenshot alone. |
| Which package manager is authoritative? | Not established until the actual lockfile and environment are checked. |
| Did a production build pass? | Not established by viewing files or Preview. |
| Are tests passing? | Not established unless a test suite was actually run. |

The Prompt #0002 response later listed several version numbers, but that response also stated that it had not read any project files in that turn. Do not use that answer as independent evidence that those versions were inspected. Keep those details unverified until they are checked against the actual project files.

### Step 6 — Return to Preview

**Do this:** Select **Preview**.

**What you should see:** The page displaying:

```text
BVC Task Management Scaffold Inspection
```

**Check:** Confirm that the blank scaffold remains visible and that you did not make any file changes.

## 04. Prompt

A2 is a read-only inspection lesson. You do not need to run a feature-building prompt.

Do not ask AI to “improve the app”, “fix the design”, or “add the first task” yet. Those are different tasks and need their own approved scope.

## 05. What the real screenshot shows

The supplied screenshot records the actual GAIS Code view and the visible file tree. It is evidence of those visible filenames and the open editor only.

It does not prove exact installed package versions, complete dependency resolution, successful production build, automated tests, security, persistence, or deployment.

## 06. Check your work

- [ ] I reopened the same GAIS project from A1.
- [ ] I opened Code view.
- [ ] I found the `app` folder.
- [ ] I found `app/page.tsx` and `package.json`.
- [ ] I understand the basic purpose of these files.
- [ ] I did not edit, rename, move, or delete any file.
- [ ] I did not run Prompt #0001 again.
- [ ] I returned to Preview and saw the scaffold inspection text.

**Completion rule:** A2 is complete when you can locate the main files and distinguish observed facts from details that remain unknown. It is not a code-writing or debugging exercise.

## 07. Common mistakes and recovery

| What happened | What to do |
|---|---|
| I cannot find a file in the list | Expand the folders and check the actual names. Do not create a replacement file. |
| I accidentally typed into a file | Stop. Do not save. Tell the Human Owner what changed. |
| I cannot tell what a file means | Read the explanation above. Do not guess its technical role from its name alone. |
| Preview is blank or shows an error | Capture the actual screen. Do not ask AI to rewrite the project as a first response. |
| AI suggests adding features | Remind it that A2 is inspection only. Do not approve changes. |

## 08. What you have learned

You have learned the first important engineering habit: **look at what exists before asking AI to change it.**

## 09. Continue learning

- **Previous:** [A1 — Meet Google AI Studio](../01-meet-google-ai-studio/README.md)
- **Lesson Index:** [Phase A](../README.md)
- **Next:** [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)
- **Progress:** Lesson A2 of A4.

---

**BVC — Learn by Building.**  
*First see what AI created. Then decide what to do next.*
