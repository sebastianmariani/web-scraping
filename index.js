// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");

// const url = "https://about.gitlab.com/jobs/all-jobs/"
// async function configBrowser(site) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(site);
//   return page;
// }

// async function checkPrice(page) {
//   await page.reload();
//   let html = await page.evaluate(() => document.body.innerHTML);

//   const poundPrice = await page.evaluate(
//     () => document.querySelector("#priceblock_ourprice").textContent
//   );

//   let currentPrice = Number(poundPrice.replace(/[^0-9.-]+/g, ""));

//   if (currentPrice < 70) {
//     console.log("Buy it!", poundPrice);
//   } else {
//     console.log("Don't buy it", poundPrice);
//   }
// }

// async function monitor() {
//   let page = await configBrowser(url);
//   console.log(page)
// }

// monitor();

const request = require("request")
const cheerio = require("cheerio")

request("https://www.comeet.com/jobs/brandbastion/A7.008", (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html)

    const items = $.html(".positionsGroupTitle")
    console.log(items)
  }
})