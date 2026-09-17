/**
 * ENERIX Carbon - Regulatory Knowledge Base View
 */
import { dataProvider } from '../../app/data-provider.js';
import { ICONS } from '../components/icons.js';
import { CarbonBrandBanner } from '../components/banner.js';

export function renderKnowledgePage() {
  const docs = dataProvider.getKnowledgeItems();

  return `
    ${CarbonBrandBanner.render({ variant: 'guide', priority: false })}

    <div class="page-title-bar">
      <h1 class="page-title">Regulatory Knowledge Base</h1>
      <p class="page-subtitle">Indexed Repository of Official Vietnamese GHG Laws, Decrees & Circulars</p>
    </div>

    <div class="enerix-table-wrapper" style="box-shadow:none;border:1px solid var(--carbon-navy-200);">
      <table class="enerix-table">
        <thead>
          <tr style="background:var(--carbon-navy-50);">
            <th>Document ID</th>
            <th>Title & Legal Act</th>
            <th>Classification</th>
            <th>Governing Authority</th>
          </tr>
        </thead>
        <tbody>
          ${docs.map(d => `
            <tr style="cursor:pointer;">
              <td class="mono-text" style="font-weight:600;">${d.document_id}</td>
              <td style="font-weight:600;color:var(--carbon-navy-900);">${d.title}</td>
              <td><span class="status-badge neutral">${d.category}</span></td>
              <td style="font-size:12px;color:var(--carbon-navy-700);">${d.authority_class}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div id="knowledge-detail-view" style="margin-top:24px;display:none;">
    </div>
  `;
}

renderKnowledgePage.attachEvents = (container) => {
  container.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      const docId = row.querySelector('.mono-text').textContent;
      const doc = dataProvider.getKnowledgeItem(docId);
      if (doc) {
        const detailView = container.querySelector('#knowledge-detail-view');
        detailView.innerHTML = `
          <div class="enerix-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <h2 class="enerix-card-title" style="margin-bottom:0;">Knowledge Reference: ${doc.title}</h2>
              <span class="status-badge neutral">${doc.document_id}</span>
            </div>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;background:var(--carbon-navy-50);border:1px solid var(--carbon-navy-200);border-radius:6px;padding:16px;margin-bottom:16px;">
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Document ID</div>
                <div class="mono-text" style="font-weight:600;color:var(--carbon-navy-900);">${doc.document_id}</div>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Classification Category</div>
                <div style="font-weight:600;color:var(--carbon-navy-900);">${doc.category}</div>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Competent Authority</div>
                <div style="font-weight:600;color:var(--carbon-navy-900);">${doc.authority_class}</div>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--carbon-navy-500);margin-bottom:4px;">Version Specification</div>
                <div class="mono-text" style="font-size:13px;color:var(--carbon-navy-700);">${doc.version}</div>
              </div>
            </div>

            <button class="enerix-button enerix-button-secondary" id="close-detail" style="font-size:12px;">
              Close Reference
            </button>
          </div>
        `;
        detailView.style.display = 'block';
        
        container.querySelector('#close-detail').addEventListener('click', (e) => {
          e.stopPropagation();
          detailView.style.display = 'none';
        });
      }
    });
  });
};
