# Securing Android Applications in the Real World

## A practical five-stage Security Engineering guide

**Book connection:** [BEYOND VIBE CODING on Google Play Books](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)

Security is not a single library, API, or checkbox. It is the combined result of architecture, implementation, verification, operations, and accountable engineering decisions.

This guide uses Carb SM, a fictional delivery platform, to explain securing a real Android app and backend.

## The scenario
Carb SM connects customers who place delivery orders, merchants who prepare them, and drivers who accept, collect, and deliver them. The app supports order creation, acceptance, pickup, delivery-status updates, proof of delivery, and related account or payment workflows.

An attacker may use a modified app, compromised device, automated requests, stolen credentials, replayed API calls, or weaknesses in server authorization. Security engineering makes attacks harder, detects abuse, and—most importantly—prevents unauthorized actions from succeeding on the server.

This scenario is fictional and is not a claim about any real delivery platform.

## Five stages at a glance

![Five-stage Android Security Engineering overview](images/security-engineering-overview.jpg)

| Stage | Plain-English explanation | Contribution |
|---|---|---|
| **1. Play Integrity** | Google provides integrity signals about the app, device, and account/licensing context | Helps backend assess whether requests originate from an expected app/device environment |
| **2. RASP** | App checks itself while running for signs of tampering or instrumentation | Adds runtime detection and resistance |
| **3. Server Enforcement** | Server independently decides whether a request is authenticated, authorized, and valid | Prevents client claims becoming authority |
| **4. Testing & Verification** | Team deliberately tests defenses and proves expected outcomes | Evidence, findings, fixes, retests, release confidence |
| **5. Continuous Security** | Security remains active after launch | Monitoring, response, patching, governance, learning |

## Example: accepting a delivery order
A driver taps Accept Order. A secure design does not rely on the button being visible or the app's local code being unmodified.

The backend checks, as applicable:
- Driver identity and active session.
- Eligibility and authorization for the order.
- Order availability and valid state.
- Request freshness and duplicate/replay protection.
- Integrity or risk evidence valid under server policy.
- Business rules, limits, and transaction constraints.
- Atomic state transition to prevent competing acceptances.

If checks pass, the server performs the state transition. Otherwise it rejects, requires additional verification, or applies a policy-defined restriction.

## What each role should do

### Project Manager
- Include security outcomes in scope and acceptance criteria.
- Allocate time for threat modeling, testing, remediation, and release review.
- Track risk, dependencies, exceptions, and security readiness.
- Do not allow security scope to silently disappear.

### Team Leader
- Assign owners for client, backend, QA, security, and operations controls.
- Ensure reviews and evidence are completed.
- Coordinate remediation and escalate unresolved high-risk issues.

### Tech Lead / Architect
- Define trust boundaries and threat model.
- Design server-authoritative workflows, authorization, replay protection, and safe data handling.
- Select controls proportionate to risk and maintainability.

### Developer
- Implement secure defaults, validate input, avoid secret leakage, and use platform APIs correctly.
- Never implement authorization solely in the client.
- Add automated tests for security-sensitive behavior.

### Junior Developer
- Ask what the server trusts, what a user can change, and how behavior is tested.
- Distinguish UI state from authoritative business state.
- Follow secure coding and review requirements rather than copying code blindly.

## Security architecture in one sentence
**The app can request; the server must independently verify and authorize; tests must prove; operations must monitor.**

## Stage 1 — Google Play Integrity API
![Stage 1 Google Play Integrity](images/stage-1-play-integrity.jpg)

Use Play Integrity to obtain signed integrity evidence and validate it on the backend. Standard requests can bind a verdict to a request using requestHash; Classic requests use a server-generated nonce. Follow current Google documentation and do not treat a verdict as a complete authorization decision.

[Stage 1 details](02-STAGE-1-PLAY-INTEGRITY.md)

## Stage 2 — RASP
![Stage 2 RASP](images/stage-2-rasp.jpg)

Add proportionate runtime checks for app modification, suspicious hooking/debugging, root or virtualized environments, and other risk indicators. Treat detections as signals because client-side controls can be bypassed.

[Stage 2 details](03-STAGE-2-RASP.md)

## Stage 3 — Server-Side Security Enforcement
![Stage 3 Server-Side Enforcement](images/stage-3-server-enforcement.jpg)

Backend verifies credentials, request evidence, resource ownership, permissions, workflow state, business rules, freshness, and abuse controls. The backend—not the app—owns the final decision.

[Stage 3 details](04-STAGE-3-SERVER-ENFORCEMENT.md)

## Stage 4 — Security Testing & Verification
![Stage 4 Security Testing](images/stage-4-security-testing.jpg)

Test the design with authorized penetration testing, tampering scenarios, negative tests, authorization checks, API abuse controls, static/dynamic analysis, dependency scanning, and regression tests. Capture reproducible evidence and retest fixes.

[Stage 4 details](05-STAGE-4-SECURITY-TESTING.md)

## Stage 5 — Continuous Security & Governance
![Stage 5 Continuous Security](images/stage-5-continuous-security.jpg)

Monitor, detect, respond, recover, patch, review exceptions, measure KPIs, and feed incident lessons into the next engineering cycle.

[Stage 5 details](06-STAGE-5-CONTINUOUS-SECURITY.md)

## Definition of a secure release
A release is not approved merely because security code exists. The team needs:
- Current threat model and risk assessment.
- Security requirements linked to implementation and tests.
- Server-side enforcement for sensitive actions.
- Verified integrity handling.
- Reviewed test evidence and remediated findings.
- Approved residual risks and operational readiness.
- Monitoring and incident-response ownership.

## Keep learning
Security engineering is a team discipline. Use BVC principles: keep project knowledge explicit, define authority and boundaries, ask AI to execute within constraints, review changes, test assumptions, and retain evidence.

[Read BEYOND VIBE CODING on Google Play Books](https://play.google.com/store/books/details?id=geQaEgAAQBAJ)
