const instancePlaywright = require('./browser/instancePlaywright');
const removeEmptyLines = require('./scraping/parsingScrape');
const extract = require('./model/llmModel')


require('dotenv').config();

const { OpenAI } = require('openai');
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });


async function getHTML(url) {
    //Funcao que vai realizar a leitura do HTML

    const instance  = await instancePlaywright(url, false);
    const response = await instance.page.content()
    
    // Filtra elemento HTML
    const selector = '#default > div > div > div.content' 
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



async function processURL(url) {
    // Obtem o HTML da URL
    const html = await getHTML(url);

    // Usa o HTML obtido para fazer o prompt
    const promptResult = await extract(html);

    return promptResult;
}


//processURL('https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html');


const url = 'https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html';
processURL(url).then(result => {
    console.log("Prompt Result:", result);
});