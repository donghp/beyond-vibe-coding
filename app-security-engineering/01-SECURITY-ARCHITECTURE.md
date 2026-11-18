# Android Security Architecture — Trust Boundaries & Defense in Depth

## Architecture objective
Design an Android client and backend so a compromised client, stolen session, manipulated request, or replay attempt cannot independently authorize sensitive business actions.

## Trust model
**Untrusted by default:** Android UI, local storage, client-supplied flags, device environment claims, app-local business logic, and user-controlled request parameters.

**Trusted only after verification:** server-issued credentials, validated cryptographic evidence, backend policy, database constraints, and authenticated service identities—within their defined scope.

## Conceptual request path
1. Android app creates an operation request.
2. API edge applies transport, request-size, rate, and protocol controls.
3. Authentication establishes caller identity.
4. Integrity service verifies signed evidence and request binding where applicable.
5. Authorization checks roles, attributes, tenant/resource ownership, and policy.
6. Business logic validates workflow state, limits, idempotency, and invariants.
7. Database transaction performs the state change atomically.
8. Audit/telemetry records a privacy-aware security event.
9. Response returns the allowed result, not internal policy secrets.

## Defense-in-depth layers

| Layer | Controls | Limitation |
|---|---|---|
| Google Play Integrity | App/device/account integrity signals | Not authentication or authorization |
| Android client | Secure storage, input validation, TLS, minimized permissions | Client is user-controlled |
| RASP | Runtime anomaly/tamper signals | Bypassable; never sole reliance |
| API edge | TLS, throttling, schema validation, request limits | Does not replace business authorization |
| Authentication | Identity and session lifecycle | Identity does not imply permission |
| Authorization | Resource ownership, scopes, roles, policy | Check every sensitive action |
| Business controls | State machine, limits, idempotency, transaction invariants | Enforce server-side |
| Operations | Monitoring, incident response, patching | Requires ongoing ownership |

## Example order state machine
A simplified order workflow: CREATED → AVAILABLE → ACCEPTED → PICKED_UP → DELIVERED → COMPLETED.

Backend defines allowed transitions and permitted actors. Do not trust a client-provided status value to overwrite server state.

- Only eligible drivers can accept available orders.
- Acceptance is atomic; two drivers cannot both win.
- Pickup requires an order assigned to the authenticated driver.
- Completion requires valid workflow state and configured evidence.
- Duplicate requests are idempotent or rejected.
- State changes create auditable records.

## Freshness, replay, and idempotency
For sensitive actions, bind integrity evidence to the specific request using the supported Play Integrity mechanism. Standard requests use requestHash; Classic requests use server-generated nonce. Verify evidence server-side, enforce freshness, and prevent reuse.

Use idempotency keys for retry-safe actions. Idempotency is not a substitute for authorization and does not prevent malicious replay unless scoped and validated correctly.

## Data protection
- Use HTTPS/TLS and modern configurations.
- Minimize sensitive data returned to clients.
- Protect tokens and credentials with appropriate Android storage and lifecycle controls.
- Avoid logging tokens, secrets, precise location, personal data, or payment details.
- Keep secrets in server-side secret storage—not APK resources or source.
- Apply retention, access, encryption, and deletion policies.
- Validate and normalize input server-side.

## Risk-based decisions
Integrity or runtime risk may result in allowing low-risk operations, requiring step-up verification, restricting sensitive operations, denying an action, or escalating for investigation.

Avoid simplistic rules that automatically punish every rooted device or integrity failure without considering user impact, false positives, accessibility, recovery, and threat model. Make policies explicit and reviewable.

## Design review questions
- What asset and business action are protected?
- What can the attacker control?
- Where is final authorization made?
- Can evidence be replayed or reused for another request?
- Are ownership and workflow state checked on every API?
- Are competing operations atomic?
- What happens if Google services are unavailable?
- Are decisions observable without leaking personal data?
- Can users recover from false positives?
- What tests demonstrate each control?

## References
- [Google Play Integrity API](https://developer.android.com/google/play/integrity)
- [OWASP MASVS](https://mas.owasp.org/MASVS/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
