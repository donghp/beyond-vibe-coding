/**
 * ENERIX Carbon - Regulatory Knowledge Base View
 */
import { dataProvider } from '../../app/data-provider.js';

export function renderKnowledgePage() {
  const docs = dataProvider.getKnowledgeItems();

  return `
    <div class="page-title-bar">
      <h1 class="page-title">Regulatory Knowledge Base</h1>
      <p class="page-subtitle">Indexed Repository of Official Vietnamese GHG Laws, Decrees & Circulars</p>
    </div>

    <div class="enerix-table-wrapper">
      <table class="enerix-table">
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Title</th>
            <th>Document Class</th>
            <th>Authority</th>
          </tr>
        </thead>
        <tbody>
          ${docs.map(d => `
            <tr>
              <td class="mono-text">${d.document_id}</td>
              <td style="font-weight:600;">${d.title}</td>
              <td>${d.category}</td>
              <td>${d.authority_class}</td>
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
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const docId = row.querySelector('.mono-text').textContent;
      const doc = dataProvider.getKnowledgeItem(docId);
      if (doc) {
        const detailView = container.querySelector('#knowledge-detail-view');
        detailView.innerHTML = `
          <div class="enerix-card">
            <h2 class="card-title">Knowledge Detail: ${doc.title}</h2>
            <div class="card-content">
              <p><strong>ID:</strong> ${doc.document_id}</p>
              <p><strong>Category:</strong> ${doc.category}</p>
              <p><strong>Authority:</strong> ${doc.authority_class}</p>
              <p><strong>Version:</strong> ${doc.version}</p>
            </div>
            <button class="enerix-button" id="close-detail">Close</button>
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
