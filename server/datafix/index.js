const fs = require("fs");
const csv = require("fast-csv");

const documentInsert = () => {
  return new Promise((resolve, reject) => {
    const data = [];
    try {
      fs.createReadStream("./datafix/dataset.csv")
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          console.error(error);
          reject({ error: "Error while reading the document" });
        })
        .on("data", (row) => data.push(row))
        .on("end", () => resolve(data));
    } catch (error) {
      console.error(error);
      reject({ error: "Error while reading the document" });
    }
  });
};

module.exports = documentInsert;
