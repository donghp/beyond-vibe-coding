/**
 * ENERIX Carbon - Application Initialization Entrypoint
 */
import { dataProvider } from './data-provider.js';
import { stateStore } from './state-store.js';
import { Router } from './router.js';
import { renderHeader } from '../ui/components/header.js';
import { renderSidebar } from '../ui/components/sidebar.js';

export async function initApp() {
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
  stateStore.recompute();

  const headerRoot = document.getElementById('header-root');
  const sidebarRoot = document.getElementById('sidebar-root');
  const contentStage = document.getElementById('content-stage');

  headerRoot.innerHTML = renderHeader();

  const router = new Router(contentStage);

  const updateUI = () => {
    const route = stateStore.getRoute();
    sidebarRoot.innerHTML = renderSidebar(route);
    router.renderCurrentRoute();

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
