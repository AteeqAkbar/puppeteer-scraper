const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const { third } = require("./exportsData");
// const data = require("./combinedData.json");
const data = [third];
const port = 3001;
puppeteerExtra.use(AdblockerPlugin());
const app = express();

// Create a writable stream for logs
// const logStream = fs.createWriteStream("app-logs.txt", { flags: "a" });

// Create an in-memory buffer for logs
const logBuffer = [];

// Redirect console output to the logStream
const originalConsoleLog = console.log;
console.log = function (...args) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message: args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" "),
  };
  originalConsoleLog.apply(console, args);
  // logStream.write(JSON.stringify(logEntry) + "\n");
  logBuffer.unshift(logEntry);
};

// Middleware to expose logs via an API endpoint
app.use("/logs", (req, res) => {
  res.json({ logs: logBuffer });
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, logging API!" });
});
app.get("/data", (req, res) => {
  const retryDelay = 1000; // 5 seconds (adjust as needed)
  const maxRetries = 5; // Maximum number of retries (adjust as needed)

  (async () => {
    const browser = await puppeteerExtra.launch({
      headless: true,
      defaultViewport: false,
      userDataDir: "./tmp",
      args: ["--no-sandbox"],
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
              // await page.waitForNavigation({ waitUntil: 'load' });
              await page.waitForSelector("#overview", {
                timeout: 10000,
              });
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
                  timeout: 2000,
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

                // console.log("Location Information:");
                // console.log(tableData);
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
              console.log("get data of: ", item.name);
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

    // console.log(data, "data");
    fs.writeFileSync("final03.json", JSON.stringify(data, null, 2));
    console.log(
      "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ get all data @@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    );
    await browser.close();
  })();
  res.json({ message: "Hello, logging API!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
