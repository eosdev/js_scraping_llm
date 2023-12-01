const { chromium } = require('@playwright/test');
const { PROXY_URL, PROXY_USERNAME, PROXY_PASSWORD } = require('./config');

async function scrapePlaywright(url, selector, useProxy = false) {
    const args = [
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--mute-audio",
        "--use-fake-device-for-media-stream",
        "--start-maximized",
        "--disable-setuid-sandbox",
        "--disable-web-security"
    ];

    let launchConfig = {
        headless: true,
        args: args,
        slowMo: 60,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
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
        //userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    });
    const response = await page.goto(url);
    
    // Aguarda um tempo para garantir que a página carregou completamente
    await page.waitForTimeout(3000);

    // Filtra elemento HTML
    const elementHandle = await page.evaluateHandle(selector => {
        const element = document.querySelector(selector);
        return element ? element.innerHTML : '';
    }, selector);

    const results = await elementHandle.jsonValue();
    //console.log(results);
    //const html = await page.content();
    const code = response.status();

    return { "browser": browser, "page": page, "code": code, "html": results };
}

module.exports = scrapePlaywright;
