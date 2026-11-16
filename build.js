const fs = require('fs');
const path = require('path');

console.log('Building Dynamic Portfolio Website...');

const filesToCheck = ['index.html', 'original.html', 'resume.html'];
let hasError = false;

for (const file of filesToCheck) {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`✓ Verified ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`✗ Missing required entrypoint: ${file}`);
    hasError = true;
  }
}

// Check Gsap assets
const assetDir = 'Gsap X Webflow_files';
if (fs.existsSync(assetDir)) {
  const assets = fs.readdirSync(assetDir);
  console.log(`✓ Verified ${assets.length} core assets in ${assetDir}/`);
} else {
  console.error(`✗ Missing asset directory: ${assetDir}`);
  hasError = true;
}

if (hasError) {
  process.exit(1);
}

console.log('Build completed successfully. All entrypoints and assets verified!');
