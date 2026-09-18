import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateDerivedLogos() {
  const brandFolder = path.resolve('carbon/assets/branding/derived');
  fs.mkdirSync(brandFolder, { recursive: true });

  // 1. Desktop Logo: 190x64
  const svgDesktop = `
  <svg width="190" height="64" viewBox="0 0 190 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#0284c7" />
      </linearGradient>
    </defs>
    <style>
      .enerixon-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 19px;
        font-weight: 800;
        fill: url(#logoGrad);
        letter-spacing: -0.5px;
      }
      .carbon-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 19px;
        font-weight: 800;
        fill: #0B1727;
        letter-spacing: -0.5px;
      }
    </style>
    <g transform="translate(10, 39)">
      <text x="0" y="0" class="enerixon-title">ENERIXON</text>
      <text x="110" y="0" class="carbon-title">CARBON</text>
      <!-- Leaf icon right after CARBON -->
      <g transform="translate(186, -15) scale(0.42)">
        <path d="M0,32 C0,12 14,0 36,0 C36,20 22,32 0,32 Z" fill="#10b981" />
        <path d="M0,32 C12,22 24,12 36,0" stroke="#059669" stroke-width="2" fill="none" />
      </g>
    </g>
  </svg>
  `;

  // 2. Laptop Logo: 165x56
  const svgLaptop = `
  <svg width="165" height="56" viewBox="0 0 165 56" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradLaptop" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#0284c7" />
      </linearGradient>
    </defs>
    <style>
      .enerixon-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 16.5px;
        font-weight: 800;
        fill: url(#logoGradLaptop);
        letter-spacing: -0.4px;
      }
      .carbon-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 16.5px;
        font-weight: 800;
        fill: #0B1727;
        letter-spacing: -0.4px;
      }
    </style>
    <g transform="translate(8, 34)">
      <text x="0" y="0" class="enerixon-title">ENERIXON</text>
      <text x="96" y="0" class="carbon-title">CARBON</text>
      <!-- Leaf icon right after CARBON -->
      <g transform="translate(162, -13) scale(0.36)">
        <path d="M0,32 C0,12 14,0 36,0 C36,20 22,32 0,32 Z" fill="#10b981" />
        <path d="M0,32 C12,22 24,12 36,0" stroke="#059669" stroke-width="2" fill="none" />
      </g>
    </g>
  </svg>
  `;

  // 3. Mobile Logo: 120x40
  const svgMobile = `
  <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradMobile" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#0284c7" />
      </linearGradient>
    </defs>
    <style>
      .enerixon-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 800;
        fill: url(#logoGradMobile);
        letter-spacing: -0.3px;
      }
      .carbon-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 800;
        fill: #0B1727;
        letter-spacing: -0.3px;
      }
    </style>
    <g transform="translate(6, 25)">
      <text x="0" y="0" class="enerixon-title">ENERIXON</text>
      <text x="70" y="0" class="carbon-title">CARBON</text>
      <!-- Leaf icon right after CARBON -->
      <g transform="translate(118, -10) scale(0.26)">
        <path d="M0,32 C0,12 14,0 36,0 C36,20 22,32 0,32 Z" fill="#10b981" />
        <path d="M0,32 C12,22 24,12 36,0" stroke="#059669" stroke-width="2" fill="none" />
      </g>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svgDesktop))
    .png({ quality: 100 })
    .toFile(path.join(brandFolder, 'logo_desktop.png'));

  await sharp(Buffer.from(svgLaptop))
    .png({ quality: 100 })
    .toFile(path.join(brandFolder, 'logo_laptop.png'));

  await sharp(Buffer.from(svgMobile))
    .png({ quality: 100 })
    .toFile(path.join(brandFolder, 'logo_mobile.png'));

  console.log('Successfully generated clean derived logos for all resolutions!');
}

generateDerivedLogos().catch(console.error);
