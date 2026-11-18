# Security Acceptance Checklist — Android Release

Use this checklist during design review, implementation review, security verification, and release readiness. Adapt it to product risk. A checkbox is evidence only when the relevant test, review, or artifact exists.

## 1. Scope & threat model
- [ ] Sensitive assets, actions, data classes, and trust boundaries identified.
- [ ] Threat actors and abuse cases documented.
- [ ] Security requirements mapped to controls and owners.
- [ ] Supported OS/device and operational assumptions documented.
- [ ] Privacy, retention, and data minimization requirements reviewed.

## 2. Android client
- [ ] Signing and build provenance controlled.
- [ ] Permissions minimized and justified.
- [ ] Exported components, deep links, and intent handling reviewed.
- [ ] Sensitive data protected in storage and memory where practical.
- [ ] Network transport uses appropriate TLS.
- [ ] No secrets embedded in APK, resources, source, or logs.
- [ ] Obfuscation and build protections configured as appropriate.
- [ ] RASP signals and response behavior tested.
- [ ] False-positive and accessibility/recovery paths considered.

## 3. Play Integrity
- [ ] API configured for expected app identity.
- [ ] Request binding implemented using the appropriate supported method.
- [ ] Backend verifies evidence using Google's supported verification flow.
- [ ] Freshness and replay handling tested.
- [ ] Invalid, missing, mismatched, and unavailable outcomes have policy.
- [ ] Verdicts are risk signals, not authorization substitutes.

## 4. Backend/API
- [ ] Authentication on every protected endpoint.
- [ ] Authorization and resource ownership checks are server-side.
- [ ] Workflow/state transitions validated server-side.
- [ ] Atomicity/concurrency controls for contested operations.
- [ ] Replay/freshness and idempotency design reviewed.
- [ ] Rate limiting and abuse controls tested.
- [ ] Input validation and output minimization implemented.
- [ ] Safe error messages and privacy-aware audit logging.

## 5. Testing & verification
- [ ] Threat-based test plan approved.
- [ ] SAST and dependency scanning completed.
- [ ] API and app dynamic testing completed as applicable.
- [ ] Authorized penetration test completed for agreed scope.
- [ ] Security-negative tests pass.
- [ ] Critical/high findings remediated or formal exception approved.
- [ ] Retests and regression tests recorded.
- [ ] Evidence reviewed and stored with access controls.

## 6. Operational readiness
- [ ] Monitoring, alerting, and escalation tested.
- [ ] Incident-response playbook and owners established.
- [ ] Patch and emergency release process documented.
- [ ] Security KPIs defined with baselines and owners.
- [ ] Exceptions have rationale, owner, compensating controls, expiry, approval.
- [ ] Support and user recovery processes exist.

## 7. Release decision
- [ ] Security reviewer accepts evidence.
- [ ] Product/engineering authority reviews residual risk.
- [ ] Release blockers are clear and resolved.
- [ ] Known limitations and follow-up tasks are tracked.
- [ ] Release approval and date are recorded.

## Decision
- **PASS:** required controls and evidence meet policy.
- **CONDITIONAL:** approved exception is time-bounded, documented, and has compensating controls.
- **BLOCK:** unresolved critical risk, failed required control, missing evidence, or unauthorized exception.

Checklist completion alone does not certify security. It supports a documented, risk-based release decision.
