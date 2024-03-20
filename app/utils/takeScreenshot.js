const puppeteer = require("puppeteer");
const takeWebpageScreenshot = async (url)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return await page.screenshot()
}

module.exports = {takeWebpageScreenshot}