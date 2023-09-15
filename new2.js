const fs = require("fs");
const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const data = require("./combinedData.json");
puppeteerExtra.use(AdblockerPlugin());
// const sleep = (milliseconds) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

(async () => {
  const browser = await puppeteerExtra.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  for (const category of data) {
    for (const subcategory of category.sub) {
      console.log("working of  : ", subcategory.subcat.name);
      for (const item of subcategory.data) {
        await page.goto(item.link, { timeout: 180000 });
        const elementText = await page.evaluate(() => {
          const element = document.querySelector("#overview");

          if (element) {
            return element.outerHTML;
          } else {
            return null; // Element not found
          }
        });
        // Add the new key-value pair to each item in the "data" array
        console.log("get data of : ", item.link);
        item["detail"] = elementText;
      }
    }
  }
  console.log(data, "data");
  fs.writeFileSync("final.json", JSON.stringify(data, null, 2));

  // }
  //   await browser.close();
})();
