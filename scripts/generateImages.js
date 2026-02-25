/**
 * Generate favicon (Israeli juice box) and OG image as PNG files.
 * Uses sharp with simple SVG overlays - no external fonts or complex patterns.
 */
const sharp = require('sharp');
const path  = require('path');
const pub   = path.join(__dirname, '..', 'public');

/* ───────── Israeli Juice Box Favicon (64×64 base) ───────── */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="boxFace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e6e9f0"/>
    </linearGradient>
    <linearGradient id="boxTop" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#d8dce6"/>
      <stop offset="100%" stop-color="#f0f2f8"/>
    </linearGradient>
    <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#002d8f"/>
      <stop offset="50%" stop-color="#0044cc"/>
      <stop offset="100%" stop-color="#002d8f"/>
    </linearGradient>
    <linearGradient id="strawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e0e4ee"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#c8cdd8"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#001a4d" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect x="12" y="18" width="40" height="38" rx="2.5" fill="url(#boxFace)" stroke="#b0b8c8" stroke-width="0.6" filter="url(#shadow)"/>
  <path d="M12,18 L12,56 L10,54 L10,20 Z" fill="#c8cdd8" opacity="0.5"/>
  <polygon points="12,18 20,8 44,8 52,18" fill="url(#boxTop)" stroke="#b0b8c8" stroke-width="0.5"/>
  <line x1="32" y1="8" x2="32" y2="18" stroke="#c0c8d4" stroke-width="0.4" opacity="0.6"/>
  <rect x="12" y="18" width="40" height="6" rx="0.5" fill="url(#stripeGrad)"/>
  <rect x="12" y="49" width="40" height="6" rx="0.5" fill="url(#stripeGrad)"/>
  <g transform="translate(32,37)">
    <polygon points="0,-10 8.66,5 -8.66,5" fill="none" stroke="#0038b8" stroke-width="1.8" stroke-linejoin="round"/>
    <polygon points="0,10 8.66,-5 -8.66,-5" fill="none" stroke="#0038b8" stroke-width="1.8" stroke-linejoin="round"/>
  </g>
  <rect x="39" y="2" width="3" height="20" rx="1.5" fill="url(#strawGrad)" stroke="#8090a8" stroke-width="0.5"/>
  <path d="M42,5 L48,5 L48,2 L42,2" fill="url(#strawGrad)" stroke="#8090a8" stroke-width="0.5"/>
  <ellipse cx="48" cy="3.5" rx="1" ry="1.5" fill="#d0d4de" stroke="#8090a8" stroke-width="0.3"/>
  <rect x="15" y="25" width="3" height="14" rx="1.5" fill="#fff" opacity="0.35"/>
  <rect x="20" y="27" width="1.5" height="8" rx="0.75" fill="#fff" opacity="0.2"/>
