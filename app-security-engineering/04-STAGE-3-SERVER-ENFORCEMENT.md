# Stage 3 — Server-Side Security Enforcement

![Stage 3 illustration](images/stage-3-server-enforcement.svg)

**Purpose:** Keep the Backend as the final authority for authentication, authorization, resource ownership, business rules, and state transitions.

## Carb SM scenario
Even if an attacker modifies the app or bypasses RASP, the backend must reject an attempt to accept an unavailable order, update another driver's order, confirm pickup prematurely, submit duplicate completion, or access another user's data.

## Five-step server gate
1. **Receive:** Validate request size, schema, protocol, and rate limits.
2. **Verify evidence:** Verify integrity token, operation binding, freshness, and replay defenses where required.
3. **Authenticate:** Establish caller identity and session validity.
4. **Authorize and validate:** Check permission, resource ownership, eligibility, workflow state, business limits, and invariants.
5. **Enforce:** Allow, deny, require step-up, or restrict; record an appropriate audit event.

## Critical controls
- Authentication and session lifecycle controls.
- Object-level authorization on every sensitive resource.
- Role/attribute and least-privilege checks.
- Server-defined workflow/state machine.
- Atomic state transitions and concurrency controls.
- Request freshness, nonce/request binding, and replay protection.
- Idempotency for safe retries.
- Rate limiting, abuse detection, and bounded resource consumption.
- Input validation, output minimization, and privacy-aware logs.
- Secrets management, service identity, and secure configuration.

## Example order transition policy
| Operation | Required server checks (illustrative) |
|---|---|
| Accept order | Authenticated eligible driver, order available, no conflicting acceptance, policy/risk checks |
| Confirm pickup | Assigned driver, accepted state, required pickup evidence |
| Update location | Authenticated session, ownership, rate/format checks, privacy policy |
| Complete delivery | Assigned order, valid state, configured proof, duplicate/replay safeguards |
| View order | Caller authorized for that order and permitted fields |

Never let the client submit an arbitrary status that directly overwrites authoritative server state.

## Fail-closed guidance
Fail closed for critical authorization and verification conditions. Define graceful degradation for outages, ambiguous signals, and low-risk actions. Avoid exposing detailed internal rejection reasons that enable attackers to tune attempts; provide safe user-facing messages and internal diagnostics.

## Implementation checklist
- [ ] Sensitive endpoints have explicit auth and authorization requirements.
- [ ] Resource ownership checks are server-side.
- [ ] Workflow transitions are modeled and validated.
- [ ] Concurrent acceptance/completion cannot produce inconsistent states.
- [ ] Replay/freshness and idempotency are defined and tested.
- [ ] Rate limits and abuse controls are implemented.
- [ ] Audit events are privacy-minimized.
- [ ] Backend error paths do not leak secrets or stack traces.

## Acceptance evidence
API authorization tests, invalid transition tests, race/concurrency tests, replay/duplicate tests, abuse-control tests, and reviewed logs.

## References
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
