# Dong Hong Style — Practical Lab Authoring Standard

**Document:** Practical Lab Authoring Standard\
**Version:** 0.1.0\
**Audience:** Beginner-first practical lesson authors and reviewers\
**Status:** Draft standard

## 1. Teaching promise

A reader who has never programmed before should be able to follow a lesson, understand what they are doing, see the expected result, and check whether it worked.

The lesson must not make a Beginner feel that they need to become a programmer before they can solve a small everyday problem.

> Do not teach code first. Help the learner describe a real need, work with AI one step at a time, and verify the result.

## 2. Dong Hong Style principles

### 2.1 Everyday First

Begin with a familiar human situation: remembering a bill, planning a day, organizing work, or following up on a task. Explain the problem before introducing a tool or technical term.

### 2.2 Show the Result Early

Let the learner see a small, useful outcome as early as possible. Avoid long technical introductions before the first meaningful result.

### 2.3 One Step, One Action

Each numbered step should ask the learner to perform one main action. Do not combine several unrelated clicks, settings, prompts, and verification actions into one step.

### 2.4 Natural Language

Teach the learner to explain what they need in ordinary language. Introduce prompt structure progressively: goal, context, constraints, expected result, and how to check the result.

Start with the simplest prompt pattern that can work. Add examples or more structure only when they materially improve the result.

### 2.5 Small Improvements

Do not ask AI to rebuild everything when one small change is enough. Teach the learner to request a bounded improvement and then check that existing behavior still works.

### 2.6 Visual Learning

Use real screenshots from the actual tool interface. Images should remove uncertainty, not decorate the page.

### 2.7 Verify Everything

A message from AI saying “done” is not evidence. Every meaningful lesson needs a visible or repeatable check.

### 2.8 Human in Control

The learner decides what to build, reviews what AI produced, and decides whether the result is acceptable. AI is a collaborator and executor, not the product owner.

## 3. Standard lesson structure

Every practical lesson should use this structure. Sections may be short, but do not omit a section when it is needed for safe and independent practice.

1. **What You Will Build** — state one visible outcome.
2. **Why It Matters** — connect the task to an everyday problem.
3. **Before You Start** — list only genuine prerequisites and explain what is not required.
4. **Let's Build It** — provide numbered steps, one action per step.
5. **What You Should See** — describe the expected visible result.
6. **Check Your Work** — give a simple proof or repeatable check.
7. **Common Mistakes & Recovery** — explain likely mistakes and safe recovery.
8. **What You Have Learned** — recap in plain language.
9. **Your Next Small Challenge** — offer one optional, bounded practice task.

## 4. Required content inside each step

### Step N — [Action-oriented title]

**Do this**\
Tell the reader one concrete action. Name the screen or visible area only if it has been verified in the current interface.

**Why**\
Explain the reason in plain language.

**Type or choose**\
Show the exact text to enter or the exact visible option to choose. Use a copyable code block for prompts and commands.

**What you should see**\
Describe the expected result. Do not promise a result that has not been observed.

**Check**\
Tell the reader how to verify the result.

**If it looks different**\
Give a safe recovery action or tell the reader to stop and share a screenshot. Do not invent alternate controls.

## 5. Screenshot standard — checkpoint, not every click

Use the rule:

> Screenshot by checkpoint, not by click.

A typical lesson may need 2–5 screenshots, but there is no mandatory number. Use fewer when the interface is simple and more only when the learner would otherwise be uncertain.

Good checkpoint examples:

- The starting screen, with the relevant area visible.
- The prompt before it is submitted, when exact wording matters.
- The generated app or visible result.
- A verification view that proves the lesson's outcome.
- An error or recovery screen, when the lesson teaches troubleshooting.

Do not capture every mouse movement, repeated click, or intermediate loading state.

### 5.1 Screenshot authenticity

- Use screenshots captured from the actual GAIS session used for the lesson.
- Do not replace real UI screenshots with AI-generated imitations.
- Do not invent a button, menu, tab, label, file, or status.
- Preserve enough surrounding UI so the reader can recognize where they are.
- Add numbered callouts only when they clarify the action.
- Do not cover or alter important UI text.

