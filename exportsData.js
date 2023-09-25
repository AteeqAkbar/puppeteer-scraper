const fs = require("fs");

const data = require("./combinedData.json");
// const [data1] = require("./final1.json");
// const [data2] = require("./final2.json");
// const [data3] = require("./final3.json");
// const [data4] = require("./final4.json");
// const [data5] = require("./final5.json");
// const [data6] = require("./final6.json");

const [first, second, third, fourth, fifth, sixth] = data;
module.exports = { first, second, third, fourth, fifth, sixth };
// fs.writeFileSync(
//   "final.json",
//   JSON.stringify([data1, data2, data3, data4, data5, data6], null, 2)
// );
// console.log(
//   "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ data merge data @@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
// );
