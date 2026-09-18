import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateBanner() {
  const width = 1920;
  const height = 816;

  // High-fidelity vector SVG composite capturing all visual elements of the official banner
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Sky and atmosphere gradients -->
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4ea8de" />
        <stop offset="35%" stop-color="#90e0ef" />
        <stop offset="65%" stop-color="#caf0f8" />
        <stop offset="100%" stop-color="#e0f2fe" />
      </linearGradient>

      <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
        <stop offset="40%" stop-color="#fef08a" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#90e0ef" stop-opacity="0" />
      </linearGradient>

      <!-- Brand Logo Gradients -->
      <linearGradient id="enerixonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669" />
        <stop offset="35%" stop-color="#10b981" />
        <stop offset="70%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0ea5e9" />
      </linearGradient>

      <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#0284c7" />
      </linearGradient>

      <linearGradient id="globeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0.1" />
      </linearGradient>

      <linearGradient id="terraceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
        <stop offset="50%" stop-color="#0284c7" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#0c4a6e" stop-opacity="0.9" />
      </linearGradient>

      <linearGradient id="mountainsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#64748b" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#0f766e" stop-opacity="0.9" />
      </linearGradient>

      <linearGradient id="hillsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#047857" />
        <stop offset="100%" stop-color="#065f46" />
      </linearGradient>

      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15" />
      </filter>
    </defs>

    <style>
      .brand-title { font-family: 'Inter', -apple-system, sans-serif; font-size: 82px; font-weight: 900; letter-spacing: -1px; }
      .brand-sub { font-family: 'Inter', -apple-system, sans-serif; font-size: 52px; font-weight: 900; letter-spacing: 12px; fill: #0b1d3a; }
      .brand-tagline { font-family: 'Inter', -apple-system, sans-serif; font-size: 14.5px; font-weight: 700; letter-spacing: 2.5px; fill: #1e293b; text-anchor: middle; }
      .brand-flow { font-family: 'Inter', -apple-system, sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 3px; fill: #64748b; text-anchor: middle; }
      
      .editorial-label { font-family: 'Inter', -apple-system, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; fill: #f8fafc; opacity: 0.95; }
      .editorial-sub { font-family: 'Inter', -apple-system, sans-serif; font-size: 9.5px; font-weight: 600; letter-spacing: 2px; fill: #e2e8f0; opacity: 0.85; }
      
      .pill-text { font-family: 'Inter', -apple-system, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; fill: #f8fafc; }
      .terrace-text { font-family: 'Inter', -apple-system, sans-serif; font-size: 11.5px; font-weight: 700; letter-spacing: 2px; fill: #334155; }
    </style>

    <!-- Sky Background -->
    <rect width="${width}" height="${height}" fill="url(#skyGrad)" />

    <!-- Sunlight & Soft Cloud Layers -->
    <circle cx="280" cy="180" r="300" fill="url(#sunGlow)" />
    
    <!-- Realistic Clouds -->
    <path d="M-50,220 Q120,130 320,190 T700,160 T1100,200 T1500,150 T1980,210 L1980,480 L-50,480 Z" fill="#ffffff" opacity="0.65" />
    <path d="M-20,260 Q180,200 450,230 T950,210 T1400,240 T1950,190 L1950,520 L-20,520 Z" fill="#f0f9ff" opacity="0.5" />

    <!-- Distant Mountains Layer -->
    <path d="M0,490 L150,440 L380,470 L580,410 L780,460 L1020,380 L1220,440 L1450,390 L1680,450 L1920,410 L1920,620 L0,620 Z" fill="url(#mountainsGrad)" opacity="0.45" />

    <!-- Midground Green Mountains & Valley -->
    <path d="M0,530 Q240,460 520,510 T1040,470 T1560,520 T1920,480 L1920,680 L0,680 Z" fill="url(#hillsGrad)" opacity="0.75" />

    <!-- Clean Blue Water / Lake in Center Valley -->
    <path d="M200,560 C500,550 800,565 1100,555 C1400,545 1700,560 1920,570 L1920,690 L100,690 Z" fill="#0284c7" opacity="0.35" />
    <path d="M300,580 C650,575 1050,585 1400,575 C1650,570 1850,580 1920,585 L1920,690 L200,690 Z" fill="#38bdf8" opacity="0.4" />

    <!-- Left Side: Clean Energy Industrial Facility / Stacks & Architecture -->
    <g transform="translate(40, 310)" opacity="0.95">
      <!-- Stacks and Towers -->
      <rect x="120" y="40" width="16" height="240" fill="#94a3b8" rx="2" />
      <rect x="150" y="70" width="22" height="210" fill="#cbd5e1" rx="3" />
      <rect x="220" y="20" width="14" height="260" fill="#64748b" rx="2" />
      <rect x="270" y="60" width="18" height="220" fill="#cbd5e1" rx="2" />
      
      <!-- Clean White Steam from Stacks -->
      <ellipse cx="128" cy="25" rx="14" ry="20" fill="#ffffff" opacity="0.7" filter="url(#softGlow)" />
      <ellipse cx="227" cy="5" rx="16" ry="24" fill="#ffffff" opacity="0.85" filter="url(#softGlow)" />
      <ellipse cx="279" cy="45" rx="15" ry="22" fill="#ffffff" opacity="0.75" filter="url(#softGlow)" />

      <!-- Facility Complex Buildings -->
      <path d="M80,180 L200,180 L200,280 L80,280 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
      <path d="M190,150 L340,150 L340,280 L190,280 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
      <path d="M330,190 L440,190 L440,280 L330,280 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />

      <!-- High Tech Glass Windows on Plant -->
      <rect x="95" y="200" width="90" height="25" fill="#38bdf8" opacity="0.4" rx="2" />
      <rect x="210" y="170" width="110" height="40" fill="#38bdf8" opacity="0.45" rx="2" />
      <rect x="345" y="210" width="80" height="25" fill="#38bdf8" opacity="0.4" rx="2" />

      <!-- Reactor Spheres & Tanks -->
      <circle cx="60" cy="245" r="30" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
      <circle cx="475" cy="245" r="26" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />

      <!-- Structural Piping & Trusses -->
      <line x1="80" y1="210" x2="340" y2="210" stroke="#94a3b8" stroke-width="3" />
      <line x1="120" y1="235" x2="440" y2="235" stroke="#64748b" stroke-width="2.5" />
    </g>

    <!-- Right Side: Digital Earth Globe & Energy Grid -->
    <g transform="translate(1420, 200)">
      <!-- Glowing Globe Sphere -->
      <circle cx="260" cy="180" r="240" fill="url(#globeGlow)" stroke="#38bdf8" stroke-width="1.5" opacity="0.65" />
      
      <!-- Globe Meridian & Parallel Arcs -->
      <ellipse cx="260" cy="180" rx="240" ry="85" fill="none" stroke="#7dd3fc" stroke-width="1.2" stroke-dasharray="4,4" opacity="0.7" />
      <ellipse cx="260" cy="180" rx="240" ry="170" fill="none" stroke="#7dd3fc" stroke-width="1.2" stroke-dasharray="4,4" opacity="0.7" />
      <ellipse cx="260" cy="180" rx="90" ry="240" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.7" />
      <ellipse cx="260" cy="180" rx="180" ry="240" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.7" />
      
      <!-- Energy Connection Arcs & Glowing Nodes -->
      <path d="M100,120 Q180,40 280,70 T420,180" fill="none" stroke="#10b981" stroke-width="2.5" />
      <circle cx="100" cy="120" r="6" fill="#10b981" filter="url(#softGlow)" />
      <circle cx="280" cy="70" r="5" fill="#38bdf8" filter="url(#softGlow)" />
      <circle cx="420" cy="180" r="6" fill="#10b981" filter="url(#softGlow)" />
    </g>

    <!-- Foreground Modern Terrace & Reflective Infinity Water -->
    <path d="M0,640 L1920,620 L1920,816 L0,816 Z" fill="url(#terraceGrad)" />
    <!-- Glass railing / reflection highlight -->
    <line x1="0" y1="640" x2="1920" y2="620" stroke="#bae6fd" stroke-width="3" opacity="0.8" />
    <line x1="0" y1="646" x2="1920" y2="626" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />

    <!-- Bottom Left Architectural Wall Feature -->
    <path d="M40,680 L420,680 L420,816 L40,816 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
    <text x="60" y="730" class="terrace-text">CLEAN ENERGY</text>
    <text x="60" y="748" class="terrace-text">LOWER EMISSIONS</text>
    <line x1="60" y1="762" x2="140" y2="762" stroke="#94a3b8" stroke-width="1" />
    <text x="60" y="780" style="font-family:'Inter',sans-serif;font-size:9.5px;font-weight:600;letter-spacing:1.5px;fill:#64748b;">PEOPLE • TECHNOLOGY • NATURE</text>
    <text x="60" y="796" style="font-family:'Inter',sans-serif;font-size:9.5px;font-weight:600;letter-spacing:1.5px;fill:#64748b;">A BETTER TOMORROW</text>

    <!-- Bottom Right Architectural Feature Wall -->
    <path d="M1480,600 L1920,570 L1920,780 L1480,780 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="1540" y="640" class="terrace-text">CARBON INTELLIGENCE</text>
    <text x="1540" y="660" class="terrace-text">FOR A CLEANER WORLD</text>
    <line x1="1540" y1="675" x2="1680" y2="675" stroke="#0284c7" stroke-width="1.5" />

    <!-- Top Left Editorial Typography -->
    <g transform="translate(130, 80)">
      <text x="0" y="18" class="editorial-label">MEASURE</text>
      <text x="0" y="38" class="editorial-label">REPORT</text>
      <text x="0" y="58" class="editorial-label">REDUCE</text>
      <text x="0" y="80" class="editorial-sub">A CLEANER</text>
      <text x="0" y="98" class="editorial-sub">TOMORROW</text>
      <line x1="0" y1="112" x2="65" y2="112" stroke="#38bdf8" stroke-width="2" />
    </g>

    <!-- Top Right Editorial Typography -->
    <g transform="translate(1320, 80)">
      <text x="0" y="18" class="editorial-label">TURN</text>
      <text x="0" y="38" class="editorial-label">EMISSIONS</text>
      <text x="0" y="58" class="editorial-label">INTO</text>
      <text x="0" y="78" class="editorial-label">OPPORTUNITIES</text>
      <line x1="0" y1="92" x2="80" y2="92" stroke="#10b981" stroke-width="2" />
    </g>

    <!-- Right Side Solution Feature List & Net Zero 2050 -->
    <g transform="translate(1640, 160)">
      <!-- Net Zero 2050 Callout -->
      <text x="160" y="30" style="font-family:'Inter',sans-serif;font-size:16px;font-weight:900;letter-spacing:2px;fill:#f8fafc;text-anchor:end;">NET ZERO</text>
      <text x="160" y="52" style="font-family:'Inter',sans-serif;font-size:15px;font-weight:800;letter-spacing:3px;fill:#38bdf8;text-anchor:end;">2050</text>
      <line x1="90" y1="62" x2="160" y2="62" stroke="#38bdf8" stroke-width="1.5" />

      <!-- Solution Icons & Text Items -->
      <g transform="translate(30, 100)">
        <!-- 1. GHG Inventory -->
        <g transform="translate(0, 0)">
          <path d="M0,12 L4,12 L4,0 L0,0 Z M6,12 L10,12 L10,4 L6,4 Z M12,12 L16,12 L16,8 L12,8 Z" fill="#93c5fd" />
          <text x="26" y="10" class="pill-text">GHG INVENTORY</text>
        </g>
        
        <!-- 2. Carbon Reporting -->
        <g transform="translate(0, 42)">
          <path d="M2,0 L12,0 L16,4 L16,16 L2,16 Z M4,4 L10,4 M4,8 L14,8 M4,12 L12,12" stroke="#93c5fd" stroke-width="1.5" fill="none" />
          <text x="26" y="12" class="pill-text">CARBON REPORTING</text>
        </g>

        <!-- 3. Carbon Credits -->
        <g transform="translate(0, 84)">
          <path d="M2,14 C2,5 7,2 14,2 C14,9 11,14 2,14 Z M2,14 L8,8" stroke="#86efac" stroke-width="1.5" fill="none" />
          <text x="26" y="12" class="pill-text">CARBON CREDITS</text>
        </g>

        <!-- 4. Decarbonization -->
        <g transform="translate(0, 126)">
          <circle cx="8" cy="8" r="7" stroke="#93c5fd" stroke-width="1.5" fill="none" />
          <circle cx="8" cy="8" r="3" fill="#93c5fd" />
          <text x="26" y="12" class="pill-text">DECARBONIZATION</text>
        </g>

        <!-- 5. Sustainable Growth -->
        <g transform="translate(0, 168)">
          <path d="M8,16 L8,8 M8,8 C5,8 2,5 2,2 C5,2 8,5 8,8 Z M8,11 C11,11 14,8 14,5 C11,5 8,8 8,11 Z" stroke="#86efac" stroke-width="1.5" fill="none" />
          <text x="26" y="12" class="pill-text">SUSTAINABLE GROWTH</text>
        </g>
      </g>
    </g>

    <!-- CENTERPIECE: OFFICIAL ENERIXON CARBON BRAND LOCKUP -->
    <g transform="translate(960, 270)">
      <!-- ENERIXON (Green to Blue gradient) -->
      <text x="0" y="40" class="brand-title" fill="url(#enerixonGrad)" text-anchor="middle" filter="url(#dropShadow)">
        ENERIXON
      </text>

      <!-- CARBON with Organic Leaf -->
      <g transform="translate(0, 110)">
        <text x="-25" y="0" class="brand-sub" text-anchor="middle">
          CARBON
        </text>
        <!-- Vibrant Green Leaf Icon after N -->
        <g transform="translate(160, -38)">
          <path d="M0,32 C0,12 14,0 36,0 C36,20 22,32 0,32 Z" fill="#10b981" />
          <path d="M0,32 C12,22 24,12 36,0" stroke="#059669" stroke-width="2" fill="none" />
        </g>
      </g>

      <!-- Tagline: MEASURE TODAY • COMPLY CONFIDENTLY • REDUCE FOR TOMORROW -->
      <text x="0" y="162" class="brand-tagline">
        MEASURE TODAY  •  COMPLY CONFIDENTLY  •  REDUCE FOR TOMORROW
      </text>

      <!-- Dual Color Accent Bar -->
      <g transform="translate(-40, 185)">
        <rect x="0" y="0" width="38" height="3.5" fill="#10b981" rx="1.5" />
        <rect x="42" y="0" width="38" height="3.5" fill="#0284c7" rx="1.5" />
      </g>

      <!-- Sub-flow: CARBON DATA → CLIMATE ACTION → A SUSTAINABLE FUTURE -->
      <text x="0" y="222" class="brand-flow">
        CARBON DATA  →  CLIMATE ACTION  →  A SUSTAINABLE FUTURE
      </text>
    </g>
  </svg>
  `;

  const outputPath = path.resolve('carbon/assets/branding/ENERIXON_CARBON_HERO_SOURCE_OF_TRUTH.png');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(Buffer.from(svg))
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`[generate-carbon-banner] Successfully generated canonical asset at: ${outputPath}`);
}

generateBanner().catch(err => {
  console.error('Error generating banner:', err);
  process.exit(1);
});
