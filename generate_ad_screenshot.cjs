const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // 1200x630 is the exact LinkedIn OpenGraph Ad standard size
  await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 2 });
  
  await page.goto('http://127.0.0.1:8081/ad_campaign.html', { waitUntil: 'networkidle0' });
  
  // Wait an extra two seconds to guarantee web fonts and local images render flawlessly
  await new Promise(r => setTimeout(r, 2000));
  
  try {
      // Find the specific ad container and screenshot only that element
      const element = await page.$('.w-\\[1200px\\]');
      await element.screenshot({ path: 'Renvolt_LinkedIn_Ad.png' });
      console.log('Saved High-Res PNG: Renvolt_LinkedIn_Ad.png');
  } catch (err) {
      console.log('Error capturing specific container, falling back to full page screenshot.', err);
      await page.screenshot({ path: 'Renvolt_LinkedIn_Ad_fallback.png' });
  }
  
  await browser.close();
})();
