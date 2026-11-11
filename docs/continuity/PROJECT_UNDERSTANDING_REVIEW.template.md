# Project Understanding Review — Session Template

**Purpose:** Produce a source-backed Vietnamese understanding report at the start of every new ChatGPT window.  
**Use:** Fill this template from live canonical sources; do not assume chat memory is current.  
**Storage rule:** The report is a per-session chat response. Do not commit a duplicate report for every window. Persist only a material decision, correction, blocker transition or state change through its separately authorized project record.

## 0. Review metadata

- Review date/time and timezone:
- Executor: ChatGPT — Chief Architect / Project Engineering Orchestrator
- Actual model/tool label:
- Available tools and verified capabilities:
- Repository:
- Live main SHA:
- Sources inspected and inspection limitations:

## 1. Project identity and live repository baseline

- Project/program name and ID:
- Repository owner/name and stable repository ID:
- Default branch and live main SHA:
- Latest material merged PRs/commits relevant to the active project:
- Open PRs: title, number, base/head, SHA, changed-file scope, review/check status:
- Relevant branches and whether each is canonical, proposed, stale or diverged:
- Working-tree/local branch status supplied by the Owner, if any:
- Exact GitHub pagination or connector limitations:

For every repository claim, cite a path, PR/commit URL or exact ref. Do not infer local/GAIS/IDE synchronization from GitHub.

## 2. Project purpose, product and audience

- Project purpose and problem being solved:
- Product identity and promise:
- Target users and learner audiences:
- Current approved Product Definition and revision:
- Product scope and explicit exclusions:
- Source references and evidence classification:

## 3. Product, curriculum and delivery map

- Current phase, milestone and learning path:
- Completed phases/lessons and their evidence:
- Active phase/lesson:
- Planned or gated phases:
- Distinguish learning completion from product-feature completion:
- Identify what the learner builds in GAIS versus later local/IDE/database/deployment environments:
- Source references and evidence classification:

## 4. Architecture and knowledge sources

- Accepted architecture baseline and its exact acceptance boundary:
- Architecture decisions, component boundaries and technology direction:
- Domain/knowledge references and technical specifications:
- Design/UX baselines and their acceptance status:
- Runtime, integration, security and deployment items that remain unverified:
- Source references and evidence classification:

## 5. Governance, decisions and approval gates

- Human Owner / Product Owner decision authority:
- Canonical governance and decision registers:
- Active approved Task Contract and required context:
- Open, blocked, deferred or verification-required decisions:
- Risk policy and applicable risk level:
- Approval, change-control, review, acceptance and merge gates:
- Conflicts between current sources; do not silently reconcile them:
- Source references and evidence classification:

## 6. Active and completed tasks

| Task ID | Title | Contract/revision | Lifecycle status | Execution status | Verification/evidence | Owner acceptance | Source |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

For each active task, state the exact allowed CREATE/MODIFY/DELETE scope, change budget, stop conditions, recovery point and next permitted action. Distinguish a contract being approved from a task being executed, verified or accepted.

## 7. Contracts, prompts and publication state

| Contract ID/revision | Status on main | Task ID | Prompt ID | Prompt publication | Executor/environment | Next gate |
|---|---|---|---|---|---|---|
| | | | | | | |

- Verify exact prompt text and its Contract references before recommending execution.
- Identify proposed branch/PR material separately from canonical main.
- Never infer execution from prompt publication or Contract approval.

## 8. Execution, verification and evidence

- Actual execution reports and executor/model/environment:
- Exact changed-file inventory/diff inspected:
- Commands/tests/build/lint/manual Preview actions actually run:
- Evidence references, provenance and integrity:
- Checks not run, source not inspected, limitations and unsupported claims:
- Technical verification status:
- Evidence completeness:
- Human Owner acceptance status:

Keep execution, technical verification, evidence completeness and Owner acceptance as separate dimensions. A claim is not evidence; a passing check is not acceptance.

## 9. AI roles and current capability snapshot

