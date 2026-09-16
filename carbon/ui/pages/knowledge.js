/**
 * ENERIX Carbon - Regulatory Knowledge Base View
 */
export function renderKnowledgePage() {
  const docs = [
    { id: 'LAW-72-2020-QH14', title: 'Luật Bảo vệ môi trường 2020 (72/2020/QH14)', type: 'Law', authority: 'Quốc hội' },
    { id: 'DEC-06-2022-ND-CP', title: 'Nghị định 06/2022/NĐ-CP giảm nhẹ phát thải KNK', type: 'Decree', authority: 'Chính phủ' },
    { id: 'DEC-119-2025-ND-CP', title: 'Nghị định 119/2025/NĐ-CP sửa đổi NĐ 06/2022', type: 'Decree', authority: 'Chính phủ' },
    { id: 'DEC-83-2026-ND-CP', title: 'Nghị định 83/2026/NĐ-CP sửa đổi NĐ 06/2022', type: 'Decree', authority: 'Chính phủ' },
    { id: 'QD-42-2026', title: 'Quyết định 42/2026/QĐ-TTg Danh mục cơ sở kiểm kê KNK', type: 'Decision', authority: 'Thủ tướng Chính phủ' },
    { id: 'QD-263-2026', title: 'Quyết định 263/QĐ-TTg Thí điểm hạn ngạch KNK 2025-2026', type: 'Decision', authority: 'Thủ tướng Chính phủ' }
  ];

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
              <td class="mono-text">${d.id}</td>
              <td style="font-weight:600;">${d.title}</td>
              <td>${d.type}</td>
              <td>${d.authority}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
