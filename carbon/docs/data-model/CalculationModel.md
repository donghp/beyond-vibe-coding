# Data Model: CalculationModel

```yaml
entity: CalculationModel
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents an executable deterministic formula contract and calculation pipeline definition.

## Model Classes
- `MODEL-01 SIMPLE_FACTOR`: `E = ActivityData × EmissionFactor`
- `MODEL-02 FACTOR_WITH_CONVERSION`: `E = ActivityData × UnitConversion × EmissionFactor`
- `MODEL-03 MULTI_GAS`: Gas-specific calculation followed by GWP aggregation `CO2e = Σ(Gas_i × GWP_i)`
- `MODEL-04 PARAMETERIZED`: `E = f(ActivityData, Parameters, EmissionFactorBasis)`
- `MODEL-05 COMPOSITE`: `E = Σ(SubModel_k)`
- `MODEL-06 DYNAMIC`: Time-dependent decay/stock-flow model
- `MODEL-07 PROJECT_REDUCTION`: `ER = BaselineEmissions - ProjectEmissions - Leakage`

## Schema Fields
- `model_id` (string): Unique model identifier
- `class_code` (string): One of `MODEL-01` through `MODEL-07`
- `name` (string): Model name
- `formula_expression` (string): Mathematical representation
- `input_parameters` (array): Input parameter definitions
- `output_fields` (array): Output field definitions
