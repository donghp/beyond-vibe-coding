# BVCTM-PROMPT-0002 — Project Instructions Understanding Check

**Project:** BVC Task Management (BVCTM)  
**Prompt ID:** BVCTM-PROMPT-0002  
**Lesson:** Phase A — A3 Set Up Project Instructions  
**Version:** 0.1.0  
**Purpose:** Read-only check that the saved GAIS Project Instructions are understood.

---

## Copy and run in the BVC Task Management GAIS project

~~~text
Before making any code changes, read and summarize the Project Instructions
currently provided to you for this project.

Please confirm:

1. What is the purpose of BVC Task Management?
2. Who controls product decisions, task authorization, acceptance, and release?
3. Which learning level and phase are appropriate for the current setup lesson?
4. Which technology and file-structure facts have actually been observed
   in the existing scaffold?
5. Which framework versions, dependencies, package-manager details,
   or commands remain UNKNOWN unless verified from the actual files?
6. Which capabilities are outside the current Beginner setup lesson?
7. What rules must you follow before creating, modifying, renaming,
   moving, or deleting project files?
8. What does the Project Isolation Rule require, including its boundaries
   with EFIN and ENERIXON FIN?
9. How will you distinguish code generation, build, lint, tests, Preview,
   manual verification, and deployment?
10. Under what conditions must you stop and ask the Human Owner?

For every answer, distinguish facts supported by the current project
or these Project Instructions from facts that are UNKNOWN.

Do not create, modify, rename, move, or delete any files.

Do not run build commands, install packages, change configuration,
implement application features, connect external services, or deploy.

This is a read-only instruction-understanding check only.

At the end, state explicitly:
- Whether you changed any project files: the answer must be NO.
- Which project files you actually inspected, if any.
- Which facts remain UNKNOWN or NOT VERIFIED.
~~~

## Expected checkpoint

The AI should correctly explain the project identity, Human Owner authority, current Beginner boundary, scaffold-preservation rule, Project Isolation Rule, verification expectations, and stop conditions.

It must not invent exact framework versions or claim to have inspected a file it could not access.

## Scope boundary

This prompt is read-only. It does not authorize:
- Task Management feature implementation.
- File creation or modification.
- Framework or dependency changes.
- Database, Supabase, Authentication, or RLS setup.
- GitHub connection, local development, or deployment.

## Verification

After the response:
1. Compare the AI summary with PROJECT_INSTRUCTIONS_V0.1.md.
2. Inspect the GAIS Code / File Explorer view.
3. Confirm that no files were created, modified, renamed, moved, or deleted during the check.
4. Record any incorrect answer or unknown fact.
5. Do not mark Lesson A3 complete until the instructions are saved and the read-only check has been reviewed.

**Prompt ID:** BVCTM-PROMPT-0002  
**Next prompt allocation:** Check the current project prompt index and allocate the next unused sequential ID.