const fs = require("fs");
const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

puppeteerExtra.use(AdblockerPlugin());

(async () => {
  const browser = await puppeteerExtra.launch({
    // headless: true,
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const data = [
    // {
    //   cat: "Business",
    //   sub: [
    //     {
    //       subcat: "Federal Corporation",
    //       link: "https://opengovca.com/corporation",
    //     },
    //     {
    //       subcat: "Charity Organizations",
    //       link: "https://opengovca.com/charity",
    //     },
    //     {
    //       subcat: "Money Services Business",
    //       link: "https://opengovca.com/money-service",
    //     },
    //     {
    //       subcat: "Alberta Business Licenses",
    //       link: "https://opengovca.com/alberta-business",
    //     },
    //     {
    //       subcat: "Alberta Corporation",
    //       link: "https://opengovca.com/alberta-corporation",
    //     },
    //     {
    //       subcat: "Ontario Bailiff, Collection Agencies, and Lenders Licences",
    //       link: "https://opengovca.com/ontario-licence",
    //     },
    //     {
    //       subcat: "Quebec Business Registrations",
    //       link: "https://opengovca.com/quebec-business",
    //     },
    //     {
    //       subcat: "Quebec Contractor Licences",
    //       link: "https://opengovca.com/quebec-contractor-licence",
    //     },
    //     {
    //       subcat: "Burnaby Business Licences",
    //       link: "https://opengovca.com/burnaby-business",
    //     },
    //     {
    //       subcat: "Calgary Business Licences",
    //       link: "https://opengovca.com/calgary-business",
    //     },
    //     {
    //       subcat: "Chilliwack Business Licences",
    //       link: "https://opengovca.com/chilliwack-business",
    //     },
    //     {
    //       subcat: "Coquitlam Business Licences",
    //       link: "https://opengovca.com/coquitlam-business",
    //     },
    //     {
    //       subcat: "Edmonton Business",
    //       link: "https://opengovca.com/edmonton-business",
    //     },
    //     {
    //       subcat: "Guelph Business Licences",
    //       link: "https://opengovca.com/guelph-business",
    //     },
    //     {
    //       subcat: "Kelowna Business Licences",
    //       link: "https://opengovca.com/kelowna-business",
    //     },
    //     {
    //       subcat: "Kitchener Business",
    //       link: "https://opengovca.com/kitchener-business",
    //     },
    //     {
    //       subcat: "Lethbridge Business Licences",
    //       link: "https://opengovca.com/lethbridge-business",
    //     },
    //     {
    //       subcat: "Langley Township Business",
    //       link: "https://opengovca.com/langley-township-business",
    //     },
    //     {
    //       subcat: "Maple Ridge Business Licences",
    //       link: "https://opengovca.com/maple-ridge-business",
    //     },
    //     {
    //       subcat: "Mississauga Business Directory",
    //       link: "https://opengovca.com/mississauga-business",
    //     },
    //     {
    //       subcat: "Nanaimo Business Licences",
    //       link: "https://opengovca.com/nanaimo-business",
    //     },
    //     {
    //       subcat: "New Westminster Business Licences",
    //       link: "https://opengovca.com/new-westminster-business",
    //     },
    //     {
    //       subcat: "North Vancouver Business Licences",
    //       link: "https://opengovca.com/north-vancouver-business",
    //     },
    //     {
    //       subcat: "Port Moody Business Licences",
    //       link: "https://opengovca.com/port-moody-business",
    //     },
    //     {
    //       subcat: "Richmond Business Licences",
    //       link: "https://opengovca.com/richmond-business",
    //     },
    //     {
    //       subcat: "Surrey Business",
    //       link: "https://opengovca.com/surrey-business",
    //     },
    //     {
    //       subcat: "Toronto Business",
    //       link: "https://opengovca.com/toronto-business",
    //     },
    //     {
    //       subcat: "Vancouver Business",
    //       link: "https://opengovca.com/vancouver-business",
    //     },
    //     {
    //       subcat: "Victoria Business",
    //       link: "https://opengovca.com/victoria-business",
    //     },
    //     {
    //       subcat: "Winnipeg Business Licenses",
    //       link: "https://opengovca.com/winnipeg-business",
    //     },
    //   ],
    // },
   
    // {
    //   cat: "Disclosure",
    //   sub: [
    //     {
    //       subcat: "Government of Canada Employee",
    //       link: "https://opengovca.com/employee",
    //     },
    //     {
    //       subcat: "Proactive Disclosure - Travel Expenses",
    //       link: "https://opengovca.com/proactive-disclosure-travel",
    //     },
    //     {
    //       subcat: "Proactive Disclosure - Hospitality Expenses",
    //       link: "https://opengovca.com/proactive-disclosure-hospitality",
    //     },
    //     {
    //       subcat: "Alberta Public Sector Compensations",
    //       link: "https://opengovca.com/alberta-employee",
    //     },
    //     {
    //       subcat: "British Columbia Public Sector Compensations",
    //       link: "https://opengovca.com/british-columbia-employee",
    //     },
    //     {
    //       subcat: "Manitoba Public Sector Compensations",
    //       link: "https://opengovca.com/manitoba-employee",
    //     },
    //     {
    //       subcat: "Manitoba Lawyers Directory",
    //       link: "https://opengovca.com/manitoba-lawyer",
    //     },
    //     {
    //       subcat: "Manitoba Physicians Directory",
    //       link: "https://opengovca.com/manitoba-physician",
    //     },
    //     {
    //       subcat: "New Brunswick Public Sector Employee Salaries",
    //       link: "https://opengovca.com/new-brunswick-employee",
    //     },
    //     {
    //       subcat: "Ontario Public Sector Employee Salaries",
    //       link: "https://opengovca.com/ontario-employee",
    //     },
    //   ],
    // },
    // {
    //   cat: "Property",
    //   sub: [
    //     {
    //       subcat: "New Brunswick Property Assessment",
    //       link: "https://opengovca.com/new-brunswick-property",
    //     },
    //     {
    //       subcat: "Nova Scotia Property Assessment",
    //       link: "https://opengovca.com/nova-scotia-property",
    //     },
    //     {
    //       subcat: "Edmonton Property Assessments",
    //       link: "https://opengovca.com/edmonton-property",
    //     },
    //     {
    //       subcat: "Surrey Property",
    //       link: "https://opengovca.com/surrey-property",
    //     },
    //     {
    //       subcat: "Vancouver Property",
    //       link: "https://opengovca.com/vancouver-property",
    //     },
    //     {
    //       subcat: "Vancouver Buidling Permits",
    //       link: "https://opengovca.com/vancouver-building-permit",
    //     },
    //     {
    //       subcat: "Victoria Property Assessment",
    //       link: "https://opengovca.com/victoria-property",
    //     },
    //     {
    //       subcat: "Winnipeg Property Assessment",
    //       link: "https://opengovca.com/winnipeg-property",
    //     },
    //     {
    //       subcat: "Calgary Buidling Permits",
    //       link: "https://opengovca.com/calgary-building-permit",
    //     },
    //     {
    //       subcat: "Cambridge Buidling Permits",
    //       link: "https://opengovca.com/cambridge-building-permit",
    //     },
    //     {
    //       subcat: "Edmonton Buidling Permits",
    //       link: "https://opengovca.com/edmonton-building-permit",
    //     },
    //     {
    //       subcat: "Kingston Buidling Permits",
    //       link: "https://opengovca.com/kingston-building-permit",
    //     },
    //     {
    //       subcat: "Kitchener Buidling Permits",
    //       link: "https://opengovca.com/kitchener-building-permit",
    //     },
    //     {
    //       subcat: "Lethbridge Buidling Permits",
    //       link: "https://opengovca.com/lethbridge-building-permit",
    //     },
    //     {
    //       subcat: "Montreal Buidling Permits",
    //       link: "https://opengovca.com/montreal-building-permit",
    //     },
    //     {
    //       subcat: "Ottawa Buidling Permits",
    //       link: "https://opengovca.com/ottawa-building-permit",
    //     },
    //     {
    //       subcat: "Red Deer Buidling Permits",
    //       link: "https://opengovca.com/red-deer-building-permit",
    //     },
    //     {
    //       subcat: "Waterloo Buidling Permits",
    //       link: "https://opengovca.com/waterloo-building-permit",
    //     },
    //     {
    //       subcat: "Winnipeg Buidling Permits",
    //       link: "https://opengovca.com/winnipeg-building-permit",
    //     },
    //   ],
    // },
    {
      cat: "Toronto",
      sub: [
        {
          subcat: "Toronto Business Licences",
          link: "https://opengovca.com/toronto-business",
        },
        // {
        //   subcat: "Toronto Dinesafe Inspections",
        //   link: "https://opengovca.com/toronto-dinesafe",
        // },
        // {
        //   subcat: "Toronto Bodysafe Inspections",
        //   link: "https://opengovca.com/toronto-bodysafe",
        // },
        // {
        //   subcat: "Toronto Licensed Child Care Centres",
        //   link: "https://opengovca.com/toronto-child-care",
        // },
        // {
        //   subcat: "Toronto Buidling Permits",
        //   link: "https://opengovca.com/toronto-building-permit",
        // },
        // {
        //   subcat: "Toronto Apartment Buildings",
        //   link: "https://opengovca.com/toronto-apartment-building",
        // },
      ],
    },
    {
      cat: "Education",
      sub: [
        {
          subcat: "Alberta Education Schools",
          link: "https://opengovca.com/alberta-school",
        },
        // {
        //   subcat: "Alberta Child Care Programs",
        //   link: "https://opengovca.com/alberta-child-care",
        // },
        // {
        //   subcat: "Ontario Approved Driving Schools",
        //   link: "https://opengovca.com/ontario-driving-school",
        // },
        // {
        //   subcat: "Ontario Licensed Child Care Facilities",
        //   link: "https://opengovca.com/ontario-child-care",
        // },
      ],
    },
    // {
    //   cat: "Other",
    //   sub: [
    //     {
    //       subcat: "Alberta Cannabis Licence",
    //       link: "https://opengovca.com/alberta-cannabis",
    //     },
    //     {
    //       subcat: "Alberta Liquor Licence",
    //       link: "https://opengovca.com/alberta-liquor",
    //     },
    //     {
    //       subcat: "British Columbia Liquor Licence",
    //       link: "https://opengovca.com/british-columbia-liquor",
    //     },
    //     {
    //       subcat: "Montreal Food Establishments",
    //       link: "https://opengovca.com/montreal-food-service",
    //     },
    //     {
    //       subcat: "Montreal Commercial Properties",
    //       link: "https://opengovca.com/montreal-commercial-property",
    //     },
    //     {
    //       subcat: "Drug Product Database",
    //       link: "https://opengovca.com/drug-product",
    //     },
    //     {
    //       subcat: "Post New Business",
    //       link: "https://opengovca.com/post",
    //     },
    //   ],
    // },
  ];
  let categoriesData = [];
  const page = await browser.newPage();
  for (const category of data) {
    let sub = [];
    for (const subcategory of category.sub) {
      console.log(`Running script for subcategory: ${subcategory.subcat}`);

      await page.goto(subcategory.link, { timeout: 120000 });
      const navigationTimeout = 300000; // 120 seconds in milliseconds
      await page.setDefaultNavigationTimeout(navigationTimeout);
      let mergedArray = [];
      let subCatData = "";
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
          console.log(datt, "data", dattaa[0]?.innerHTML);
          const thad = [];
          dattaa.forEach((element) => {
            // console.log(element.innerHTML);
            thad.push(element?.innerHTML);
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
                    [element1]:
                      element.querySelectorAll("td")[index]?.innerText,
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
        // await page.waitForSelector(".page-link", {
        //   visible: true,
        //   timeout:  120000,
        // });
        // console.log("run1");
        const Elements = await page.$$(".pagination a");
        // console.log(Elements, "dad");
        let targetElement = null;
        let targetHref = null;
        mergedArray = mergedArray.concat(elementText);
        if (Elements.length > 0) {
          await page.waitForSelector(".pagination", {
            visible: true,
            timeout: 120000,
          });
          // console.log("run2");
          // console.log(elementText, "text");

          // Find all <a> elements within the <ul> element
          const aElements = await page.$$(".pagination a");
          // console.log(aElements, "dad");
          // Initialize variables to store the target element and its href

          // Loop through these elements to find the "Next Page" element with the desired href
          for (const aElement of aElements) {
            const text = await aElement.evaluate((node) => node.textContent);
            const href = await aElement.evaluate((node) =>
              node.getAttribute("href")
            );

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
          subCatData = await page.evaluate(() => {
            const element = document.querySelector("#overview");

            if (element) {
              return element.outerHTML;
            } else {
              return null; // Element not found
            }
          });
          console.log(
            'No valid "Next Page" element found with the specified criteria.',
            mergedArray.length
            // mergedArray
          );
        }
      }
      // console.log(JSON.stringify(subCatData), "dasadadasdada");
      // Output or process the mergedArray as needed
      // console.log(mergedArray);
      subcat = {
        link: subcategory.link,
        subcat: { name: subcategory.subcat, detail: subCatData },
        data: mergedArray,
      };
      sub.push(subcat);
      // console.log(subcategory.subcat, "data added", sub);
      // Close the page or do any other necessary cleanup
      // await page.close();
    }

    categoriesData.push({ cat: category.cat, sub });
  }
  // Save the combined data as a JSON file
  fs.writeFileSync(
    "combinedDataNew.json",
    JSON.stringify(categoriesData, null, 2)
  );
  // await browser.close();
})();
