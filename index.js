const cheerio = require("cheerio");
const instancePlaywright = require('./browser/instancePlaywright');


async function getHTML(url) {

    const instance  = await instancePlaywright(url, false);
    
    const html = await instance.page.content();
    console.log(html);

    await instance.browser.close();
};



getHTML('http://htmlpreview.github.io/?https://github.com/twbs/bootstrap/blob/gh-pages/2.3.2/index.html')
