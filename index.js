const puppeteer = require("puppeteer");

const url =
  "https://www.amazon.co.uk/Samsung-Galaxy-Tab-Lite-Wi-Fi/dp/B086K74BFD/ref=sr_1_29?dchild=1&keywords=tablet&qid=1622735225&sr=8-29";

async function configBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);

  const price = await page.evaluate(
    () => document.querySelector("#priceblock_ourprice").textContent
  );

  console.log(price);
}

async function monitor() {
  let page = await configBrowser();
  await checkPrice(page);
}

monitor();
