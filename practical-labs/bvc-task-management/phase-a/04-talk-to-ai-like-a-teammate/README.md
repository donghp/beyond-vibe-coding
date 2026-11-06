# Phase A · Lesson A4 — Talk to AI Like a Teammate

**Project:** BVC Task Management  
**Learning level:** Beginner  
**Estimated time:** 15–20 minutes  
**Status:** Draft — practical GAIS conversation screenshots required  
**Previous:** [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)  
**Next:** [Phase B — Build Your First Task](../../phase-b/README.md)

> **Quick navigation:** [Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase A Index](../README.md) · [← A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md) · **A4 of A4** · [Next Phase — Build Your First Task](../../phase-b/README.md)

---

## 00. Lesson Information

**One practical outcome:** You can prepare a clear, bounded task request and ask AI to explain its understanding before any implementation begins.

**Starting state:** Complete A1–A3. Project Instructions have been saved and checked in the GAIS project.

**Scope boundary:** This lesson teaches how to communicate a task. It does not authorize a new application feature.

## 01. What You Will Achieve

You will learn to explain what you need, provide the context AI needs, set a boundary, describe the result you expect, and ask AI to confirm its understanding.

You do not need special prompt-engineering vocabulary. Start by speaking clearly.

## 02. Why It Matters

Imagine asking a friend to help you remember tomorrow's work.

You probably would not say: “Build a complete enterprise productivity platform with advanced architecture.”

You might say: “I need a simple way to remember the three things I must do tomorrow.”

That is a better starting point because the need is understandable.

## 03. Before You Start

- Complete [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md).
- Use a simple, non-sensitive example.
- Do not enter passwords, API keys, personal account details, customer information, or confidential data.
- Remember: the example in this lesson is for communication practice. It does not authorize a product feature.

## 04. Step-by-Step Guide

### Step 1 — Start with the outcome

**Do this**  
Write one sentence that explains what you want to achieve.

~~~text
I want a simple way to remember the tasks I need to do tomorrow.
~~~

**Why**  
AI needs to understand the problem before suggesting a solution.

**Check**  
Can someone who does not know your project understand the sentence?

### Step 2 — Add everyday context

**Do this**  
Explain who will use the tool and when it will be useful.

~~~text
I will use it for my personal daily work. I want to open it in the morning
and quickly see what I need to do.
~~~

**Why**  
The same request can lead to different solutions depending on how the tool will be used.

**Check**  
Does your context explain the situation without becoming a long story?

### Step 3 — Set a boundary

**Do this**  
Tell AI what must stay out of the current task.

~~~text
Keep the first request very simple. Do not add user accounts,
a database, team collaboration, or advanced features.
~~~

**Why**  
A boundary prevents a small request from turning into a much larger project.

**Check**  
Have you stated what is outside the current request?

### Step 4 — Describe the visible result

**Do this**  
Explain what you expect to see.

~~~text
I want one simple screen with a clear list of tasks and an easy way
to add a new task.
~~~

**Why**  
A visible result gives you something concrete to review.

**Check**  
Could you look at the result and decide whether the request was understood?

### Step 5 — Put the request together

Use this generic example as a starting point:

~~~text
I want a simple way to remember the tasks I need to do tomorrow.

I will use it for my personal daily work. I want to open it in the morning
and quickly see what I need to do.

Keep this request very simple. Do not add user accounts,
a database, team collaboration, or advanced features.

I want one simple screen with a clear list of tasks and an easy way
to add a new task.

Before making any changes, explain your understanding of the request,
identify anything unclear, and tell me what you would plan to do.
Do not implement anything until I have reviewed the plan.
~~~

**Why**  
This request explains the goal, context, boundary, expected result, and the next action expected from AI.

**Check**  
Can you identify the task, its limits, and the result you expect?

### Step 6 — Use the seven-step task process

The BVC process is:

1. Understand the request.
2. Inspect the actual project and relevant files.
3. Prepare the context, scope, constraints, expected result, and checks.
4. Confirm authorization.
5. Execute the bounded task.
6. Verify the actual result.
7. Ask the Human Owner to accept or reject the evidence.

You do not need to write seven paragraphs in every simple prompt. The process is a working discipline; the prompt should include the details needed for its actual task.

### Step 7 — Review AI's understanding

When you use this lesson in GAIS, compare the AI response with your original request.

Check:
- Did AI understand the everyday problem?
- Did it preserve the project instructions?
- Did it keep the request small?
- Did it introduce a database or account system even though you excluded them?
- Did it describe a visible result?
- Did it identify assumptions or ask a useful question?
- Did it wait for permission before changing files?

Do not accept a response merely because it sounds confident.

## 05. Complete Prompt

The example in Step 5 is a communication exercise, not an implementation authorization.

For real write-capable tasks, use the [BVC Task Prompt Standard](../../../standards/BVC_TASK_PROMPT_STANDARD_V0.1.md) and its Prompt Readiness Gate.

## 06. See the Real Result

Capture the actual GAIS conversation showing the practice request and AI response.

**Evidence status:** screenshot required. Do not reuse a generated or illustrative screen as real GAIS evidence.

## 07. Check Your Work

- [ ] The request has one main outcome.
- [ ] Everyday context is clear.
- [ ] The boundary is explicit.
- [ ] The expected visible result is described.
- [ ] AI explains its understanding before making changes.
- [ ] AI identifies uncertainty rather than guessing.
- [ ] No feature was implemented during this communication-only exercise.

## 08. Common Mistakes & Recovery

**I describe too many features at once.**  
Start with one outcome. Save unrelated ideas for later.

**I use words such as “modern”, “smart”, or “professional” without explaining what I mean.**  
Describe what the user should see or do.

**I let AI add features I did not request.**  
Restate the boundary and ask for a smaller plan.

**I assume AI understood because it said “I understand”.**  
Compare its summary with your original goal.

**I ask AI to implement before the task is ready.**  
Use the Prompt Readiness Gate. If context or scope is missing, allow read-only inspection only.

## 09. What You Have Learned

A useful request should explain:
1. What you want.
2. Why you need it.
3. What must stay out of scope.
4. What result you expect.
5. How AI should confirm its understanding.
6. How you will check the actual result.

## 10. Continue Learning

- **Previous:** [A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md)
- **Next:** [B1 — Create Your First Task](../../phase-b/b1-create-your-first-task/README.md)
- **Lesson Index:** [Phase A](../README.md)
- **Progress:** Lesson A4 of A4.

---

**BVC — Learn by Building.**  
*Clear work begins with a clear request.*


## Continue learning

[Practical Labs Home](../../../README.md) · [Project Index](../../README.md) · [Phase A Index](../README.md) · [← A3 — Set Up Project Instructions](../03-set-up-project-instructions/README.md) · [Next Phase — Build Your First Task](../../phase-b/README.md)
