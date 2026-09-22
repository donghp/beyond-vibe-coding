/**
 * ENERIX Carbon - Application Initialization Entrypoint
 */
import { dataProvider } from './data-provider.js';
import { stateStore } from './state-store.js';
import { Router } from './router.js';
import { renderHeader } from '../ui/components/header.js';
import { renderSidebar } from '../ui/components/sidebar.js';
import { CarbonBrandBanner } from '../ui/components/banner.js';

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
    <!-- Product Navigation & Global Controls Header -->
    <div id="header-root"></div>
    <div class="carbon-main-body">
      <div id="sidebar-root"></div>
      <main id="content-stage" class="carbon-content-stage">
        <div style="padding:40px;text-align:center;color:#64748b;">Loading ENERIX Carbon Repository Engine...</div>
      </main>
    </div>
  `;

  // Determine initial route from canonical pathname first, then fallback to hash
  function resolveRouteFromLocation() {
    const initialHash = window.location.hash.substring(1);
    const disabledHashes = ['solutions', 'industries', 'science', 'resources', 'company', 'measure', 'report', 'reduce', 'platform'];
    if (initialHash && disabledHashes.includes(initialHash)) {
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
      return 'overview';
    } else if (initialHash && Object.keys(Router.routes).includes(initialHash)) {
      return initialHash;
    }
    return 'overview';
  }

  const initialRoute = resolveRouteFromLocation();
  stateStore.setRoute(initialRoute);

  window.addEventListener('popstate', () => {
    const currentRoute = resolveRouteFromLocation();
    stateStore.setRoute(currentRoute);
  });

  stateStore.recompute();
  window.stateStore = stateStore;

  const headerRoot = document.getElementById('header-root');
  const sidebarRoot = document.getElementById('sidebar-root');
  const contentStage = document.getElementById('content-stage');

  headerRoot.innerHTML = renderHeader();

  const router = new Router(contentStage);

  const updateUI = () => {
    const route = stateStore.getRoute();
    const viewState = stateStore.getViewState();
    const publicRoutes = ['overview', 'platform', 'solutions', 'industries', 'science', 'resources', 'company', 'measure', 'report', 'reduce'];
    
    headerRoot.innerHTML = renderHeader();
    if (publicRoutes.includes(route)) {
      sidebarRoot.innerHTML = '';
      sidebarRoot.style.display = 'none';
      contentStage.style.maxWidth = '100%';
      contentStage.style.padding = '0';
    } else {
      sidebarRoot.style.display = 'flex';
      sidebarRoot.innerHTML = renderSidebar(route, viewState.isMobileMenuOpen);
      contentStage.style.maxWidth = 'var(--carbon-max-width)';
      contentStage.style.padding = '28px 36px';
    }
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

    // Bind navigation click handlers
    if (sidebarRoot && sidebarRoot.style.display !== 'none') {
      sidebarRoot.querySelectorAll('.carbon-nav-item').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const targetRoute = el.getAttribute('data-route');
          if (targetRoute) {
            stateStore.setRoute(targetRoute);
          }
        });
      });
    }

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

  // Load authoritative data in background
  dataProvider.loadAll().then(() => {
    stateStore.recompute();
  });
}

// Auto init if loaded in browser
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });
}
