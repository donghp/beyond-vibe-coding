import sharp from 'sharp';
import fs from 'fs';
import { BVC_VISUAL_DNA } from '../src/data/visualDna.js';

const { width, height, watermark, quality } = BVC_VISUAL_DNA.heroConfig;

const heroes = [
  { src: 'src/assets/images/chapter_00_hero_1789029484769.jpg', dest: 'public/images/chapter-00-hero.webp' },
  { src: 'src/assets/images/chapter_01_hero_1789029445575.jpg', dest: 'public/images/chapter-01-hero.webp' },
  { src: 'src/assets/images/chapter_02_hero_1789029466863.jpg', dest: 'public/images/chapter-02-hero.webp' },
  { src: 'src/assets/images/chapter_03_hero_1789029497915.jpg', dest: 'public/images/chapter-03-hero.webp' },
  { src: 'src/assets/images/chapter_04_hero_1789029512074.jpg', dest: 'public/images/chapter-04-hero.webp' },
  { src: 'src/assets/images/chapter_06_hero_1789029526225.jpg', dest: 'public/images/chapter-06-hero.webp' },
  { src: 'src/assets/images/chapter_07_hero_1789029539459.jpg', dest: 'public/images/chapter-07-hero.webp' },
  { src: 'src/assets/images/chapter_08_hero_1789029553857.jpg', dest: 'public/images/chapter-08-hero.webp' },
];

async function processHeroes() {
  for (const hero of heroes) {
    if (!fs.existsSync(hero.src)) {
      console.warn(`Source not found: ${hero.src}`);
      continue;
    }

    // Create SVG watermark overlay from BVC_VISUAL_DNA configuration
    const svgWatermark = Buffer.from(`
      <svg width="${width}" height="${height}">
        <style>
          .watermark {
            fill: ${watermark.fill};
            font-size: ${watermark.fontSize}px;
            font-family: ${watermark.fontFamily};
            letter-spacing: ${watermark.letterSpacing};
            font-weight: 600;
          }
        </style>
        <text x="${width - 30}" y="${height - 23}" text-anchor="end" class="watermark">${watermark.text}</text>
      </svg>
    `);

    await sharp(hero.src)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .composite([
        {
          input: svgWatermark,
          blend: 'over'
        }
      ])
      .webp({ quality })
      .toFile(hero.dest);

    console.log(`Successfully processed and watermarked: ${hero.dest}`);
  }
}

processHeroes().catch(err => {
  console.error('Error processing heroes:', err);
  process.exit(1);
});
