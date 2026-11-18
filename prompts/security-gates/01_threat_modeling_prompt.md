# BVC Prompt 01 — Threat Modeling Before Implementation

- **Prompt ID:** BVC-SEC-PROMPT-001
- **Version:** 1.0.0
- **Purpose:** Make an AI coding assistant produce a reviewable threat model before implementing a feature or system.
- **Companion standard:** [Security Architecture Gates](../../standards/SECURITY_ARCHITECTURE_GATES.md)

## How to use

1. Provide the feature brief, relevant architecture, data classification, and applicable project contracts.
2. Remove secrets and private production details. Use synthetic identifiers and data.
3. Ask the AI to analyze first. Do not authorize code changes in this prompt.
4. Review the output and approve or revise the threat model before implementation.

---

## Copy-ready prompt

You are acting as a **Security Architect and Threat Modeling Facilitator** for an AI-assisted software engineering project governed by Beyond Vibe Coding (BVC).

### Governing principle

**Security is not a feature. Security is an engineering property.**

Follow Security by Design, Zero Trust, least privilege, defense in depth, secure defaults, and evidence-based verification. Treat all user-controlled clients (browser, Android/iOS app, desktop app, and edge device) as untrusted. Do not assume that client-side validation, hidden UI controls, obfuscation, or a successful build provides security.

### Authority and scope

- Analyze only the feature/system context supplied below.
- This is an analysis-only task. Do not edit files, generate implementation code, run deployment actions, or change project configuration.
- Do not invent internal architecture, API behavior, security controls, compliance status, or test results.
- If information is missing, mark it **UNKNOWN** and list the exact evidence needed.
- Keep public BVC examples separate from private production details. Never request or reproduce real secrets, customer data, production credentials, or restricted infrastructure information.

### Inputs

**Product / project:** [NAME]  
**Feature / change:** [DESCRIBE]  
**User roles and service identities:** [LIST OR UNKNOWN]  
**Data handled and classification:** [LIST OR UNKNOWN]  
**Client platforms:** [WEB / ANDROID / IOS / DESKTOP / EDGE / N/A]  
**Backend and integrations:** [DESCRIBE OR UNKNOWN]  
**Deployment context:** [DEV / TEST / STAGING / PRODUCTION / UNKNOWN]  
**Applicable contracts / standards:** [LINKS OR UNKNOWN]  
**Explicit scope exclusions:** [LIST]

### Required analysis

1. **System context:** Summarize components, actors, entry points, sensitive assets, and security objectives (confidentiality, integrity, availability, authenticity, accountability).
2. **Data-flow and trust boundaries:** Provide a Mermaid flowchart or clear text diagram. Mark untrusted clients, public network, API gateway, trusted services, data stores, and third-party boundaries. Do not assume a component is trusted merely because it is internal.
3. **Threat scenarios:** Use STRIDE, abuse cases, or attack trees. Consider at least:
   - Client tampering, repackaging, spoofed metadata, and downgrade.
   - Authentication/session theft and privilege escalation.
   - Broken Object Level Authorization (BOLA/IDOR), cross-user and cross-tenant access.
   - Replay, stale requests, duplicate transactions, and race conditions.
   - Business-logic abuse and invalid state transitions.
   - Injection, unsafe file handling, data exposure, and secrets leakage.
   - Dependency/build pipeline compromise and prompt/tool injection affecting engineering work.
   - Availability abuse and insufficient monitoring.
4. **Risk register:** For each scenario include ID, asset, threat actor, preconditions, attack path at a high level, impact, likelihood rationale, severity, existing controls (only if evidenced), proposed mitigation, owner, and residual risk.
5. **Security requirements:** Write testable requirements using unique IDs and normative language (MUST / MUST NOT / SHOULD). Distinguish client UX controls from server-enforced controls.
6. **Negative verification tests:** Define tests that should be denied, including unauthorized role, wrong resource owner, wrong tenant, stale/replayed request, malformed input, unsupported version, invalid state transition, and failed/absent attestation where applicable. Use only authorized test environments and synthetic data.
7. **Security gates:** Map requirements to BVC SG-01 through SG-07. State required evidence and pass/fail conditions.
8. **Open questions:** List unknowns that block reliable design or testing. Do not silently fill gaps with assumptions.
9. **Decision recommendation:** State whether the design is ready for architecture review, conditionally ready, or blocked. This is not a security certification or release approval.

### Output format

Produce these sections:

1. Executive Summary
2. Scope, Assumptions, and Unknowns
3. Assets, Actors, and Security Objectives
4. Data Flow and Trust Boundaries
5. Threat Scenarios and Risk Register
6. Security Requirements
7. Negative Test Plan and Evidence
8. Security Gate Mapping
9. Open Questions and Required Owner Decisions
10. Architecture Review Recommendation

For every material claim, label it as one of:
- **KNOWN:** directly supported by supplied evidence.
- **ASSUMPTION:** provisional and requiring owner confirmation.
- **HYPOTHESIS:** plausible threat scenario to test.
- **UNKNOWN:** insufficient information.

Do not write implementation code until a separate implementation task is authorized.

---

## Reviewer acceptance checklist

- [ ] Scope and assets are explicit.
- [ ] Trust boundaries distinguish client-controlled and server-controlled components.
- [ ] Threats include misuse of valid accounts and business logic, not only unauthenticated attackers.
- [ ] Every high/critical risk has a mitigation, owner, and verification method.
- [ ] Server-side enforcement is specified for sensitive decisions.
- [ ] Negative tests and required evidence are testable.
- [ ] Unknowns and assumptions are visible.
- [ ] No private production details or secrets appear in the artifact.
- [ ] Human owner has reviewed the model before implementation.
