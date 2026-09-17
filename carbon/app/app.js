/**
 * ENERIX Carbon - Application Initialization Entrypoint
 */
import { dataProvider } from './data-provider.js';
import { stateStore } from './state-store.js';
import { Router } from './router.js';
import { renderHeader } from '../ui/components/header.js';
import { renderSidebar } from '../ui/components/sidebar.js';

export async function initApp() {
  // Guard: only initialize if we are in the carbon sub-path
  // Using a more robust check that accounts for project base paths and trailing slashes
  const path = window.location.pathname;
  const isCarbonPath = path.includes('/carbon/') || path.endsWith('/carbon');
  
  if (!isCarbonPath) {
    // Silent exit to avoid hijacking root application state
    return;
  }

  const root = document.getElementById('carbon-app-container');
  if (!root) return;

  root.innerHTML = `
    <div id="header-root"></div>
    <div class="carbon-main-body">
      <div id="sidebar-root"></div>
      <main id="content-stage" class="carbon-content-stage">
        <div style="padding:40px;text-align:center;color:#64748b;">Loading ENERIX Carbon Repository Engine...</div>
      </main>
    </div>
  `;

  await dataProvider.loadAll();

  // Initialize route from hash
  const initialRoute = window.location.hash.substring(1);
  if (initialRoute && Object.keys(Router.routes).includes(initialRoute)) {
    stateStore.setRoute(initialRoute);
  } else {
    stateStore.setRoute('overview');
  }

  stateStore.recompute();

  const headerRoot = document.getElementById('header-root');
  const sidebarRoot = document.getElementById('sidebar-root');
  const contentStage = document.getElementById('content-stage');

  headerRoot.innerHTML = renderHeader();

  const router = new Router(contentStage);

  const updateUI = () => {
    const route = stateStore.getRoute();
    const viewState = stateStore.getViewState();
    
    headerRoot.innerHTML = renderHeader();
    sidebarRoot.innerHTML = renderSidebar(route, viewState.isMobileMenuOpen);
    router.renderCurrentRoute();

    // Bind top product navigation (Measure / Report / Reduce)
    headerRoot.querySelectorAll('.product-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const section = btn.getAttribute('data-section');
        if (section) {
          stateStore.setSection(section);
        }
      });
    });

    // Update active facility in sidebar header if present
    const activeFacEl = sidebarRoot.querySelector('#sidebar-active-facility');
    if (activeFacEl) {
      const activeFac = dataProvider.getFacility(stateStore.getSelectedFacilityId());
      if (activeFac) {
        activeFacEl.textContent = activeFac.facility_name;
      }
    }

    // Bind navigation click handlers
    sidebarRoot.querySelectorAll('.carbon-nav-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetRoute = el.getAttribute('data-route');
        if (targetRoute) {
          stateStore.setRoute(targetRoute);
        }
      });
    });

    // Mobile Menu Handlers
    const menuToggle = document.getElementById('mobile-menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        stateStore.toggleMobileMenu();
      });
    }

    const menuClose = document.getElementById('mobile-sidebar-close');
    if (menuClose) {
      menuClose.addEventListener('click', () => {
        stateStore.closeMobileMenu();
      });
    }

    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        stateStore.closeMobileMenu();
      });
    }
  };

  stateStore.subscribe(updateUI);
  updateUI();
}

// Auto init if loaded in browser
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });
}
