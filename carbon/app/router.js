/**
 * ENERIX Carbon - Single Page Application Router
 */
import { stateStore } from './state-store.js';
import { PUBLIC_ROUTES } from './routes.js';
import { renderOverviewPage } from '../ui/pages/overview.js';
import { renderEngineeringOverviewPage } from '../ui/pages/engineering-overview.js';
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
  static routes = {
    'overview': renderOverviewPage,
    'platform': renderOverviewPage,
    'solutions': renderOverviewPage,
    'industries': renderOverviewPage,
    'science': renderOverviewPage,
    'resources': renderOverviewPage,
    'company': renderOverviewPage,
    'measure': renderOverviewPage,
    'report': renderOverviewPage,
    'reduce': renderOverviewPage,
    'workspace': renderEngineeringOverviewPage,
    'engineering': renderEngineeringOverviewPage,
    'decision-workspace': renderEngineeringOverviewPage,
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

  constructor(contentContainer) {
    this.container = contentContainer;

    // Guard: ignore hash changes if we are not in the Carbon sub-path
    const path = window.location.pathname;
    const isCarbonPath = path.includes('/carbon/') || path.endsWith('/carbon');
    
    if (!isCarbonPath) {
      return;
    }

    window.addEventListener('hashchange', () => {
      const route = this.getRouteFromHash();
      stateStore.setRoute(route);
    });
  }

  getRouteFromHash() {
    const hash = window.location.hash.substring(1);
    const disabledHashes = ['solutions', 'industries', 'science', 'resources', 'company', 'measure', 'report', 'reduce'];
    if (!hash || disabledHashes.includes(hash)) {
      return 'overview';
    }
    return Router.routes[hash] ? hash : 'overview';
  }

  renderCurrentRoute() {
    const route = stateStore.getRoute();
    const renderFn = Router.routes[route] || renderOverviewPage;
    if (this.container) {
      this.container.innerHTML = renderFn();
      if (typeof renderFn.attachEvents === 'function') {
        renderFn.attachEvents(this.container);
      }

      // Canonical public routes vs internal hash routes
      const path = window.location.pathname;
      const isCarbonPath = path.includes('/carbon/') || path.endsWith('/carbon');
      
      const publicCanonicalRoutes = {
        'overview': PUBLIC_ROUTES.home,
        'platform': PUBLIC_ROUTES.platform,
        'solutions': PUBLIC_ROUTES.solutions,
        'industries': PUBLIC_ROUTES.industries,
        'science': PUBLIC_ROUTES.science,
        'resources': PUBLIC_ROUTES.resources,
        'company': PUBLIC_ROUTES.company
      };

      if (isCarbonPath) {
        if (publicCanonicalRoutes[route]) {
          const canonicalTarget = publicCanonicalRoutes[route];
          // If pathname doesn't match canonical target, pushState
          if (!window.location.pathname.includes(canonicalTarget) && !canonicalTarget.includes(window.location.pathname)) {
            try {
              history.pushState(null, '', canonicalTarget);
            } catch (e) {}
          }
          // Remove any legacy page-name hash from public routes (unless an in-page section anchor)
          if (window.location.hash && !window.location.hash.startsWith('#section') && !window.location.hash.startsWith('#regulatory-check')) {
            try {
              history.replaceState(null, '', window.location.pathname);
            } catch (e) {}
          }
        } else if (route && route !== 'overview') {
          window.location.hash = route;
        } else {
          if (window.location.hash) {
            try {
              history.replaceState(null, '', window.location.pathname);
            } catch (e) {
              // fallback if history API restricted
            }
          }
        }
      }
    }
  }
}
