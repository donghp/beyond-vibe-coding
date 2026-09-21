/**
 * ENERIX Carbon - Public Solutions Product Page
 * Master-Aligned Compact Editorial Landing Page (#ENERIXON_Carbon_00083)
 * Primary Visual Authority: 02.page_solotion_vn.png & 02_page_solutions_layout_master_8K.png
 * 
 * CORE DESIGN PRINCIPLE:
 * CONTENT-RICH + VERTICALLY COMPACT + IMAGE-LED + HIGH INFORMATION DENSITY
 * Target: ~2-3 Desktop Viewports (~2200-2800px)
 * Desktop Width: 1180-1240px Centered
 * 
 * SEQUENCE OF TIGHTLY PACKED VISUAL MODULES:
 * 1. Shared Public Header (provided by shell/router)
 * 2. Compact Breadcrumb (Trang chủ → Giải pháp)
 * 3. Hero (Wide cinematic banner + 3 integrated trust statements)
 * 4. Problem + Fragmentation Diagram + Integrated Risk Strip
 * 5. Four Solutions (4 compact equal cards in ONE horizontal row)
 * 6. Common Workflow (9-node horizontal flow diagram in ONE row)
 * 7. Enterprise Journey (5 compact stages in ONE row)
 * 8. Outputs (Left dashboard preview image + Right 5 compact rows)
 * 9. Team Collaboration (5 compact role cards in ONE row)
 * 10. Assurance Backbone (8-step node chain + 3 semantic boxes + footnote)
 * 11. Reporting + Reduction (Compact 2-column side-by-side band)
 * 12. Industry Context (4 image tiles in ONE row) + Integrated Illustrative Example strip
 * 13. Final Cinematic CTA (Wide cinematic earth/landscape + motto + 3 outcomes)
 * 14. Shared Global Footer
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
  const dashboardPreviewUrl = CarbonPath.resolve('assets/01_platform_dashboard_preview.png');
  
  const industryPowerUrl = CarbonPath.resolve('assets/solutions/02_industry_power_utilities.png');
  const industryManufUrl = CarbonPath.resolve('assets/solutions/02_industry_manufacturing.png');
  const industryInfraUrl = CarbonPath.resolve('assets/solutions/02_industry_infrastructure.png');
  const industryTransUrl = CarbonPath.resolve('assets/solutions/02_industry_transport_logistics.png');

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
          padding: 0 28px;
          box-sizing: border-box;
        }
        
        /* HERO */
        .solutions-hero {
          background-color: #08192D;
          background-image: linear-gradient(90deg, rgba(8, 25, 45, 0.94) 0%, rgba(8, 25, 45, 0.82) 48%, rgba(8, 25, 45, 0.40) 100%), url('${heroBgUrl}');
          background-size: cover;
          background-position: center right;
          color: #ffffff;
          padding: 44px 0 28px 0;
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
          margin-bottom: 10px;
        }
        .solutions-h1 {
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 12px 0;
          max-width: 760px;
        }
        .solutions-hero-sub {
          font-size: clamp(13.5px, 1.35vw, 15.5px);
          line-height: 1.6;
          color: #CBD5E1;
          max-width: 720px;
          margin: 0 0 22px 0;
        }
        .solutions-btn-primary {
          background: #0066FF;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13.5px;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .solutions-btn-primary:hover {
          background: #0052cc;
        }
        .solutions-btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 10px 18px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .solutions-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* COMPACT SECTION COMMON HEADINGS */
        .section-tag {
          font-family: var(--carbon-font-mono, monospace);
          font-size: 10.5px;
          font-weight: 700;
          color: #0066FF;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 6px;
          display: inline-block;
        }
        .section-title {
          font-size: clamp(20px, 2.3vw, 28px);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0B1727;
          line-height: 1.25;
          margin: 0 0 6px 0;
        }
        .section-desc {
          font-size: 14px;
          line-height: 1.5;
          color: #475569;
          max-width: 780px;
          margin: 0;
        }
        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 22px;
        }
        .section-top-link {
          font-size: 12.5px;
          font-weight: 700;
          color: #0066FF;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.15s ease;
          white-space: nowrap;
        }
        .section-top-link:hover {
          gap: 8px;
          text-decoration: underline;
        }

        /* FOUR SOLUTIONS 4-COLUMN CARDS */
        .solutions-grid-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .solution-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 290px;
          box-sizing: border-box;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .solution-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.07);
        }
        .solution-flow-step {
          font-family: var(--carbon-font-mono, monospace);
          font-size: 10px;
          color: #64748B;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 3px 6px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 4px;
        }

        /* 9-STEP WORKFLOW */
        .workflow-row-container {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 8px;
          align-items: stretch;
          position: relative;
        }
        .workflow-step-node {
          background: #ffffff;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 12px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: all 0.15s ease;
        }
        .workflow-step-node:hover {
          border-color: #0066FF;
          box-shadow: 0 4px 10px rgba(0, 102, 255, 0.08);
        }
        .workflow-step-badge {
          font-family: var(--carbon-font-mono, monospace);
          font-size: 9.5px;
          font-weight: 800;
          color: #64748B;
          background: #F1F5F9;
          padding: 1px 5px;
          border-radius: 3px;
          margin-bottom: 6px;
        }
        .workflow-step-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          color: #0066FF;
        }
        .workflow-step-title {
          font-size: 11px;
          font-weight: 700;
          color: #0B1727;
          line-height: 1.25;
        }

        /* 5-STAGE JOURNEY */
        .journey-grid-5col {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .journey-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 14px 12px;
          position: relative;
          border-top: 3px solid #0066FF;
        }

        /* 5-ROLE COLLABORATION */
        .collab-grid-5col {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .collab-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ASSURANCE 8-STEP NODE CHAIN */
        .assurance-grid-8col {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 6px;
        }
        .assurance-node {
          background: #ffffff;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 8px 4px;
          text-align: center;
          font-size: 10.5px;
          font-weight: 700;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 4 INDUSTRY TILES */
        .industry-grid-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .industry-tile {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .industry-tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }

        @media (max-width: 1080px) {
          .solutions-grid-4col, .industry-grid-4col {
            grid-template-columns: repeat(2, 1fr);
          }
          .workflow-row-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .journey-grid-5col, .collab-grid-5col {
            grid-template-columns: repeat(3, 1fr);
          }
          .assurance-grid-8col {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 640px) {
          .solutions-grid-4col, .industry-grid-4col, .journey-grid-5col, .collab-grid-5col {
            grid-template-columns: 1fr;
          }
          .workflow-row-container {
            grid-template-columns: 1fr;
          }
          .assurance-grid-8col {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>

      <!-- ============================================================ -->
      <!-- 2. HERO SECTION (Wide industrial/environmental scene + Trust) -->
      <!-- ============================================================ -->
      <section class="solutions-hero" id="solutions-hero">
        <div class="solutions-container">
          <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:36px; align-items:center;">
            <div>
              <span class="solutions-eyebrow">${isVi ? 'GIẢI PHÁP DOANH NGHIỆP' : 'ENTERPRISE SOLUTIONS'}</span>
              <h1 class="solutions-h1">${isVi ? 'Biến dữ liệu phát thải thành quyết định có cơ sở.' : 'Turn emission data into grounded decisions.'}</h1>
              <p class="solutions-hero-sub">
                ${isVi 
                  ? 'ENERIXON Carbon giúp doanh nghiệp thu thập, chuẩn hóa và quản lý dữ liệu phát thải — từ dữ liệu ban đầu đến kiểm kê, báo cáo và cơ hội giảm phát thải.'
                  : 'ENERIXON Carbon helps enterprises collect, standardize, and govern emission data — from raw inputs to inventories, compliance reports, and decarbonization pathways.'}
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
                <a href="${PUBLIC_ROUTES.platform}" class="solutions-btn-primary btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
                  ${isVi ? 'Khám phá Nền tảng' : 'Explore Platform'} →
                </a>
                <a href="#workflow" class="solutions-btn-secondary">
                  ${isVi ? 'Xem cách hoạt động' : 'See How It Works'} ○
                </a>
              </div>
            </div>

            <!-- Hero Right Editorial Statement -->
            <div style="text-align:right;">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:12px; font-weight:800; color:#38BDF8; letter-spacing:0.16em; line-height:1.6; text-transform:uppercase;">
                ${isVi ? 'DOANH NGHIỆP BỀN VỮNG<br><span style="color:#ffffff;">TƯƠNG LAI THỊNH VƯỢNG</span>' : 'SUSTAINABLE ENTERPRISES<br><span style="color:#ffffff;">PROSPEROUS FUTURE</span>'}
              </div>
            </div>
          </div>

          <!-- Integrated Trust Statements in Lower Hero -->
          <div style="margin-top:28px; padding-top:16px; border-top:1px solid rgba(255, 255, 255, 0.12); display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:18px;">
            <div style="display:flex; align-items:flex-start; gap:10px;">
              <div style="width:20px; height:20px; border-radius:4px; background:rgba(56,189,248,0.15); display:flex; align-items:center; justify-content:center; color:#38BDF8; flex-shrink:0; margin-top:2px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#38BDF8; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:2px;">
                  ${isVi ? 'DỮ LIỆU CÓ NGUỒN GỐC' : 'AUDITABLE DATA SOURCES'}
                </div>
                <div style="font-size:11.5px; color:#94A3B8; line-height:1.4;">
                  ${isVi ? 'Theo dõi từ dữ liệu đầu vào đến kết quả' : 'Traceable from raw operational inputs to final results'}
                </div>
              </div>
            </div>

            <div style="display:flex; align-items:flex-start; gap:10px;">
              <div style="width:20px; height:20px; border-radius:4px; background:rgba(56,189,248,0.15); display:flex; align-items:center; justify-content:center; color:#38BDF8; flex-shrink:0; margin-top:2px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#38BDF8; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:2px;">
                  ${isVi ? 'PHƯƠNG PHÁP CÓ CĂN CỨ' : 'GROUNDED METHODOLOGIES'}
                </div>
                <div style="font-size:11.5px; color:#94A3B8; line-height:1.4;">
                  ${isVi ? 'Methodology và Emission Factor có nguồn và phiên bản' : 'Explicit methodology & emission factors with versioning'}
                </div>
              </div>
            </div>

            <div style="display:flex; align-items:flex-start; gap:10px;">
              <div style="width:20px; height:20px; border-radius:4px; background:rgba(56,189,248,0.15); display:flex; align-items:center; justify-content:center; color:#38BDF8; flex-shrink:0; margin-top:2px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#38BDF8; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:2px;">
                  ${isVi ? 'BÁO CÁO CÓ CẤU TRÚC' : 'STRUCTURED REPORTING'}
                </div>
                <div style="font-size:11.5px; color:#94A3B8; line-height:1.4;">
                  ${isVi ? 'Dữ liệu và bằng chứng phục vụ quy trình báo cáo' : 'Structured dossiers and evidence ready for disclosure'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 3. PROBLEM + FRAGMENTATION & INTEGRATED RISK STRIP -->
      <!-- ============================================================ -->
      <section style="padding:40px 0 32px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="problem">
        <div class="solutions-container">
          <div style="display:grid; grid-template-columns:1.05fr 1fr; gap:36px; align-items:center;">
            
            <!-- Left Problem Copy -->
            <div>
              <span class="section-tag">${isVi ? 'VẤN ĐỀ DOANH NGHIỆP ĐANG GẶP PHẢI' : 'ENTERPRISE CHALLENGE'}</span>
              <h2 class="section-title">${isVi ? 'Dữ liệu không thiếu. Vấn đề là dữ liệu nằm rải rác.' : 'Data is abundant. The problem is fragmentation.'}</h2>
              <p class="section-desc" style="margin-bottom:16px;">
                ${isVi 
                  ? 'Điện, nhiên liệu, sản xuất, vận chuyển, nhà cung cấp và chất thải thường nằm ở nhiều nguồn khác nhau — khiến tổng hợp, đối soát và truy xuất trở nên khó khăn.'
                  : 'Electricity, fuels, manufacturing, logistics, suppliers, and waste are scattered across disparate sources — making consolidation, reconciliation, and audit trail retrieval exceedingly difficult.'}
              </p>
              <a href="#solutions" class="section-top-link">
                ${isVi ? 'Hiểu rõ hơn về thách thức' : 'Learn more about the challenge'} →
              </a>
            </div>

            <!-- Right Problem Visual: Raw Inputs -> Tangled Fragmentation -> Structured Flow -->
            <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:8px; padding:16px;">
              <div style="display:grid; grid-template-columns:1fr 0.8fr 1fr; gap:10px; align-items:center;">
                
                <!-- Left: Raw Inputs Column -->
                <div style="display:flex; flex-direction:column; gap:5px;">
                  <div style="font-family:var(--carbon-font-mono, monospace); font-size:9.5px; font-weight:700; color:#64748B; text-transform:uppercase;">
                    ${isVi ? 'NGUỒN ĐẦU VÀO' : 'RAW INPUTS'}
                  </div>
                  ${[
                    isVi ? 'Hóa đơn điện' : 'Electricity bills',
                    isVi ? 'Nhiên liệu' : 'Fuel logs',
                    isVi ? 'Sản xuất' : 'Production output',
                    isVi ? 'Bảng tính' : 'Spreadsheets',
                    isVi ? 'Vận chuyển' : 'Logistics invoices',
                    isVi ? 'Chất thải' : 'Waste manifests'
                  ].map(item => `
                    <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:4px; padding:4px 8px; font-size:11px; font-weight:600; color:#334155; display:flex; align-items:center; gap:6px;">
                      <span style="width:4px; height:4px; border-radius:50%; background:#0066FF;"></span>
                      ${item}
                    </div>
                  `).join('')}
                </div>

                <!-- Center: Fragmentation Tangled Hub -->
                <div style="background:#EFF6FF; border:1.5px dashed #3B82F6; border-radius:6px; padding:12px 6px; text-align:center;">
                  <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#1E40AF; text-transform:uppercase; line-height:1.2; margin-bottom:4px;">
                    ${isVi ? 'DỮ LIỆU PHÂN TÁN' : 'FRAGMENTED DATA'}
                  </div>
                  <div style="font-size:9.5px; color:#3B82F6; line-height:1.3;">
                    ${isVi ? 'Thiếu chuẩn hóa<br>Khó kiểm soát' : 'Unstandardized<br>Hard to control'}
                  </div>
                </div>

                <!-- Right: Structured Result Sequence -->
                <div style="display:flex; flex-direction:column; gap:5px;">
                  <div style="font-family:var(--carbon-font-mono, monospace); font-size:9.5px; font-weight:700; color:#059669; text-transform:uppercase;">
                    ${isVi ? 'QUY TRÌNH CHUẨN' : 'STRUCTURED FLOW'}
                  </div>
                  ${[
                    isVi ? 'Nguồn dữ liệu' : 'Data Sources',
                    isVi ? 'Dữ liệu hoạt động' : 'Activity Data',
                    isVi ? 'Phương pháp' : 'Methodology',
                    isVi ? 'Hệ số phát thải' : 'Emission Factors',
                    isVi ? 'Tính toán' : 'Calculations',
                    isVi ? 'Kết quả & báo cáo' : 'Reports & Insights'
                  ].map(res => `
                    <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:4px; padding:4px 8px; font-size:11px; font-weight:600; color:#065F46; display:flex; align-items:center; gap:6px;">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ${res}
                    </div>
                  `).join('')}
                </div>

              </div>
            </div>
          </div>

          <!-- Integrated Compact Risk Strip -->
          <div style="background:#FEF2F2; border:1px solid #FECACA; border-radius:6px; padding:10px 16px; margin-top:20px;">
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px;">
              <span style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#991B1B; text-transform:uppercase; letter-spacing:0.06em;">
                ${isVi ? 'KHI DỮ LIỆU KHÔNG ĐƯỢC KIỂM SOÁT:' : 'UNGOVERNED RISK SEQUENCE:'}
              </span>
              <div style="display:flex; flex-wrap:wrap; align-items:center; gap:5px; font-size:11px; font-weight:600; color:#991B1B;">
                <span style="background:#ffffff; padding:3px 8px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Thu thập phân tán' : 'Scattered Ingestion'}</span>
                <span>→</span>
                <span style="background:#ffffff; padding:3px 8px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Tổng hợp thủ công' : 'Manual Consolidation'}</span>
                <span>→</span>
                <span style="background:#ffffff; padding:3px 8px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Khó đối soát' : 'Hard to Reconcile'}</span>
                <span>→</span>
                <span style="background:#ffffff; padding:3px 8px; border-radius:4px; border:1px solid #FCA5A5;">${isVi ? 'Khó truy xuất nguồn' : 'Untraceable Sources'}</span>
                <span>→</span>
                <span style="background:#B91C1C; color:#ffffff; padding:3px 10px; border-radius:4px;">${isVi ? 'Chậm ra quyết định' : 'Delayed Decisions'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 4. FOUR SOLUTIONS SECTION (1 HORIZONTAL ROW ON DESKTOP) -->
      <!-- ============================================================ -->
      <section style="padding:40px 0; background:#F8FAFC; border-bottom:1px solid #E2E8F0;" id="solutions">
        <div class="solutions-container">
          <div class="section-header-flex">
            <div>
              <span class="section-tag">${isVi ? 'BỐN NHU CẦU DOANH NGHIỆP' : 'FOUR ENTERPRISE NEEDS'}</span>
              <h2 class="section-title">${isVi ? 'Một hệ thống. Bốn nhu cầu thực tế.' : 'One system. Four real-world needs.'}</h2>
              <p class="section-desc">
                ${isVi 
                  ? 'Từ quản lý doanh nghiệp đến sản phẩm và giảm phát thải, cùng một nền tảng phục vụ từng cấp độ nhu cầu.'
                  : 'From enterprise-level accounting to products and decarbonization pathways, one platform serves every level of need.'}
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
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#0066FF;">01</span>
                  <div style="width:30px; height:30px; border-radius:6px; background:#EFF6FF; display:flex; align-items:center; justify-content:center; color:#0066FF;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line></svg>
                  </div>
                </div>
                <h3 style="font-size:15px; font-weight:800; color:#0B1727; margin:0 0 6px 0; line-height:1.3;">
                  ${isVi ? 'Quản lý Carbon Cấp Doanh nghiệp' : 'Corporate Carbon Management'}
                </h3>
                <p style="font-size:12px; color:#64748B; line-height:1.5; margin:0 0 12px 0;">
                  ${isVi 
                    ? 'Quản lý phát thải trên nhiều công ty, cơ sở và nhà máy trong một cấu trúc thống nhất.'
                    : 'Manage emissions across multiple entities, facilities, and production sites in a unified structure.'}
                </p>
                <div style="margin-bottom:10px;">
                  <div class="solution-flow-step" style="color:#0066FF; border-color:#BFDBFE; background:#EFF6FF;">
                    ${isVi ? 'Tổ chức → Cơ sở → Nguồn → Báo cáo' : 'Entity → Facility → Source → Report'}
                  </div>
                </div>
              </div>
              <div style="padding-top:10px; border-top:1px solid #F1F5F9; font-size:11.5px; font-weight:700; color:#0066FF;">
                ${isVi ? 'Một bức tranh phát thải nhất quán.' : 'One consistent emission baseline.'}
              </div>
            </div>

            <!-- CARD 02: GREEN - Supply Chain Intelligence -->
            <div class="solution-card" style="border-top:3px solid #10B981;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#10B981;">02</span>
                  <div style="width:30px; height:30px; border-radius:6px; background:#ECFDF5; display:flex; align-items:center; justify-content:center; color:#10B981;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  </div>
                </div>
                <h3 style="font-size:15px; font-weight:800; color:#0B1727; margin:0 0 6px 0; line-height:1.3;">
                  ${isVi ? 'Trí tuệ Carbon Chuỗi Cung ứng' : 'Supply Chain Carbon Intelligence'}
                </h3>
                <p style="font-size:12px; color:#64748B; line-height:1.5; margin:0 0 12px 0;">
                  ${isVi 
                    ? 'Tổ chức dữ liệu Scope 3 và phân biệt mức độ đầy đủ, tin cậy của dữ liệu.'
                    : 'Structure Scope 3 data and evaluate supplier completeness and data confidence.'}
                </p>
                <div style="margin-bottom:10px;">
                  <div class="solution-flow-step" style="color:#059669; border-color:#A7F3D0; background:#ECFDF5;">
                    ${isVi ? 'Nhà cung cấp → Dữ liệu → Chất lượng → Phân tích' : 'Supplier → Data → Quality → Insights'}
                  </div>
                </div>
              </div>
              <div style="padding-top:10px; border-top:1px solid #F1F5F9; font-size:11.5px; font-weight:700; color:#059669;">
                ${isVi ? 'Hiểu rõ hơn dữ liệu Scope 3.' : 'Actionable clarity on Scope 3.'}
              </div>
            </div>

            <!-- CARD 03: PURPLE - Product Carbon Footprint (PCF) -->
            <div class="solution-card" style="border-top:3px solid #8B5CF6;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#8B5CF6;">03</span>
                  <div style="width:30px; height:30px; border-radius:6px; background:#F5F3FF; display:flex; align-items:center; justify-content:center; color:#8B5CF6;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                </div>
                <h3 style="font-size:15px; font-weight:800; color:#0B1727; margin:0 0 6px 0; line-height:1.3;">
                  ${isVi ? 'Dấu chân Carbon của Sản phẩm' : 'Product Carbon Footprint (PCF)'}
                </h3>
                <p style="font-size:12px; color:#64748B; line-height:1.5; margin:0 0 12px 0;">
                  ${isVi 
                    ? 'Theo dõi phát thải của sản phẩm theo phạm vi và phương pháp xác định.'
                    : 'Track product-level footprint with defined system boundaries and LCA support.'}
                </p>
                <div style="margin-bottom:10px;">
                  <div class="solution-flow-step" style="color:#7C3AED; border-color:#DDD6FE; background:#F5F3FF;">
                    ${isVi ? 'Sản phẩm → Hoạt động → Hệ số → PCF' : 'Product → Activity → Factor → PCF'}
                  </div>
                </div>
              </div>
              <div style="padding-top:10px; border-top:1px solid #F1F5F9; font-size:11.5px; font-weight:700; color:#7C3AED;">
                ${isVi ? 'Cơ sở dữ liệu có cấu trúc cho PCF.' : 'Structured database for PCF.'}
              </div>
            </div>

            <!-- CARD 04: ORANGE - Decarbonization Strategy -->
            <div class="solution-card" style="border-top:3px solid #F97316;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:800; color:#F97316;">04</span>
                  <div style="width:30px; height:30px; border-radius:6px; background:#FFF7ED; display:flex; align-items:center; justify-content:center; color:#F97316;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                  </div>
                </div>
                <h3 style="font-size:15px; font-weight:800; color:#0B1727; margin:0 0 6px 0; line-height:1.3;">
                  ${isVi ? 'Chiến lược Giảm Phát thải' : 'Decarbonization Strategy'}
                </h3>
                <p style="font-size:12px; color:#64748B; line-height:1.5; margin:0 0 12px 0;">
                  ${isVi 
                    ? 'Chuyển kết quả kiểm kê thành điểm ưu tiên và phương án hành động.'
                    : 'Transform inventory results into prioritized mitigation initiatives and scenarios.'}
                </p>
                <div style="margin-bottom:10px;">
                  <div class="solution-flow-step" style="color:#C2410C; border-color:#FED7AA; background:#FFF7ED;">
                    ${isVi ? 'Phát thải → Điểm nóng → Kịch bản → Hành động' : 'Emissions → Hotspot → Scenario → Action'}
                  </div>
                </div>
              </div>
              <div style="padding-top:10px; border-top:1px solid #F1F5F9; font-size:11.5px; font-weight:700; color:#EA580C;">
                ${isVi ? 'Ưu tiên các sáng kiến giảm phát thải.' : 'Prioritize decarbonization roadmaps.'}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 5. COMMON WORKFLOW SECTION (1 HORIZONTAL ROW OF 9 NODES) -->
      <!-- ============================================================ -->
      <section style="padding:36px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="workflow">
        <div class="solutions-container">
          <div class="section-header-flex">
            <div>
              <span class="section-tag">${isVi ? 'QUY TRÌNH CHUNG' : 'COMMON WORKFLOW'}</span>
              <h2 class="section-title">${isVi ? 'Từ dữ liệu đến hành động, mọi bước đều có cấu trúc.' : 'From data to action, every step is structured.'}</h2>
              <p class="section-desc">
                ${isVi ? 'Một quy trình thống nhất, minh bạch và có thể truy xuất.' : 'A unified, transparent, and fully auditable process.'}
              </p>
            </div>
            <a href="${PUBLIC_ROUTES.platform}" class="section-top-link btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }">
              ${isVi ? 'Xem chi tiết quy trình' : 'Explore workflow details'} →
            </a>
          </div>

          <!-- 9-Node Horizontal Visual Chain -->
          <div class="workflow-row-container">
            
            <div class="workflow-step-node">
              <span class="workflow-step-badge">01</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Nguồn dữ liệu' : 'Data Sources'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">02</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Dữ liệu hoạt động' : 'Activity Data'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">03</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Phương pháp' : 'Methodology'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">04</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Hệ số' : 'Emission Factors'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">05</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Tính toán' : 'Calculations'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">06</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'QA/QC' : 'QA / QC'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">07</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Bằng chứng' : 'Evidence'}</div>
            </div>

            <div class="workflow-step-node">
              <span class="workflow-step-badge">08</span>
              <div class="workflow-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </div>
              <div class="workflow-step-title">${isVi ? 'Phân tích' : 'Analytics'}</div>
            </div>

            <div class="workflow-step-node" style="border-color:#10B981; background:#F0FDF4;">
              <span class="workflow-step-badge" style="background:#DCFCE7; color:#166534;">09</span>
              <div class="workflow-step-icon" style="background:#DCFCE7; color:#10B981;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <div class="workflow-step-title" style="color:#065F46; font-weight:800;">${isVi ? 'Hành động' : 'Action'}</div>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 6. ENTERPRISE JOURNEY (5 COMPACT HORIZONTAL STAGES) -->
      <!-- ============================================================ -->
      <section style="padding:34px 0; background:#F8FAFC; border-bottom:1px solid #E2E8F0;" id="journey">
        <div class="solutions-container">
          <div class="section-header-flex" style="margin-bottom:16px;">
            <div>
              <span class="section-tag">${isVi ? 'HÀNH TRÌNH THỰC TẾ' : 'ENTERPRISE JOURNEY'}</span>
              <h2 class="section-title">${isVi ? 'Từ dữ liệu đến báo cáo, từng giai đoạn đều có kiểm soát.' : 'From data to disclosure, every stage is governed.'}</h2>
              <p class="section-desc">
                ${isVi ? 'Một doanh nghiệp đi từ thiết lập phạm vi đến kiểm kê, rà soát và hành động.' : 'A structured enterprise roadmap from boundary definition to inventory, review, and mitigation.'}
              </p>
            </div>
          </div>

          <div class="journey-grid-5col">
            <div class="journey-card">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#0066FF; margin-bottom:4px;">STAGE 01</div>
              <div style="font-size:13.5px; font-weight:800; color:#0B1727; margin-bottom:4px;">${isVi ? 'Xác định' : 'Define'}</div>
              <div style="font-size:11.5px; color:#64748B; line-height:1.4;">${isVi ? 'Doanh nghiệp, cơ sở, ranh giới' : 'Entities, facilities & boundaries'}</div>
            </div>

            <div class="journey-card">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#0066FF; margin-bottom:4px;">STAGE 02</div>
              <div style="font-size:13.5px; font-weight:800; color:#0B1727; margin-bottom:4px;">${isVi ? 'Thu thập' : 'Collect'}</div>
              <div style="font-size:11.5px; color:#64748B; line-height:1.4;">${isVi ? 'Activity Data và tài liệu' : 'Activity data & source evidence'}</div>
            </div>

            <div class="journey-card">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#0066FF; margin-bottom:4px;">STAGE 03</div>
              <div style="font-size:13.5px; font-weight:800; color:#0B1727; margin-bottom:4px;">${isVi ? 'Tính toán' : 'Calculate'}</div>
              <div style="font-size:11.5px; color:#64748B; line-height:1.4;">${isVi ? 'Methodology, EF, Calculation' : 'Methodology, EF & calculation'}</div>
            </div>

            <div class="journey-card">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#0066FF; margin-bottom:4px;">STAGE 04</div>
              <div style="font-size:13.5px; font-weight:800; color:#0B1727; margin-bottom:4px;">${isVi ? 'Kiểm tra & Báo cáo' : 'Verify & Report'}</div>
              <div style="font-size:11.5px; color:#64748B; line-height:1.4;">${isVi ? 'QA/QC, Evidence, báo cáo' : 'QA/QC, evidence & disclosure'}</div>
            </div>

            <div class="journey-card" style="border-top-color:#10B981;">
              <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#10B981; margin-bottom:4px;">STAGE 05</div>
              <div style="font-size:13.5px; font-weight:800; color:#065F46; margin-bottom:4px;">${isVi ? 'Phân tích & Hành động' : 'Act & Reduce'}</div>
              <div style="font-size:11.5px; color:#047857; line-height:1.4;">${isVi ? 'Hotspot, cơ hội, kế hoạch' : 'Hotspots, drivers & roadmaps'}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 7. OUTPUTS SECTION (Left visual image + Right 5 compact rows) -->
      <!-- ============================================================ -->
      <section style="padding:36px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="outputs">
        <div class="solutions-container">
          <div class="section-header-flex" style="margin-bottom:18px;">
            <div>
              <span class="section-tag">${isVi ? 'GIÁ TRỊ ĐẦU RA' : 'ACTIONABLE DELIVERABLES'}</span>
              <h2 class="section-title">${isVi ? 'Không chỉ là một con số phát thải.' : 'Not just an emission figure.'}</h2>
              <p class="section-desc">
                ${isVi ? 'Doanh nghiệp cần kết quả rõ ràng, có nguồn gốc và có thể dùng cho quản trị.' : 'Enterprises require unambiguous, traceable results directly usable for executive decision-making.'}
              </p>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1.05fr 1fr; gap:28px; align-items:center;">
            <!-- Left: High quality Dashboard Preview Visual -->
            <div style="background:#081426; border-radius:8px; overflow:hidden; border:1px solid #CBD5E1; box-shadow:0 8px 24px rgba(0,0,0,0.06);">
              <img src="${dashboardPreviewUrl}" alt="ENERIX Carbon Dashboard Overview" style="width:100%; height:auto; display:block;" onerror="this.style.display='none'" />
            </div>

            <!-- Right: 5 Compact Output Rows -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${[
                { label: isVi ? 'KIỂM KÊ' : 'INVENTORY', desc: isVi ? 'Bức tranh phát thải theo cơ sở, nguồn và Scope.' : 'Granular baseline across facilities, sources, and Scopes.' },
                { label: isVi ? 'GIẢI TRÌNH' : 'PROVENANCE', desc: isVi ? 'Phương pháp, dữ liệu và bằng chứng có thể truy xuất.' : 'Explicit methodology, data lineage, and audit evidence.' },
                { label: isVi ? 'BÁO CÁO' : 'COMPLIANCE', desc: isVi ? 'Cấu trúc dữ liệu hỗ trợ lập và rà soát báo cáo.' : 'Structured disclosure dossiers for regulatory mandates.' },
                { label: isVi ? 'ĐIỂM NÓNG' : 'HOTSPOTS', desc: isVi ? 'Biết nguồn nào cần được ưu tiên phân tích.' : 'Pinpoint critical emission drivers across facilities.' },
                { label: isVi ? 'HÀNH ĐỘNG' : 'DECISION', desc: isVi ? 'Kết nối thông tin phát thải với cơ hội giảm phát thải.' : 'Bridge emission baselines to prioritized decarbonization.' }
              ].map(row => `
                <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:10px 14px; display:flex; align-items:center; gap:12px;">
                  <span style="font-family:var(--carbon-font-mono, monospace); font-size:10.5px; font-weight:800; color:#0066FF; background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 8px; border-radius:4px; min-width:85px; text-align:center;">
                    ${row.label}
                  </span>
                  <span style="font-size:12.5px; color:#334155; font-weight:600; line-height:1.4;">
                    ${row.desc}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 8. TEAM COLLABORATION SECTION (5 COMPACT ROLE CARDS) -->
      <!-- ============================================================ -->
      <section style="padding:32px 0; background:#F8FAFC; border-bottom:1px solid #E2E8F0;" id="collaboration">
        <div class="solutions-container">
          <div class="section-header-flex" style="margin-bottom:16px;">
            <div>
              <span class="section-tag">${isVi ? 'PHỐI HỢP LIÊN PHÒNG BAN' : 'CROSS-FUNCTIONAL COLLABORATION'}</span>
              <h2 class="section-title">${isVi ? 'Một nguồn dữ liệu thống nhất cho nhiều vai trò.' : 'Unified data backbone for cross-functional teams.'}</h2>
              <p class="section-desc">
                ${isVi ? 'Nhiều bộ phận cùng làm việc trên một cơ sở dữ liệu có kiểm soát.' : 'Different corporate roles collaborate seamlessly on a governed, single source of truth.'}
              </p>
            </div>
          </div>

          <div class="collab-grid-5col">
            <div class="collab-card">
              <div style="width:26px; height:26px; border-radius:5px; background:#EFF6FF; color:#0066FF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#0B1727;">${isVi ? 'Sustainability / ESG' : 'Sustainability / ESG'}</div>
                <div style="font-size:10.5px; color:#64748B;">${isVi ? 'Kiểm kê & Báo cáo' : 'Inventories & Reports'}</div>
              </div>
            </div>

            <div class="collab-card">
              <div style="width:26px; height:26px; border-radius:5px; background:#ECFDF5; color:#10B981; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#0B1727;">${isVi ? 'Môi trường / EHS' : 'Environment / EHS'}</div>
                <div style="font-size:10.5px; color:#64748B;">${isVi ? 'Cơ sở & Bằng chứng' : 'Facilities & Evidence'}</div>
              </div>
            </div>

            <div class="collab-card">
              <div style="width:26px; height:26px; border-radius:5px; background:#FFF7ED; color:#F97316; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#0B1727;">${isVi ? 'Vận hành & Sản xuất' : 'Operations & Plant'}</div>
                <div style="font-size:10.5px; color:#64748B;">${isVi ? 'Tiêu thụ & Drivers' : 'Energy & Drivers'}</div>
              </div>
            </div>

            <div class="collab-card">
              <div style="width:26px; height:26px; border-radius:5px; background:#F5F3FF; color:#8B5CF6; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#0B1727;">${isVi ? 'Ban Lãnh đạo' : 'Executive Board'}</div>
                <div style="font-size:10.5px; color:#64748B;">${isVi ? 'Bức tranh tổng thể' : 'Executive Overview'}</div>
              </div>
            </div>

            <div class="collab-card">
              <div style="width:26px; height:26px; border-radius:5px; background:#EFF6FF; color:#0066FF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div>
                <div style="font-size:12px; font-weight:800; color:#0B1727;">${isVi ? 'Kiểm toán & Thẩm tra' : 'Audit & Assurance'}</div>
                <div style="font-size:10.5px; color:#64748B;">${isVi ? 'Phương pháp & Evidence' : 'Method & Evidence'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 9. ASSURANCE BACKBONE SECTION (8-Node Chain + 3 Semantic Boxes) -->
      <!-- ============================================================ -->
      <section style="padding:34px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="assurance">
        <div class="solutions-container">
          <div class="section-header-flex" style="margin-bottom:16px;">
            <div>
              <span class="section-tag">${isVi ? 'TRỤC XƯƠNG SỐNG CỦA NIỀM TIN' : 'ASSURANCE BACKBONE'}</span>
              <h2 class="section-title">${isVi ? 'Một con số chỉ có giá trị khi biết nó đến từ đâu.' : 'A number only has value when its origin is known.'}</h2>
              <p class="section-desc">
                ${isVi ? 'Kết quả được liên kết với dữ liệu, phương pháp, tính toán và bằng chứng.' : 'Results are directly bound to raw inputs, methodology standards, calculations, and auditable proof.'}
              </p>
            </div>
          </div>

          <!-- 8-Node Horizontal Chain -->
          <div class="assurance-grid-8col" style="margin-bottom:14px;">
            ${[
              isVi ? 'Nguồn dữ liệu' : 'Data Sources',
              isVi ? 'Activity Data' : 'Activity Data',
              isVi ? 'Methodology' : 'Methodology',
              isVi ? 'Emission Factor' : 'Emission Factor',
              isVi ? 'Calculation' : 'Calculation',
              isVi ? 'QA/QC' : 'QA / QC',
              isVi ? 'Evidence' : 'Evidence',
              isVi ? 'Kết quả' : 'Final Results'
            ].map((node, idx) => `
              <div class="assurance-node" style="${idx === 7 ? 'background:#ECFDF5; border-color:#10B981; color:#065F46;' : ''}">
                ${node}
              </div>
            `).join('')}
          </div>

          <!-- 3 Semantic Boxes & Footnote -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-bottom:10px;">
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:8px 12px; font-size:11.5px;">
              <span style="font-weight:800; color:#0066FF; text-transform:uppercase; margin-right:6px;">${isVi ? 'CÓ NGUỒN:' : 'SOURCED:'}</span>
              <span style="color:#475569;">${isVi ? 'Biết dữ liệu từ đâu.' : 'Know exactly where data originated.'}</span>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:8px 12px; font-size:11.5px;">
              <span style="font-weight:800; color:#0066FF; text-transform:uppercase; margin-right:6px;">${isVi ? 'CÓ PHƯƠNG PHÁP:' : 'METHODOLOGICAL:'}</span>
              <span style="color:#475569;">${isVi ? 'Biết kết quả được tính thế nào.' : 'Know the exact formulas applied.'}</span>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:8px 12px; font-size:11.5px;">
              <span style="font-weight:800; color:#0066FF; text-transform:uppercase; margin-right:6px;">${isVi ? 'CÓ BẰNG CHỨNG:' : 'EVIDENCED:'}</span>
              <span style="color:#475569;">${isVi ? 'Biết tài liệu liên quan.' : 'Full provenance file linkage.'}</span>
            </div>
          </div>

          <div style="font-size:11px; color:#94A3B8; font-style:italic;">
            ${isVi 
              ? '* ENERIXON Carbon không tự xưng là đơn vị chứng nhận độc lập; nền tảng cung cấp dữ liệu phục vụ thẩm định của bên thứ ba.'
              : '* ENERIXON Carbon does not claim to be an independent certifier; the platform provides structured data dossiers for third-party assurance.'}
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 10. REPORTING + REDUCTION (COMPACT 2-COLUMN BAND) -->
      <!-- ============================================================ -->
      <section style="padding:34px 0; background:#F8FAFC; border-bottom:1px solid #E2E8F0;" id="reporting-reduction">
        <div class="solutions-container">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
            
            <!-- Left: Reporting -->
            <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:8px; padding:18px;">
              <span class="section-tag">${isVi ? 'BÁO CÁO' : 'REPORTING'}</span>
              <h3 style="font-size:16px; font-weight:800; color:#0B1727; margin:0 0 8px 0;">
                ${isVi ? 'Báo cáo là kết quả của một quy trình có kiểm soát.' : 'Reporting is the outcome of a governed process.'}
              </h3>
              <div style="display:flex; flex-wrap:wrap; gap:5px; align-items:center; font-size:11px; font-weight:700; color:#0066FF; margin-bottom:10px;">
                <span style="background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 7px; border-radius:4px;">${isVi ? 'DỮ LIỆU' : 'DATA'}</span>
                <span>→</span>
                <span style="background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 7px; border-radius:4px;">${isVi ? 'TÍNH TOÁN' : 'CALC'}</span>
                <span>→</span>
                <span style="background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 7px; border-radius:4px;">${isVi ? 'QA/QC' : 'QA/QC'}</span>
                <span>→</span>
                <span style="background:#EFF6FF; border:1px solid #DBEAFE; padding:3px 7px; border-radius:4px;">${isVi ? 'RÀ SOÁT' : 'REVIEW'}</span>
                <span>→</span>
                <span style="background:#0066FF; color:#ffffff; padding:3px 8px; border-radius:4px;">${isVi ? 'BÁO CÁO' : 'REPORT'}</span>
              </div>
              <div style="font-size:11.5px; color:#64748B;">
                ${isVi ? 'Ranh giới · Method · Activity Data · Emission Factor · GWP · Evidence' : 'Boundary · Method · Activity Data · Emission Factor · GWP · Evidence'}
              </div>
            </div>

            <!-- Right: Reduction -->
            <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:8px; padding:18px;">
              <span class="section-tag" style="color:#10B981;">${isVi ? 'TỪ BÁO CÁO ĐẾN HÀNH ĐỘNG' : 'BEYOND DISCLOSURE'}</span>
              <h3 style="font-size:16px; font-weight:800; color:#0B1727; margin:0 0 8px 0;">
                ${isVi ? 'Kiểm kê không phải là đích đến.' : 'Inventory is not the final destination.'}
              </h3>
              <div style="display:flex; flex-wrap:wrap; gap:5px; align-items:center; font-size:11px; font-weight:700; color:#059669; margin-bottom:10px;">
                <span style="background:#ECFDF5; border:1px solid #A7F3D0; padding:3px 7px; border-radius:4px;">${isVi ? 'Đo lường' : 'Measure'}</span>
                <span>→</span>
                <span style="background:#ECFDF5; border:1px solid #A7F3D0; padding:3px 7px; border-radius:4px;">${isVi ? 'Hiểu' : 'Understand'}</span>
                <span>→</span>
                <span style="background:#ECFDF5; border:1px solid #A7F3D0; padding:3px 7px; border-radius:4px;">${isVi ? 'Phân tích' : 'Analyze'}</span>
                <span>→</span>
                <span style="background:#ECFDF5; border:1px solid #A7F3D0; padding:3px 7px; border-radius:4px;">${isVi ? 'Mô hình' : 'Model'}</span>
                <span>→</span>
                <span style="background:#10B981; color:#ffffff; padding:3px 8px; border-radius:4px;">${isVi ? 'Hành động' : 'Act'}</span>
              </div>
              <div style="font-size:11.5px; color:#64748B;">
                ${isVi ? 'Nhận diện điểm nóng, phân tích nguyên nhân và thiết lập kịch bản giảm phát thải thực tế.' : 'Identify hotspots, diagnose root drivers, and establish actionable reduction scenarios.'}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 11. INDUSTRY CONTEXT + INTEGRATED ILLUSTRATIVE EXAMPLE -->
      <!-- ============================================================ -->
      <section style="padding:36px 0; background:#ffffff; border-bottom:1px solid #E2E8F0;" id="industry">
        <div class="solutions-container">
          <div class="section-header-flex" style="margin-bottom:18px;">
            <div>
              <span class="section-tag">${isVi ? 'BỐI CẢNH NGÀNH' : 'INDUSTRY CONTEXT'}</span>
              <h2 class="section-title">${isVi ? 'Mỗi ngành có một cấu trúc phát thải khác nhau.' : 'Every sector has distinct emission dynamics.'}</h2>
              <p class="section-desc">
                ${isVi ? 'ENERIXON Carbon hỗ trợ cấu hình theo đặc thù vận hành và ranh giới ngành.' : 'Tailored configurations adapted to sector-specific operational boundaries and standards.'}
              </p>
            </div>
            <a href="${PUBLIC_ROUTES.industries}" class="section-top-link btn-drilldown" data-nav="industries" onclick="if (window.stateStore) { window.stateStore.setRoute('industries'); history.pushState(null, '', '${PUBLIC_ROUTES.industries}'); window.scrollTo({top:0, behavior:'smooth'}); }">
              ${isVi ? 'Xem tất cả ngành' : 'View all industries'} →
            </a>
          </div>

          <!-- 4 Equal Industry Visual Tiles in ONE Row -->
          <div class="industry-grid-4col" style="margin-bottom:24px;">
            
            <div class="industry-tile">
              <div style="height:125px; overflow:hidden; background:#0B1E36;">
                <img src="${industryPowerUrl}" alt="Power & Utilities" style="width:100%; height:100%; object-fit:cover;" />
              </div>
              <div style="padding:12px 14px;">
                <h4 style="font-size:14px; font-weight:800; color:#0B1727; margin:0 0 4px 0;">${isVi ? 'Năng lượng & Điện lực' : 'Power & Utilities'}</h4>
                <p style="font-size:11.5px; color:#64748B; line-height:1.45; margin:0;">${isVi ? 'Cấu trúc phát điện Scope 1 & ranh giới lưới truyền tải.' : 'Scope 1 generation & transmission grid accounting.'}</p>
              </div>
            </div>

            <div class="industry-tile">
              <div style="height:125px; overflow:hidden; background:#0B1728;">
                <img src="${industryManufUrl}" alt="Manufacturing & Heavy Industry" style="width:100%; height:100%; object-fit:cover;" />
              </div>
              <div style="padding:12px 14px;">
                <h4 style="font-size:14px; font-weight:800; color:#0B1727; margin:0 0 4px 0;">${isVi ? 'Sản xuất & Công nghiệp nặng' : 'Manufacturing & Industry'}</h4>
                <p style="font-size:11.5px; color:#64748B; line-height:1.45; margin:0;">${isVi ? 'Tiêu thụ năng lượng, nhiên liệu & phát thải quy trình.' : 'Energy consumption, fuels, and process emissions.'}</p>
              </div>
            </div>

            <div class="industry-tile">
              <div style="height:125px; overflow:hidden; background:#08213D;">
                <img src="${industryInfraUrl}" alt="Infrastructure & Construction" style="width:100%; height:100%; object-fit:cover;" />
              </div>
              <div style="padding:12px 14px;">
                <h4 style="font-size:14px; font-weight:800; color:#0B1727; margin:0 0 4px 0;">${isVi ? 'Hạ tầng & Xây dựng' : 'Infrastructure & Build'}</h4>
                <p style="font-size:11.5px; color:#64748B; line-height:1.45; margin:0;">${isVi ? 'Phát thải vật liệu, vận hành công trình & thi công.' : 'Embodied carbon, building operations & construction.'}</p>
              </div>
            </div>

            <div class="industry-tile">
              <div style="height:125px; overflow:hidden; background:#0B132B;">
                <img src="${industryTransUrl}" alt="Transport & Logistics" style="width:100%; height:100%; object-fit:cover;" />
              </div>
              <div style="padding:12px 14px;">
                <h4 style="font-size:14px; font-weight:800; color:#0B1727; margin:0 0 4px 0;">${isVi ? 'Vận tải & Logistics' : 'Logistics & Mobility'}</h4>
                <p style="font-size:11.5px; color:#64748B; line-height:1.45; margin:0;">${isVi ? 'Đội xe vận chuyển, định mức nhiên liệu & chuỗi cung ứng.' : 'Fleet operations, fuel rates & freight supply chains.'}</p>
              </div>
            </div>

          </div>

          <!-- Integrated Illustrative Example Strip -->
          <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:8px; padding:14px 18px;" id="example">
            <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px;">
              <div>
                <div style="font-family:var(--carbon-font-mono, monospace); font-size:10px; font-weight:800; color:#0066FF; text-transform:uppercase;">
                  ${isVi ? 'VÍ DỤ MINH HỌA' : 'ILLUSTRATIVE USE CASE'}
                </div>
                <div style="font-size:13.5px; font-weight:800; color:#0B1727;">
                  ${isVi ? 'Một nhà máy sản xuất có dữ liệu từ nhiều nguồn.' : 'A manufacturing facility consolidating multi-source activity data.'}
                </div>
              </div>

              <!-- 3-Column Flow Strip -->
              <div style="display:flex; flex-wrap:wrap; align-items:center; gap:8px; font-size:11px; font-weight:600;">
                <div style="background:#ffffff; border:1px solid #CBD5E1; padding:4px 8px; border-radius:4px; color:#334155;">
                  ${isVi ? 'ĐẦU VÀO: Điện · Nhiên liệu · Sản xuất · Môi chất' : 'INPUTS: Power · Fuel · Production · Refrigerants'}
                </div>
                <span style="color:#94A3B8;">→</span>
                <div style="background:#EFF6FF; border:1px solid #BFDBFE; padding:4px 8px; border-radius:4px; color:#0066FF;">
                  ${isVi ? 'XỬ LÝ: Thu thập → Chuẩn hóa → Tính toán → QA/QC' : 'PIPELINE: Ingestion → Normalize → Calc → QA/QC'}
                </div>
                <span style="color:#94A3B8;">→</span>
                <div style="background:#ECFDF5; border:1px solid #A7F3D0; padding:4px 8px; border-radius:4px; color:#065F46;">
                  ${isVi ? 'ĐẦU RA: Scope 1 & 2 · Điểm nóng · Có bằng chứng' : 'OUTPUT: Scope 1 & 2 · Hotspots · Verified Dossier'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 12. FINAL CINEMATIC CTA SECTION -->
      <!-- ============================================================ -->
      <section style="padding:54px 0; background-color:#081426; background-image:linear-gradient(90deg, rgba(8,20,38,0.96) 0%, rgba(8,20,38,0.85) 45%, rgba(8,20,38,0.38) 100%), url('${earthBgUrl}'); background-size:cover; background-position:right center; color:#ffffff; position:relative; overflow:hidden;" id="final-cta">
        <div class="solutions-container" style="position:relative; z-index:2;">
          <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:36px; align-items:center;">
            
            <!-- Left CTA content -->
            <div>
              <span style="font-family:var(--carbon-font-mono, monospace); font-size:11px; font-weight:700; color:#38BDF8; letter-spacing:0.15em; text-transform:uppercase; display:inline-block; margin-bottom:10px;">
                ${isVi ? 'BẮT ĐẦU VẬN HÀNH' : 'GET STARTED'}
              </span>
              <h2 style="font-size:clamp(24px, 3.2vw, 38px); font-weight:800; line-height:1.2; letter-spacing:-0.03em; color:#ffffff; margin:0 0 12px 0;">
                ${isVi ? 'Sẵn sàng biến dữ liệu carbon thành hành động?' : 'Ready to turn carbon data into action?'}
              </h2>
              <p style="font-size:14.5px; color:#CBD5E1; line-height:1.6; margin:0 0 24px 0; max-width:620px;">
                ${isVi 
                  ? 'Bắt đầu từ dữ liệu. Hiểu kết quả. Xác định ưu tiên. Hành động có cơ sở.'
                  : 'Start from grounded data. Understand results. Pinpoint priorities. Act with confidence.'}
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
                <button class="solutions-btn-primary btn-book-demo-cta" id="solutions-book-demo-btn" style="font-size:13.5px; padding:11px 24px; border:none; cursor:pointer;">
                  ${isVi ? 'Đặt lịch Demo' : 'Book a Demo'} →
                </button>
                <a href="${PUBLIC_ROUTES.platform}" class="solutions-btn-secondary btn-drilldown" data-nav="platform" onclick="if (window.stateStore) { window.stateStore.setRoute('platform'); history.pushState(null, '', '${PUBLIC_ROUTES.platform}'); window.scrollTo({top:0, behavior:'smooth'}); }" style="font-size:13.5px; padding:11px 22px; text-decoration:none;">
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
          <div style="margin-top:32px; padding-top:18px; border-top:1px solid rgba(255, 255, 255, 0.12); display:flex; flex-wrap:wrap; gap:24px; font-size:12.5px; color:#E2E8F0; align-items:center;">
            <div style="display:flex; align-items:center; gap:7px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
              <span>${isVi ? 'Giảm phát thải' : 'Lower Emissions'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:7px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
              <span>${isVi ? 'Tăng khả năng chống chịu' : 'Enhance Resilience'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:7px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
              <span>${isVi ? 'Tạo giá trị dài hạn' : 'Create Long-term Value'}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================ -->
      <!-- 13. GLOBAL FOOTER (Canonical Enterprise Footer) -->
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
