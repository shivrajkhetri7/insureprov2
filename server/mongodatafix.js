const documentInsert = require("./datafix/index");
const Sales = require("./schema/sales");

const startJob = async () => {
  console.log("----------- Start Job ---------------");
  const document = await documentInsert();
  try {
    const savedSale = await Sales.insertMany(document);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

startJob();
