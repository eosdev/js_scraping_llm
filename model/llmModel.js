const { zSchema} = require('/Users/edensantana/js_scraping_llm/scraping/schemasTemplate.js');
const ChatOpenAI = require("langchain/chat_models/openai").ChatOpenAI;
const { createExtractionChainFromZod } = require("langchain/chains");
require('dotenv').config({path:'/Users/edensantana/js_scraping_llm/.env'});

const llm = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  maxTokens: 256
});


const schema = new zSchema().getSchema();  // Definindo o esquema fora da função


// Função de extração
async function extract(content) {
  try {
      const chain = createExtractionChainFromZod(schema, llm);  // Esquema zSchema
      const result = await chain.run(content);
      //console.log(result);
      return result
  } catch (error) {
    console.error("Error running chain:", error);
  }
}

// Chamando a função extract
//extract(`Alex is 5 feet tall. Claudia is 4 feet taller than Alex and jumps higher than him. Claudia is a brunette and Alex is blonde. Alex's dog Frosty is a labrador and likes to play hide and seek.`);

module.exports = extract;