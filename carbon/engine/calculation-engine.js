/**
 * ENERIX Carbon - Calculation Engine
 * Deterministic, versioned calculation engine
 */
export class CalculationEngine {
  /**
   * MODEL-01: SIMPLE_FACTOR
   * E = ActivityData * EmissionFactor
   */
  calculateSimpleFactor(activityQuantity, emissionFactorValue) {
    if (activityQuantity < 0 || emissionFactorValue < 0) {
      throw new Error('Activity quantity and emission factor must be non-negative');
    }
    return activityQuantity * emissionFactorValue;
  }

  /**
   * MODEL-02: FACTOR_WITH_CONVERSION
   * E = ActivityData * ConversionFactor * EmissionFactor
   */
  calculateWithConversion(activityQuantity, conversionFactor, emissionFactorValue) {
    return activityQuantity * conversionFactor * emissionFactorValue;
  }

  /**
   * MODEL-03: MULTI_GAS
   * CO2e = sum(Gas_i * GWP_i)
   */
  calculateMultiGas(gasEmissionsMap, gwpMap) {
    let totalCO2e = 0;
    const gasBreakdown = {};

    for (const [gas, amount] of Object.entries(gasEmissionsMap)) {
      const gwp = gwpMap[gas] || (gas === 'CO2' ? 1 : 0);
      const co2e = amount * gwp;
      gasBreakdown[gas] = { amount, gwp, co2e };
      totalCO2e += co2e;
    }

    return { totalCO2e, gasBreakdown };
  }

  /**
   * MODEL-07: PROJECT_REDUCTION
   * ER = Baseline - Project - Leakage
   */
  calculateProjectReduction(baselineEmissions, projectEmissions, leakageEmissions = 0) {
    const netReduction = baselineEmissions - projectEmissions - leakageEmissions;
    return Math.max(0, netReduction);
  }
}

export const calculationEngine = new CalculationEngine();