| Executor | Assigned role | Actual model/tool label this session | Environment/account verified? | GitHub/local/GAIS/IDE capability | Status |
|---|---|---|---|---|---|
| Human Owner | Final authority and user/environment evidence provider | Owner-reported | | | |
| ChatGPT | Chief Architect / Project Engineering Orchestrator | | | | |
| Gemini | Primary GAIS implementation worker when routed by Contract | | | | |
| DeepSeek | Independent reviewer/tester/code auditor by default | | | | |

- State what is VERIFIED versus UNKNOWN for each capability.
- Do not assume model selection, quota, account connection, repository linkage or workspace synchronization.
- Declare the one active writer, sender release and receiver acceptance if a handoff is in progress.

## 10. Local, GAIS and VS Code boundaries

- Windows repository path, branch, HEAD and working-tree status:
- Local-to-origin synchronization and last verified fetch:
- GAIS app identity, model label, repository link, branch and last sync:
- VS Code repository path, branch, HEAD, status and DeepSeek connection:
- Local-only files, screenshots, stashes, unsaved work or backups:
- Which facts are supplied by the Owner versus independently observed:
- Unknowns that block the next action:

A GitHub connector cannot inspect a private GAIS workspace or the Owner's local filesystem unless separate current evidence is supplied.

## 11. Conflicts, stale records and missing information

| Item | Source A and ref | Source B and ref | Evidence labels | Impact | Blocks which action? |
|---|---|---|---|---|---|
| | | | | | |

Check at least:
- CURRENT_STATE.yaml and HANDOFF_LOG.md snapshots versus live main and project records;
- Task Register versus Prompt Register versus Project State;
- approved versus proposed decisions and baselines;
- branch/PR state versus merged main;
- Owner-reported execution versus independently inspected evidence;
- local/GAIS/IDE state versus remote GitHub state.

Do not modify protected or out-of-scope registers to resolve a conflict. Report it and identify the required authority path.

## 12. Blockers, risks and next permitted action

- Material blockers:
- Risk and impact:
- Missing approval/context/evidence:
- Protected paths or scopes relevant to the active task:
- Exactly ONE smallest next permitted action:
- Why that action is permitted by the current source:
- What must not happen yet:

## 13. Evidence classification legend

Use these report labels for every material claim:

- **VERIFIED:** directly checked against the current canonical file, live GitHub metadata, commit/PR, reproducible command or inspectable evidence.
- **OWNER_REPORTED:** supplied or described by the Human Owner but not independently verified in the external/local environment.
- **PROPOSAL:** present on an unmerged branch, open PR or unapproved document; not canonical project truth.
- **OPEN_QUESTION:** unresolved and requiring evidence or an Owner decision.
- **STALE:** historical, superseded or not reconciled to the current canonical source.
- **NOT_VERIFIED:** evidence is missing, incomplete, inaccessible or insufficient to support the claim.

Preserve a source's native label in the evidence note (for example VERIFIED_FACT, OWNER_SUPPLIED, OWNER_REPORTED, REPOSITORY_VERIFIED, PROPOSAL_ONLY, ASSUMPTION or PARTIAL / NOT VERIFIED). The report labels normalize presentation only; they do not upgrade the underlying evidence.

## 14. Continuity Health and Window Capacity Risk

- Continuity Health: GREEN / AMBER / RED — reason:
- Window Capacity Risk: LOW / ELEVATED / HIGH / UNKNOWN — observable reason:
- Tool/API/pagination limitations:
- One continuity signal: GREEN / AMBER / RED.

Continuity Health and Window Capacity Risk are separate. Never invent a token or context-window percentage when no meter is visible.

## 15. Human Owner confirmation gate

**Understanding confirmation requested:**  
“Đây là bản Project Understanding Review dựa trên các nguồn và bằng chứng hiện có. Bạn xác nhận nội dung này chính xác, hay muốn hiệu chỉnh điểm nào?”

**Session state:** WAITING_FOR_OWNER_REVIEW

Until the Human Owner confirms or corrects this review, do not:
- create or continue a task or Task Contract;
- draft or publish an executor prompt;
- create, modify or delete implementation files;
- create or update an implementation PR;
- record task acceptance or claim a milestone transition;
- proceed to the proposed next action.

After confirmation, re-evaluate the next action against the current approved Contract or explicit Owner instruction. This review gate does not itself grant implementation authority.

