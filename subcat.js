const puppeteer = require("puppeteer");

const fs = require("fs");

async function scrapeWebsite() {
  const browser = await puppeteer.launch({ headless: false }); // Launch a headless Chrome browser
  const page = await browser.newPage(); // Create a new page instance

  // The URL of the website you want to scrape
  //   const url = "https://opengovca.com/"; // Replace with the URL of the website you want to scrape
  const url = "https://opengovca.com/corporation/"; // Replace with the URL of the website you want to scrape

  await page.goto(url); // Navigate to the URL

  // Example: Scrape the page title
  const pageTitle = await page.title();

  // Example: Scrape the text content of a specific element
  const elementSelector = ".dropdown"; // Replace with the CSS selector of the element you want to scrape
  const elementText = await page.evaluate(
    () => {
      // let sdata = [];
      const datt = document.querySelectorAll(
        "#search-result > table > tbody > tr"
      );
      console.log(datt, "data");
      const th = datt[0].querySelectorAll("th");
      console.log(th[0].innerText, "table head", th.length);
      datt.forEach((element) => {
        console.log(element.querySelectorAll("td")[0]);

        // console.log(element.querySelector("a").innerText);
        // const cat = element.querySelector("a").innerText.trim(" ");
        // console.log(element.querySelectorAll("ul > li"));
        // const e1 = element.querySelectorAll("ul > li");
        const dataa = [];
        // e1.forEach((element) => {
        //   // console.log(element.childNodes[0].innerText, "sub cat  ");
        //   // console.log(element.childNodes[0].getAttribute("href"), "link");
        //   dataa.push({
        //     subcat: element.childNodes[0].innerText,
        //     link: element.childNodes[0].getAttribute("href"),
        //   });
        // });
        // // console.log(element.querySelectorAll);
        // sdata.push({ cat, sub: dataa });
      });
      // console.log(datt, "dadad");
      // // sdata.push(
      // //   datt.forEach((element) => {
      // //     const data = element.querySelectorAll("ul > li");
      // //     return data;
      // //   })
      // // );
      // return sdata;
    }
    //   (element) => element.textContent
  );
  const filePath = "data.json";
  const jsonData = JSON.stringify(elementText, null, 2);

  // fs.writeFile(filePath, jsonData, (err) => {
  //   if (err) {
  //     console.error("Error writing JSON file:", err);
  //   } else {
  //     console.log("Data has been written to data.json");
  //   }
  // });
  // Print the scraped data
  console.log("Page Title:", pageTitle);
  //   console.log("Page :", elementSelector);
  console.log("Scraped Element Text:", elementText);

  //   await browser.close(); // Close the browser when done
}

// Call the scraping function
scrapeWebsite();
