# Security-by-Prompt-Design & Security Gates Architecture Standard

- **Document ID:** `BVC-SEC-STD-001`
- **Version:** `1.0.0`
- **Status:** Proposed baseline for repository review
- **Author:** Dong Hong
- **Applies to:** Beyond Vibe Coding (BVC) open methodology and its public learning projects
- **Reference use:** Organizations may adapt this standard for their own production environments, subject to independent risk assessment.

> **Core principle: Security is not a feature. Security is an engineering property.**
>
> **Build Fast. Build Right. Build Secure. Build Trustworthy.**

---

## 1. Purpose, Scope & Governance Boundary

This standard establishes security controls from requirements and AI prompt design through architecture, implementation, verification, release, and operation. It is technology-neutral and applies to AI-assisted web, mobile, API, backend, data, and integrated software systems.

It is an open engineering standard. It does not publish or define the internal architecture of any private production environment.

| Dimension | BVC — Open Methodology | Private production environments |
|---|---|---|
| Nature | Engineering principles, architecture patterns, prompt frameworks, synthetic examples, and verification methods | Live infrastructure, customer systems, commercial source code, operational telemetry, and organization-specific controls |
| Visibility | Public repository and publications | Confidential / restricted, governed by the relevant owner |
| Artifacts | Generic gate definitions, threat-model templates, mock data, synthetic tests, and public examples | Real credentials, private keys, production topology, internal schemas, customer data, live logs, and incident evidence |
| Responsibility | Defines what to consider, why it matters, and how to verify controls | Determines implementation details, risk acceptance, operational ownership, and release authorization |

**Strict isolation rule:** Never commit production secrets, private keys, customer information, live telemetry, internal network diagrams, non-public database schemas, environment-specific security settings, or incident records into the public BVC repository. Use synthetic examples and scrubbed evidence only.

BVC is not a certification, penetration-test report, legal compliance attestation, or guarantee that a product is secure. Each adopting organization remains responsible for its threat model, applicable regulations, independent assessment, and residual-risk decisions.

## 2. Core Philosophy — Think Like a Security Engineer from Prompt #1

Conventional rapid prototyping often defers security until after a feature works. BVC requires security reasoning before code generation and throughout the lifecycle.

### 2.1 Foundational principles

1. **Security is an engineering property.** It emerges from architecture, implementation, configuration, operations, and verified controls—not from a single security feature or final checklist.
2. **Zero-Trust Client.** Software running on a user-controlled browser, mobile device, desktop, or edge device is an untrusted environment. Client-side checks may improve user experience but are not authoritative security controls.
3. **Server-Side Enforcement.** Authentication, authorization, entitlements, version policy, transaction rules, dispatch decisions, and other critical business rules must be enforced by trusted server-side components.
4. **Cryptographic Evidence over Self-Declaration.** Do not treat client-supplied role, device ID, app version, integrity status, price, ownership, or workflow state as proof. Validate claims using trusted identity, server-side records, and platform attestation where appropriate.
5. **Least Privilege and Explicit Authority.** Every user, service, agent, plugin, and workload receives only the permissions needed for its task and only for the required duration.
6. **Secure Defaults and Fail-Safe Behavior.** Deny by default for sensitive actions. Errors, missing evidence, expired credentials, and unknown states must not silently grant access or corrupt data.
7. **Defense in Depth.** Combine preventive, detective, and responsive controls. No single client-side defense, scanner, attestation verdict, or network control is sufficient by itself.
8. **Prompt-Driven Threat Modeling.** Before implementation, ask the AI executor to identify assets, actors, trust boundaries, entry points, abuse cases, security requirements, and verification evidence.
9. **Evidence over Assertion.** A successful build, passing functional test, AI statement, or presence of a security library does not prove security. Record test results, limitations, and residual risks.
10. **Human-Owned Risk Acceptance.** AI may identify and explain risks; authorized humans own security exceptions, risk acceptance, and production release decisions.

### 2.2 Non-equivalences

- Functional PASS ≠ Security PASS.
- Build PASS ≠ Production Ready.
- Client validation ≠ Server authorization.
- Obfuscation ≠ Security boundary.
- TLS certificate pinning ≠ APK/app integrity verification.
- App attestation ≠ User authentication or authorization.
- A clean automated scan ≠ Proof of absence of vulnerabilities.

## 3. Threat Modeling Before Code Generation

For every feature that processes sensitive data, changes business state, exposes an API, crosses a trust boundary, or has material financial/operational impact:

1. Identify assets and their security objectives (confidentiality, integrity, availability, authenticity, accountability).
2. Identify actors: legitimate users, malicious users, compromised accounts, modified clients, third-party services, insiders, and automated agents.
3. Map components, data flows, entry points, trust boundaries, and privileged operations.
4. Consider abuse cases, including tampering, spoofing, replay, privilege escalation, insecure direct object references, business-logic abuse, downgrade, data exposure, and denial of service.
5. Define mitigations and explicit security requirements.
6. Define positive and negative tests and the evidence required to pass.
7. Record assumptions, out-of-scope risks, owners, and residual risks.

