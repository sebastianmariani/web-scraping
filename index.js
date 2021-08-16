const puppeteer = require("puppeteer");

const url =
  "https://www.amazon.co.uk/Raspberry-Pi-ARM-Cortex-A72-Bluetooth-Micro-HDMI/dp/B07TC2BK1X/ref=sr_1_4?dchild=1&keywords=raspberry+pi&qid=1623167718&sr=8-4";

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

  if (currentPrice < 60) {
    console.log("Buy it!", currentPrice);
  } else {
    console.log("Don't buy it", currentPrice);
  }
}

async function monitor() {
  let page = await configBrowser();
  await checkPrice(page);
}

monitor();
