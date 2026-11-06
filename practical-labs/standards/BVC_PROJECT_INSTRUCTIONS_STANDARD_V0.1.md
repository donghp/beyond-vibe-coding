# BVC Project Instructions Standard

**Document ID:** BVC-PL-PI-001  
**Version:** 0.1.0  
**Status:** Human Owner approved for Practical Labs use; repository publication pending PR review  
**Applies to:** Project-specific AI Instructions for BVC Practical Labs

---

## 1. Purpose

Project Instructions define the durable working rules an AI assistant should follow while helping with one specific Practical Lab project.

They give the AI a stable starting point for understanding:
- What the project is.
- Who owns decisions.
- Which sources are authoritative.
- What technology and existing structure must be preserved.
- Which files and changes are permitted.
- What security and project-isolation rules apply.
- How work must be checked and reported.

Project Instructions are not a task prompt, not a Task Contract, and not a technical sandbox.

## 2. Relationship to other project controls

Use these controls for different purposes:

| Control | Primary question |
|---|---|
| Approved product, architecture, security, and governance sources | What is true and approved for this project? |
| Task Contract or other applicable authorization | What work and changes are authorized now? |
| Project Instructions | How should AI work within this project? |
| Task Prompt | What specific task should AI perform now? |
| Verification Evidence | What was actually checked and what did the checks prove? |

Project Instructions cannot authorize a task, expand scope, approve a design, override a canonical source, or grant file-system permissions.

## 3. Authority and source-of-truth rules

Every project-specific Instructions file must state:
1. The Human Owner and decision authority.
2. The approved product baseline and applicable architecture/security sources.
3. The current Task Contract or task authorization requirement.
4. The way to handle conflicting, missing, or stale context.
5. The rule that AI suggestions and chat messages are not approvals by themselves.

The AI must not claim to have read a source that is not actually available in its current environment.

When facts are unknown, state UNKNOWN or request the relevant source.

## 4. Standard structure — eleven mandatory groups

Every project-specific Instructions file must contain these eleven groups.

### 01. Project Identity
Project name, purpose, type, audience, owner, and relationship to its parent learning program.

### 02. Project Authority
Human Owner authority, canonical sources, approval boundaries, and source precedence.

### 03. Scope Control
One task at a time, permitted work, explicit exclusions, and stop-and-ask behavior.

### 04. Technology and Scaffold
Observed framework, language, versions, package manager, dependencies, file structure, and the rule to inspect before assuming or changing them.

### 05. Coding Principles
Readability, maintainability, consistency, small changes, reuse, and dependency discipline.

### 06. File Integrity
CREATE / MODIFY / DELETE controls, file inventory, protected files, and unexpected-change handling.

### 07. Security and Privacy
Secrets, credentials, customer data, personal information, external services, and data exposure controls.

### 08. Project Isolation
Project-specific isolation from unrelated projects, their files, code, prompts, IDs, naming, data, and private materials.

### 09. UI/UX Compliance
Approved product and UX sources, unresolved decision handling, responsive and accessibility expectations, and limits of wireframes/mockups.

### 10. Verification and Evidence
Distinction between code generation, build, lint, tests, Preview, functional verification, deployment, and acceptance.

### 11. Communication and Stop Conditions
Beginner-friendly explanations, final reporting, uncertainty labels, and conditions that require stopping.

## 5. Mandatory Project Isolation Rule

Every project must carry a project-specific isolation rule. The exact wording may be tailored, but it must preserve these controls:

~~~text
PROJECT ISOLATION RULE

This application belongs exclusively to [PROJECT NAME].

Do not import, reuse, copy, or introduce project-specific files,
source code, prompts, task identifiers, instructions, naming
conventions, schemas, data, logs, or artifacts from other projects.

Do not assume that an instruction, architecture, configuration,
or decision from another project applies to this application.

General engineering concepts may be considered only when they are
independently appropriate to this project and consistent with its
approved sources.

Never expose, transfer, or publish private project information,
credentials, customer data, or confidential materials from another
project.

Create or modify only files authorized by the active task scope.

If the authorized files or boundaries are unclear, inspect the
project and report the proposed file-change inventory before writing.
Do not silently expand scope.
~~~

