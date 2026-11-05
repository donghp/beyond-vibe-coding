# Phase A · Lesson 01 — Meet Google AI Studio

**Learning level:** Beginner\
**Estimated time:** 10–15 minutes\
**Status:** In progress — checkpoint A1-01 observed; A1-02 awaiting Human Owner capture\
**Project:** BVC Task Management\
**Evidence baseline:** A1-01 actual GAIS screenshot supplied by Human Owner\
**Scaffold task boundary:** BVC-TM-TC-003 Revision 1 — APPROVED

## What you will learn

By the end of this lesson, you should be able to explain in simple words:

- What Google AI Studio (GAIS) is used for in this project.
- What Build mode is intended to help you do.
- What Preview means.
- Why we check what AI creates instead of assuming it is correct.

You do not need to know programming to complete this introduction.

## Why this matters

Imagine you have an idea for a small tool that helps you remember the work you need to do.

In the traditional approach, you might need to learn a programming language, install development tools, and write code before you see anything.

With an AI app-building tool, you can describe what you need in ordinary language and ask AI to help create an initial application. You still need to review and test the result. AI can misunderstand a request or produce something that does not work as expected.

Our goal is not to ask AI to build everything at once. We will work together in small steps.

## Before you start

You need:

- A Google account that you are allowed to use with Google AI Studio.
- A modern web browser.
- An internet connection.

You do **not** need Python, VS Code, GitHub, a local development server, a database, Supabase, or a programming background.

Use the GAIS account and workspace authorized for your own practice. Do not share passwords, private account information, API keys, or secret values in screenshots.

## Step 1 — Open Google AI Studio

**Do this**

Open the official Google AI Studio website:

[https://aistudio.google.com/](https://aistudio.google.com/)

Sign in using the account you intend to use for this practice project.

**Why**

We need to start in the actual tool that will help us create the first web application.

**What you should see**

You should arrive at the Google AI Studio interface available to your account.

**Screenshot checkpoint — A1-01**

<figure>

![Google AI Studio Apps landing screen supplied by the Human Owner, showing the Explore, Build, and Manage navigation groups and the New app entry](../../assets/screenshots/phase-a/a1-01-gais-start-screen.png)

<figcaption>Figure A1-01. Actual Google AI Studio Apps landing screen at aistudio.google.com/apps. The New app entry is visible and highlighted under BUILD. Evidence status: OBSERVED.</figcaption>
</figure>

**Observation from the supplied screenshot**

The left navigation shows three groups:

- **EXPLORE:** Playground, History.
- **BUILD:** New app, My apps, Gallery.
- **MANAGE:** Dashboard, Documentation.

The address bar shows `aistudio.google.com/apps`.

This screenshot proves that the Apps landing screen was displayed and that **New app** was visible under **BUILD**. It does not prove that an application was created, that WEB was selected, or that a scaffold or Preview exists.

**Check**

Confirm that you are in Google AI Studio. Do not continue by guessing where a control is located.

If your screen looks different from the final verified screenshot, stop and compare it with the current lesson version. The interface may differ by account, rollout, or product update.

## Step 2 — Open the app creation area

**What you can see**

The actual A1-01 screenshot shows the **BUILD** navigation group on the left and the **New app** entry directly beneath it.

**Do this**

1. Find **BUILD** in the left navigation.
2. Select **New app** once.
3. Wait for the next screen to finish loading.
4. Stop. Do not choose WEB or Android and do not enter a prompt yet.

**Why**

We need to inspect the app-creation screen before choosing the application type. This avoids guessing about controls that have not yet been observed.

**What you should see**

The next GAIS screen after selecting **New app**. Its exact labels and app-type options are not yet verified.

**Screenshot checkpoint — A1-02**

> [SCREENSHOT REQUIRED: Capture the full visible GAIS application area after selecting New app, before choosing an app type or entering a prompt.]

Save the screenshot as `a1-02-new-app-screen.png` in `practical-labs/bvc-task-management/assets/screenshots/phase-a/`.

**Check**

Confirm that the screen changed. If it did not, stop and share a screenshot of what is visible. Do not guess an alternate button or menu.

## Step 3 — Understand Preview

**What it means**

A Preview is a view of the application as it appears while you are building it. It helps you inspect the visible result and interact with the prototype.

A Preview is useful, but it is not proof that every feature works. For example, seeing a task on screen does not by itself prove that the task is saved and will still be there after reopening the app.

**What you should remember**

- The prompt describes what you want.
- AI generates or changes the application.
- Preview lets you inspect the visible result.
- You must still test the behavior you care about.

> [SCREENSHOT REQUIRED: Capture an actual Preview screen from the blank web scaffold created under BVC-TM-TC-003. Do not use a mock interface.]

![Blank BVC Task Management scaffold Preview](../../assets/screenshots/phase-a/a1-03-blank-app-preview.png)

*Figure A1-03. Actual blank web scaffold Preview — awaiting Human Owner capture and review.*

## What you have learned

| Term | Plain-language meaning |
|---|---|
| Google AI Studio | The online AI tool we will use to help create the practice app. |
| Build mode | The app-building area where we describe what we want AI to create. |
| Preview | A view that lets us inspect the visible application while building it. |

## Check your understanding

Answer these questions in your own words:

1. What is the difference between asking AI to create an app and checking the app in Preview?
2. Why is a visible Preview not enough to prove that a task is saved?
3. Why will we make one small change at a time?

You do not need technical definitions. Explain the ideas as you would explain them to a friend.

## Common mistakes

**I cannot find the same Build mode entry shown in the lesson.**\
Do not click a different control based on guesswork. Take a screenshot of the screen you actually see and compare it with the current lesson version.

**The Preview looks correct, so I assume the application is finished.**\
A Preview only shows what is visible at that moment. Later lessons will test saving, reopening, and other behavior separately.

**The AI created more than I asked for.**\
Do not accept extra functionality automatically. We will learn to give clearer constraints and check the generated result.

## Your next small challenge

Explain, without technical language, how you would ask AI to create a simple tool that helps you remember one thing you need to do tomorrow.

The approved BVC-TM-TC-003 Revision 1 authorizes one isolated blank WEB app and scaffold inspection only. The actual Task Management features will be implemented progressively under a separate approved implementation scope.

## References

- [Google AI Studio Build mode — official documentation](https://aistudio.google.com/docs/aistudio-build-mode)
- [Google Cloud: How to build an app with AI](https://cloud.google.com/use-cases/how-to-build-an-app-with-ai)

## Publication note

This is a lesson draft, not a fully verified GAIS walkthrough. Replace every screenshot placeholder with an authentic, privacy-safe screenshot. Verify exact interface labels and actions against the Human Owner's current GAIS session before marking this lesson Ready for Review.
