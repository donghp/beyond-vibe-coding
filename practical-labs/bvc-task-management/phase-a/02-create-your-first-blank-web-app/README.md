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
| `lib/utils.ts` | A shared utility file. |
| `.env.example` | An example environment-variable file; do not put secret values in it. |
| `.eslintrc.json` | A visible ESLint configuration file. |
| `.gitignore` | Names of files and folders Git should normally ignore. |
| `bun.lock` | A Bun lockfile is visible; this screenshot alone does not prove it is the only package-manager artifact or that Bun was used for every operation. |
| `eslint.config.mjs` | A visible ESLint configuration file. |
| `metadata.json` | A project metadata file. Its complete purpose is not established by the screenshot alone. |
| `next-env.d.ts` | A Next.js TypeScript declaration file. |
| `package.json` | A project manifest listing scripts and software packages. |
| `postcss.config...` | A visible PostCSS configuration file; the filename is truncated in the screenshot. |
| `tsconfig.json` | Settings used by the TypeScript language tools. |
| `next.config.ts` | Configuration for the Next.js framework. |

Your screen may contain additional files. This table records visible names from the supplied screenshot and gives a beginner-level explanation; it does not assert the exact content or runtime status of each file.

**Figure A2-01 — Actual Google AI Studio Code view and File Explorer**

![Actual GAIS Code view showing the BVC Task Management scaffold file tree and app/page.tsx editor](../../../assets/screenshots/phase-a/a2-01-gais-code-file-explorer.jpg)

*Figure A2-01. The left side shows the GAIS File Explorer with the `app`, `hooks`, and `lib` folders and visible root-level project files. The editor on the right has `app/page.tsx` open. The visible JSX returns the heading "BVC Task Management Scaffold Inspection". This screenshot supports the visible file-tree and open-file observations only; it does not prove exact installed package versions, successful build, tests, security, persistence, or deployment.*

### Step 3 — Inspect `app/page.tsx`

**Do this:** Select `app/page.tsx` in the File Explorer. In the supplied screenshot it is already open.

**Why:** This file contains the page content that the Preview displays.

**What you should see:** A small React page component. The visible code returns a `main` element and an `h1` containing `BVC Task Management Scaffold Inspection`.

**Check:** Confirm the heading matches the Preview. Do not edit it in this lesson.

### Step 4 — Inspect the visible scaffold files

Open the files below one at a time, read them, and do not save changes:

- `package.json` — scripts and declared dependencies.
- `tsconfig.json` — TypeScript compiler settings.
- `next.config.ts` — Next.js configuration.
- `bun.lock` — lockfile content, if you need to identify exact resolved package versions.

The screenshot proves these filenames are visible, not the full content of those files. Exact installed versions must be read from the actual lockfile or verified runtime; do not infer them from a screenshot or from a model response.

### Step 5 — Separate what is known from what is not yet known

| Question | What the supplied evidence tells us |
|---|---|
| Is this a web app? | Yes — the GAIS app was created as a web app. |
| Are TypeScript / TSX files visible? | Yes — files ending in `.ts` and `.tsx` are visible. |
| Are Next.js-related files visible? | Yes — `next.config.ts` and `next-env.d.ts` are visible. |
| Is `app/page.tsx` open? | Yes — the editor displays the file and its scaffold heading. |
| Which lockfile is visible? | `bun.lock` is visible in the File Explorer. |
| What exact package versions are installed? | Not established by the screenshot alone. |
| Which package manager was actually used for each operation? | Not established by the screenshot alone. |
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

The supplied screenshot records the actual GAIS Code view and File Explorer. It shows the `app/page.tsx` editor and the scaffold heading in the visible code. It is not a complete project export or a dependency audit.

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
