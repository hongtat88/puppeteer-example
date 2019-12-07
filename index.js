//npm i puppeteer

const puppeteer = require('puppeteer');
const chromeOptions = {
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // set to google chrome path
    slowMo: 10,
    ignoreDefaultArgs: ['--disable-extensions']
};

(async function main() {
    // init browser
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://digi.time.com.my/sis', {
        waitUntil: 'networkidle2'
    });

    // login
    const username = await page.waitForSelector("[name='username']");;
    await username.type("testing");

    const password = await page.waitForSelector("[name='password']");;
    await password.type("testing");
    
    await page.screenshot({ path: 'login.png' });

    const submitButton = await page.waitForSelector("[type='submit']");
    await submitButton.click();

    // after login
    await page.waitForXPath('/html/body/div/table/tbody/tr/td/div/div/img');

    await page.screenshot({ path: 'after-login.png' });

    // more example to automate the flow
    // https://github.com/checkly/puppeteer-examples

    // destroy the browser
    await browser.close();
})();