const cheerio = require("cheerio");
const instancePlaywright = require('./browser/instancePlaywright');
const {Configuration, OpenAIApi} = require('openai');

require('dotenv').config();

//chamada da API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



async function getHTML(url) {
    //Funcao que vai realizar a leitura do HTML

    const instance  = await instancePlaywright(url, false);
    
    const html = await instance.page.content();
    console.log(html);

    await instance.browser.close();
};


async function getPrompt(html) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "Say this is a test" }, //orienta comportamento do seu modelo durante toda a conversa
            { role: "user", content: html }
        ],
        
    });
}



//getHTML('http://htmlpreview.github.io/?https://github.com/twbs/bootstrap/blob/gh-pages/2.3.2/index.html')

//usar variavel de ambiente
//console.log(process.env.MY_ENV_VAR);