For the BVC Task Management sample, explicitly name EFIN and ENERIXON FIN as isolated projects. Other Practical Labs must name their own relevant project boundaries.

## 6. Technology and scaffold preservation

Project Instructions must not freeze a framework or dependency based solely on a guess.

Require the AI to:
- Inspect actual project files and manifests.
- Record observed framework and language evidence.
- Verify exact versions and package manager from the relevant files.
- Preserve the current scaffold and coding conventions.
- Avoid framework replacement, upgrades, build configuration changes, and new dependencies without authorization.
- Mark unavailable facts UNKNOWN or NOT VERIFIED.

A screenshot of a file name is useful observation but may not prove a dependency version or runtime behavior.

## 7. File integrity and scope

Project Instructions must say:
- Work only within the active authorized scope.
- Inspect relevant files before editing them.
- Report expected files before substantial changes.
- Never create unrelated documentation, task registers, prompts, or project files.
- Never delete or rename files without explicit authorization.
- Report all actual CREATE, MODIFY, and DELETE operations.
- Stop if unexpected or protected changes are detected.

These statements guide the AI. They do not technically prevent a tool from writing a file.

## 8. Security and privacy

Project Instructions must prohibit:
- Disclosing or hardcoding API keys, passwords, tokens, and secret environment values.
- Putting secrets in browser-side code.
- Publishing customer, personal, financial, or confidential information.
- Creating an external integration or exposing project data without authorization.
- Using real sensitive information in examples or tests when synthetic data is sufficient.

## 9. UI/UX compliance

Project Instructions must point to the applicable approved product and UX sources.

They must distinguish:
- Product requirements from design suggestions.
- Accepted design baselines from OPEN decisions.
- Conceptual wireframes from implemented screens.
- Design acceptance from real-device usability and runtime verification.

Never treat a visual example, screenshot, or mockup as permission to invent product behavior.

## 10. Verification and reporting

Project Instructions must require factual reporting of:
- Files inspected and files actually changed.
- Exact commands or actions performed.
- Build and lint outcomes.
- Automated and manual test outcomes.
- Preview observations.
- Deployment state, only where applicable.
- Known limitations, failures, and unverified claims.

A successful build does not prove product behavior. A visible Preview does not prove persistence, security, or deployment.

## 11. Versioning, storage, and synchronization

- Store the canonical project-specific Instructions file in that project's Practical Labs directory.
- Give it a version and a clear project identifier.
- Copy its contents into the target AI tool's Project Instructions / System Instructions area.
- Treat the AI tool's saved copy as an execution-time copy, not as the only source of truth.
- Update the canonical file through reviewed repository changes whenever the standard or project instructions change.
- Do not assume that changing the GitHub file automatically updates an already-open GAIS project.
- After changing Instructions, ask the AI to summarize them in a read-only check and inspect the project file tree for unintended edits.

## 12. Review checklist

- [ ] All eleven groups are present.
- [ ] Project Identity is specific to one project.
- [ ] Authority sources and decision owners are clear.
- [ ] Task-level scope cannot be silently expanded.
- [ ] Technology facts are observed or labeled UNKNOWN.
- [ ] File CREATE / MODIFY / DELETE controls are explicit.
- [ ] Security and privacy constraints are explicit.
- [ ] Project Isolation Rule names relevant cross-project boundaries.
- [ ] UX sources and OPEN decisions are respected.
- [ ] Verification and reporting requirements are explicit.
- [ ] Stop conditions are actionable.
- [ ] The Instructions are stored in the canonical project directory and versioned.
- [ ] A read-only understanding check has been prepared.

## 13. Companion materials

- [Project Instructions Template v0.1.0](../templates/PROJECT_INSTRUCTIONS_TEMPLATE_V0.1.md)
- [BVC Task Prompt Standard v0.1.0](BVC_TASK_PROMPT_STANDARD_V0.1.md)
- [BVC Practical Labs Authoring Standard v0.2.0](BVC_PRACTICAL_LABS_AUTHORING_STANDARD_V0.2.md)

---

**One project. One source of truth. One authorized scope.**
