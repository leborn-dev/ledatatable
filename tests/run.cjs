const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href);
    await page.waitForFunction(() => window.global_test_results, null, { timeout: 30000 });
    const result = await page.evaluate(() => window.global_test_results);
    console.log(JSON.stringify(result, null, 2));
    if (errors.length || result.failed || result.total === 0) {
      throw new Error(`Browser tests failed: ${errors.join('; ') || result.failed}`);
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
