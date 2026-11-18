# BVC Checklist — Authorized Client Tampering & Server Enforcement Tests

- **Checklist ID:** BVC-SEC-TEST-001
- **Version:** 1.0.0
- **Purpose:** Verify that modifying a client does not grant authority or bypass server-owned policies.
- **Applies to:** Owned applications and explicitly authorized development/test environments.
- **Companion standard:** [Security Architecture Gates](../../standards/SECURITY_ARCHITECTURE_GATES.md)

> **Safety boundary:** This checklist is defensive. Use a test build, isolated environment, synthetic accounts, and synthetic data. Do not modify or probe a third-party production app or service without explicit written authorization. This document intentionally does not provide instructions for bypassing a real application's controls.

## 1. Test setup and evidence

- [ ] Written authorization and test scope recorded.
- [ ] Dedicated development/test environment confirmed.
- [ ] Synthetic accounts cover each role and tenant.
- [ ] Test client build and server build identifiers recorded.
- [ ] Expected version policy and API deprecation rules documented.
- [ ] Test data is disposable and contains no real customer information.
- [ ] Logging, correlation IDs, and alerting are enabled.
- [ ] Rollback/reset procedure is available.
- [ ] Evidence storage location is access-controlled and does not contain secrets.

Record for each test: **Test ID, date, tester, build identifiers, preconditions, request/action summary (redacted), expected result, actual result, server decision, log/evidence reference, status, and finding ID.**

Allowed statuses: `PASS`, `FAIL`, `NOT_RUN`, `BLOCKED`, `NOT_APPLICABLE`.

## 2. Client trust and tamper-resilience

- [ ] TST-01 — Confirm that client-side validation is treated as UX only; server validates the same security-relevant constraints.
- [ ] TST-02 — In a controlled test build, verify that a modified/repackaged client does not gain additional server permissions.
- [ ] TST-03 — Verify server-side app identity/attestation policy where implemented; invalid, stale, or mismatched evidence follows the documented policy.
- [ ] TST-04 — Verify that a missing attestation verdict cannot silently grant a protected action when policy requires attestation.
- [ ] TST-05 — Confirm that app attestation is not confused with user authentication or authorization.
- [ ] TST-06 — Confirm that obfuscation/RASP/tamper detection are defense-in-depth and that server controls remain effective if client detection is bypassed.

## 3. Version and downgrade policy

- [ ] TST-07 — Verify that the backend rejects or restricts a client below the server-defined minimum supported version for protected endpoints.
- [ ] TST-08 — Verify that changing a client-reported version value does not change the server's trust decision.
- [ ] TST-09 — Verify that deprecated API routes cannot bypass current authorization or business policy.
- [ ] TST-10 — Verify that version-policy changes take effect server-side within the documented propagation window.
- [ ] TST-11 — Verify that emergency block/allow policy has an authorized owner, audit record, and safe rollback.

## 4. Authentication, authorization, and tenant isolation

- [ ] TST-12 — Missing, expired, revoked, malformed, or wrong-audience credentials are denied.
- [ ] TST-13 — A valid user cannot access another user's resource by changing an identifier.
- [ ] TST-14 — A user cannot access another tenant's data or invoke another tenant's operation.
- [ ] TST-15 — Client-supplied role, permission, owner, or tenant fields cannot elevate privileges.
- [ ] TST-16 — Hidden or disabled UI controls do not substitute for backend authorization.
- [ ] TST-17 — Privileged operations require the documented stronger authentication/approval controls.

## 5. Business-logic and state integrity

- [ ] TST-18 — Server recalculates or independently validates critical amounts, prices, eligibility, and entitlements.
- [ ] TST-19 — Invalid or out-of-order state transitions are rejected.
- [ ] TST-20 — Duplicate/replayed requests do not create duplicate financial or operational effects.
- [ ] TST-21 — Concurrent requests cannot violate business invariants.
- [ ] TST-22 — A client cannot mark a transaction, task, delivery, approval, or operation complete without server-verifiable conditions.
- [ ] TST-23 — Business decisions remain correct when client UI logic is altered or omitted.

## 6. API robustness and monitoring

- [ ] TST-24 — Malformed, oversized, unexpected, and out-of-range inputs are rejected safely.
- [ ] TST-25 — Rate limits and abuse controls operate as designed.
- [ ] TST-26 — Sensitive actions enforce freshness, nonce, idempotency, or replay protection where applicable.
- [ ] TST-27 — Authorization denials and suspicious patterns produce useful, privacy-conscious audit events.
- [ ] TST-28 — Logs do not contain passwords, bearer tokens, private keys, or unnecessary sensitive payloads.
- [ ] TST-29 — Alert ownership and incident escalation are documented and tested.

## 7. Release gate

- [ ] All Critical findings are remediated and retested.
- [ ] High findings are remediated or have a formally approved, time-bound risk exception with compensating controls.
- [ ] Required tests are run; NOT_RUN items are explicitly assessed and cannot be silently counted as PASS.
- [ ] Findings have owners, severity, remediation status, and retest evidence.
- [ ] Artifact provenance and release version are recorded.
- [ ] Rollback plan is verified.
- [ ] Independent reviewer has examined evidence.
- [ ] Authorized human owner has made the release decision.

## 8. Findings template

| Field | Value |
|---|---|
| Finding ID | |
| Test ID(s) | |
| Affected component | |
| Severity | Critical / High / Medium / Low |
| Reproducible in authorized test environment? | Yes / No / Not tested |
| Expected behavior | |
| Actual behavior | |
| Security impact | |
| Evidence reference (redacted) | |
| Root cause (verified / hypothesis) | |
| Remediation owner and due date | |
| Retest result | |
| Residual risk / exception | |

## 9. Interpretation rules

- A modified client being detectable is useful, but the decisive test is whether the server still enforces authorization and business invariants.
- A successful login does not prove the app is genuine.
- A genuine app does not prove the user is authorized for every operation.
- A passing attestation check does not replace resource ownership and business-rule checks.
- A failed client-side tamper check does not prove the server is secure.
- Do not label a real product vulnerable based only on a news report or an unverified hypothesis.
- Report only what the test evidence demonstrates.
