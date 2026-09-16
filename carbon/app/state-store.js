/**
 * ENERIX Carbon - State Store
 * Manages active route, facility selections, and reactive UI updates
 */
export class StateStore {
  constructor() {
    this.currentRoute = 'overview';
    this.selectedFacilityId = 'FAC-2026-001';
    this.selectedReportingYear = 2026;
    this.listeners = [];
  }

  getRoute() {
    return this.currentRoute;
  }

  setRoute(route) {
    this.currentRoute = route;
    this.notify();
  }

  getSelectedFacilityId() {
    return this.selectedFacilityId;
  }

  setSelectedFacilityId(id) {
    this.selectedFacilityId = id;
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }
}

export const stateStore = new StateStore();
