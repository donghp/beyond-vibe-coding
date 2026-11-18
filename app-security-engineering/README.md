# Beyond Vibe Coding — Security Engineering for Android Applications

> **Security is not a feature. Security is an engineering property.**
> **AI is an executor. The project owns its knowledge, state, authority, and continuity.**

A practical, five-stage guide to designing, building, testing, releasing, and operating Android applications with security treated as an engineering responsibility from the first requirement—not as a last-minute checklist.

**Book:** [BEYOND VIBE CODING — Google Play Books](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

## Start here
- [Android Security Guide](00-ANDROID-SECURITY-GUIDE.md) — complete beginner-friendly guide
- [Security Architecture](01-SECURITY-ARCHITECTURE.md) — trust boundaries and defense in depth
- [Stage 1 — Google Play Integrity API](02-STAGE-1-PLAY-INTEGRITY.md)
- [Stage 2 — Runtime Application Self-Protection (RASP)](03-STAGE-2-RASP.md)
- [Stage 3 — Server-Side Security Enforcement](04-STAGE-3-SERVER-ENFORCEMENT.md)
- [Stage 4 — Security Testing & Verification](05-STAGE-4-SECURITY-TESTING.md)
- [Stage 5 — Continuous Security & Governance](06-STAGE-5-CONTINUOUS-SECURITY.md)
- [Implementation Roadmap](07-IMPLEMENTATION-ROADMAP.md)
- [Security Acceptance Checklist](08-SECURITY-ACCEPTANCE-CHECKLIST.md)
- [Incident Response Playbook](09-INCIDENT-RESPONSE-PLAYBOOK.md)
- [Security Glossary](10-SECURITY-GLOSSARY.md)

## The five-stage journey

| Stage | Purpose | Primary owner(s) |
|---|---|---|
| 1. Google Play Integrity API | Verify app, device, and licensing signals | Android + Backend |
| 2. RASP | Detect runtime tampering and risky environments | Android |
| 3. Server-Side Enforcement | Make authoritative security and business decisions | Backend |
| 4. Testing & Verification | Demonstrate controls and capture evidence | QA + Security + Engineering |
| 5. Continuous Security & Governance | Monitor, respond, maintain, and improve | Product + Engineering + Operations |

## Learning case study: Carb SM
Carb SM is a fictional carbon-conscious delivery app connecting customers, merchants, and delivery drivers. Workflows include order creation, acceptance, pickup, delivery completion, proof submission, and related payment or reward processing.

This case study is illustrative. It does not describe an actual incident, architecture, or weakness of any real delivery company.

## Who this guide is for
- **PMs:** scope, risk, prioritization, acceptance criteria, release readiness
- **Team Leaders:** ownership, coordination, reviews, quality gates
- **Tech Leads / Architects:** threat modeling, trust boundaries, design decisions
- **Developers:** secure implementation and verification
- **Junior Developers:** explanations, examples, checklists

## Principles
1. Never trust the client as the authority.
2. Authentication is not authorization.
3. Integrity signals are not business permission.
4. Client protections are defense-in-depth, not an unbreakable boundary.
5. Backend validates every sensitive operation.
6. Security requirements must be testable and evidenced.
7. Secrets do not belong in APKs, repositories, logs, or prompts.
8. Security continues after release.

## Images
The images folder is reserved for the approved overview and five stage illustrations. Pages reference these relative paths; add the binary assets when they are available for repository upload.

## Scope
Educational defensive guidance. Test only systems, devices, accounts, and environments for which explicit authorization exists. Use synthetic data and controlled environments. Adapt controls to current platform documentation, threat model, privacy obligations, and product requirements.
