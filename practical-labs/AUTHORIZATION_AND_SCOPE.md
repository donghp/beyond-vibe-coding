# Practical Labs — Human Owner Authorization and Scope

**Project:** BEYOND VIBE CODING — Practical Labs\
**Style:** Dong Hong Style\
**Authorization recorded:** 2026-11-05\
**Authorized directory:** `/practical-labs/`

## 1. Human Owner authorization

The Human Owner has explicitly authorized the assistant to create and maintain practical-learning materials throughout the repository directory `/practical-labs/`, including:

- Create new lesson Markdown files.
- Create and update curriculum maps, indexes, lesson standards, examples, checklists, and learner resources.
- Organize lesson folders and supporting assets within `/practical-labs/`.
- Draft lessons proactively without requesting separate approval for every individual lesson.
- Prepare screenshot placeholders and image references for authentic screenshots supplied by the Human Owner.
- Revise lessons to improve clarity, accuracy, beginner usability, and consistency with Dong Hong Style.

This is a standing authoring authorization for the stated directory. It does not mean every lesson is automatically accepted for publication.

## 2. Scope boundaries

This authorization applies to `/practical-labs/` only.

It does not authorize changes to:

- `/projects/task-management/`
- `/specifications/`
- `/scripts/`
- `/tests/`
- `/.github/`
- Application source code or generated GAIS application code.
- Product Definition, architecture baselines, UX decisions, Decision Register, risk policy, Task Contracts, or other governance records.

It does not authorize creating or configuring databases, Supabase, Auth, RLS, API secrets, external integrations, hosting, or deployment.

## 3. Screenshots and user-supplied assets

The assistant may create lesson image slots, captions, and relative image references within `/practical-labs/`.

Only screenshots actually supplied by the Human Owner may be described as screenshots of the Human Owner's GAIS session. The assistant must not invent UI labels, button locations, generated files, build commands, Preview outcomes, or evidence.

Do not overwrite or delete Human Owner-supplied original screenshots. If an image needs redaction, annotation, cropping, or format conversion, preserve the original and create a separate derived copy.

Never include passwords, API keys, tokens, secret values, personal account details, customer data, or confidential information in a lesson asset.

## 4. Publication and Git authority

The assistant may prepare complete files and a review-ready package for `/practical-labs/`.

Repository publication continues to follow the project's existing source-control governance: use a dedicated branch, inspect the diff, validate links and assets, and submit a Pull Request. The Human Owner retains final review and Merge authority. No automatic Merge is authorized.

## 5. Truthfulness and learning quality

- Mark lessons DRAFT, EVIDENCE REQUIRED, or READY FOR REVIEW accurately.
- A generated Preview is not evidence of persistence, security, production readiness, or deployment.
- Separate OBSERVED, VERIFIED, UNKNOWN, NOT VERIFIED, and INFERENCE.
- Do not present planned features as implemented features.
- Do not make Beginner lessons depend on Supabase, Auth, RLS, GitHub, VS Code, or localhost.
- All lessons must comply with Product Definition v0.2.0 and relevant approved project decisions.
