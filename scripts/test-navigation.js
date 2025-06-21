const puppeteer = require('puppeteer');

async function testNavigation() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const APP_URL = 'http://localhost:9002'; // Updated port to match package.json

  // Test desktop navigation
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(APP_URL, { waitUntil: 'networkidle0' });
  
  console.log('Testing desktop navigation...');
  
  const navLinks = [
    '/quiz',
    '/guide',
    '/regional-guide',
    '/popular-blogs',
    '/data-insights',
    '/submit-question'
  ];
  
  for (const link of navLinks) {
    try {
      console.log(`Attempting to navigate to: ${APP_URL}${link}`);
      await page.goto(`${APP_URL}${link}`, { waitUntil: 'networkidle0' });
      const title = await page.title();
      const status = page.url().endsWith(link) ? '✅' : `⚠️  (URL mismatch or redirect: ${page.url()})`;
      console.log(`${status} ${link} - Title: ${title}`);
    } catch (error) {
      console.error(`❌ Failed to navigate to ${link}: ${error.message}`);
    }
  }
  
  // Test mobile navigation
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(APP_URL, { waitUntil: 'networkidle0' });
  
  console.log('Testing mobile navigation...');
  
  try {
    const mobileMenuButtonSelector = 'button[aria-label="Open mobile menu"]';
    await page.waitForSelector(mobileMenuButtonSelector, { visible: true });
    await page.click(mobileMenuButtonSelector);
    
    await page.waitForSelector('[data-testid="mobile-menu"]', { visible: true });
    console.log('✅ Mobile menu opens');

    await page.keyboard.press('Escape');
    await page.waitForSelector('[data-testid="mobile-menu"]', { hidden: true });
    console.log('✅ Mobile menu closes with Escape key');

  } catch (error) {
      console.error(`❌ Mobile menu test failed: ${error.message}`);
  }

  // Test search functionality (Ctrl/Cmd+K)
  try {
    console.log('Testing search modal keyboard shortcut...');
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    });
    
    await page.waitForSelector('[data-testid="search-modal"]', { visible: true });
    console.log('✅ Search modal opens with keyboard shortcut');
    
    await page.keyboard.press('Escape');
    await page.waitForSelector('[data-testid="search-modal"]', { hidden: true });
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