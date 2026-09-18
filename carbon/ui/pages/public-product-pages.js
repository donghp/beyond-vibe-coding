/**
 * ENERIX Carbon - Public Product Page Templates
 * Part of Global Page Layout System V1.0
 * Implements public product pages: Measure, Report, Reduce, Science, Solutions, Resources, Company.
 * Follows the canonical public shell (Public Header -> Page Banner -> Content -> Dark CTA -> Enterprise Footer).
 */
import { renderPageBanner } from '../components/page-banner.js';
import { renderDarkPremiumCTA } from '../components/dark-premium-cta.js';
import { renderEnterpriseFooter } from '../components/enterprise-footer.js';
import { CarbonPath } from '../../app/path.js';

import { stateStore } from '../../app/state-store.js';

function attachDrilldownEvents(container) {
  if (!container) return;
  container.querySelectorAll('.btn-drilldown').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.getAttribute('data-nav');
      if (route) {
        stateStore.setRoute(route);
      }
    });
  });
}

export function renderMeasureProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'Scope 1, 2 & 3 Accounting',
    title: 'Precision Measurement for Complex Industrial Enterprises',
    description: 'Capture, ingest, and reconcile multi-facility activity data against official emission factor databases under Decree 06/2022/NĐ-CP.',
    primaryCta: { label: 'Book a Demo', url: '#contact' },
    secondaryCta: { label: 'Explore Features', url: '#overview' },
    visualAsset: 'assets/branding/bg_banner02.png'
  });

  return `
    <div class="product-page measure-page">
      ${banner}
      
      <div style="background:#ffffff;border-bottom:1px solid #E2E8F0;">
        <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
          <div class="pathway" style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));">
            <div class="pathway__item" data-active="true" style="padding:14px 20px;border-right:1px solid #E2E8F0;display:flex;align-items:center;gap:12px;background:rgba(0,102,255,0.03);border-bottom:2px solid #0066FF;">
              <span style="font-size:13px;font-weight:800;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">01</span>
              <div>
                <div style="font-weight:700;font-size:13px;color:#0B1727;">Measure</div>
                <div style="font-size:11px;color:#64748B;">Know your footprint</div>
              </div>
            </div>
            <div class="pathway__item" style="padding:14px 20px;border-right:1px solid #E2E8F0;display:flex;align-items:center;gap:12px;">
              <span style="font-size:13px;font-weight:800;color:#94A3B8;font-family:var(--carbon-font-mono, monospace);">02</span>
              <div>
                <div style="font-weight:700;font-size:13px;color:#0B1727;">Report</div>
                <div style="font-size:11px;color:#64748B;">Turn data into disclosure</div>
              </div>
            </div>
            <div class="pathway__item" style="padding:14px 20px;display:flex;align-items:center;gap:12px;">
              <span style="font-size:13px;font-weight:800;color:#94A3B8;font-family:var(--carbon-font-mono, monospace);">03</span>
              <div>
                <div style="font-weight:700;font-size:13px;color:#0B1727;">Reduce</div>
                <div style="font-size:11px;color:#64748B;">Turn insights into action</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:24px;" class="pillars-grid-responsive">
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Activity Data Ingestion</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Automated normalization of fuel consumption, electricity bills, and industrial process mass balance records.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="activity-data" style="width:100%;background:#0066FF;color:#ffffff;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;border:none;cursor:pointer;transition:all 0.2s ease;">Open Activity Data →</button>
            </div>
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Governed Emission Factors</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Direct integration with IPCC AR6, IEA, and Ministry of Industry & Trade approved emission factor registries.</p>
              </div>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="emission-factors" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;transition:all 0.2s ease;">View Factors →</button>
            </div>
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Calculation Studio</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Deterministic calculation runs with complete provenance hashes, gas breakdowns, and audit trails.</p>
              </div>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="calculations" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;transition:all 0.2s ease;">Launch Studio →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderMeasureProductPage.attachEvents = attachDrilldownEvents;

export function renderReportProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'Statutory Disclosures',
    title: 'Audit-Ready GHG Inventories & Reports',
    description: 'Generate complete institutional greenhouse gas inventory packages and regulatory compliance disclosures ready for verification.',
    primaryCta: { label: 'View Sample Report', url: '#reports' },
    secondaryCta: { label: 'Science & Trust', url: '#science' },
    visualAsset: 'assets/branding/bg_banner01.png'
  });

  return `
    <div class="product-page report-page">
      ${banner}

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:24px;" class="cta-grid-responsive">
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Inventory Reports</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Consolidated greenhouse gas accounting reports across all operational facilities and asset boundaries.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="reports" style="width:100%;background:#0066FF;color:#ffffff;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;border:none;cursor:pointer;">View Reports →</button>
            </div>
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Evidence & Lineage Trace</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Inspect cryptographic provenance hashes linking final calculations back to primary source documents.</p>
              </div>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="evidence-trace" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;">Inspect Evidence →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderReportProductPage.attachEvents = attachDrilldownEvents;

