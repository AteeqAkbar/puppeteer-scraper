const fs = require("fs");
const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const data = require("./combinedDataNew.json");
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
        try {
          // Wait for the element with id "location-information" to appear with a shorter timeout
          await page.waitForSelector("#location-information", {
            timeout: 5000,
          });

          // Extract data from the table
          const tableData = await page.evaluate(() => {
            const tableRows = Array.from(
              document.querySelectorAll(
                "#location-information table > tbody tr"
              )
            );

            const rowData = [];

            tableRows.forEach((row) => {
              const columns = row.querySelectorAll("td");
              if (columns.length === 2) {
                const key = columns[0].textContent.trim();
                const value = columns[1].textContent.trim();
                rowData.push({ key, value });
              }
            });

            return rowData;
          });

          console.log("Location Information:");
          console.log(tableData);
          if (tableData.length > 0) {
            tableData.forEach((element) => {
              item[element.key.replace(/\s/g, "")] = element.value;
            });
          }
        } catch (error) {
          console.error(
            'Error: Element with id "location-information" not found on this page.'
          );
        }

        // Add the new key-value pair to each item in the "data" array
        console.log("get data of : ", item.link);
        item["detail"] = elementText;
      }
    }
  }
  console.log(data, "data");
  fs.writeFileSync("final.json", JSON.stringify(data, null, 2));

  // }
  await browser.close();
})();
