const instancePlaywright = require('./browser/instancePlaywright');
const removeEmptyLines = require('./scraping/parsingScrape');
const extract = require('./model/llmModel')


require('dotenv').config();

const { OpenAI } = require('openai');
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });


async function getHTML(url, selector) {
    //Funcao que vai realizar a leitura do HTML

    const instance  = await instancePlaywright(url, false);
    const response = await instance.page.content()
    
    // Filtra elemento HTML
    const elementHandle = await instance.page.evaluateHandle(selector => {
        const element = document.querySelector(selector);
        return element ? element.innerHTML : '';
    }, selector);
    
    const results = await elementHandle.jsonValue();
    
    //console.log(response.length);
    const blankLinesResults = removeEmptyLines(results);
    
    //console.log(blankLines);
    await instance.browser.close();

    return blankLinesResults;
}



async function processURL(url, selector) {
    // Obtem o HTML da URL
    const html = await getHTML(url, selector);

    // Usa o HTML obtido para fazer o prompt
    const promptResult = await extract(html);

    return promptResult;
}



const selector = "#product-view-div-98506 > div.info__details"
const url = 'https://www.stanley1913.com.br/produto/garrafa-termica-flip-straw-stanley-saffron-651ml-98506';
processURL(url, selector).then(result => {
    console.log("Prompt Result:", result);
});