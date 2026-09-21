/**
 * ENERIX Carbon - Public Solutions Product Page
 * Definitive Master-Based Recomposition (#ENERIXON_Carbon_00082)
 * Primary Reference: 02.page_solotion_vn.png & 02_page_solutions_layout_master_8K.png
 * 
 * EXACT 7 HIGH-LEVEL COMPOSITION BLOCKS:
 * 0. Shared Public Header (provided by shell/router)
 * 1. Compact Breadcrumb
 * 2. HERO (Wide industrial/environmental scene, integrated statement & trust points)
 * 3. PROBLEM / DATA FRAGMENTATION (2-col: Left copy + CTA, Right single explanatory visual + integrated risk strip)
 * 4. FOUR SOLUTIONS (4 equal cards in ONE horizontal row on desktop)
 * 5. COMMON WORKFLOW (1 horizontal 9-step node flow)
 * 6. FINAL CINEMATIC CTA (wide cinematic Earth/landscape)
 * 7. Shared Global Footer
 */

import { CarbonPath } from '../../app/path.js';
import { stateStore } from '../../app/state-store.js';
import { I18nManager } from '../../app/i18n.js';
import { renderEnterpriseFooter } from '../components/enterprise-footer.js';
import { renderBreadcrumb } from '../components/public-page-shell.js';
import { PUBLIC_ROUTES } from '../../app/routes.js';

