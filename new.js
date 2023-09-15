const fs = require("fs");
const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

puppeteerExtra.use(AdblockerPlugin());
// const sleep = (milliseconds) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

(async () => {
  const browser = await puppeteerExtra.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   defaultViewport: false,
  //   userDataDir: "./tmp",
  // });

  const page = await browser.newPage();
  await page.goto("https://opengovca.com/proactive-disclosure-travel");
  let mergedArray = [];
  let isBtnDisabled = false;
  while (!isBtnDisabled) {
    const elementText = await page.evaluate(() => {
      let sdata = [];
      const datt = document.querySelectorAll(
        "#search-result > table > tbody > tr"
      );
      const dattaa = document.querySelectorAll(
        "#search-result > table > tbody > tr >th"
      );
      console.log(datt, "data", dattaa[0].innerHTML);
      const thad = [];
      dattaa.forEach((element) => {
        // console.log(element.innerHTML);
        thad.push(element.innerHTML);
      });
      //   const th = datt[0].querySelectorAll("th");
      //   console.log(th[0].innerText, "table head", th.length);
      datt.forEach((element, ind) => {
        if (ind < datt.length - 1 && ind !== 0) {
          obj = {};
          thad.forEach((element1, index) => {
            if (index == 0) {
              obj = {
                name: element.querySelector("td > a")?.innerText,
                link: element.querySelector("td > a")?.getAttribute("href"),
              };
              // obj.name = element.querySelector("td > a")?.innerText;
              // obj.link = element.querySelector("td > a")?.getAttribute("href");

              console.log(
                element1,

                "::::",
                element.querySelector("td > a")?.getAttribute("href"),
                "0ne",
                element.querySelector("td > a")?.innerText
              );
            } else {
              obj = {
                ...obj,
                [element1]: element.querySelectorAll("td")[index]?.innerText,
              };
              // obj[element1] = element.querySelectorAll("td")[index]?.innerText;
              console.log(
                element1,
                "=",
                element.querySelectorAll("td")[index]?.innerText
              );
            }
            // console.log(element1);
          });
          sdata.push(obj);
        }
      });

      return sdata;
    });
    await page.waitForSelector(".page-link", { visible: true });
    // console.log(elementText, "text");
    mergedArray = mergedArray.concat(elementText);

    // // Select the <ul> element with the class "pagination"
    // const ulElement = await page.$(".pagination");

    // // Find all <a> elements within the <ul> element
    // const aElements = await ulElement.$$("a");

    // // Loop through the <a> elements and check their href attributes
    // for (const aElement of aElements) {
    //   const href = await aElement.evaluate((node) => node.getAttribute("href"));

    //   // Check if the href attribute contains "?page=" followed by a number
    //   if (href.includes("?page=") && /\d+$/.test(href)) {
    //     // Click on this <a> element
    //     isBtnDisabled = false;
    //     await aElement.click();
    //     console.log("Clicked on link:", href);
    //     // You can add additional actions after clicking
    //     // For example, you can wait for a new page to load
    //     await page.waitForNavigation();
    //     break; // Exit the loop after clicking the first matching link
    //   }
    //   // else {
    //   //   isBtnDisabled = true;
    //   // }
    // }
    // Select the <ul> element with the class "pagination"

    // // working
    // const ulElement = await page.$(".pagination");

    // // Find all <a> elements within the <ul> element
    // const aElements = await ulElement.$$("a");

    // let maxPageNumber = -1; // Initialize with a negative number

    // // Loop through the <a> elements and check their href attributes
    // for (const aElement of aElements) {
    //   const href = await aElement.evaluate((node) => node.getAttribute("href"));

    //   // Check if the href attribute contains "?page=" followed by a number
    //   if (href.includes("?page=")) {
    //     const match = href.match(/\?page=(\d+)/);
    //     if (match && parseInt(match[1]) > maxPageNumber) {
    //       maxPageNumber = parseInt(match[1]);
    //     }
    //   }
    // }

    // console.log("Maximum page number found:", maxPageNumber);

    // // Loop through the <a> elements again to find and click on the link with the maximum page number
    // for (const aElement of aElements) {
    //   const href = await aElement.evaluate((node) => node.getAttribute("href"));

    //   // Check if the href attribute contains "?page=" followed by a number
    //   if (href.includes("?page=")) {
    //     const match = href.match(/\?page=(\d+)/);
    //     if (match && parseInt(match[1]) === maxPageNumber) {
    //       // Click on the link with the maximum page number
    //       await Promise.all([
    //         aElement.click(),
    //         page.waitForNavigation(), // Wait for the navigation to complete
    //       ]);
    //       console.log("Clicked on link with maximum page number:", href);
    //       break; // Exit the loop after clicking
    //     }
    //   }
    // }

    // Find all <a> elements within the <ul> element
    const aElements = await page.$$(".pagination a");

    // Initialize variables to store the target element and its href
    let targetElement = null;
    let targetHref = null;

    // Loop through these elements to find the "Next Page" element with the desired href
    for (const aElement of aElements) {
      const text = await aElement.evaluate((node) => node.textContent);
      const href = await aElement.evaluate((node) => node.getAttribute("href"));

      if (
        text.trim() === "Next Page" &&
        href.includes("?page=") &&
        /\d+$/.test(href)
      ) {
        // If the element matches the criteria, store it and break the loop
        targetElement = aElement;
        targetHref = href;
        break;
      }
    }

    // Check if a valid target element was found
    if (targetElement && targetHref) {
      isBtnDisabled = false;
      // Click on the "Next Page" element
      await Promise.all([
        targetElement.click(),
        page.waitForNavigation(), // Wait for the navigation to complete
      ]);
      console.log('Clicked on "Next Page" with href:', targetHref);
    } else {
      isBtnDisabled = true;
      
      console.log(
        'No valid "Next Page" element found with the specified criteria.',
        mergedArray.length,
        mergedArray
      );
    }
  }
  //   await browser.close();
})();
