import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import sharp from 'sharp';

// VietQR CRC16-CCITT calculation
function calcCRC16(data) {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Build VietQR EMVCo payload
function buildVietQRPayload(amount, message = 'Ung ho Beyond Vibe Coding') {
  // Format payload according to VietQR specification
  // Tag 00: Version
  let payload = '000201';
  // Tag 01: Dynamic QR (12)
  payload += '010212';
  
  // Tag 38: Merchant Account Information
  // 00: GUID A000000727
  // 01: Beneficiary Bank (e.g. VietinBank 970415 or standard napas)
  const guid = '0010A000000727';
  const bin = '970415'; // VietinBank
  const acc = '101872898989';
  const sub01 = `0006${bin}01${acc.length.toString().padStart(2, '0')}${acc}`;
  const sub02 = '0208QRIBFTTA';
  const tag38Value = `${guid}01${sub01.length.toString().padStart(2, '0')}${sub01}${sub02}`;
  payload += `38${tag38Value.length.toString().padStart(2, '0')}${tag38Value}`;
  
  // Tag 53: VND Currency
  payload += '5303704';
  
  // Tag 54: Amount
  const amtStr = amount.toString();
  payload += `54${amtStr.length.toString().padStart(2, '0')}${amtStr}`;
  
  // Tag 58: Country Code VN
  payload += '5802VN';
  
  // Tag 62: Additional Data Field (Message)
  if (message) {
    const msgField = `08${message.length.toString().padStart(2, '0')}${message}`;
    payload += `62${msgField.length.toString().padStart(2, '0')}${msgField}`;
  }
  
  // Tag 63: CRC
  payload += '6304';
  const crc = calcCRC16(payload);
  return payload + crc;
}

// VietQR center logo SVG (V mark)
const vietQrLogoSvg = `
<svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="8" fill="white" />
  <g transform="translate(18, 18) scale(0.64)">
    <path d="M12.5 15.2C10.2 12.1 13.8 8.1 17.5 10.8L47.2 33.1C49.5 34.8 52.8 34.8 55.1 33.1L84.8 10.8C88.5 8.1 92.1 12.1 89.8 15.2L55.2 61.8C53 64.8 48.8 65.5 45.7 63.3L12.5 15.2Z" fill="#A82020" />
    <path d="M47.5 35.8L17.5 10.8C13.8 8.1 10.2 12.1 12.5 15.2L45.7 63.3C48.8 65.5 53 64.8 55.2 61.8L89.8 15.2C92.1 12.1 88.5 8.1 84.8 10.8L54.8 35.8C52.6 37.6 49.7 37.6 47.5 35.8Z" fill="#EE2A35" />
    <path d="M46.8 65.2C48.5 67.5 51.5 68.2 53.9 66.8L84.8 49.1C87.8 47.4 88.1 43.1 85.3 41L78.2 35.8L51.2 58.9L46.8 65.2Z" fill="#C0262D" />
  </g>
</svg>
`;

async function generateQRImage({ amount, filename, hasBorder = false }) {
  const payload = buildVietQRPayload(amount);
  
  // Generate QR as high resolution PNG buffer
  const qrSvg = await QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: 'Q',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  // Render SVG to 400x400 PNG with sharp
  const qrBuffer = await sharp(Buffer.from(qrSvg))
    .resize(400, 400, { fit: 'fill' })
    .png()
    .toBuffer();

  const logoBuffer = await sharp(Buffer.from(vietQrLogoSvg))
    .resize(80, 80)
    .png()
    .toBuffer();

  const composites = [
    {
      input: logoBuffer,
      top: 160,
      left: 160
    }
  ];

  let finalImage = sharp(qrBuffer).composite(composites);

  if (hasBorder) {
    // Add 2px navy border
    const borderSvg = `
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="398" height="398" stroke="#002d62" stroke-width="2" fill="none" />
      </svg>
    `;
    const borderBuffer = await sharp(Buffer.from(borderSvg)).png().toBuffer();
    finalImage = sharp(await finalImage.toBuffer()).composite([{ input: borderBuffer, top: 0, left: 0 }]);
  }

  const outputDirs = [
    path.join(process.cwd(), 'public/images/bonus'),
    path.join(process.cwd(), 'public/images'),
    path.join(process.cwd(), 'public')
  ];

  for (const dir of outputDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const targetFile = path.join(dir, filename);
    await finalImage.clone().toFile(targetFile);
    console.log('Saved:', targetFile);
  }
}

async function main() {
  const items = [
    { amount: 30000, filename: 'BONUS_30K.png', hasBorder: false },
    { amount: 50000, filename: 'BONUS_50K.png', hasBorder: false },
    { amount: 100000, filename: 'BONUS_100K.png', hasBorder: false },
    { amount: 200000, filename: 'BONUS_200K.png', hasBorder: true },
    { amount: 300000, filename: 'BONUS_300K.png', hasBorder: false },
  ];

  for (const item of items) {
    await generateQRImage(item);
  }
  console.log('All 5 QR images successfully generated and stored in public assets!');
}

main().catch(console.error);
