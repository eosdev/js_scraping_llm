const instancePlaywright = require('./browser/instancePlaywright');


require('dotenv').config();

/*const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
*/

const { OpenAI } = require('openai');
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });


async function getHTML(url) {
    //Funcao que vai realizar a leitura do HTML

    const instance  = await instancePlaywright(url, false);
    const response = await instance.page.content();

    await instance.browser.close();

    return response;
}


async function getPrompt(html) {

    //Funcao que vai realizar o prompt
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
            { role: "system", content: "Extraia o caminho do seletor para o preço do produto desta página" }, //orienta comportamento do seu modelo durante toda a conversa
            { role: "user", content: html }
        ],
        
    });
    console.log(chatCompletion.choices[0].message);

    return chatCompletion.choices[0].message.content
}


async function processURL(url) {
    // Obtem o HTML da URL
    const html = await getHTML(url);

    // Usa o HTML obtido para fazer o prompt
    const promptResult = await getPrompt(html);

    return promptResult;
}


//usar variavel de ambiente
//console.log(process.env.MY_ENV_VAR);



const url = 'https://htmlpreview.github.io/?https://github.com/rochesterj/ai-price-monitoring/blob/main/01.html';
processURL(url).then(result => {
    console.log("Resultado do Prompt:", result);
});