const { chromium } = require('@playwright/test');
const { PROXY_URL, PROXY_USERNAME, PROXY_PASSWORD } = require('./config');

async function instancePlaywright(url, useProxy = false) {
    const args = [
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--mute-audio",
        "--use-fake-device-for-media-stream",
        "--start-maximezed",
        "--disable-setuid-sandbox",
        "--disable-web-security"
    ];

    let launchConfig = {
        headless: true,
        args: args,
        slowMo: 60
    };

    if (useProxy) {
        launchConfig.proxy = {
            server: PROXY_URL,
            username: PROXY_USERNAME,
            password: PROXY_PASSWORD
        };
    }

    const browser = await chromium.launch(launchConfig);
    const context = await browser.newContext({
        timeout: 60000 // Aumenta o timeout padrão para 60 segundos
    });
    const page = await context.newPage({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    });

    const response = await page.goto(url);
    
    await page.waitForTimeout(15000);

    const html = await page.content();
    const code = response.status();

    //await page.screenshot({ path: 'screenshot.png' });

    return { "browser": browser, "page": page, "code": code, "html": html };
}

module.exports = instancePlaywright;
