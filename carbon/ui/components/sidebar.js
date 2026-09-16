/**
 * ENERIX Carbon - Sidebar Navigation Component
 */
export function renderSidebar(currentRoute) {
  const routes = [
    {
      group: 'Enterprise Compliance',
      items: [
        { id: 'overview', label: 'Executive Dashboard', icon: '📊' },
        { id: 'regulatory-check', label: 'Regulatory Applicability', icon: '⚖️' },
        { id: 'facilities', label: 'Regulated Facilities', icon: '🏭' },
        { id: 'inventory', label: 'GHG Inventory (Scopes)', icon: '🌱' }
      ]
    },
    {
      group: 'Data & Methodology',
      items: [
        { id: 'activity-data', label: 'Activity Data Ledger', icon: '📋' },
        { id: 'emission-factors', label: 'Emission Factors Registry', icon: '⚡' },
        { id: 'methodologies', label: 'Ministry MRV Circulars', icon: '📘' },
        { id: 'calculations', label: 'Calculation Models', icon: '🧮' }
      ]
    },
    {
      group: 'Audit & Knowledge',
      items: [
        { id: 'evidence-trace', label: 'Evidence & Audit Trace', icon: '🔍' },
        { id: 'reports', label: 'Regulatory Reports', icon: '📑' },
        { id: 'knowledge', label: 'Regulatory Knowledge Base', icon: '📚' }
      ]
    }
  ];

  let html = `<nav class="carbon-sidebar">`;

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
