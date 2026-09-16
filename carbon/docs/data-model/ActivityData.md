# Data Model: ActivityData

```yaml
entity: ActivityData
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents operational input activity quantities (e.g. kWh electricity consumed, liters of diesel burned, tons of cement produced) for a facility over a specified period.

## Schema Fields
- `activity_id` (string): Unique activity record ID
- `facility_id` (string): Facility reference
- `source_category` (enum): `SCOPE_1_STATIONARY_COMBUSTION` | `SCOPE_1_MOBILE_COMBUSTION` | `SCOPE_1_PROCESS` | `SCOPE_1_FUGITIVE` | `SCOPE_2_ELECTRICITY` | `SCOPE_2_STEAM`
- `activity_type` (string): Specific activity key (e.g. `grid_electricity`, `diesel_fuel`)
- `period_start` (string, ISO 8601): Period start date
- `period_end` (string, ISO 8601): Period end date
- `quantity` (number): Numerical activity quantity
- `unit` (string): Measurement unit (e.g. `kWh`, `liter`, `ton`, `TJ`)
- `data_origin` (enum): `DOCUMENT_INVOICE` | `MANUAL_ENTRY` | `METER_READING` | `SCADA_IOT` | `ERP_API`
- `evidence_id` (string): Associated supporting evidence record ID
- `validation_status` (enum): `UNVERIFIED` | `VALIDATED` | `FLAGGED_ANOMALY`
