const instancePlaywright = require('./browser/instancePlaywright');
const removeEmptyLines = require('./scraping/parsingScrape');


require('dotenv').config();

const { OpenAI } = require('openai');
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });


async function getHTML(url) {
    //Funcao que vai realizar a leitura do HTML

    const instance  = await instancePlaywright(url, '#content_inner > article > div.row > div.col-sm-6.product_main', false);
    const response = await instance.page.content()
    //console.log(response.length);
    const blankLines = removeEmptyLines(response);
    
    console.log(blankLines.length);
    await instance.browser.close();

    return response;
}

getHTML('https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html');

//9033
//7797