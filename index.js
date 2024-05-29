const puppeteer = require("puppeteer");

async function googleSearch() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.google.com", { waitUntil: "domcontentloaded" });

    await page.waitForSelector('textarea[aria-controls="Alh6id"]', { visible: true });
    await page.type('textarea[aria-controls="Alh6id"]', "Bangladesh");
    await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }, page.keyboard.press("Enter"))]);

    await page.waitForSelector(".LC20lb", { visible: true });
    const searchResult = await page.$$eval(".LC20lb", (els) => els.map((e) => ({ title: e.innerText, link: e.parentNode.href })));

    console.log(searchResult);

    await browser.close();
  } catch (error) {
    console.log("An Error is happened");
  }
}

googleSearch();