export function renderReduceProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'Abatement Intelligence',
    title: 'Turn Carbon Intelligence into Measurable Reduction',
    description: 'Identify emissions hotspots, model decarbonization scenarios, and track targeted abatement milestones across your industrial enterprise.',
    primaryCta: { label: 'Model a Scenario', url: '#calculations' },
    visualAsset: 'assets/branding/bg_banner02.png'
  });

  return `
    <div class="product-page reduce-page">
      ${banner}

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:24px;" class="cta-grid-responsive">
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Hotspot Analysis</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Pinpoint high-emission equipment, processes, and purchased electricity streams instantly.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="overview" style="width:100%;background:#0066FF;color:#ffffff;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;border:none;cursor:pointer;">View Hotspots →</button>
            </div>
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Reduction Scenario Modeling</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Simulate renewable energy adoption, efficiency gains, and fuel switching impacts on future trajectories.</p>
              </div>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="calculations" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;">Model Scenarios →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderReduceProductPage.attachEvents = attachDrilldownEvents;

export function renderScienceProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'SCIENCE',
    title: 'Built on science. Designed for a cleaner tomorrow.',
    description: 'Transparent methodologies, authoritative data and end-to-end traceability give you confidence in every number.',
    primaryCta: { label: 'Explore Our Methodology', url: '#methodologies' },
    visualAsset: 'assets/branding/bg_banner01.png'
  });

  return `
    <div class="product-page science-page">
      ${banner}

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:24px;" class="cta-grid-responsive">
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Methodologies Registry</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Inspect governing formulas, mass balance equations, and statutory calculation standards.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="methodologies" style="width:100%;background:#0066FF;color:#ffffff;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;border:none;cursor:pointer;">View Methodologies →</button>
            </div>
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Emission Factors & GWP</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Examine global warming potential datasets and ministry-published emission factor parameters.</p>
              </div>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="emission-factors" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;">View Factors →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderScienceProductPage.attachEvents = attachDrilldownEvents;

export function renderSolutionsProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'SOLUTIONS',
    title: 'Solutions for a lower-carbon future.',
    description: 'Connected carbon intelligence for organizations navigating measurement, reporting, reduction and climate action.',
    primaryCta: { label: 'View Industry Case Studies', url: '#resources' },
    visualAsset: 'assets/branding/bg_banner02.png'
  });

  return `
    <div class="product-page solutions-page">
      ${banner}

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:24px;" class="cta-grid-responsive">
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Multi-Facility Management</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Manage corporate hierarchies, branch plants, and subsidiary carbon accounting under one roof.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="facilities" style="width:100%;background:#0066FF;color:#ffffff;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;border:none;cursor:pointer;">View Facilities →</button>
            </div>
            <div class="enerix-card" style="padding:32px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-weight:800;font-size:18px;color:#0B1727;margin-bottom:12px;letter-spacing:-0.01em;">Regulatory Compliance Framework</div>
                <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;">Automated applicability checking and threshold monitoring for regulated industrial entities.</p>
              </div>
              <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="regulatory-check" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:12px 16px;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer;">Check Applicability →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderSolutionsProductPage.attachEvents = attachDrilldownEvents;

export function renderResourcesProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'RESOURCES',
    title: 'Insights for a more sustainable tomorrow.',
    description: 'Guides, knowledge, data stories and practical resources for understanding carbon, compliance and decarbonization.',
    primaryCta: { label: 'Browse Resource Library', url: '#knowledge' },
    visualAsset: 'assets/branding/bg_banner01.png'
  });

  return `
    <div class="product-page resources-page">
      ${banner}

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:1fr;max-width:640px;margin:0 auto;">
            <div class="enerix-card" style="padding:40px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;text-align:center;">
              <div>
                <div style="font-weight:800;font-size:20px;color:#0B1727;margin-bottom:16px;letter-spacing:-0.01em;">GHG Knowledge Base</div>
                <p style="font-size:15px;color:#475569;line-height:1.65;margin-bottom:32px;">Deep dive into greenhouse gas accounting standards, QA/QC procedures, and verification handbooks.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="knowledge" style="width:100%;background:#0066FF;color:#ffffff;padding:14px 20px;border-radius:6px;font-weight:700;font-size:14px;border:none;cursor:pointer;">Open Knowledge Base →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderResourcesProductPage.attachEvents = attachDrilldownEvents;