### 5.2 Privacy and secrets

Before sharing a screenshot, inspect it for API keys, tokens, passwords, private account details, customer data, financial information, or confidential content. Redact sensitive information before publication. Never include a secret value in Markdown, a prompt example, a screenshot, or an export.

### 5.3 Image naming and placement

Use stable, descriptive names:

- `assets/screenshots/phase-a/a1-01-gais-start-screen.png`
- `assets/screenshots/phase-a/a2-01-build-mode.png`
- `assets/screenshots/phase-b/b1-01-first-task-visible.png`

Embed images near the relevant step:

```markdown
![GAIS Build screen showing the verified starting area](../../assets/screenshots/phase-a/a1-01-gais-start-screen.png)

*Figure A1-01. The actual GAIS screen used in this lesson.*
```

Update relative paths to match the final folder layout. Do not publish broken links or placeholder images as if they were real.

## 6. Evidence labels

Use these labels consistently:

- **OBSERVED** — directly visible in a screenshot or actual project file.
- **VERIFIED** — tested by an action with a recorded result.
- **UNKNOWN** — not known from available evidence.
- **NOT VERIFIED** — not tested or not accessible.
- **INFERENCE** — a reasoned interpretation; it must be labeled and must not replace an observation.

Do not convert a Preview into a claim of production readiness. Do not convert a generated file name into a claim that its contents work.

## 7. Prompt-writing standard

A Beginner prompt should be understandable without knowing prompt-engineering terminology.

Progression:

1. Start with a clear, simple request.
2. Add context when AI needs it.
3. Add constraints to prevent unwanted changes.
4. Specify the visible outcome.
5. Ask AI to explain what it changed when that helps the learner review the result.
6. Check the result manually.

### Example prompt pattern

```text
I want to [simple goal].

This is for [everyday context].

Please keep the change limited to [boundary].

I expect to see [visible result].

After making the change, tell me what you changed and how I can check it.
```

This is a teaching pattern, not a claim that a particular GAIS control or response format is guaranteed.

## 8. Writing style

- Write directly to the reader as “you”.
- Prefer short sentences and familiar words.
- Explain a technical term the first time it appears.
- Use a real-life analogy only when it genuinely helps.
- Avoid unexplained acronyms.
- Avoid dense paragraphs and long prompt dumps.
- Tell the reader why an action matters.
- Never blame the reader for an error.
- Separate what happened from what we think happened.
- Be honest about unsupported or untested behavior.

## 9. Beginner / Intermediate / Advanced boundaries

### Beginner

Use GAIS Build mode and the application Preview. No database, Supabase, Auth, RLS, GitHub, VS Code, or localhost should be required as prerequisites. Teach simple browser-based use and clearly explain browser-storage limitations.

### Intermediate

Introduce a database, relational data, authentication, authorization, and user-scoped data only when the approved learning design and task scope allow them.

### Advanced

Introduce source control, local development, testing, deployment, operational practices, and production concerns behind their own learning objectives and verification gates.

## 10. Quality checklist before publication

- [ ] The lesson has one clear learner outcome.
- [ ] The reader can start without assumed programming knowledge.
- [ ] Each numbered step has one main action.
- [ ] The reason for each important action is clear.
- [ ] Exact UI labels and locations are based on current observation.
- [ ] Every prompt or command is copyable and complete.
- [ ] Expected results are described without overclaiming.
- [ ] At least one meaningful verification checkpoint exists.
- [ ] Common mistakes and recovery instructions are included where needed.
- [ ] Screenshots are authentic, legible, relevant, and privacy-safe.
- [ ] Image links resolve in the repository.
- [ ] No screenshot, command, build setting, or file detail is invented.
- [ ] Beginner / Intermediate / Advanced boundaries are respected.
- [ ] The lesson links to the next appropriate lesson.
- [ ] The lesson does not imply that untested behavior has passed.

## 11. Relationship to BVC governance

This standard governs reader-facing educational style. It does not authorize changes to product baselines, architecture, UX decisions, security controls, or the application itself.

Repository publication and implementation must follow the applicable project governance and Human Owner review process.