export function renderSolutionsProductPage() {
  const isVi = I18nManager.currentLocale === 'vi';
  const heroBgUrl = CarbonPath.resolve('assets/solutions/02_page_solutions_banner.png');
  const earthBgUrl = CarbonPath.resolve('assets/solutions/02_page_solutions_footer_earth.png');
  const breadcrumb = renderBreadcrumb([
    { label: isVi ? 'Giải pháp' : 'Solutions', url: PUBLIC_ROUTES.solutions }
  ]);

  return `
    <div class="product-page solutions-page" id="solutions-page-root" style="font-family:'Be Vietnam Pro', var(--carbon-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif); color:#0B1727; background:#ffffff; overflow-x:hidden;">
      ${breadcrumb}
      
      <style>
        .solutions-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
        }
        
        /* HERO */
        .solutions-hero {
          background-color: #08192D;
          background-image: linear-gradient(90deg, rgba(8, 25, 45, 0.94) 0%, rgba(8, 25, 45, 0.82) 48%, rgba(8, 25, 45, 0.40) 100%), url('${heroBgUrl}');
          background-size: cover;
          background-position: center right;
          color: #ffffff;
          padding: 64px 0 48px 0;
          border-bottom: 1px solid #1E293B;
          position: relative;
        }
        .solutions-eyebrow {
          display: inline-block;
          font-family: var(--carbon-font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          color: #38BDF8;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 14px;
        }
        .solutions-h1 {
          font-size: clamp(28px, 3.8vw, 46px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 16px 0;
          max-width: 780px;
        }
        .solutions-hero-sub {
          font-size: clamp(14px, 1.5vw, 17px);
          line-height: 1.65;
          color: #CBD5E1;
          max-width: 740px;
          margin: 0 0 28px 0;
        }
        .solutions-btn-primary {
          background: #0066FF;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .solutions-btn-primary:hover {
          background: #0052cc;
        }
        .solutions-btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 12px 22px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .solutions-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* SECTION COMMON HEADINGS */
        .section-tag {
          font-family: var(--carbon-font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          color: #0066FF;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
          display: inline-block;
        }
        .section-title {
          font-size: clamp(22px, 2.8vw, 32px);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0B1727;
          line-height: 1.25;
          margin: 0 0 10px 0;
        }
        .section-desc {
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
          max-width: 780px;
          margin: 0;
        }
        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
        }
        .section-top-link {
          font-size: 13px;
          font-weight: 700;
          color: #0066FF;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.15s ease;
          white-space: nowrap;
        }
        .section-top-link:hover {
          gap: 9px;
          text-decoration: underline;
        }

        /* FOUR SOLUTIONS 4-COLUMN CARDS */
        .solutions-grid-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .solution-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 330px;
          box-sizing: border-box;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .solution-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.08);
        }
        .solution-card-bullet {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12.5px;
          color: #334155;
          line-height: 1.45;
          margin-bottom: 8px;
        }
        .solution-bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        /* 9-STEP WORKFLOW */
        .workflow-row-container {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 10px;
          align-items: stretch;
          position: relative;
        }
        .workflow-step-node {
          background: #ffffff;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: all 0.15s ease;
        }
        .workflow-step-node:hover {
          border-color: #0066FF;
          box-shadow: 0 4px 12px rgba(0, 102, 255, 0.08);
        }
        .workflow-step-badge {
          font-family: var(--carbon-font-mono, monospace);
          font-size: 10px;
          font-weight: 800;
          color: #64748B;
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .workflow-step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          color: #0066FF;
        }
        .workflow-step-title {
          font-size: 12px;
          font-weight: 700;
          color: #0B1727;
          line-height: 1.3;
        }

        @media (max-width: 1080px) {
          .solutions-grid-4col {
            grid-template-columns: repeat(2, 1fr);
          }
          .workflow-row-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .solutions-grid-4col {
            grid-template-columns: 1fr;
          }
          .workflow-row-container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <!-- ============================================================ -->
      <!-- 2. HERO SECTION -->
      <!-- ============================================================ -->
      <section class="solutions-hero" id="solutions-hero">
        <div class="solutions-container">
          <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:40px; align-items:center;">
            <div>
              <span class="solutions-eyebrow">${isVi ? 'GIẢI PHÁP DOANH NGHIỆP' : 'ENTERPRISE SOLUTIONS'}</span>
              <h1 class="solutions-h1">${isVi ? 'Biến dữ liệu phát thải thành quyết định có cơ sở.' : 'Turn emission data into grounded decisions.'}</h1>
              <p class="solutions-hero-sub">
                ${isVi 
                  ? 'ENERIXON Carbon giúp doanh nghiệp kết nối dữ liệu hoạt động, phương pháp tính toán, kết quả phát thải và cơ hội giảm phát thải trong một quy trình quản lý thống nhất.'
                  : 'ENERIXON Carbon helps enterprises connect activity data, calculation methodologies, emissions results, and decarbonization opportunities in a unified management workflow.'}
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:14px; align-items:center;">
                <a href="${PUBLIC_ROUTES.platform}" class="solutions-btn-primary btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                  ${isVi ? 'Khám phá Nền tảng' : 'Explore Platform'} →
                </a>
                <a href="#workflow" class="solutions-btn-secondary">
                  ${isVi ? 'Xem cách hoạt động' : 'See How It Works'} ○
                </a>
              </div>
            </div>

            <!-- Integrated Right Statement (Subtle, seamlessly integrated) -->
            <div style="text-align:right; padding:20px 0;">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:12px; color:#38BDF8; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:6px; font-weight:700;">
                ${isVi ? 'ĐO LƯỜNG HÔM NAY' : 'MEASURE TODAY'}
              </div>
              <div style="font-size:clamp(22px, 2.5vw, 32px); font-weight:900; letter-spacing:-0.02em; color:#ffffff; line-height:1.2; margin-bottom:12px;">
                ${isVi ? 'KIẾN TẠO TƯƠNG LAI' : 'SHAPE TOMORROW'}
              </div>
              <div style="font-size:13px; color:#94A3B8; line-height:1.6; max-width:320px; margin-left:auto;">
                ${isVi 
                  ? 'Một nền tảng quản trị carbon thống nhất, chính xác và có thể kiểm chứng cho mọi quy mô doanh nghiệp.'
                  : 'A unified, audit-defensible carbon management framework designed for enterprise scale.'}
              </div>
            </div>
          </div>

          <!-- Bottom Integrated Trust Points -->
          <div style="background:rgba(11, 23, 39, 0.92); border:1px solid rgba(255, 255, 255, 0.12); border-radius:8px; padding:16px 20px; margin-top:40px;">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px;">
              <div style="border-left:2px solid #0066FF; padding-left:14px;">
                <div style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#38BDF8; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:3px;">
                  ${isVi ? 'CHUẨN QUỐC TẾ' : 'INTERNATIONAL STANDARD'}
                </div>
                <div style="font-size:12.5px; color:#CBD5E1;">
                  ${isVi ? 'Theo GHG Protocol' : 'Based on GHG Protocol'}
                </div>
              </div>

              <div style="border-left:2px solid #0066FF; padding-left:14px;">
                <div style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#38BDF8; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:3px;">
                  ${isVi ? 'TIN CẬY & MINH BẠCH' : 'CREDIBLE & TRANSPARENT'}
                </div>
                <div style="font-size:12.5px; color:#CBD5E1;">
                  ${isVi ? 'Có thể truy xuất nguồn gốc' : 'Full audit trail'}
                </div>
              </div>

              <div style="border-left:2px solid #0066FF; padding-left:14px;">
                <div style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#38BDF8; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:3px;">
                  ${isVi ? 'SẴN SÀNG CHO BÁO CÁO' : 'REPORT-READY'}
                </div>
                <div style="font-size:12.5px; color:#CBD5E1;">
                  ${isVi ? 'Phục vụ yêu cầu theo quy định' : 'For compliance & statutory disclosures'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 3. PROBLEM / DATA FRAGMENTATION SECTION -->
      <!-- ============================================================ -->
      <section style="padding:64px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="problem">
        <div class="solutions-container">
          <div style="display:grid; grid-template-columns:1fr 1.15fr; gap:40px; align-items:center;">
            <div>
              <span class="section-tag">${isVi ? 'VẤN ĐỀ DOANH NGHIỆP ĐANG GẶP PHẢI' : 'THE CHALLENGE FOR ENTERPRISES'}</span>
              <h2 class="section-title">${isVi ? 'Dữ liệu không thiếu. Vấn đề là dữ liệu nằm rải rác.' : 'Data is not scarce. The problem is fragmentation.'}</h2>
              <p class="section-desc" style="margin-bottom:20px;">
                ${isVi 
                  ? 'Điện, nhiên liệu, sản xuất, vận chuyển, nhà cung cấp và chất thải thường nằm ở nhiều nguồn khác nhau — khiến tổng hợp, đối soát và truy xuất trở nên khó khăn.'
                  : 'Electricity, fuel, production, freight, suppliers, and waste often reside in disconnected sources — making aggregation, reconciliation, and auditability difficult.'}
              </p>
              <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                ${isVi ? 'Hiểu rõ thách thức' : 'Understand the challenge'} →
              </a>
            </div>

            <!-- Single Explanatory Visual: INPUTS → FRAGMENTATION → CONSEQUENCES -->
            <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:20px; box-shadow:0 4px 16px rgba(0,0,0,0.03);">
              <div style="display:grid; grid-template-columns:1fr 0.8fr 1.2fr; gap:12px; align-items:center;">
                
                <!-- Left Input Cluster -->
                <div style="display:flex; flex-direction:column; gap:6px;">
                  <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:700; color:#64748B; text-transform:uppercase;">
                    ${isVi ? 'NGUỒN ĐẦU VÀO' : 'RAW INPUTS'}
                  </div>
                  ${[
                    isVi ? 'Hóa đơn điện' : 'Electricity bills',
                    isVi ? 'Nhiên liệu' : 'Fuel logs',
                    isVi ? 'Sản xuất' : 'Production',
                    isVi ? 'Bảng tính' : 'Spreadsheets',
                    isVi ? 'Vận chuyển' : 'Freight',
                    isVi ? 'Bảo trì' : 'Maintenance',
                    isVi ? 'Chất thải' : 'Waste'
                  ].map(name => `
                    <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:4px; padding:5px 8px; font-size:11px; font-weight:600; color:#1E293B; display:flex; align-items:center; gap:6px;">
                      <span style="width:4px; height:4px; border-radius:50%; background:#0066FF;"></span>
                      ${name}
                    </div>
                  `).join('')}
                </div>

                <!-- Center: Tangled / Fragmented Network -->
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:10px; background:#EFF6FF; border:1px dashed #93C5FD; border-radius:8px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:#DBEAFE; display:flex; align-items:center; justify-content:center; margin-bottom:6px; color:#1D4ED8;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                  </div>
                  <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#1E40AF; text-transform:uppercase; line-height:1.2; margin-bottom:4px;">
                    ${isVi ? 'DỮ LIỆU PHÂN TÁN' : 'FRAGMENTED DATA'}
                  </div>
                  <div style="font-size:10px; color:#3B82F6; line-height:1.3;">
                    ${isVi ? 'Thiếu chuẩn hóa<br>Khó kiểm soát' : 'Unstandardized<br>Hard to control'}
                  </div>
                </div>

                <!-- Right: Structured Result Column -->
                <div style="display:flex; flex-direction:column; gap:6px;">
                  <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:700; color:#991B1B; text-transform:uppercase;">
                    ${isVi ? 'HỆ QUẢ THỰC TẾ' : 'CONSEQUENCES'}
                  </div>
                  ${[
                    isVi ? 'Tốn thời gian tổng hợp' : 'Time-consuming aggregation',
                    isVi ? 'Dữ liệu không nhất quán' : 'Inconsistent data baseline',
                    isVi ? 'Khó xác định ranh giới' : 'Unclear accounting boundary',
                    isVi ? 'Thiếu bằng chứng' : 'Lack of audit provenance',
                    isVi ? 'Chậm ra quyết định' : 'Slow decarbonization decision'
                  ].map(res => `
                    <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:4px; padding:6px 8px; font-size:11px; font-weight:600; color:#991B1B; display:flex; align-items:center; gap:6px;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      ${res}
                    </div>
                  `).join('')}
                </div>

              </div>
            </div>
          </div>

          <!-- Integrated Compact Risk Strip -->
          <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:8px; padding:12px 18px; margin-top:28px;">
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px;">
              <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#991B1B; text-transform:uppercase; letter-spacing:0.06em;">
                ${isVi ? 'CHUỖI RỦI RO KHI THIẾU QUẢN TRỊ:' : 'UNGOVERNED RISK SEQUENCE:'}
              </span>
              <div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; font-size:12px; font-weight:600; color:#991B1B;">
                <span style="background:#ffffff; padding:4px 10px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Thu thập phân tán' : 'Scattered Ingestion'}</span>
                <span>→</span>
                <span style="background:#ffffff; padding:4px 10px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Tổng hợp thủ công' : 'Manual Consolidation'}</span>
                <span>→</span>
                <span style="background:#ffffff; padding:4px 10px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Khó đối soát' : 'Hard to Reconcile'}</span>
                <span>→</span>
                <span style="background:#ffffff; padding:4px 10px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Khó truy xuất nguồn' : 'Untraceable Sources'}</span>
                <span>→</span>
                <span style="background:#B91C1C; color:#ffffff; padding:4px 12px; border-radius:4px;">${isVi ? 'Chậm ra quyết định' : 'Delayed Decisions'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 4. FOUR SOLUTIONS SECTION (1 HORIZONTAL ROW ON DESKTOP) -->
      <!-- ============================================================ -->
      <section style="padding:64px 0; background:#F8FAFC; border-bottom:1px solid #E2E8F0;" id="solutions">
        <div class="solutions-container">
          <div class="section-header-flex">
            <div>
              <span class="section-tag">${isVi ? 'BỐN GIẢI PHÁP TRỌNG TÂM' : 'FOUR FOCUS SOLUTIONS'}</span>
              <h2 class="section-title">${isVi ? 'Một nền tảng. Bốn nhu cầu thực tế.' : 'One platform. Four real-world needs.'}</h2>
              <p class="section-desc">
                ${isVi 
                  ? 'Từ vận hành nội bộ đến chuỗi cung ứng, sản phẩm và giảm phát thải, ENERIXON Carbon cung cấp giải pháp phù hợp theo từng nhu cầu.'
                  : 'From internal operations to supply chains, products, and decarbonization pathways, ENERIXON Carbon provides tailored solutions for every demand.'}
              </p>
            </div>
            <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
              ${isVi ? 'Tìm hiểu tất cả giải pháp' : 'Explore all solutions'} →
            </a>
          </div>

          <div class="solutions-grid-4col">
            <!-- CARD 01: BLUE - Corporate Carbon -->
            <div class="solution-card" style="border-top:3px solid #0066FF;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:12px; font-weight:800; color:#0066FF;">01</span>
                  <div style="width:34px; height:34px; border-radius:6px; background:#EFF6FF; display:flex; align-items:center; justify-content:center; color:#0066FF;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="9.01" y2="18"></line><line x1="15" y1="18" x2="15.01" y2="18"></line></svg>
                  </div>
                </div>
                <h3 style="font-size:17px; font-weight:800; color:#0B1727; margin:0 0 8px 0; line-height:1.3;">
                  ${isVi ? 'Quản lý Carbon Cấp Doanh nghiệp' : 'Corporate Carbon Management'}
                </h3>
                <p style="font-size:13px; color:#64748B; line-height:1.55; margin:0 0 16px 0;">
                  ${isVi 
                    ? 'Quản lý phát thải trên toàn tổ chức: công ty, cơ sở và nhà máy.'
                    : 'Manage emissions across the entire organization: entities, facilities, and sites.'}
                </p>
                <div style="margin-bottom:16px;">
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#0066FF;"></span>
                    <span>${isVi ? 'Kiểm kê Scope 1, 2, 3' : 'Scope 1, 2, 3 inventory'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#0066FF;"></span>
                    <span>${isVi ? 'Đa cơ sở, đa đơn vị' : 'Multi-facility, multi-entity'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#0066FF;"></span>
                    <span>${isVi ? 'Báo cáo theo quy định' : 'Statutory & regulatory reports'}</span>
                  </div>
                </div>
              </div>
              <div style="padding-top:12px; border-top:1px solid #F1F5F9;">
                <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                  ${isVi ? 'Tìm hiểu giải pháp' : 'Learn more'} →
                </a>
              </div>
            </div>

            <!-- CARD 02: GREEN - Supply Chain Carbon Intelligence -->
            <div class="solution-card" style="border-top:3px solid #10B981;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:12px; font-weight:800; color:#10B981;">02</span>
                  <div style="width:34px; height:34px; border-radius:6px; background:#ECFDF5; display:flex; align-items:center; justify-content:center; color:#10B981;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  </div>
                </div>
                <h3 style="font-size:17px; font-weight:800; color:#0B1727; margin:0 0 8px 0; line-height:1.3;">
                  ${isVi ? 'Trí tuệ Carbon Chuỗi Cung ứng' : 'Supply Chain Carbon Intelligence'}
                </h3>
                <p style="font-size:13px; color:#64748B; line-height:1.55; margin:0 0 16px 0;">
                  ${isVi 
                    ? 'Thu thập và đánh giá dữ liệu phát thải từ chuỗi cung ứng.'
                    : 'Collect and evaluate emissions data across multi-tier suppliers.'}
                </p>
                <div style="margin-bottom:16px;">
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#10B981;"></span>
                    <span>${isVi ? 'Tích hợp nhiều nguồn dữ liệu' : 'Multi-source data ingestion'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#10B981;"></span>
                    <span>${isVi ? 'Đánh giá chất lượng dữ liệu' : 'Data quality tiering'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#10B981;"></span>
                    <span>${isVi ? 'Phân tích rủi ro & hotspot' : 'Hotspot & risk modeling'}</span>
                  </div>
                </div>
              </div>
              <div style="padding-top:12px; border-top:1px solid #F1F5F9;">
                <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                  ${isVi ? 'Tìm hiểu giải pháp' : 'Learn more'} →
                </a>
              </div>
            </div>

            <!-- CARD 03: PURPLE - Product Carbon Footprint -->
            <div class="solution-card" style="border-top:3px solid #8B5CF6;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:12px; font-weight:800; color:#8B5CF6;">03</span>
                  <div style="width:34px; height:34px; border-radius:6px; background:#F5F3FF; display:flex; align-items:center; justify-content:center; color:#8B5CF6;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                </div>
                <h3 style="font-size:17px; font-weight:800; color:#0B1727; margin:0 0 8px 0; line-height:1.3;">
                  ${isVi ? 'Dấu chân Carbon của Sản phẩm' : 'Product Carbon Footprint'}
                </h3>
                <p style="font-size:13px; color:#64748B; line-height:1.55; margin:0 0 16px 0;">
                  ${isVi 
                    ? 'Đánh giá phát thải theo vòng đời sản phẩm.'
                    : 'Quantify life-cycle greenhouse gas emissions per product unit.'}
                </p>
                <div style="margin-bottom:16px;">
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#8B5CF6;"></span>
                    <span>${isVi ? 'Định lượng theo đơn vị sản phẩm' : 'Unit product carbon intensity'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#8B5CF6;"></span>
                    <span>${isVi ? 'Hỗ trợ dữ liệu LCA' : 'LCA activity data alignment'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#8B5CF6;"></span>
                    <span>${isVi ? 'So sánh kịch bản' : 'Scenario comparison'}</span>
                  </div>
                </div>
              </div>
              <div style="padding-top:12px; border-top:1px solid #F1F5F9;">
                <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                  ${isVi ? 'Tìm hiểu giải pháp' : 'Learn more'} →
                </a>
              </div>
            </div>

            <!-- CARD 04: ORANGE - Decarbonization Strategy -->
            <div class="solution-card" style="border-top:3px solid #F97316;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:12px; font-weight:800; color:#F97316;">04</span>
                  <div style="width:34px; height:34px; border-radius:6px; background:#FFF7ED; display:flex; align-items:center; justify-content:center; color:#F97316;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                  </div>
                </div>
                <h3 style="font-size:17px; font-weight:800; color:#0B1727; margin:0 0 8px 0; line-height:1.3;">
                  ${isVi ? 'Chiến lược Giảm Phát thải' : 'Decarbonization Strategy'}
                </h3>
                <p style="font-size:13px; color:#64748B; line-height:1.55; margin:0 0 16px 0;">
                  ${isVi 
                    ? 'Xác định cơ hội và xây dựng phương án hành động.'
                    : 'Identify mitigation opportunities and structure actionable decarbonization.'}
                </p>
                <div style="margin-bottom:16px;">
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#F97316;"></span>
                    <span>${isVi ? 'Phân tích hotspot & driver' : 'Hotspot & driver analytics'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#F97316;"></span>
                    <span>${isVi ? 'Mô hình kịch bản giảm phát thải' : 'Reduction pathway modeling'}</span>
                  </div>
                  <div class="solution-card-bullet">
                    <span class="solution-bullet-dot" style="background:#F97316;"></span>
                    <span>${isVi ? 'Theo dõi mục tiêu và hành động' : 'Milestone & action tracking'}</span>
                  </div>
                </div>
              </div>
              <div style="padding-top:12px; border-top:1px solid #F1F5F9;">
                <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                  ${isVi ? 'Tìm hiểu giải pháp' : 'Learn more'} →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 5. COMMON WORKFLOW SECTION (1 HORIZONTAL ROW OF 9 NODES) -->
      <!-- ============================================================ -->
      <section style="padding:64px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="workflow">
        <div class="solutions-container">
          <div class="section-header-flex">
            <div>
              <span class="section-tag">${isVi ? 'QUY TRÌNH CHUNG' : 'COMMON WORKFLOW'}</span>
              <h2 class="section-title">${isVi ? 'Mọi giải pháp đều bắt đầu từ dữ liệu và kết thúc bằng hành động.' : 'Every solution starts from data and ends in action.'}</h2>
              <p class="section-desc">
                ${isVi ? 'Một quy trình thống nhất, minh bạch và có thể truy xuất.' : 'A unified, transparent, and auditable process.'}
              </p>
            </div>
            <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
              ${isVi ? 'Xem chi tiết từng bước' : 'Explore step details'} →
            </a>
          </div>

          <!-- 9-Node Horizontal Visual Chain -->
          <div class="workflow-row-container">
            
            <!-- 01 Nguồn dữ liệu -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">01</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Nguồn dữ liệu' : 'Data Sources'}</div>
            </div>

            <!-- 02 Dữ liệu hoạt động -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">02</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Dữ liệu hoạt động' : 'Activity Data'}</div>
            </div>

            <!-- 03 Phương pháp luận -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">03</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Phương pháp luận' : 'Methodology'}</div>
            </div>

            <!-- 04 Hệ số phát thải -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">04</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Hệ số phát thải' : 'Emission Factors'}</div>
            </div>

            <!-- 05 Tính toán -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">05</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><line x1="8" y1="10" x2="16" y2="10"></line></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Tính toán' : 'Calculations'}</div>
            </div>

            <!-- 06 QA/QC -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">06</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'QA/QC' : 'QA / QC'}</div>
            </div>

            <!-- 07 Bằng chứng -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">07</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Bằng chứng' : 'Evidence Trail'}</div>
            </div>

            <!-- 08 Phân tích -->
            <div class="workflow-step-node">
              <span class="workflow-step-badge">08</span>
              <div class="workflow-step-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Phân tích' : 'Analytics'}</div>
            </div>

            <!-- 09 Hành động (Highlighted Emerald Green) -->
            <div class="workflow-step-node" style="background:#ECFDF5; border:1px solid #10B981; box-shadow:0 4px 12px rgba(16, 185, 129, 0.12);">
              <span class="workflow-step-badge" style="background:#10B981; color:#ffffff;">09</span>
              <div class="workflow-step-icon" style="background:#10B981; color:#ffffff;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <div class="workflow-step-title" style="color:#065F46; font-weight:800;">${isVi ? 'Hành động' : 'Action'}</div>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 6. FINAL CINEMATIC CTA SECTION -->
      <!-- ============================================================ -->
      <section style="padding:80px 0; background-color:#081426; background-image:linear-gradient(90deg, rgba(8,20,38,0.96) 0%, rgba(8,20,38,0.85) 45%, rgba(8,20,38,0.38) 100%), url('${earthBgUrl}'); background-size:cover; background-position:right center; color:#ffffff; position:relative; overflow:hidden;" id="final-cta">
        <div class="solutions-container" style="position:relative; z-index:2;">
          <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:40px; align-items:center;">
            
            <!-- Left CTA content -->
            <div>
              <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:700; color:#38BDF8; letter-spacing:0.15em; text-transform:uppercase; display:inline-block; margin-bottom:12px;">
                ${isVi ? 'HÀNH ĐỘNG NGAY' : 'ACT NOW'}
              </span>
              <h2 style="font-size:clamp(26px, 3.4vw, 40px); font-weight:800; line-height:1.2; letter-spacing:-0.03em; color:#ffffff; margin:0 0 14px 0;">
                ${isVi ? 'Sẵn sàng biến dữ liệu carbon thành hành động?' : 'Ready to turn carbon data into action?'}
              </h2>
              <p style="font-size:15px; color:#CBD5E1; line-height:1.65; margin:0 0 28px 0; max-width:620px;">
                ${isVi 
                  ? 'Bắt đầu từ nền tảng. Hiểu rõ dữ liệu. Xây dựng kiểm kê. Xác định ưu tiên.'
                  : 'Start from the platform. Understand data. Build inventories. Identify priorities.'}
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:14px; align-items:center;">
                <button class="solutions-btn-primary btn-book-demo-cta" id="solutions-book-demo-btn" style="font-size:14px; padding:12px 26px; border:none; cursor:pointer;">
                  ${isVi ? 'Đặt lịch Demo' : 'Book a Demo'} →
                </button>
                <a href="${PUBLIC_ROUTES.platform}" class="solutions-btn-secondary btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="font-size:14px; padding:12px 24px; text-decoration:none;">
                  ${isVi ? 'Khám phá Nền tảng' : 'Explore Platform'} →
                </a>
              </div>
            </div>

            <!-- Right Typography -->
            <div style="text-align:right;">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:12px; font-weight:800; color:#38BDF8; letter-spacing:0.16em; line-height:1.6;">
                LOWER EMISSIONS<br>
                STRONGER BUSINESSES<br>
                BRIGHTER TOMORROW
              </div>
            </div>

          </div>

          <!-- Bottom Outcome Row -->
          <div style="margin-top:40px; padding-top:20px; border-top:1px solid rgba(255, 255, 255, 0.12); display:flex; flex-wrap:wrap; gap:28px; font-size:13px; color:#E2E8F0; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
              <span>${isVi ? 'Giảm phát thải' : 'Lower Emissions'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
              <span>${isVi ? 'Tăng khả năng chống chịu' : 'Enhance Resilience'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
              <span>${isVi ? 'Tạo giá trị dài hạn' : 'Create Long-term Value'}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 7. GLOBAL FOOTER (Canonical Enterprise Footer) -->
      <!-- ============================================================ -->
      ${renderEnterpriseFooter()}
    </div>
  `;
}

