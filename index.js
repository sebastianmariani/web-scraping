const puppeteer = require("puppeteer");

const url =
  "https://www.amazon.co.uk/gp/product/B00NPYDJ6U?pf_rd_r=3JJDZ5X1KKSTTHQMNEJG&pf_rd_p=6f2bfee9-92a9-4ec5-94b5-ed7bbe78d734&pd_rd_r=0fca5c77-4d69-4613-98ad-6a9f423bc62c&pd_rd_w=ta4U6&pd_rd_wg=7rGlb&ref_=pd_gw_unk";

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