</svg>`;

/* --------- OG Image (1200x630) - built with shapes only --------- */
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#001428"/>
      <stop offset="50%" stop-color="#002244"/>
      <stop offset="100%" stop-color="#001428"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0038b8"/>
      <stop offset="100%" stop-color="#0056b3"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff9800"/>
      <stop offset="100%" stop-color="#ffc107"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid lines for texture -->
  <g stroke="#0056b3" stroke-width="0.5" opacity="0.08">
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="500" x2="1200" y2="500"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Decorative network dots -->
  <circle cx="80" cy="100" r="4" fill="#0056b3" opacity="0.3"/>
  <circle cx="160" cy="60" r="3" fill="#007bff" opacity="0.25"/>
  <circle cx="220" cy="130" r="5" fill="#0056b3" opacity="0.3"/>
  <line x1="80" y1="100" x2="160" y2="60" stroke="#0056b3" stroke-width="1" opacity="0.15"/>
  <line x1="160" y1="60" x2="220" y2="130" stroke="#0056b3" stroke-width="1" opacity="0.15"/>

  <circle cx="1000" cy="500" r="4" fill="#0056b3" opacity="0.3"/>
  <circle cx="1080" cy="540" r="3" fill="#007bff" opacity="0.25"/>
  <circle cx="1130" cy="480" r="5" fill="#0056b3" opacity="0.3"/>
  <line x1="1000" y1="500" x2="1080" y2="540" stroke="#0056b3" stroke-width="1" opacity="0.15"/>
  <line x1="1080" y1="540" x2="1130" y2="480" stroke="#0056b3" stroke-width="1" opacity="0.15"/>

  <!-- Israeli juice box icon (left side) -->
  <g transform="translate(80, 170) scale(3)">
    <rect x="12" y="18" width="40" height="38" rx="2.5" fill="#fff" stroke="#b0b8c8" stroke-width="0.6"/>
    <path d="M12,18 L12,56 L10,54 L10,20 Z" fill="#c8cdd8" opacity="0.5"/>
    <polygon points="12,18 20,8 44,8 52,18" fill="#eef0f6" stroke="#b0b8c8" stroke-width="0.5"/>
    <line x1="32" y1="8" x2="32" y2="18" stroke="#c0c8d4" stroke-width="0.4" opacity="0.6"/>
    <rect x="12" y="18" width="40" height="6" rx="0.5" fill="#0038b8"/>
    <rect x="12" y="49" width="40" height="6" rx="0.5" fill="#0038b8"/>
    <g transform="translate(32,37)">
      <polygon points="0,-10 8.66,5 -8.66,5" fill="none" stroke="#0038b8" stroke-width="1.8" stroke-linejoin="round"/>
      <polygon points="0,10 8.66,-5 -8.66,-5" fill="none" stroke="#0038b8" stroke-width="1.8" stroke-linejoin="round"/>
    </g>
    <rect x="39" y="2" width="3" height="20" rx="1.5" fill="#e8ecf4" stroke="#8090a8" stroke-width="0.5"/>
    <path d="M42,5 L48,5 L48,2 L42,2" fill="#e8ecf4" stroke="#8090a8" stroke-width="0.5"/>
    <ellipse cx="48" cy="3.5" rx="1" ry="1.5" fill="#d0d4de" stroke="#8090a8" stroke-width="0.3"/>
    <rect x="15" y="25" width="3" height="14" rx="1.5" fill="#fff" opacity="0.35"/>
    <rect x="20" y="27" width="1.5" height="8" rx="0.75" fill="#fff" opacity="0.2"/>
  </g>

  <!-- Title: "THE JUICE BOX" as individual letter rectangles for guaranteed rendering -->
  <!-- Using SVG text with embedded font-family fallbacks -->
  <text x="370" y="250" font-size="76" font-weight="bold" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" letter-spacing="2">The Juice Box</text>

  <!-- Gold accent line -->
  <rect x="370" y="272" width="220" height="5" rx="2" fill="url(#gold)"/>

  <!-- Subtitle -->
  <text x="370" y="320" font-size="26" fill="#8ab4f8" font-family="Arial, Helvetica, sans-serif">Jewish Organizations Intelligence Database</text>

  <!-- Stats boxes -->
  <!-- Box 1 -->
  <rect x="370" y="360" width="170" height="65" rx="10" fill="#0038b8" opacity="0.25" stroke="#0056b3" stroke-width="1"/>
  <text x="455" y="393" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffc107" font-family="Arial, Helvetica, sans-serif">1,333+</text>
  <text x="455" y="415" text-anchor="middle" font-size="15" fill="#8ab4f8" font-family="Arial, Helvetica, sans-serif">Entries</text>

  <!-- Box 2 -->
  <rect x="560" y="360" width="170" height="65" rx="10" fill="#0038b8" opacity="0.25" stroke="#0056b3" stroke-width="1"/>
  <text x="645" y="393" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffc107" font-family="Arial, Helvetica, sans-serif">118</text>
  <text x="645" y="415" text-anchor="middle" font-size="15" fill="#8ab4f8" font-family="Arial, Helvetica, sans-serif">Countries</text>

  <!-- Box 3 -->
  <rect x="750" y="360" width="170" height="65" rx="10" fill="#0038b8" opacity="0.25" stroke="#0056b3" stroke-width="1"/>
  <text x="835" y="393" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffc107" font-family="Arial, Helvetica, sans-serif">1,092+</text>
  <text x="835" y="415" text-anchor="middle" font-size="15" fill="#8ab4f8" font-family="Arial, Helvetica, sans-serif">People</text>

  <!-- Domain -->
  <text x="370" y="490" font-size="22" fill="#607d8b" font-family="Arial, Helvetica, sans-serif">TheJuiceBox.Live</text>

  <!-- Est -->
  <text x="370" y="520" font-size="16" fill="#546e7a" font-family="Arial, Helvetica, sans-serif">Est. 2016</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="618" width="1200" height="12" fill="url(#accent)"/>
</svg>`;

async function generate() {
  // Favicon variants
  const favBuf = Buffer.from(faviconSvg);

  await sharp(favBuf, { density: 300 })
    .resize(180, 180)
    .png()
    .toFile(path.join(pub, 'apple-touch-icon.png'));
  console.log('  apple-touch-icon.png (180x180)');

  await sharp(favBuf, { density: 300 })
    .resize(32, 32)
    .png()
    .toFile(path.join(pub, 'favicon-32.png'));
  console.log('  favicon-32.png (32x32)');

  await sharp(favBuf, { density: 300 })
    .resize(16, 16)
    .png()
    .toFile(path.join(pub, 'favicon-16.png'));
  console.log('  favicon-16.png (16x16)');

  // OG Image
  const ogBuf = Buffer.from(ogSvg);
  await sharp(ogBuf, { density: 150 })
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(path.join(pub, 'og-image.png'));
  console.log('  og-image.png (1200x630)');

  console.log('Done!');
}

generate().catch(err => { console.error(err); process.exit(1); });