Use a suitable method such as STRIDE, attack trees, abuse cases, or data-flow threat modeling. Choose the method proportionately to system risk.

## 4. Multi-Layer Security Gate Architecture

The client gate and server gate are complementary; the client gate never replaces server enforcement.

```text
[ User-Controlled / Untrusted Client ]
       |  Client protections: UX validation, secure storage,
       |  platform attestation signals, tamper resistance
       v
[ API Gateway / Edge ]
       |  TLS, request limits, schema validation,
       |  token verification, replay controls
       v
[ Server Trust Boundary ]
       |  authentication, authorization, app/version policy,
       |  ownership checks, business invariants
       v
[ Core Business Logic / Domain Services ]
       |  authoritative state transitions and policy decisions
       v
[ Data Layer / External Services ]
          least-privilege access, encryption, auditability
```

### 4.1 Client Gate — hardening and risk signals

Client controls may include platform-supported app attestation, secure local storage, code signing, tamper detection, obfuscation, runtime protections, and safe user-interface behavior.

These controls raise attacker cost and provide risk signals. They are not trusted enforcement points because a user-controlled runtime may be modified, instrumented, or emulated. Do not put secrets or privileged authorization decisions in the client.

### 4.2 Server Gate — authoritative enforcement

The server must independently verify each sensitive request:

- Authenticate the principal and validate token issuer, audience, expiry, signature, and relevant session state.
- Authorize the requested action against server-owned identity, role, tenant, resource ownership, and policy.
- Validate the current business state and permitted state transition.
- Validate request schema, bounds, idempotency, freshness, and replay protections where relevant.
- Enforce minimum supported client version and deprecation policy server-side; never rely solely on a client-side update dialog or a client-reported version string.
- Validate app/device attestation when risk justifies it, verify the attestation on the server, bind it to a fresh challenge/request where supported, and define behavior for unavailable or invalid verdicts.
- Record security-relevant decisions without logging secrets or unnecessary personal data.

A valid app attestation does not grant a user permission. A valid user token does not prove the client binary is untampered. Authentication, authorization, app integrity, and business-rule validation are separate controls.

## 5. Mobile Application Security Requirements

For Android and iOS applications, select controls according to the threat model and platform capabilities.

### 5.1 Android

- Sign release artifacts with protected signing keys; restrict and audit signing-key access.
- Verify package identity and signing-certificate expectations through trusted distribution and/or platform attestation signals.
- Consider Google Play Integrity API for supported distribution scenarios. Validate verdicts on the backend, protect request freshness, and make risk-based decisions. Do not treat a verdict as a substitute for authorization.
- Do not trust `versionName`, `versionCode`, headers, device identifiers, or other values asserted by the client. Enforce minimum versions and API policy on the server.
- Store sensitive material using Android Keystore-backed designs where appropriate. Avoid hard-coded secrets and privileged keys in APKs.
- Use TLS correctly. Certificate pinning may be considered for specific threat models, with a safe rotation and recovery plan; it does not verify that the APK itself is genuine.
- Apply obfuscation and anti-tampering as defense-in-depth, not as the security boundary.
- Define safe behavior for rooted, debugged, instrumented, or otherwise high-risk environments based on product risk and accessibility requirements.

### 5.2 iOS

- Consider App Attest / DeviceCheck where supported and appropriate.
- Validate attestation and assertions server-side and bind them to fresh challenges.
- Protect secrets using Keychain and platform security facilities.
- Treat client-side checks and obfuscation as defense-in-depth, not authoritative authorization.

### 5.3 Mobile acceptance questions

- Can a modified or repackaged client reach sensitive APIs?
- Does the server reject unsupported versions even if the client suppresses its update screen?
- Can a client alter price, role, ownership, eligibility, or workflow state?
- Are tokens and sensitive data protected at rest and in transit?
- Are attestation failures, replay attempts, and suspicious patterns observable?
- Can legitimate users recover safely when attestation services are unavailable?

## 6. API, Identity & Business Logic Security

- Enforce authorization on every request and every resource; do not rely on hidden UI controls.
- Prevent Broken Object Level Authorization (BOLA/IDOR) by checking resource ownership and tenant boundaries server-side.
- Validate all input at the trust boundary; use allow-listed schemas and reject unexpected or invalid state transitions.
- Use short-lived credentials where appropriate, secure refresh-token rotation, revocation, and session lifecycle controls.
- Apply rate limits, abuse controls, idempotency, and replay protection to sensitive operations.
- Keep authoritative calculations and decisions on the server.
- Use database constraints and transaction boundaries to preserve invariants.
- Apply least-privilege service identities, row-level controls where suitable, and separation of duties for privileged actions.

## 7. Data, Secrets & Supply Chain

