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

// Ensure 'build' directory also exists and is populated
// so Netlify succeeds whether publish is '.' or 'build'
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

const itemsToCopy = [
  'index.html',
  'original.html',
  'resume.html',
  'Gsap X Webflow.html',
  'Gsap X Webflow_files',
  'Project Images',
  'assets',
  'scratch',
  '_redirects'
];

for (const item of itemsToCopy) {
  const src = path.join(__dirname, item);
  const dest = path.join(buildDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
}
console.log('✓ Populated build/ directory for Netlify fallback');

console.log('Build completed successfully. All entrypoints and assets verified!');
