# Stage 4 — Security Testing & Verification

![Stage 4 illustration](images/stage-4-security-testing.svg)

**Purpose:** Demonstrate through authorized testing that security controls behave as intended and that identified weaknesses are fixed and retested.

## Carb SM scenario
The team has implemented Play Integrity, RASP, and server enforcement. Now it must test modified-app signals, invalid evidence, replay, unauthorized order access, workflow bypass attempts, excessive requests, and fake delivery proof in a controlled test environment.

This is a defensive test plan, not instructions for attacking a real service.

## Test activities
1. **Threat-based test planning:** Map threats to controls, expected outcomes, owners, and evidence.
2. **Static analysis (SAST):** Review source code for patterns and weaknesses.
3. **Dynamic analysis (DAST):** Test the running app and API in authorized environments.
4. **Penetration testing:** Have qualified testers assess attack paths and security assumptions within written scope.
5. **Tampering and spoofing verification:** Confirm backend rejects invalid, missing, mismatched, or stale evidence.
6. **Negative and abuse tests:** Exercise invalid transitions, unauthorized resource access, replay, duplicate operations, rate limits, and input boundaries.
7. **Dependency and configuration review:** Scan libraries, SDKs, build settings, and deployment configuration.
8. **Regression testing:** Re-run tests after remediation and before release.

## Example test matrix
| Scenario | Expected outcome |
|---|---|
| Modified or unrecognized app evidence | Policy blocks or restricts sensitive actions |
| Invalid token | Backend rejects request |
| Stale or mismatched request evidence | Reject; no protected action occurs |
| Replayed acceptance request | Duplicate/stale operation rejected or safely idempotent |
| Driver requests another driver's order | Authorization denial |
| Pickup attempted in wrong workflow state | Reject transition |
| Fake or incomplete completion evidence | Reject or require additional verification |
| Excessive API requests | Throttle or block according to abuse policy |
| Vulnerable dependency identified | Risk triaged and remediated before applicable release gate |

## Evidence package
For each test, capture:
- Test ID, date, environment, build and version.
- Preconditions and authorized scope.
- Steps at a high level and test input classification.
- Expected and observed result.
- Evidence location and integrity/access controls.
- Finding severity, owner, status, and fix reference.
- Retest result and reviewer/acceptance.

Do not include real credentials, customer data, tokens, secrets, or unnecessary personal data in evidence.

## Severity and release gates
Use the project's approved severity model and risk context. Critical findings block release. High findings normally require remediation before release unless a formal, time-bound exception with owner, compensating controls, expiry, and approval is allowed by policy. Exceptions must never be silently accepted.

## Definition of Done
- Critical attack scenarios have been tested.
- Security controls behave as expected.
- Findings are resolved or formally excepted.
- Regression tests pass.
- Evidence is reviewed and retained.
- Release decision is documented.

## References
- [OWASP MASVS](https://mas.owasp.org/MASVS/)
- [OWASP MASTG](https://mas.owasp.org/MASTG/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
