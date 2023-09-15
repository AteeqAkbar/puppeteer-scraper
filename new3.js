const fs = require("fs");
const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const data = require("./combinedData.json");
puppeteerExtra.use(AdblockerPlugin());

const retryDelay = 5000; // 5 seconds (adjust as needed)
const maxRetries = 3; // Maximum number of retries (adjust as needed)

(async () => {
  const browser = await puppeteerExtra.launch({
    headless: true,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  for (const category of data) {
    for (const subcategory of category.sub) {
      console.log("working of: ", subcategory.subcat.name);

      for (const item of subcategory.data) {
        let retryCount = 0;
        let success = false;

        while (!success && retryCount < maxRetries) {
          try {
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
            console.log("get data of: ", item.link);
            item["detail"] = elementText;
            success = true;
          } catch (error) {
            console.error("An error occurred:", error.message);
            retryCount++;
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      }
    }
  }

  console.log(data, "data");
  fs.writeFileSync("final.json", JSON.stringify(data, null, 2));

  // await browser.close();
})();
