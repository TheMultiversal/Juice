const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const pub = path.join(__dirname, '..', 'public');

async function convert() {
  // Convert favicon.svg → favicon.png (64x64) and favicon-32.png (32x32)
  const faviconSvg = fs.readFileSync(path.join(pub, 'favicon.svg'));
  
  await sharp(faviconSvg, { density: 300 })
    .resize(180, 180)
    .png()
    .toFile(path.join(pub, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png (180x180)');

  await sharp(faviconSvg, { density: 300 })
    .resize(32, 32)
    .png()
    .toFile(path.join(pub, 'favicon-32.png'));
  console.log('✓ favicon-32.png (32x32)');

  await sharp(faviconSvg, { density: 300 })
    .resize(16, 16)
    .png()
    .toFile(path.join(pub, 'favicon-16.png'));
  console.log('✓ favicon-16.png (16x16)');

  // Convert og-image.svg → og-image.png (1200x630)
  const ogSvg = fs.readFileSync(path.join(pub, 'og-image.svg'));
  
  await sharp(ogSvg, { density: 150 })
    .resize(1200, 630)
    .png()
    .toFile(path.join(pub, 'og-image.png'));
  console.log('✓ og-image.png (1200x630)');
  
  console.log('\nDone! All PNG files generated in public/');
}

convert().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
