/**
 * ENERIX Carbon - Data Provider
 * Repository-native data loader
 */
export class DataProvider {
  constructor() {
    this.sectors = [];
    this.activities = [];
    this.emissionSources = [];
    this.emissionFactors = [];
    this.gwpDatasets = [];
    this.methodologies = [];
    this.calculationModels = [];
    this.facilities = [];
    this.knowledgeManifest = null;
    this.isLoaded = false;
  }

  async loadAll() {
    try {
      const [
        sectorsRes,
        activitiesRes,
        factorsRes,
        gwpRes,
        methodologiesRes,
        modelsRes,
        facilitiesRes,
        knowledgeRes
      ] = await Promise.all([
        fetch('./data/sectors.json').then(r => r.json()).catch(() => ({ sectors: [] })),
        fetch('./data/activities.json').then(r => r.json()).catch(() => ({ activities: [] })),
        fetch('./data/emission-factors.json').then(r => r.json()).catch(() => ({ emission_factors: [] })),
        fetch('./data/gwp-datasets.json').then(r => r.json()).catch(() => ({ gwp_datasets: [] })),
        fetch('./data/methodologies.json').then(r => r.json()).catch(() => ({ methodologies: [] })),
        fetch('./data/calculation-models.json').then(r => r.json()).catch(() => ({ calculation_models: [] })),
        fetch('./demo-data/facilities.json').then(r => r.json()).catch(() => ({ facilities: [] })),
        fetch('./knowledge-manifest.yaml').then(r => r.text()).catch(() => '')
      ]);

      this.sectors = sectorsRes.sectors || [];
      this.activities = activitiesRes.activities || [];
      this.emissionFactors = factorsRes.emission_factors || [];
      this.gwpDatasets = gwpRes.gwp_datasets || [];
      this.methodologies = methodologiesRes.methodologies || [];
      this.calculationModels = modelsRes.calculation_models || [];
      this.facilities = facilitiesRes.facilities || [];
      this.isLoaded = true;
      return true;
    } catch (err) {
      console.warn('ENERIX Carbon DataProvider loaded with fallback state:', err);
      this.isLoaded = true;
      return false;
    }
  }

  getSectors() { return this.sectors; }
  getActivities() { return this.activities; }
  getEmissionFactors() { return this.emissionFactors; }
  getGwpDatasets() { return this.gwpDatasets; }
  getMethodologies() { return this.methodologies; }
  getCalculationModels() { return this.calculationModels; }
  getFacilities() { return this.facilities; }
}

export const dataProvider = new DataProvider();
