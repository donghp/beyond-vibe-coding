/**
 * ENERIX Carbon - Public Product Page Templates
 * Part of Global Page Layout System V1.0
 * Implements public product pages: Measure, Report, Reduce, Science, Solutions, Resources, Company.
 * Follows the canonical public shell (Public Header -> Full-Width Hero -> Content -> Dark CTA -> Enterprise Footer).
 */
import { renderCarbonBrandBanner } from '../components/banner.js';

export function renderMeasureProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Measure & Footprint Accounting' })}
      </div>
    </section>
    
    <div style="background:#fff;border-bottom:1px solid var(--carbon-border, #DCE5ED);">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div class="pathway" style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));">
          <div class="pathway__item" data-active="true" style="padding:16px 20px;border-right:1px solid var(--carbon-border);display:flex;align-items:center;gap:14px;box-shadow:inset 0 -3px 0 var(--carbon-green-500, #20B45B);">
            <span style="font-size:14px;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">01</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--carbon-navy-900);">Measure</div>
              <div style="font-size:12px;color:var(--carbon-navy-600);">Know your footprint</div>
            </div>
          </div>
          <div class="pathway__item" style="padding:16px 20px;border-right:1px solid var(--carbon-border);display:flex;align-items:center;gap:14px;">
            <span style="font-size:14px;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">02</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--carbon-navy-900);">Report</div>
              <div style="font-size:12px;color:var(--carbon-navy-600);">Turn data into disclosure</div>
            </div>
          </div>
          <div class="pathway__item" style="padding:16px 20px;display:flex;align-items:center;gap:14px;">
            <span style="font-size:14px;font-weight:700;color:var(--carbon-blue-600);font-family:var(--carbon-font-mono);">03</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--carbon-navy-900);">Reduce</div>
              <div style="font-size:12px;color:var(--carbon-navy-600);">Turn insights into action</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-blue-600);">Scope 1, 2 & 3 Accounting</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">Precision Measurement for Complex Industrial Enterprises</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Capture, ingest, and reconcile multi-facility activity data against official emission factor databases under Decree 06/2022/NĐ-CP and Decision 42/2026/QĐ-TTg.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Activity Data Ingestion</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Automated normalization of fuel consumption, electricity bills, and industrial process mass balance records.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="activity-data" style="width:100%;">Open Activity Data →</button>
          </div>
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Governed Emission Factors</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Direct integration with IPCC AR6, IEA, and Ministry of Industry & Trade approved emission factor registries.</p>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="emission-factors" style="width:100%;">View Factors →</button>
          </div>
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Calculation Studio</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Deterministic calculation runs with complete provenance hashes, gas breakdowns, and audit trails.</p>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="calculations" style="width:100%;">Launch Studio →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderReportProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Statutory Disclosure & GHG Reporting' })}
      </div>
    </section>
    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-blue-600);">Statutory Disclosures</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">Audit-Ready GHG Inventories & Reports</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Generate complete institutional greenhouse gas inventory packages, regulatory compliance disclosures, and evidence trace dossiers ready for third-party verification.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Inventory Reports</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Consolidated greenhouse gas accounting reports across all operational facilities and asset boundaries.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="reports" style="width:100%;">View Reports →</button>
          </div>
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Evidence & Lineage Trace</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Inspect cryptographic provenance hashes linking final calculations back to primary source documents.</p>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="evidence-trace" style="width:100%;">Inspect Evidence →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderReduceProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Reduction Pathways & Abatement' })}
      </div>
    </section>
    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-green-600);">Abatement Intelligence</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">Turn Carbon Intelligence into Measurable Reduction</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Identify emission hotspots, model decarbonization scenarios, and track targeted abatement milestones across your industrial enterprise.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Hotspot Analysis</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Pinpoint high-emission equipment, processes, and purchased electricity streams instantly.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="overview" style="width:100%;">View Hotspots →</button>
          </div>
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Reduction Scenario Modeling</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Simulate renewable energy adoption, efficiency gains, and fuel switching impacts on future trajectories.</p>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="calculations" style="width:100%;">Model Scenarios →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderScienceProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Science & Methodologies' })}
      </div>
    </section>
    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-blue-600);">Rigorous Methodology</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">Built on IPCC, ISO 14064 & Vietnamese Regulatory Standards</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Every calculation in ENERIX Carbon is backed by governed calculation models, explicit GWP datasets, and verifiable emission factor lineage.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Methodologies Registry</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Inspect governing formulas, mass balance equations, and statutory calculation standards.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="methodologies" style="width:100%;">View Methodologies →</button>
          </div>
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Emission Factors & GWP</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Examine global warming potential datasets and ministry-published emission factor parameters.</p>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="emission-factors" style="width:100%;">View Factors →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderSolutionsProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Enterprise Solutions' })}
      </div>
    </section>
    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-blue-600);">Industrial Solutions</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">Tailored for Heavy Industry & Multi-Facility Enterprises</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Designed specifically for manufacturing, cement, steel, chemical, energy, and complex corporate conglomerates operating under strict regulatory oversight.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Multi-Facility Management</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Manage corporate hierarchies, branch plants, and subsidiary carbon accounting under one roof.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="facilities" style="width:100%;">View Facilities →</button>
          </div>
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Regulatory Compliance (Decision 42)</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Automated applicability checking and threshold monitoring for regulated industrial entities.</p>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="regulatory-check" style="width:100%;">Check Applicability →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderResourcesProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Resources & GHG Guide' })}
      </div>
    </section>
    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-blue-600);">Knowledge & Documentation</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">GHG Engineering Guides & Regulatory Documentation</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Access comprehensive guides, technical documentation, QA/QC protocols, and statutory decrees.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">GHG Knowledge Base</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Deep dive into greenhouse gas accounting standards, QA/QC procedures, and verification handbooks.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="knowledge" style="width:100%;">Open Knowledge Base →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderCompanyProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:var(--carbon-navy-950, #08213D);">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Company & Statutory Governance' })}
      </div>
    </section>
    <section class="section" style="padding:80px 0;background:#F7FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="max-width:800px;margin:0 auto;text-align:center;margin-bottom:64px;">
          <span style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--carbon-blue-600);">Institutional Governance</span>
          <h1 style="font-size:clamp(32px, 4vw, 48px);font-weight:800;color:var(--carbon-navy-950);margin:12px 0 16px 0;">About ENERIX Carbon Platform</h1>
          <p style="font-size:16px;color:var(--carbon-navy-700);line-height:1.6;">
            Empowering industrial enterprises with deterministic carbon intelligence, absolute data provenance, and uncompromised regulatory compliance.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;">
          <div class="enerix-card" style="padding:32px;background:#fff;border-radius:12px;border:1px solid var(--carbon-border);">
            <div style="font-weight:700;font-size:18px;color:var(--carbon-navy-950);margin-bottom:12px;">Decision 42/2026/QĐ-TTg Framework</div>
            <p style="font-size:14px;color:var(--carbon-navy-600);line-height:1.5;margin-bottom:20px;">Built specifically for the national greenhouse gas inventory roadmap and regulated facility reporting mandates.</p>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="regulatory-check" style="width:100%;">View Regulatory Status →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}
