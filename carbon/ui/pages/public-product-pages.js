/**
 * ENERIX Carbon - Public Product Page Templates
 * Part of Global Page Layout System V1.0
 * Implements public product pages: Measure, Report, Reduce, Science, Solutions, Resources, Company.
 * Follows the canonical public shell (Public Header -> Full-Width Hero -> Content -> Dark CTA -> Enterprise Footer).
 */
import { renderCarbonBrandBanner } from '../components/banner.js';

export function renderMeasureProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Measure & Footprint Accounting' })}
      </div>
    </section>
    
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

    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">Scope 1, 2 & 3 Accounting</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">Precision Measurement for Complex Industrial Enterprises</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Capture, ingest, and reconcile multi-facility activity data against official emission factor databases under Decree 06/2022/NĐ-CP and Decision 42/2026/QĐ-TTg.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;" class="pillars-grid-responsive">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Activity Data Ingestion</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Automated normalization of fuel consumption, electricity bills, and industrial process mass balance records.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="activity-data" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">Open Activity Data →</button>
          </div>
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Governed Emission Factors</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Direct integration with IPCC AR6, IEA, and Ministry of Industry & Trade approved emission factor registries.</p>
            </div>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="emission-factors" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">View Factors →</button>
          </div>
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Calculation Studio</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Deterministic calculation runs with complete provenance hashes, gas breakdowns, and audit trails.</p>
            </div>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="calculations" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">Launch Studio →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderReportProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Statutory Disclosure & GHG Reporting' })}
      </div>
    </section>
    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">Statutory Disclosures</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">Audit-Ready GHG Inventories & Reports</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Generate complete institutional greenhouse gas inventory packages, regulatory compliance disclosures, and evidence trace dossiers ready for third-party verification.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:20px;" class="cta-grid-responsive">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Inventory Reports</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Consolidated greenhouse gas accounting reports across all operational facilities and asset boundaries.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="reports" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">View Reports →</button>
          </div>
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Evidence & Lineage Trace</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Inspect cryptographic provenance hashes linking final calculations back to primary source documents.</p>
            </div>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="evidence-trace" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">Inspect Evidence →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderReduceProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Reduction Pathways & Abatement' })}
      </div>
    </section>
    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#10B981;font-family:var(--carbon-font-mono, monospace);">Abatement Intelligence</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">Turn Carbon Intelligence into Measurable Reduction</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Identify emission hotspots, model decarbonization scenarios, and track targeted abatement milestones across your industrial enterprise.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:20px;" class="cta-grid-responsive">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Hotspot Analysis</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Pinpoint high-emission equipment, processes, and purchased electricity streams instantly.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="overview" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">View Hotspots →</button>
          </div>
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Reduction Scenario Modeling</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Simulate renewable energy adoption, efficiency gains, and fuel switching impacts on future trajectories.</p>
            </div>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="calculations" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">Model Scenarios →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderScienceProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Science & Methodologies' })}
      </div>
    </section>
    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">Rigorous Methodology</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">Built on IPCC, ISO 14064 & Vietnamese Regulatory Standards</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Every calculation in ENERIX Carbon is backed by governed calculation models, explicit GWP datasets, and verifiable emission factor lineage.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:20px;" class="cta-grid-responsive">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Methodologies Registry</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Inspect governing formulas, mass balance equations, and statutory calculation standards.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="methodologies" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">View Methodologies →</button>
          </div>
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Emission Factors & GWP</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Examine global warming potential datasets and ministry-published emission factor parameters.</p>
            </div>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="emission-factors" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">View Factors →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderSolutionsProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Enterprise Solutions' })}
      </div>
    </section>
    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">Industrial Solutions</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">Tailored for Heavy Industry & Multi-Facility Enterprises</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Designed specifically for manufacturing, cement, steel, chemical, energy, and complex corporate conglomerates operating under strict regulatory oversight.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:20px;" class="cta-grid-responsive">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Multi-Facility Management</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Manage corporate hierarchies, branch plants, and subsidiary carbon accounting under one roof.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="facilities" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">View Facilities →</button>
          </div>
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Regulatory Compliance (Decision 42)</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Automated applicability checking and threshold monitoring for regulated industrial entities.</p>
            </div>
            <button class="enerix-button enerix-button-secondary btn-drilldown" data-nav="regulatory-check" style="width:100%;background:#F1F5F9;color:#0B1727;border:1px solid #CBD5E1;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">Check Applicability →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderResourcesProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Resources & GHG Guide' })}
      </div>
    </section>
    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">Knowledge & Documentation</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">GHG Engineering Guides & Regulatory Documentation</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Access comprehensive guides, technical documentation, QA/QC protocols, and statutory decrees.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:1fr;max-width:600px;margin:0 auto;">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">GHG Knowledge Base</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Deep dive into greenhouse gas accounting standards, QA/QC procedures, and verification handbooks.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="knowledge" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">Open Knowledge Base →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderCompanyProductPage() {
  return `
    <section class="hero-banner" style="width:100%;max-width:none;margin:0;padding:0;overflow:hidden;background:#08192D;border-bottom:1px solid #E2E8F0;">
      <div style="width:100%;max-width:none;margin:0;padding:0;">
        ${renderCarbonBrandBanner({ variant: 'hero', priority: true, alt: 'ENERIXON Carbon — Company & Statutory Governance' })}
      </div>
    </section>
    <section class="section" style="padding:56px 24px;background:#F8FAFC;">
      <div class="container" style="max-width:1280px;margin:0 auto;">
        <div style="max-width:760px;margin:0 auto;text-align:center;margin-bottom:48px;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0066FF;font-family:var(--carbon-font-mono, monospace);">Institutional Governance</span>
          <h1 style="font-size:clamp(28px, 3.5vw, 40px);font-weight:800;color:#0B1727;margin:8px 0 12px 0;letter-spacing:-0.02em;line-height:1.2;">About ENERIX Carbon Platform</h1>
          <p style="font-size:15px;color:#475569;line-height:1.6;">
            Empowering industrial enterprises with deterministic carbon intelligence, absolute data provenance, and uncompromised regulatory compliance.
          </p>
        </div>
        <div style="display:grid;grid-template-columns:1fr;max-width:600px;margin:0 auto;">
          <div class="enerix-card" style="padding:24px;background:#ffffff;border-radius:8px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(11,23,39,0.04);display:flex;flex-direction:column;justify-style:space-between;">
            <div>
              <div style="font-weight:800;font-size:16px;color:#0B1727;margin-bottom:8px;letter-spacing:-0.01em;">Decision 42/2026/QĐ-TTg Framework</div>
              <p style="font-size:12px;color:#475569;line-height:1.55;margin-bottom:20px;">Built specifically for the national greenhouse gas inventory roadmap and regulated facility reporting mandates.</p>
            </div>
            <button class="enerix-button enerix-button-primary btn-drilldown" data-nav="regulatory-check" style="width:100%;background:#0066FF;color:#ffffff;padding:10px 16px;border-radius:6px;font-weight:700;font-size:12px;border:none;cursor:pointer;">View Regulatory Status →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}
