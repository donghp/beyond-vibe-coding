# Stage 1 — Google Play Integrity API

![Stage 1 illustration](images/stage-1-play-integrity.png)

**Purpose:** Use Google-provided integrity signals to help the backend assess whether an operation is coming from an expected app, device, and account context.

## Why this matters
A malicious actor may redistribute a modified APK, run a repackaged app, automate requests, or operate from an untrusted environment. Play Integrity gives the service signed evidence to evaluate as part of its risk decision. It does not prove that the user is honest or that an operation is authorized.

## Carb SM scenario
A driver requests acceptance of an available delivery. Carb SM wants evidence tied to the operation—not a reusable client-side “trusted” flag.

## Verification flow
1. **Backend creates challenge/binding:** For Classic requests, generate a unique, unpredictable nonce with appropriate expiry and operation context. For Standard requests, construct requestHash binding the integrity request to the relevant operation data, following Google's recommended design.
2. **App requests token:** Android app invokes Play Integrity API using the required request parameters.
3. **Google evaluates and signs:** Google evaluates signals and returns an integrity token. Token signing and decoding are handled according to the API model.
4. **Backend verifies and decides:** Backend verifies token using the supported Google server-side verification flow, checks freshness and request binding, evaluates verdicts and policy, and combines evidence with authentication, authorization, and business rules.

## Signals to evaluate
- **App integrity:** Is the app recognized and consistent with expected distribution/signing configuration?
- **Device integrity:** Which device integrity verdicts are present? Interpret levels in the current API documentation and the product's threat model.
- **Account/licensing:** What licensing or account context is available, and how does policy use it?

Verdict labels and availability can evolve. Do not hardcode this guide as a substitute for current Google documentation. The backend must verify the token; never trust a verdict decoded or declared by the app.

## Backend decision example
A request is allowed only when evidence is valid, bound to the current operation, fresh, and acceptable under policy—and when the driver is authenticated, eligible, the order is available, and all business rules pass.

## Implementation checklist
- [ ] Configure app identity and Play Console settings.
- [ ] Select Standard or Classic request mode based on latency, risk, and supported use case.
- [ ] Bind the integrity evidence to the request using requestHash or a server-generated nonce as applicable.
- [ ] Implement backend token verification using the supported Google flow.
- [ ] Validate freshness, request binding, replay resistance, and required verdicts.
- [ ] Define policy for unavailable API, timeout, error, or inconclusive verdicts.
- [ ] Test valid, invalid, stale, mismatched, and missing evidence.
- [ ] Log privacy-minimized decisions and outcomes.

## Common mistakes
- Treating the verdict as user authentication.
- Trusting decoded token claims from the client.
- Reusing nonce or failing to bind the token to the requested action.
- Treating every verdict as a universal pass/fail without risk policy.
- Assuming Play Integrity alone prevents API abuse.

## Acceptance evidence
Backend verification tests, request-binding tests, stale/replay rejection evidence, documented policy, and audit-safe logs.

## References
- [Google Play Integrity API](https://developer.android.com/google/play/integrity)
- [Google Play Integrity overview](https://developer.android.com/google/play/integrity/overview)
