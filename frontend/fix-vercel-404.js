#!/usr/bin/env node

/**
 * Script to fix Vercel 404 errors for React Router
 * Run: node fix-vercel-404.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Vercel 404 errors for React Router...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the frontend directory');
  process.exit(1);
}

// 1. Create _redirects file in public directory
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const redirectsContent = '/*    /index.html   200';
const redirectsPath = path.join(publicDir, '_redirects');

fs.writeFileSync(redirectsPath, redirectsContent);
console.log('✅ Created _redirects file in public directory');

// 2. Create simple vercel.json
const simpleVercelConfig = {
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
};

const vercelSimplePath = path.join(__dirname, 'vercel-simple.json');
fs.writeFileSync(vercelSimplePath, JSON.stringify(simpleVercelConfig, null, 2));
console.log('✅ Created vercel-simple.json');

// 3. Check if index.html exists in public
const indexPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log('⚠️  index.html not found in public directory');
  console.log('   This is normal for Create React App');
}

// 4. Check package.json for build script
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (!packageJson.scripts || !packageJson.scripts.build) {
    console.log('⚠️  No build script found in package.json');
  } else {
    console.log('✅ Build script found');
  }
}

console.log('\n🎉 Fixes applied! Next steps:');
console.log('1. Commit and push changes to GitHub');
console.log('2. Go to Vercel dashboard');
console.log('3. Redeploy your project');
console.log('4. Or use the simple config:');
console.log('   - Rename vercel-simple.json to vercel.json');
console.log('   - Commit and push');

console.log('\n📋 Alternative solutions:');
console.log('- Use HashRouter instead of BrowserRouter');
console.log('- Add basename to Router if using subdirectory');
console.log('- Check if all routes are properly defined');

console.log('\n🔍 Debugging tips:');
console.log('- Check Vercel function logs');
console.log('- Verify build output contains index.html');
console.log('- Test routes manually in browser');