export function renderCompanyProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'COMPANY',
    title: 'Let’s build a cleaner tomorrow.',
    description: 'Meet the people, technology and purpose behind ENERIXON CARBON.',
    primaryCta: { label: 'Contact Our Team', url: '#contact' },
    visualAsset: 'assets/branding/bg_banner02.png'
  });

  return `
    <div class="product-page company-page">
      ${banner}

      <section class="section" style="padding:80px 24px;background:#F8FAFC;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:1fr;max-width:640px;margin:0 auto;">
            <div class="enerix-card" style="padding:40px;background:#ffffff;border-radius:12px;border:1px solid #E2E8F0;box-shadow:0 4px 6px rgba(11,23,39,0.02);display:flex;flex-direction:column;justify-content:space-between;text-align:center;">
              <div>
                <div style="font-weight:800;font-size:20px;color:#0B1727;margin-bottom:16px;letter-spacing:-0.01em;">Regulatory Framework</div>
                <p style="font-size:15px;color:#475569;line-height:1.65;margin-bottom:32px;">Built specifically for the national greenhouse gas inventory roadmap and regulated facility reporting mandates under Decision 42/2026/QĐ-TTg.</p>
              </div>
              <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="regulatory-check" style="width:100%;background:#0066FF;color:#ffffff;padding:14px 20px;border-radius:6px;font-weight:700;font-size:14px;border:none;cursor:pointer;">View Regulatory Status →</button>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderCompanyProductPage.attachEvents = attachDrilldownEvents;

export function renderIndustriesProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'INDUSTRIES',
    title: 'Industry solutions for real-world impact.',
    description: 'Purpose-built carbon intelligence for energy, manufacturing, infrastructure, transport, technology and other high-impact sectors.',
    primaryCta: { label: 'Book a Demo', url: '#contact' },
    visualAsset: 'assets/branding/bg_banner01.png'
  });

  return `
    <div class="product-page industries-page">
      ${banner}
      
      <section class="section" style="padding:80px 24px;background:#ffffff;">
        <div class="container" style="max-width:1280px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:24px;">
            <div style="padding:24px;border:1px solid #E2E8F0;border-radius:8px;">
              <h3 style="font-weight:700;margin-bottom:12px;">Energy</h3>
              <p style="font-size:14px;color:#475569;">Generation, distribution and efficiency optimization.</p>
            </div>
            <div style="padding:24px;border:1px solid #E2E8F0;border-radius:8px;">
              <h3 style="font-weight:700;margin-bottom:12px;">Manufacturing</h3>
              <p style="font-size:14px;color:#475569;">Industrial processes and supply chain intelligence.</p>
            </div>
            <div style="padding:24px;border:1px solid #E2E8F0;border-radius:8px;">
              <h3 style="font-weight:700;margin-bottom:12px;">Infrastructure</h3>
              <p style="font-size:14px;color:#475569;">Building materials and construction lifecycle.</p>
            </div>
          </div>
        </div>
      </section>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderIndustriesProductPage.attachEvents = attachDrilldownEvents;

