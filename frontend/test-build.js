#!/usr/bin/env node

/**
 * Test script to verify build before deployment
 * Run: node test-build.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing build process...\n');

try {
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    throw new Error('❌ package.json not found');
  }
  console.log('✅ package.json found');

  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }
  console.log('✅ Dependencies ready');

  // Test build
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');

  // Check build output
  const buildDir = path.join(__dirname, 'build');
  if (!fs.existsSync(buildDir)) {
    throw new Error('❌ Build directory not created');
  }
  console.log('✅ Build directory created');

  // Check if index.html exists
  const indexPath = path.join(buildDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('❌ index.html not found in build');
  }
  console.log('✅ index.html found');

  // Check build size
  const stats = fs.statSync(buildDir);
  console.log(`📊 Build size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

  console.log('\n🎉 Build test passed! Ready for deployment.');
  console.log('\n📋 Next steps:');
  console.log('1. Push code to GitHub');
  console.log('2. Connect repository to Vercel');
  console.log('3. Set environment variables');
  console.log('4. Deploy!');

} catch (error) {
  console.error('\n❌ Build test failed:');
  console.error(error.message);
  process.exit(1);
}
