import { I18nManager } from '../../app/i18n.js';

/**
 * ENERIX Carbon - Sidebar Navigation Component
 */
export function renderSidebar(currentRoute, isMobileMenuOpen = false) {
  const routes = [
    {
      group: I18nManager.t('nav.group_compliance'),
      items: [
        { id: 'overview', label: I18nManager.t('nav.overview_label'), icon: '📊' },
        { id: 'regulatory-check', label: I18nManager.t('nav.regulatory_label'), icon: '⚖️' },
        { id: 'facilities', label: I18nManager.t('nav.facilities_label'), icon: '🏭' },
        { id: 'inventory', label: I18nManager.t('nav.inventory_label'), icon: '🌱' }
      ]
    },
    {
      group: I18nManager.t('nav.group_data'),
      items: [
        { id: 'activity-data', label: I18nManager.t('nav.activities_label'), icon: '📋' },
        { id: 'emission-factors', label: I18nManager.t('nav.emission_factors_label'), icon: '⚡' },
        { id: 'methodologies', label: I18nManager.t('nav.methodologies_label'), icon: '📘' },
        { id: 'calculations', label: I18nManager.t('nav.calculations_label'), icon: '🧮' }
      ]
    },
    {
      group: I18nManager.t('nav.group_audit'),
      items: [
        { id: 'evidence-trace', label: I18nManager.t('nav.evidence_label'), icon: '🔍' },
        { id: 'reports', label: I18nManager.t('nav.reports_label'), icon: '📑' },
        { id: 'knowledge', label: I18nManager.t('nav.knowledge_label'), icon: '📚' }
      ]
    }
  ];

  const openClass = isMobileMenuOpen ? 'open' : '';
  const overlayClass = isMobileMenuOpen ? 'active' : '';

  let html = `
    <div class="sidebar-overlay ${overlayClass}" id="sidebar-overlay"></div>
    <nav class="carbon-sidebar ${openClass}">
      <button class="sidebar-close-btn" id="mobile-sidebar-close" aria-label="Close Navigation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
  `;

  routes.forEach(group => {
    html += `
      <div class="carbon-nav-group">
        <div class="carbon-nav-header">${group.group}</div>
    `;
    group.items.forEach(item => {
      const activeClass = currentRoute === item.id ? 'active' : '';
      html += `
        <a class="carbon-nav-item ${activeClass}" data-route="${item.id}">
          <span>${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `;
    });
    html += `</div>`;
  });

  html += `</nav>`;
  return html;
}