export function renderPlatformProductPage() {
  const banner = renderPageBanner({
    eyebrow: 'THE ENERIXON CARBON PLATFORM',
    title: 'From data to real-world impact.',
    description: 'A unified platform to measure, report and reduce emissions across your organization and value chain. Turn carbon data into clear insights and actionable opportunities.',
    primaryCta: { label: 'Request a Demo →', url: '#contact' },
    secondaryCta: { label: 'Explore the Platform', url: '#section-01' },
    visualAsset: 'assets/branding/bg_banner01.png'
  });

  const sectionBgUrl = CarbonPath.resolve('assets/section_001_gb.png');

  return `
    <div class="product-page platform-page">
      ${banner}

      <section id="section-01" class="section" style="padding:100px 24px; position:relative; background:#ffffff; overflow:hidden; font-family:'Be Vietnam Pro', var(--carbon-font-sans, sans-serif);">
        <div style="position:absolute; inset:0; background:url('${sectionBgUrl}') center/cover no-repeat; opacity:0.9; z-index:1;"></div>
        <div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,246,255,0.85) 100%); z-index:2;"></div>

        <div class="container" style="max-width:1280px; margin:0 auto; position:relative; z-index:3;">
          <div style="display:grid; grid-template-columns: 1fr 1.1fr; gap:64px; align-items:center;" class="platform-section-grid">
            
            <!-- LEFT: Content -->
            <div>
              <div style="font-size:12px; font-weight:700; color:#0066FF; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:8px;">RECOMMENDED</div>
              <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:16px;">CARBON INSIGHTS. REAL IMPACT.</div>
              <h2 style="font-size:clamp(32px, 4vw, 48px); font-weight:800; color:#0B1727; line-height:1.1; margin-bottom:20px; letter-spacing:-0.03em;">
                Know your carbon<br>position <span style="color:#0066FF;">in minutes.</span>
              </h2>
              <p style="font-size:17px; color:#475569; line-height:1.7; margin-bottom:32px;">
                Move from fragmented activity data to a clear, traceable view of your organization's carbon position.
              </p>
              <div style="display:flex; gap:16px; align-items:center;">
                <div style="font-size:12px; font-weight:600; color:#64748B; background:rgba(226,232,240,0.8); padding:8px 14px; border-radius:6px; display:inline-block;">
                  Illustrative Demo Data
                </div>
              </div>
            </div>

            <!-- RIGHT: Approved Platform Dashboard UI Visual -->
            <div style="background:#ffffff; border-radius:16px; border:1px solid #E2E8F0; box-shadow:0 20px 40px rgba(11,23,39,0.08); padding:32px; box-sizing:border-box;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #F1F5F9;">
                <div>
                  <div style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.05em;">ENTERPRISE CARBON INVENTORY</div>
                  <div style="font-size:18px; font-weight:800; color:#0B1727;">Global Consolidated Portfolio</div>
                </div>
                <div style="background:#EFF6FF; color:#0066FF; font-size:12px; font-weight:700; padding:6px 12px; border-radius:20px;">
                  Active Audit Cycle
                </div>
              </div>

              <!-- Top metrics card -->
              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:24px; margin-bottom:20px;">
                <div style="font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">TOTAL EMISSIONS</div>
                <div style="font-size:36px; font-weight:800; color:#0B1727; font-family:var(--carbon-font-mono, monospace); letter-spacing:-0.02em;">
                  125,430 <span style="font-size:16px; font-weight:600; color:#64748B;">tCO₂e</span>
                </div>
              </div>

              <!-- 3 Scope grid -->
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:20px;">
                <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:8px; padding:16px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; margin-bottom:4px;">SCOPE 1</div>
                  <div style="font-size:18px; font-weight:800; color:#0B1727; font-family:var(--carbon-font-mono, monospace);">32,540</div>
                  <div style="font-size:10px; color:#64748B;">tCO₂e</div>
                </div>
                <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:8px; padding:16px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; margin-bottom:4px;">SCOPE 2</div>
                  <div style="font-size:18px; font-weight:800; color:#0B1727; font-family:var(--carbon-font-mono, monospace);">41,230</div>
                  <div style="font-size:10px; color:#64748B;">tCO₂e</div>
                </div>
                <div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:8px; padding:16px;">
                  <div style="font-size:11px; font-weight:700; color:#64748B; margin-bottom:4px;">SCOPE 3</div>
                  <div style="font-size:18px; font-weight:800; color:#0B1727; font-family:var(--carbon-font-mono, monospace);">51,660</div>
                  <div style="font-size:10px; color:#64748B;">tCO₂e</div>
                </div>
              </div>

              <!-- Bottom info row -->
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                <div style="background:#F0FDF4; border:1px solid #DCFCE7; border-radius:8px; padding:16px;">
                  <div style="font-size:11px; font-weight:700; color:#166534; margin-bottom:4px;">DATA COMPLETENESS</div>
                  <div style="font-size:22px; font-weight:800; color:#15803D; font-family:var(--carbon-font-mono, monospace);">98%</div>
                </div>
                <div style="background:#FFFBEB; border:1px solid #FEF3C7; border-radius:8px; padding:16px;">
                  <div style="font-size:11px; font-weight:700; color:#B45309; margin-bottom:4px;">PRIMARY HOTSPOT</div>
                  <div style="font-size:13px; font-weight:700; color:#92400E; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Purchased Goods & Services</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <style>
        @media (max-width: 968px) {
          .platform-section-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      </style>

      ${renderDarkPremiumCTA()}
      ${renderEnterpriseFooter()}
    </div>
  `;
}
renderPlatformProductPage.attachEvents = attachDrilldownEvents;
