const instancePlaywright = require('./browser/instancePlaywright');

async function getIP(){
    const url = "https://ipinfo.io/json";
    const instance = await instancePlaywright(url, true);
    //const html = instance.html;
    const page = instance.page;
    const jsonResponse = await page.evaluate(() => {
        return JSON.parse(document.querySelector("body").innerText); 
    });
    await instance.browser.close();
    
    return jsonResponse;
}

async function viewIP(){
    const jsonResponse = await getIP();
    console.log('IP:', jsonResponse);
    
}

//module.exports = viewIP;
viewIP().catch(console.error);
  