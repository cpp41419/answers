
const puppeteer = require('puppeteer');

async function testNavigation() {
  const browser = await puppeteer.launch({ headless: "new" }); // Updated for modern Puppeteer
  const page = await browser.newPage();
  
  const APP_URL = 'http://localhost:3000'; // Assuming default port from your package.json dev script

  // Test desktop navigation
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(APP_URL, { waitUntil: 'networkidle0' });
  
  console.log('Testing desktop navigation...');
  
  // Test main navigation links
  // Note: These links are based on the user's provided menuItems.
  // Some of these pages might not exist in the current project and will 404.
  // The script will still attempt to navigate.
  const navLinks = [
    '/providers',    // Might 404
    '/compare',      // Might 404
    '/quiz',         // Should exist (was /evaluate)
    '/regional-guide', // Should exist (was /states-directory)
    '/data-insights',  // Should exist (was /insights)
    '/about'         // Might 404
  ];
  
  for (const link of navLinks) {
    try {
      console.log(`Attempting to navigate to: ${APP_URL}${link}`);
      // For SPA-like navigation, ensure clicking actual links if they are rendered
      // For direct goto, it tests if the route itself is handled.
      // If desktop nav items are rendered, prefer clicking them:
      // Example: await page.click(`a[href="${link}"]`);
      // For now, using goto to check route handling:
      await page.goto(`${APP_URL}${link}`, { waitUntil: 'networkidle0' });
      const title = await page.title();
      const status = page.url().endsWith(link) ? '✅' : '⚠️ (URL mismatch or redirect)';
      console.log(`${status} ${link} - Title: ${title}, URL: ${page.url()}`);
    } catch (error) {
      console.error(`❌ Failed to navigate to ${link}: ${error.message}`);
    }
  }
  
  // Test mobile navigation
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(APP_URL, { waitUntil: 'networkidle0' });
  
  console.log('Testing mobile navigation...');
  
  try {
    // Click mobile menu trigger
    // The selector needs to match what's in Header.tsx
    const mobileMenuButtonSelector = 'button[aria-label="Open mobile menu"]';
    await page.waitForSelector(mobileMenuButtonSelector, { visible: true });
    await page.click(mobileMenuButtonSelector);
    
    // Wait for MobileMenu panel to be visible (using data-testid)
    await page.waitForSelector('[data-testid="mobile-menu"]', { visible: true });
    console.log('✅ Mobile menu opens');

    // Test closing menu with Escape key
    await page.keyboard.press('Escape');
    await page.waitForSelector('[data-testid="mobile-menu"]', { hidden: true }); // Wait for it to be hidden
    console.log('✅ Mobile menu closes with Escape key');

  } catch (error) {
      console.error(`❌ Mobile menu test failed: ${error.message}`);
  }

  
  // Test search functionality (Ctrl/Cmd+K)
  try {
    console.log('Testing search modal keyboard shortcut...');
    // Re-open page or ensure it's in a clean state for keyboard shortcuts
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });

    // Puppeteer's keyboard.down/press/up can be tricky with modifiers.
    // A more direct way if possible, or ensure focus is on the body for global shortcuts.
    await page.evaluate(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    });
    
    await page.waitForSelector('[data-testid="search-modal"]', { visible: true });
    console.log('✅ Search modal opens with keyboard shortcut (Ctrl+K)');
    
    // Test closing search with Escape key
    await page.keyboard.press('Escape');
    await page.waitForSelector('[data-testid="search-modal"]', { hidden: true }); // Wait for it to be hidden
    console.log('✅ Search modal closes with Escape key');

  } catch (error) {
    console.error(`❌ Search modal test failed: ${error.message}`);
  }
  
  await browser.close();
  console.log('Navigation tests completed.');
}

testNavigation().catch(e => {
  console.error("Error during Puppeteer test execution:", e);
  process.exit(1);
});