export function attachSolutionsEvents(container) {
  if (!container) return;

  container.querySelectorAll('.btn-drilldown').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const route = btn.getAttribute('data-nav');
      if (route && stateStore) {
        e.preventDefault();
        stateStore.setRoute(route);
      }
    });
  });

  container.querySelectorAll('.btn-book-demo-cta, #solutions-book-demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isVi = I18nManager.currentLocale === 'vi';
      const existingModal = document.getElementById('demo-modal-dialog');
      if (existingModal) existingModal.remove();

      const modal = document.createElement('div');
      modal.id = 'demo-modal-dialog';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,25,45,0.75);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;';
      modal.innerHTML = `
        <div style="background:#ffffff;border-radius:12px;max-width:480px;width:100%;padding:32px;box-shadow:0 20px 40px rgba(0,0,0,0.25);font-family:'Be Vietnam Pro',sans-serif;color:#0B1727;">
          <div style="width:48px;height:48px;border-radius:10px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h3 style="font-size:20px;font-weight:800;margin:0 0 12px 0;">${isVi ? 'Yêu cầu Trình diễn Nền tảng' : 'Platform Demo Request'}</h3>
          <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 24px 0;">
            ${isVi 
              ? 'Cảm ơn quý khách đã quan tâm đến ENERIXON Carbon! Đội ngũ chuyên gia doanh nghiệp của chúng tôi sẽ liên hệ với cán bộ phụ trách của quý khách để sắp xếp buổi trình diễn nền tảng.'
              : 'Thank you for your interest in ENERIXON Carbon! Our enterprise team will connect with your designated team to schedule a technical walkthrough.'}
          </p>
          <div style="display:flex;justify-content:flex-end;">
            <button id="close-demo-modal" style="background:#0066FF;color:#ffffff;border:none;padding:10px 24px;border-radius:6px;font-weight:700;font-size:14px;cursor:pointer;">
              ${isVi ? 'Đóng' : 'Close'}
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('#close-demo-modal').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (ev) => { if (ev.target === modal) modal.remove(); });
    });
  });
}

renderSolutionsProductPage.attachEvents = attachSolutionsEvents;
