# Security Glossary — Android Application Engineering

| Term | Beginner-friendly meaning |
|---|---|
| Authentication | Proving who or what is making a request |
| Authorization | Deciding what that identity is allowed to do |
| Backend | Server-side services that enforce policy and own authoritative data |
| Defense in Depth | Multiple complementary security layers so one failure does not expose everything |
| Integrity Token | Signed evidence that can be verified and interpreted by a backend |
| Nonce | A unique unpredictable value used to bind a challenge and help prevent replay |
| Request Hash | A digest binding a request to integrity evidence in supported API flows |
| Replay Attack | Reusing a previously valid request or evidence to perform an action again |
| Idempotency | Repeating an operation safely without unintentionally duplicating its effect |
| RASP | Runtime Application Self-Protection; app-side checks and responses to runtime threats |
| Root | Elevated control over an Android device environment, potentially changing its trust assumptions |
| Emulator | A software-based Android device environment; legitimate for testing, but sometimes used in abuse |
| Hooking | Intercepting or changing a function's behavior at runtime |
| Obfuscation | Transforming code to make analysis harder; not a security boundary |
| SAST | Static Application Security Testing: analyzing code without executing it |
| DAST | Dynamic Application Security Testing: testing a running application or service |
| Penetration Test | Authorized, scoped security assessment attempting to find exploitable weaknesses |
| Threat Model | Structured analysis of assets, attackers, threats, trust boundaries, and mitigations |
| Security Gate | A defined verification or policy point that must pass before an operation or release proceeds |
| Least Privilege | Giving each identity only the permissions required for its work |
| Zero Trust | Explicitly verify requests and avoid assuming trust based on network or client location |
| MTTD | Mean Time to Detect, measured using a consistent definition |
| MTTR | Mean Time to Respond/Recover/Resolve; define which metric is used |
| Security Evidence | Artifacts demonstrating a control or test outcome, such as reports, logs, or reviewed results |
| Compensating Control | An alternate measure that reduces risk when the primary control is unavailable or deferred |
| Residual Risk | Risk remaining after controls are applied |

## Keep these distinctions clear
- Integrity evidence is not identity proof.
- Authentication is not authorization.
- A passing client check is not permission to perform a business action.
- A security checklist is not a security certification.
- Obfuscation is not encryption or protection of secrets.
- Detection is not prevention; response and server enforcement still matter.
