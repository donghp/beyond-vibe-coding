# Data Model: Facility

```yaml
entity: Facility
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents a regulated industrial establishment, plant, building, or operational facility.

## Schema Fields
- `facility_id` (string): Unique facility ID (e.g. `FAC-2026-001`)
- `tax_id` (string): Business Tax Registration Code (MST)
- `legal_name` (string): Official registered business name
- `facility_name` (string): Operating facility name
- `address` (string): Street address
- `province` (string): Vietnamese Province/City
- `sector_id` (string): Primary sector (e.g. `SEC-01-ENERGY`)
- `sub_sector_id` (string): Sub-sector classification
- `business_activity` (string): Main production or business activity description
- `regulatory_status` (enum): `MANDATORY` | `NOT_MANDATORY` | `TRANSITIONAL` | `HISTORICAL_MANDATORY` | `PENDING_EFFECTIVE_DATE` | `UNKNOWN_REQUIRES_REVIEW`
- `legal_basis` (string): Reference decision/decree (e.g. `QĐ 42/2026/QĐ-TTg, Phụ lục II`)
- `valid_from` (string, ISO 8601): Status start date
- `valid_to` (string, ISO 8601 | null): Status end date
