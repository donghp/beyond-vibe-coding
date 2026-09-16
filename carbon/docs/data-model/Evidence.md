# Data Model: Evidence

```yaml
entity: Evidence
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents audit evidence, primary source documents, meter logs, invoices, or lab reports attached to activity data or regulatory determinations.

## Schema Fields
- `evidence_id` (string): Unique evidence ID (e.g. `EVI-2026-INV-88291`)
- `facility_id` (string): Facility reference
- `title` (string): Document / evidence title
- `evidence_type` (enum): `ELECTRICITY_BILL` | `FUEL_INVOICE` | `METER_LOG` | `SCADA_EXPORT` | `LAB_TEST_RESULT` | `THIRD_PARTY_AUDIT`
- `source_file` (string): File reference or path
- `sha256_hash` (string): Cryptographic hash for immutability
- `created_at` (string, ISO 8601): Timestamp
- `created_by` (string): User/System identifier
- `verification_status` (enum): `UNVERIFIED` | `VERIFIED` | `DISCREPANCY_FLAGGED`
