const data = require("./combinedData.json");
const fs = require("fs");

for (const category of data) {
  for (const subcategory of category.sub) {
    console.log("working of  : ", subcategory.subcat.name);
    subcategory.data = subcategory.data.slice(0, 2);
  }
}
fs.writeFileSync("test.json", JSON.stringify(data, null, 2));
