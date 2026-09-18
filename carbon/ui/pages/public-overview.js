/**
 * ENERIX Carbon - Public Product Homepage
 * Part of Global Page Layout System V1.0
 * Fully aligned with visual_baseline_enerix_carbon.png and visual requirements.
 */

import { renderEnterpriseFooter } from '../components/enterprise-footer.js';
import { renderDarkPremiumCTA } from '../components/dark-premium-cta.js';
import { renderPlatformShowcase } from '../components/PlatformShowcase.js';
import { renderPillarCard } from '../components/PillarCard.js';
import { ICONS } from '../components/icons.js';
import { CarbonPath } from '../../app/path.js';
import { stateStore } from '../../app/state-store.js';
import { I18nManager } from '../../app/i18n.js';

export function renderPublicOverviewPage(options = {}) {
  const isVi = I18nManager.currentLocale === 'vi';
  const earthBgUrl = CarbonPath.resolve('assets/branding/footer_earth_background.png');
  const logoUrl = CarbonPath.resolve('assets/logo_enerixon_carbon.png');
  const canonicalBannerUrl = CarbonPath.resolve('assets/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png');

  // Product Storytelling Assets:
  const platformDashboardPreviewUrl = CarbonPath.resolve('assets/01_platform_dashboard_preview.png');
  const measureVisualUrl = CarbonPath.resolve('assets/02_measure_visual.png');
  const reportVisualUrl = CarbonPath.resolve('assets/03_report_visual.png');
  const reduceVisualUrl = CarbonPath.resolve('assets/04_reduce_visual.png');

  return `
    <div class="public-overview-page" style="background:#ffffff;color:#0B1727;font-family:var(--carbon-font-sans, system-ui, -apple-system, sans-serif);line-height:1.5;width:100%;overflow-x:hidden;">
      <style>
        /* Responsive utilities */
        .trust-strip-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
          box-sizing: border-box;
        }
        .platform-overview-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .three-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          width: 100%;
          box-sizing: border-box;
        }
        .science-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.65fr;
          gap: 48px;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .science-grid-responsive {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
        }
        .bottom-cta-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 991px) {
          .trust-strip-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .platform-overview-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .three-pillars-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .science-layout-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .bottom-cta-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .trust-strip-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .science-grid-responsive {
            grid-template-columns: 1fr;
          }
          .science-panel-responsive {
            padding: 24px 16px !important;
          }
        }
      </style>

      <!-- ==========================================================================
           1. FULL-WIDTH CANONICAL HERO SECTION
           ========================================================================== -->
      <section class="carbon-public-overview-hero" 
               style="width:100%;margin:0;padding:0;display:block;background:#08192D;border-bottom:1px solid #E2E8F0;overflow:hidden;position:relative;">
        <img src="${canonicalBannerUrl}" alt="Carbon Intelligence" style="width:100%;height:auto;max-height:580px;object-fit:cover;display:block;border:none;" />
      </section>

      <!-- ==========================================================================
           2. WHITE TRUST STRIP SECTION
           ========================================================================== -->
      <section class="carbon-trust-strip" style="background:#ffffff;border-bottom:1px solid #E2E8F0;padding:20px 24px;font-family:var(--carbon-font-sans, sans-serif);">
        <div style="max-width:1280px;margin:0 auto;" class="trust-strip-container">
          <div class="trust-strip-grid">
            
            <!-- Box 1 -->
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <div style="color:#0066FF;padding:8px;background:#EFF6FF;border-radius:6px;flex-shrink:0;">
                ${ICONS.shield(20, 'currentColor')}
              </div>
              <div>
                <div style="font-weight:700;font-size:14px;color:#0B1727;margin-bottom:2px;">GHG Protocol Aligned</div>
                <div style="font-size:12px;color:#64748B;">Global standards</div>
              </div>
            </div>

            <!-- Box 2 -->
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <div style="color:#0066FF;padding:8px;background:#EFF6FF;border-radius:6px;flex-shrink:0;">
                ${ICONS.connectivity(20, 'currentColor')}
              </div>
              <div>
                <div style="font-weight:700;font-size:14px;color:#0B1727;margin-bottom:2px;">End-to-end Platform</div>
                <div style="font-size:12px;color:#64748B;">From data to impact</div>
              </div>
            </div>

            <!-- Box 3 -->
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <div style="color:#0066FF;padding:8px;background:#EFF6FF;border-radius:6px;flex-shrink:0;">
                ${ICONS.shieldCheck(20, 'currentColor')}
              </div>
              <div>
                <div style="font-weight:700;font-size:14px;color:#0B1727;margin-bottom:2px;">Audit-ready Results</div>
                <div style="font-size:12px;color:#64748B;">Transparent & verifiable</div>
              </div>
            </div>

            <!-- Box 4 -->
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <div style="color:#0066FF;padding:8px;background:#EFF6FF;border-radius:6px;flex-shrink:0;">
                ${ICONS.building(20, 'currentColor')}
              </div>
              <div>
                <div style="font-weight:700;font-size:14px;color:#0B1727;margin-bottom:2px;">Enterprise Grade</div>
                <div style="font-size:12px;color:#64748B;">Secure. Scalable. Compliant.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ==========================================================================
           3. CARBON SNAPSHOT SECTION
           ========================================================================== -->
      <section class="carbon-snapshot-section" style="padding:72px 24px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;font-family:var(--carbon-font-sans, sans-serif);">
        <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
          <div>
            <h2 style="font-size:32px;font-weight:800;color:#0B1727;margin-bottom:16px;letter-spacing:-0.025em;">Know your carbon position in minutes.</h2>
            <p style="font-size:16px;color:#475569;margin-bottom:24px;line-height:1.6;">Move from fragmented activity data to a clear, traceable view of your organization's carbon position.</p>
            <span style="font-size:12px;font-weight:600;color:#64748B;background:#E2E8F0;padding:4px 8px;border-radius:4px;">Illustrative Demo Data</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div style="background:#ffffff;padding:20px;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 2px rgba(11,23,39,0.05);">
              <div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px;">TOTAL EMISSIONS</div>
              <div style="font-size:20px;font-weight:800;color:#0B1727;">125,430 <span style="font-size:12px;font-weight:600;">tCO₂e</span></div>
            </div>
            <div style="background:#ffffff;padding:20px;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 2px rgba(11,23,39,0.05);">
              <div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px;">SCOPE 1</div>
              <div style="font-size:18px;font-weight:700;color:#0B1727;">32,540 tCO₂e</div>
            </div>
            <div style="background:#ffffff;padding:20px;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 2px rgba(11,23,39,0.05);">
              <div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px;">SCOPE 2</div>
              <div style="font-size:18px;font-weight:700;color:#0B1727;">41,230 tCO₂e</div>
            </div>
            <div style="background:#ffffff;padding:20px;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 2px rgba(11,23,39,0.05);">
              <div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px;">SCOPE 3</div>
              <div style="font-size:18px;font-weight:700;color:#0B1727;">51,660 tCO₂e</div>
            </div>
            <div style="background:#ffffff;padding:20px;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 2px rgba(11,23,39,0.05);grid-column: span 2;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px;">DATA COMPLETENESS</div>
                  <div style="font-size:20px;font-weight:800;color:#10B981;">98%</div>
                </div>
                <div>
                  <div style="font-size:11px;font-weight:600;color:#64748B;margin-bottom:4px;">PRIMARY HOTSPOT</div>
                  <div style="font-size:14px;font-weight:700;color:#0B1727;">Purchased Goods & Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================================================
           4. PLATFORM OVERVIEW SECTION
           ========================================================================== -->
      ${renderPlatformShowcase({
        eyebrow: 'PLATFORM OVERVIEW',
        heading: 'From insight to impact in one platform.',
        body: 'A unified view of carbon performance, from organizational overview to site-level detail.',
        benefits: [
          'Real-time emissions tracking',
          'Multi-entity and multi-site architecture',
          'Audit-ready reporting',
          'AI-assisted analytics',
          'Enterprise governance'
        ],
        ctaPrimary: '<button style="background:#0066FF;color:#ffffff;padding:0 24px;height:46px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;border:none;">Explore the Platform →</button>',
        ctaSecondary: '<button style="background:#ffffff;color:#334155;border:1px solid #CBD5E1;padding:0 24px;height:46px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;">Request a Demo</button>',
        imageUrl: platformDashboardPreviewUrl,
        imageAlt: 'Platform Dashboard Preview'
      })}

      <!-- ==========================================================================
           5. THREE PILLARS SECTION
           ========================================================================== -->
      <section class="carbon-core-capabilities-section" style="padding:96px 24px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;font-family:var(--carbon-font-sans, sans-serif);">
        <div style="max-width:1280px;margin:0 auto;">
          
          <!-- Header -->
          <div style="text-align:center;margin-bottom:64px;">
            <h2 style="font-size:36px;font-weight:800;color:#0B1727;margin:0 0 16px 0;letter-spacing:-0.025em;">From measurement to measurable action.</h2>
            <p style="font-size:16px;color:#475569;max-width:600px;margin:0 auto;line-height:1.6;">Measure what matters. Report with confidence. Turn carbon intelligence into action.</p>
          </div>

          <!-- 3 Columns Grid -->
          <div class="three-pillars-grid">
            ${[
              { title: 'MEASURE', headline: 'All your carbon data. In one place.', desc: 'Connect, standardize and validate data across your organization.', img: measureVisualUrl },
              { title: 'REPORT', headline: 'From data to trusted reporting.', desc: 'Create comprehensive, compliant reports aligned with standards.', img: reportVisualUrl },
              { title: 'REDUCE', headline: 'Turn insights into real-world impact.', desc: 'Identify and track reduction opportunities with measurable value.', img: reduceVisualUrl }
            ].map(pillar => renderPillarCard(pillar)).join('')}
          </div>
        </div>
      </section>

      <!-- ==========================================================================
           6. SCIENCE & TRUST SECTION
           ========================================================================== -->
      <section style="padding:72px 24px;background:#ffffff;" class="carbon-science-section">
        <div style="max-width:1280px;margin:0 auto;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:40px;" class="science-panel-responsive">
          
          <div class="science-layout-grid">
            
            <!-- Left Header -->
            <div>
              <span style="font-size:11px;font-weight:700;color:#0066FF;text-transform:uppercase;letter-spacing:0.12em;font-family:var(--carbon-font-mono, monospace);display:block;margin-bottom:12px;">
                SCIENCE & TRUST
              </span>
              <h2 style="font-size:clamp(26px, 3.2vw, 36px);font-weight:800;color:#0B1727;margin:0 0 16px 0;line-height:1.2;letter-spacing:-0.02em;">
                ${isVi ? 'Xây dựng trên nền tảng khoa học. Thiết kế để tạo dựng niềm tin.' : 'Built on science. Designed for trust.'}
              </h2>
              <p style="font-size:14.5px;color:#334155;margin-bottom:28px;line-height:1.6;">
                ${isVi ? 'Phương pháp tính toán minh bạch, dữ liệu có thẩm quyền và khả năng truy xuất nguồn gốc từ đầu đến cuối đem lại sự tự tin trên từng con số.' : 'Transparent methodologies, authoritative data and end-to-end traceability give you confidence in every number.'}
              </p>
              <a href="#science" class="enerix-button enerix-button-primary" style="display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 24px;border-radius:8px;font-weight:700;font-size:13.5px;color:#ffffff;background:#0066FF;text-decoration:none;box-shadow:0 4px 12px rgba(0,102,255,0.2);transition:all 0.15s ease;">
                Explore Our Methodology →
              </a>
            </div>

            <!-- Right 2x3 Grid of White Governance Cards -->
            <div class="science-grid-responsive">
              
              <!-- Tile 1 -->
              <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;padding:18px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 2px 4px rgba(11,23,39,0.01);">
                <div style="color:#0066FF;display:flex;align-items:center;justify-content:center;background:#EFF6FF;border-radius:6px;padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14.5px;color:#0B1727;margin-bottom:4px;letter-spacing:-0.01em;">Calculation Methodology</div>
                  <div style="font-size:12.5px;color:#475569;line-height:1.5;">GHG Protocol aligned, transparent and deterministic.</div>
                </div>
              </div>

              <!-- Tile 2 -->
              <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;padding:18px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 2px 4px rgba(11,23,39,0.01);">
                <div style="color:#0066FF;display:flex;align-items:center;justify-content:center;background:#EFF6FF;border-radius:6px;padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14.5px;color:#0B1727;margin-bottom:4px;letter-spacing:-0.01em;">Emission Factors</div>
                  <div style="font-size:12.5px;color:#475569;line-height:1.5;">Authoritative sources and version controlled.</div>
                </div>
              </div>

              <!-- Tile 3 -->
              <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;padding:18px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 2px 4px rgba(11,23,39,0.01);">
                <div style="color:#0066FF;display:flex;align-items:center;justify-content:center;background:#EFF6FF;border-radius:6px;padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14.5px;color:#0B1727;margin-bottom:4px;letter-spacing:-0.01em;">Data Lineage</div>
                  <div style="font-size:12.5px;color:#475569;line-height:1.5;">Full traceability from source to reported value.</div>
                </div>
              </div>

              <!-- Tile 4 -->
              <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;padding:18px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 2px 4px rgba(11,23,39,0.01);">
                <div style="color:#0066FF;display:flex;align-items:center;justify-content:center;background:#EFF6FF;border-radius:6px;padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"></path><path d="M3.05 11a9 9 0 1 1 .1 1.04"></path><polyline points="1 10 1 5 6 5"></polyline></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14.5px;color:#0B1727;margin-bottom:4px;letter-spacing:-0.01em;">Versioning</div>
                  <div style="font-size:12.5px;color:#475569;line-height:1.5;">Track changes across all calculations and reports.</div>
                </div>
              </div>

              <!-- Tile 5 -->
              <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;padding:18px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 2px 4px rgba(11,23,39,0.01);">
                <div style="color:#0066FF;display:flex;align-items:center;justify-content:center;background:#EFF6FF;border-radius:6px;padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14.5px;color:#0B1727;margin-bottom:4px;letter-spacing:-0.01em;">Evidence Management</div>
                  <div style="font-size:12.5px;color:#475569;line-height:1.5;">Store and link supporting documents.</div>
                </div>
              </div>

              <!-- Tile 6 -->
              <div style="background:#ffffff;border:1px solid #E2E8F0;border-radius:8px;padding:18px;display:flex;gap:12px;align-items:flex-start;box-shadow:0 2px 4px rgba(11,23,39,0.01);">
                <div style="color:#0066FF;display:flex;align-items:center;justify-content:center;background:#EFF6FF;border-radius:6px;padding:8px;flex-shrink:0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <div style="font-weight:800;font-size:14.5px;color:#0B1727;margin-bottom:4px;letter-spacing:-0.01em;">Audit Trail</div>
                  <div style="font-size:12.5px;color:#475569;line-height:1.5;">Complete history for internal and external audits.</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================================================
           7. DARK PREMIUM CTA SECTION
           ========================================================================== -->
      ${renderDarkPremiumCTA()}

      <!-- ==========================================================================
           8. WHITE ENTERPRISE FOOTER
           ========================================================================== -->
      ${renderEnterpriseFooter()}

    </div>
  `.trim();
}

renderPublicOverviewPage.attachEvents = function(container) {
  if (!container) return;

  const demoButtons = document.querySelectorAll('.btn-book-demo-cta, #public-book-demo-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Thank you for your interest in ENERIXON Carbon! Our enterprise team will connect with your compliance officers to schedule a platform demonstration.');
    });
  });

  const exploreButtons = document.querySelectorAll('.btn-explore-platform');
  exploreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stateStore.setRoute('workspace');
    });
  });
};
