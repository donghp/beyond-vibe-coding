import { I18nManager } from '../../app/i18n.js';
import { stateStore } from '../../app/state-store.js';

/**
 * ENERIX Carbon - Sidebar Navigation Component
 * Adheres to MDS ENERIX Carbon V1.0:
 * - Dynamic grouped navigation reflecting active Product Section:
 *   - 01 MEASURE (Overview, Regulatory, Facilities, Scope Map, Activity Data, Documents, Methodologies, EFs, Calculations, Evidence, Health)
 *   - 02 REPORT (Report Overview, Inventory Reports, Regulatory Reports, Report Readiness, Audit Package)
 *   - 03 REDUCE (Hotspots, Reduction Projects, Baseline, Scenarios, Targets, Abatement)
 * - Carbon Blue (#00A0E0) active accent
 * - Deep Navy structural typography
 * - Clean geometric SVG icons (no emoji icons)
 */

const NAV_ICONS = {
  overview: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
  'regulatory-check': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>`,
  facilities: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M18 16h2"></path><path d="M18 12h2"></path></svg>`,
  inventory: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
  'activity-data': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 12h6"></path><path d="M9 16h6"></path></svg>`,
  'emission-factors': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  methodologies: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
  calculations: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>`,
  'evidence-trace': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="m11 8 3 3-3 3"></path></svg>`,
  reports: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  knowledge: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>`,
  target: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  flame: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`
};

export function renderSidebar(currentRoute, isMobileMenuOpen = false) {
  const currentSection = stateStore.getCurrentSection ? stateStore.getCurrentSection() : 'measure';

  let sections = [];

  if (currentSection === 'report') {
    sections = [
      {
        group: I18nManager.t('common.report_workspace'),
        items: [
          { id: 'reports', label: I18nManager.t('nav.reports_label'), icon: 'reports' },
          { id: 'evidence-trace', label: I18nManager.t('nav.evidence_label'), icon: 'evidence-trace' },
          { id: 'knowledge', label: I18nManager.t('nav.knowledge_label'), icon: 'knowledge' }
        ]
      }
    ];
  } else if (currentSection === 'reduce') {
    sections = [
      {
        group: I18nManager.t('common.reduce_workspace'),
        items: [
          { id: 'overview', label: I18nManager.t('nav.hotspots_label') + ' (Hotspots)', icon: 'flame' },
          { id: 'calculations', label: I18nManager.t('nav.scenarios_label'), icon: 'calculations' }
        ]
      }
    ];
  } else {
    // Default: 01 MEASURE Navigation (Plan A-inspired, engineering-grade)
    sections = [
      {
        group: I18nManager.t('nav.group_measure_core'),
        items: [
          { id: 'overview', label: I18nManager.t('nav.overview_label'), icon: 'overview' },
          { id: 'facilities', label: I18nManager.t('nav.facilities_label'), icon: 'facilities' },
          { id: 'regulatory-check', label: I18nManager.t('nav.regulatory_label'), icon: 'regulatory-check' },
          { id: 'inventory', label: I18nManager.t('nav.inventory_label'), icon: 'inventory' }
        ]
      },
      {
        group: I18nManager.t('nav.group_data_collection'),
        items: [
          { id: 'activity-data', label: I18nManager.t('nav.activities_label'), icon: 'activity-data' },
          { id: 'evidence-trace', label: I18nManager.t('nav.evidence_label'), icon: 'evidence-trace' }
        ]
      },
      {
        group: I18nManager.t('nav.group_engineering'),
        items: [
          { id: 'methodologies', label: I18nManager.t('nav.methodologies_label'), icon: 'methodologies' },
          { id: 'emission-factors', label: I18nManager.t('nav.emission_factors_label'), icon: 'emission-factors' },
          { id: 'calculations', label: I18nManager.t('nav.calculations_label'), icon: 'calculations' }
        ]
      },
      {
        group: I18nManager.t('nav.group_assurance'),
        items: [
          { id: 'reports', label: I18nManager.t('nav.reports_label'), icon: 'reports' },
          { id: 'knowledge', label: I18nManager.t('nav.knowledge_label'), icon: 'knowledge' }
        ]
      }
    ];
  }

  const openClass = isMobileMenuOpen ? 'open' : '';
  const overlayClass = isMobileMenuOpen ? 'active' : '';

  let html = `
    <div class="sidebar-overlay ${overlayClass}" id="sidebar-overlay"></div>
    <nav class="carbon-sidebar ${openClass}" aria-label="ENERIX Carbon Navigation">
      <div class="sidebar-top-meta" style="justify-content:flex-end;">
        <button class="sidebar-close-btn" id="mobile-sidebar-close" aria-label="Close Navigation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
  `;

  sections.forEach(group => {
    html += `
      <div class="carbon-nav-group">
        <div class="carbon-nav-header">${group.group}</div>
    `;
    group.items.forEach(item => {
      const activeClass = currentRoute === item.id ? 'active' : '';
      const iconSvg = NAV_ICONS[item.icon] || NAV_ICONS[item.id] || NAV_ICONS.overview;
      html += `
        <a class="carbon-nav-item ${activeClass}" data-route="${item.id}" role="button" tabindex="0">
          <span class="nav-icon" aria-hidden="true">${iconSvg}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `;
    });
    html += `</div>`;
  });

  html += `</nav>`;
  return html;
}