- Classify data and minimize collection, retention, and exposure.
- Encrypt sensitive data in transit and at rest using managed, appropriately rotated keys.
- Never commit credentials, private keys, production connection strings, or privileged service tokens.
- Keep secrets in an appropriate secret manager; scope and rotate them.
- Pin and review dependencies where appropriate; monitor known vulnerabilities and provenance.
- Review AI-generated code, generated dependencies, build scripts, workflows, and third-party integrations.
- Treat prompts, repository files, tool output, and external content as untrusted input; prevent prompt injection from changing project authority or security policy.

## 8. Security Gates & Release Criteria

Every project defines gates proportionate to risk. The following baseline is mandatory for production-bound work.

| Gate | Name | Minimum evidence | Blocking conditions |
|---|---|---|---|
| SG-01 | Requirements & Data Classification | Security requirements, data classification, asset/actor inventory | Sensitive data or security objectives are undefined |
| SG-02 | Threat Model & Architecture | Data-flow diagram, trust boundaries, abuse cases, mitigations | Critical trust boundary or threat has no owner/mitigation |
| SG-03 | Secure Implementation | Reviewed changes, secrets scan, dependency review, secure configuration | Exposed secrets, known critical weakness, client-only authorization |
| SG-04 | Identity & API Enforcement | Authentication/authorization tests, ownership and tenant-isolation tests | Unauthorized access or business-rule bypass succeeds |
| SG-05 | Security Verification | Relevant SAST/DAST/SCA, negative tests, mobile/API tests, documented manual review | Unresolved critical issue or required test not executed |
| SG-06 | Release Authorization | Risk summary, exceptions, rollback plan, artifact provenance, human approval | Mandatory gate failed or no authorized risk decision |
| SG-07 | Operations & Response | Security logging, alert ownership, incident and vulnerability process | No way to detect/respond to material security events |

### 8.1 Severity and disposition

Use the organization's approved severity model. At minimum:

- **Critical:** Block release; remediate and retest.
- **High:** Block release unless an authorized risk owner documents a time-bound exception and compensating controls. Legal, regulatory, or contractual requirements may prohibit exceptions.
- **Medium:** Assign an owner and due date; document rationale and compensating controls.
- **Low:** Track and address according to the risk-based improvement plan.

A gate is PASS only when its required evidence is present and reviewed. Use `NOT_RUN`, `NOT_VERIFIED`, `BLOCKED`, or `RISK_ACCEPTED` rather than implying success. AI-generated summaries are not independent evidence.

## 9. AI-Assisted Engineering Rules

AI coding agents must:

1. Read applicable project standards, contracts, and security requirements before editing.
2. Identify trust boundaries and threat assumptions before generating security-sensitive code.
3. Avoid introducing secrets, broad permissions, insecure defaults, or client-authoritative business rules.
4. Make bounded changes and report exact files changed.
5. Add negative tests for unauthorized, malformed, stale, replayed, cross-tenant, and invalid-state requests where relevant.
6. Report commands run, results, skipped checks, limitations, and unresolved findings accurately.
7. Never claim compliance, penetration-test completion, or security approval without corresponding evidence.
8. Stop and request human direction when scope, authority, or security requirements conflict.

Human owners retain approval authority for architecture exceptions, risk acceptance, and release.

## 10. Case Study Method — Modified Client

A public incident report may inspire a threat hypothesis, but it does not prove the internal implementation or root cause of a named product.

When analyzing a modified-client incident:

- Separate **Known Facts**, **Technical Hypotheses**, and **Verified Findings**.
- Do not infer missing server architecture, API behavior, or source-code defects from a news report alone.
- Test whether a modified client can bypass version policy, authorization, resource ownership, or business invariants.
- Verify server-side controls using authorized test environments and synthetic accounts/data.
- Publish only generalized lessons and synthetic artifacts; do not publish exploit instructions against a real service.

Core lesson: a client may be modified. A secure system is designed so that modifying the client does not grant authority or bypass server-owned business rules.

## 11. Required Project Security Record

For each production-bound project, maintain a security record containing:

- Scope, owner, classification, and system context.
- Threat model and data-flow/trust-boundary diagram.
- Security requirements and applicable standards.
- Gate status and links to test evidence.
- Vulnerability findings, severity, remediation owner, and retest result.
- Exceptions, risk owner, expiry date, and compensating controls.
- Release decision, artifact provenance, and rollback plan.

Do not store secrets or raw sensitive production evidence in public BVC records.

## 12. Reference Standards

Select current versions appropriate to the product and jurisdiction:

- [OWASP MASVS](https://mas.owasp.org/MASVS/) — Mobile Application Security Verification Standard.
- [OWASP MASTG](https://mas.owasp.org/MASTG/) — Mobile Application Security Testing Guide.
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — Application Security Verification Standard.
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/).
- [Google Play Integrity API](https://developer.android.com/google/play/integrity).
- [Android App signing](https://developer.android.com/studio/publish/app-signing).
- [Apple App Attest](https://developer.apple.com/documentation/devicecheck).

References are guidance, not an assertion of compliance. Verify current platform documentation before implementation.

---

**Document control:** BVC-SEC-STD-001 v1.0.0. Changes to this standard require review of scope, compatibility with existing BVC contracts, and an explicit version update.
