# Phase A · Lesson 02 — Create Your First Blank Web App

**Learning level:** Beginner  
**Status:** Evidence Required — scaffold inspection is partially observed; technical details and evidence sync remain incomplete  
**Project:** BVC Task Management  
**Previous:** [A1 — Meet Google AI Studio](../01-meet-google-ai-studio/README.md)  
**Next:** [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)

## What You Will Achieve

Create one isolated, non-production blank WEB app in Google AI Studio Build mode and inspect what GAIS actually generated.

The app is only a starting point for learning. It does not contain Task Management features yet.

## Why It Matters

Before asking AI to build a real application, inspect the starting point instead of guessing which framework, files, or commands are being used.

## Before You Start

- Complete [Lesson A1 — Meet Google AI Studio](../01-meet-google-ai-studio/README.md).
- Use the GAIS account authorized for your practice.
- Do not connect the app to the BVC GitHub repository.
- Do not enter API keys, passwords, personal data, or customer information.

## Authorized scaffold-only prompt

When the current GAIS Build interface and app-type selection have been verified, use the exact approved prompt from [BVCTM-PROMPT-0001](../../prompts/BVCTM_PROMPT_0001_INITIAL_WEB_APP_SCAFFOLD.md).

~~~text
Create a minimal blank WEB application for the BVC Task Management
(BVCTM) project scaffold inspection.

Display only the text:
BVC Task Management Scaffold Inspection

Do not implement Task Management features, forms, persistence,
authentication, database access, APIs, external integrations,
hosting, or deployment.

Keep the application as small and simple as possible.
Do not connect the project to GitHub.
~~~

This prompt is for scaffold inspection only. Do not add a task form, save button, database, sign-in, external integration, or deployment request.

## What Has Been Observed

The Human Owner has supplied a GAIS screenshot showing the scaffold inspection app and its Code / File Explorer area. The visible tree includes entries such as app/layout.tsx, app/page.tsx, next.config.ts, tsconfig.json, package.json, and app/globals.css.

This is OBSERVED evidence of visible file names and the scaffold UI. It does not yet establish:
- Exact Next.js or React versions.
- The full dependency set.
- Package manager or lockfile state.
- Runtime behavior or successful build.
- Build command or output directory.
- Export completion.

Do not infer these facts from file names alone.

## Evidence checkpoints

- A2-01 — actual GAIS Build screen and verified entry point.
- A2-02 — actual app-type choice showing WEB selected.
- A2-03 — authorized prompt as entered before submission.
- A2-04 — actual scaffold Preview.
- A2-05 — actual generated file tree or Code view.
- A2-06 — export outcome, only if export is available.

Use only screenshots that materially help a Beginner. These are possible evidence points, not a requirement to capture every click.

## What You Have Learned

The goal is to create and inspect a blank starting point, not to build the Task Management application. Understanding the scaffold comes before choosing implementation commands or assuming a framework.

## Next Lesson

[Lesson A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)

---

**Status note:** Scaffold UI and file names have been observed in the supplied screenshot. Full scaffold inspection and repository screenshot synchronization remain Evidence Required.
