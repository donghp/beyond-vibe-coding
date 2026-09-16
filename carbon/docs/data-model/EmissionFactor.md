# Data Model: EmissionFactor

```yaml
entity: EmissionFactor
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents a versioned numerical emission factor linking an activity unit to gas-specific or CO2e emissions.

## Schema Fields
- `factor_id` (string): Unique factor ID (e.g. `EF-VN-GRID-2024`)
- `factor_name` (string): Descriptive factor title
- `gas` (enum): `CO2` | `CH4` | `N2O` | `HFCs` | `PFCs` | `SF6` | `NF3` | `CO2e`
- `value` (number): Factor numerical value
- `unit` (string): Factor unit denominator/numerator (e.g. `kg CO2/kWh`, `t CO2/TJ`)
- `basis` (string): Technical calculation basis
- `geography` (string): Applicable region (e.g. `VN`, `VN-NORTH`, `GLOBAL`)
- `sector` (string): Applicable sector
- `tier` (enum): `TIER_1_DEFAULT` | `TIER_2_NATIONAL` | `TIER_3_FACILITY_SPECIFIC`
- `source_document_id` (string): Reference document ID
- `valid_from` (string, ISO 8601): Effective start date
- `valid_to` (string, ISO 8601 | null): Effective end date
- `status` (enum): `ACTIVE` | `SUPERSEDED` | `DRAFT` | `PENDING_SOURCE`
