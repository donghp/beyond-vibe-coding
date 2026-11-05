# Phase A · Lesson 03 — Talk to AI Like a Teammate

**Learning level:** Beginner\
**Estimated time:** 15–20 minutes\
**Status:** Draft — add verified GAIS conversation screenshots\
**Project:** BVC Task Management

## What you will learn

You will learn how to explain a simple need to AI, provide just enough context, set a boundary, and describe the result you expect.

You do not need special prompt-engineering vocabulary. Start by speaking clearly.

## Why this matters

Imagine asking a friend to help you remember tomorrow's work.

You probably would not say: “Build a complete enterprise productivity platform with advanced architecture.”

You might say: “I need a simple way to remember the three things I must do tomorrow.”

That is a much better starting point. AI also works better when your request has a clear purpose.

## Before you start

- Complete Lesson 01.
- Use a simple, non-sensitive example.
- Do not enter passwords, API keys, personal account details, customer information, or confidential data.
- This lesson teaches how to communicate a request. It does not authorize the AI to implement a Task Management feature.

## Step 1 — Start with the outcome you want

**Do this**

Write one sentence that explains what you want to achieve.

Example:

```text
I want a simple way to remember the tasks I need to do tomorrow.
```

**Why**

AI needs to understand the problem before it can suggest a useful solution.

**Check**

Can someone who does not know your project understand what you need from this sentence?

## Step 2 — Add a little everyday context

**Do this**

Explain who will use the tool and when it will be useful.

Example:

```text
I will use it for my personal daily work. I want to open it in the morning
and quickly see what I need to do.
```

**Why**

The same request can lead to different solutions depending on how the tool will be used.

**Check**

Does your context explain the situation without becoming a long story?

## Step 3 — Set a simple boundary

**Do this**

Tell AI what you do not want it to do yet.

Example:

```text
Keep the first version very simple. Do not add user accounts,
a database, team collaboration, or advanced features.
```

**Why**

A boundary helps prevent a small request from turning into a much bigger project.

**Check**

Have you clearly stated what is outside the current request?

## Step 4 — Describe the visible result

**Do this**

Explain what you expect to see.

Example:

```text
I want one simple screen with a clear list of tasks and an easy way
to add a new task.
```

**Why**

A visible result gives you something concrete to review. It is easier to say whether a screen is clear than to judge a vague request such as “make it modern”.

**Check**

Could you look at the result and decide whether the request was understood?

## Step 5 — Put the request together

Use the following example as a starting point:

```text
I want a simple way to remember the tasks I need to do tomorrow.

I will use it for my personal daily work. I want to open it in the morning
and quickly see what I need to do.

Keep the first version very simple. Do not add user accounts,
a database, team collaboration, or advanced features.

I want one simple screen with a clear list of tasks and an easy way
to add a new task.

Before building anything, explain your understanding of the request
and point out anything that is unclear.
```

**Why**

This request explains the goal, context, boundary, visible outcome, and the next action expected from AI.

**Check**

Read the prompt once as if you were the person receiving the request. Is the task clear? Can you tell what is included and what is not included?

## Step 6 — Review AI's understanding

When you use this lesson in the actual GAIS conversation interface, compare the AI response with your original request.

Check:

- Did AI understand the everyday problem?
- Did it keep the first version small?
- Did it introduce a database or account system even though you excluded them?
- Did it describe a visible result?
- Did it ask a useful question, or did it assume something important?

Do not accept a response merely because it sounds confident.

> [SCREENSHOT REQUIRED: Capture the actual GAIS conversation showing the prompt and response. Remove private account information and secrets.]

![Placeholder: actual GAIS prompt and response](../../assets/screenshots/phase-a/a3-01-prompt-and-response-PLACEHOLDER.png)

*Figure A3-01. Replace with the real GAIS conversation screenshot.*

## A small improvement exercise

Compare these two requests.

**Request A**

```text
Make me a task app.
```

**Request B**

```text
I want a simple personal task list for tomorrow.
Start with one screen and let me add a task by entering its title.
Do not add accounts, a database, or advanced features yet.
Before making changes, tell me what you plan to create.
```

Request B is more useful because it gives AI a goal, a boundary, and a way to confirm understanding.

The longer request is not automatically better. The important thing is that the request is clear enough for the current task.

## Common mistakes

**I describe too many features at once.**\
Start with one outcome. Save unrelated ideas for later.

**I use words such as “modern”, “smart”, or “professional” without explaining what I mean.**\
Describe what the reader should see or do instead.

**I let AI add features I did not request.**\
Restate the boundary and ask for a smaller change.

**I assume AI understood because it said “I understand”.**\
Compare its summary with your original goal. Ask it to correct any mismatch.

## What you have learned

A useful request does not need complicated language. It should explain:

1. What you want.
2. Why you need it.
3. What should stay out of scope.
4. What result you expect.
5. How AI should confirm its understanding.

## Your next small challenge

Write a request for a simple tool that reminds you to pay an electricity bill. Keep it to a few sentences. Ask AI to explain its understanding before asking it to build anything.

## Publication note

The examples in this lesson are generic learning examples. Exact GAIS interface actions and screenshots must be verified against the current Human Owner session before this lesson is marked Ready for Review.
