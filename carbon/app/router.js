/**
 * ENERIX Carbon - Single Page Application Router
 */
import { stateStore } from './state-store.js';
import { renderOverviewPage } from '../ui/pages/overview.js';
import { renderRegulatoryCheckPage } from '../ui/pages/regulatory-check.js';
import { renderFacilitiesPage } from '../ui/pages/facilities.js';
import { renderInventoryPage } from '../ui/pages/inventory.js';
import { renderActivityDataPage } from '../ui/pages/activity-data.js';
import { renderEmissionFactorsPage } from '../ui/pages/emission-factors.js';
import { renderMethodologiesPage } from '../ui/pages/methodologies.js';
import { renderCalculationsPage } from '../ui/pages/calculations.js';
import { renderEvidenceTracePage } from '../ui/pages/evidence-trace.js';
import { renderReportsPage } from '../ui/pages/reports.js';
import { renderKnowledgePage } from '../ui/pages/knowledge.js';

export class Router {
  constructor(contentContainer) {
    this.container = contentContainer;
    this.routes = {
      'overview': renderOverviewPage,
      'regulatory-check': renderRegulatoryCheckPage,
      'facilities': renderFacilitiesPage,
      'inventory': renderInventoryPage,
      'activity-data': renderActivityDataPage,
      'emission-factors': renderEmissionFactorsPage,
      'methodologies': renderMethodologiesPage,
      'calculations': renderCalculationsPage,
      'evidence-trace': renderEvidenceTracePage,
      'reports': renderReportsPage,
      'knowledge': renderKnowledgePage
    };
  }

  renderCurrentRoute() {
    const route = stateStore.getRoute();
    const renderFn = this.routes[route] || renderOverviewPage;
    if (this.container) {
      this.container.innerHTML = renderFn();
    }
  }
}
