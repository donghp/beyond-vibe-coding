# Stage 5 — Continuous Security & Governance

![Stage 5 illustration](images/stage-5-continuous-security.png)

**Purpose:** Keep the application and its supporting services secure after release through monitoring, detection, response, recovery, patching, governance, and continuous improvement.

## Carb SM scenario
After release, Carb SM detects an unusual order-acceptance pattern and API requests associated with a driver account. The response process correlates signals, assesses risk, protects affected operations, investigates, restores legitimate access, and adds lessons to future controls and tests.

This is a hypothetical example—not a report of an actual incident.

## Continuous security lifecycle
1. **Monitor:** Observe API activity, authentication, order operations, integrity outcomes, runtime signals, and service health.
2. **Detect:** Identify suspicious patterns, compromised accounts, abnormal request behavior, or emerging vulnerabilities.
3. **Respond:** Triage, assign incident roles, contain the threat, preserve evidence, and communicate appropriately.
4. **Recover:** Restore safe operations, rotate or revoke compromised credentials, patch, and validate recovery.
5. **Improve:** Update threat models, controls, tests, training, policies, and backlog priorities.

## Six ongoing activities
- Security monitoring and alert tuning.
- Threat and fraud detection.
- Incident response and communications.
- Vulnerability, dependency, and patch management.
- Security governance, audit, access, and exception review.
- Lessons learned and continuous verification.

## Security operations indicators
| KPI | Definition and caveat |
|---|---|
| MTTD | Mean time to detect, using a consistently defined incident start |
| MTTR | Define whether it measures response, containment, or resolution; do not mix definitions |
| Integrity rejection rate | Rejected integrity assessments divided by relevant assessments; investigate changes rather than assuming all are attacks |
| Abuse signal rate | Rate of policy-defined suspicious behavior |
| Open critical/high findings | Outstanding findings by severity and age |
| Security control availability | Availability of critical security services and enforcement components |

Metrics are not universal targets. Establish baselines, thresholds, owners, alert routing, and escalation criteria based on actual risk and operational capacity.

## Incident response minimum
- Named incident lead and decision authority.
- Severity levels and escalation contacts.
- Detection, triage, containment, eradication, recovery, and post-incident review.
- Evidence preservation and privacy-aware access.
- User/customer communications when appropriate.
- Root-cause analysis and follow-up actions.

## Operational checklist
- [ ] Monitoring and alert routes are tested.
- [ ] Incident procedures are accessible and rehearsed.
- [ ] Logs have integrity, access, retention, and privacy controls.
- [ ] Dependencies and platform updates are tracked.
- [ ] Patch and emergency release paths are documented.
- [ ] Security exceptions have owners, rationale, expiry, and approval.
- [ ] KPIs are reviewed and actioned.
- [ ] Incident lessons feed threat models and regression tests.

## Outcome
Security is an operating capability, not a release milestone. The product and team should become more resilient as threats, incidents, and engineering knowledge evolve.

## References
- [OWASP MASVS](https://mas.owasp.org/MASVS/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
