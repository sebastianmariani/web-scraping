const puppeteer = require("puppeteer");

const url =
  "https://www.amazon.co.uk/Raspberry-Pi-ARM-Cortex-A72-Bluetooth-Micro-HDMI/dp/B0899VXM8F/ref=sr_1_3?dchild=1&keywords=raspberry%2Bpi%2B4&qid=1629218773&sr=8-3&th=1";

async function configBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);

  const poundPrice = await page.evaluate(
    () => document.querySelector("#priceblock_ourprice").textContent
  );

  let currentPrice = Number(poundPrice.replace(/[^0-9.-]+/g, ""));

  if (currentPrice < 70) {
    console.log("Buy it!", poundPrice);
  } else {
    console.log("Don't buy it", poundPrice);
  }
}

async function monitor() {
  let page = await configBrowser();
  await checkPrice(page);
}

monitor();
