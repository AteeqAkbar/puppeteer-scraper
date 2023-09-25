const axios = require("axios");
const fs = require("fs");

const apiUrl = "http://localhost:1337"; // Replace with your Strapi API URL
//  ///for categories
// const data = require("./final.json");
// const contentType = "categories"; // Replace with your content type name

// (async () => {
//   for (const i of data) {
//     // Replace with your Strapi API URL

//     try {
//       const res = await axios.post(`${apiUrl}/api/${contentType}`, {
//         data: { name: i.cat },
//       });
//       i.id = await res?.data?.data?.id;
//       console.log(
//         "New post created:",
//         await res.res?.data?.data?.id,
//         "=",
//         i.cat
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   fs.writeFileSync("finalWithCatId.json", JSON.stringify(data, null, 2));
// //   console.log(total, "totall");
// })();

//  ///for sub categories
const data = require("./finalWithCatId.json");
const contentType = "sub-categories"; // Replace with your content type name

total = 0;
(async () => {
  for (const cat of data) {
    console.log(cat.sub.length, "length");
    // Replace with your Strapi API URL
    for (const iterator of cat.sub) {
    //   console.log(++total, "++");
      try {
        const res = await axios.post(`${apiUrl}/api/${contentType}`, {
          data: {
            name: iterator.subcat.name,
            overview: iterator.subcat.detail,
            category: cat.id,
          },
        });
        iterator.id = await res?.data?.data?.id;
        console.log(
          "New post created:",
       await res.res?.data?.data?.id,
          "=",
          iterator.subcat.name
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  fs.writeFileSync("finalWithSubId.json", JSON.stringify(data, null, 2));
  console.log(total, "totall");
})();

//  ///for product

// const contentType = "sub-categories"; // Replace with your content type name
// const data = require("./finalWithSubId.json");

// total = 0;
// (async () => {
//   for (const cat of data) {
//     console.log(cat.sub.length, "length");
//     // Replace with your Strapi API URL
//     for (const iterator of cat.sub) {
//       console.log(iterator.data.length, "++");
//       for (const iter of iterator.data) {
//         console.log(++total, "++");
//         //   try {
//         //     const res = await axios.post(`${apiUrl}/api/${contentType}`, {
//         //       data: {
//         //         name: iterator.subcat.name,
//         //         overview: iterator.subcat.detail,
//         //         category: cat.id,
//         //       },
//         //     });
//         //     iterator.id = await res?.data?.data?.id;
//         //     console.log(
//         //       "New post created:",
//         //       await res.res?.data?.data?.id,
//         //       "=",
//         //       iterator.subcat.name
//         //     );
//         //   } catch (error) {
//         //     console.log(error);
//         //   }
//       }
//     }
//   }
//   console.log(total, "totall");
// })();
