require("dotenv").config();
const express = require("express");
const {
  getData,
  insertData,
  getTotleRecordsCount,
  getLatestRecords,
  getUniqueSKUCounts,
  getSKUTotal,
  totalRevenue,
  getMonthlyTotal,
} = require("./controller/operations");
const cors = require("cors");

const PORT = process.env.PORT || 8001;
const app = express();

// Import db.js and establish the database connection
require("./db/index");

// Middleware to parse request body as JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Home route
app.get("/", async (req, res) => {
  res.send("Hello world");
});

// API to insert data into the collection
app.post("/insert", async (req, res) => {
  try {
    await insertData();
    res.send("Data inserted successfully");
  } catch (error) {
    console.error("Error while inserting data in collection", error);
    res.status(500).send("Error while inserting data");
  }
});

// API to get data with pagination
app.get("/getData", async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.startIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 100;
    const result = await getData(pageNumber, pageSize);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getData API failed" });
  }
});

// API to get the latest records
app.get("/latest", async (req, res) => {
  try {
    const result = await getLatestRecords();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "latest API failed" });
  }
});

// API to get the total number of records
app.get("/getTotleRecords", async (req, res) => {
  try {
    const result = await getTotleRecordsCount();
    res.send({ total: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getTotleRecords API failed" });
  }
});

// API to get the count of unique SKUs and their sales records
app.get("/getMostSalesRecords", async (req, res) => {
  try {
    const result = await getUniqueSKUCounts();
    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getMostSalesRecords API failed" });
  }
});

// API to get the total sales records for each SKU
app.get("/getSalesRecords", async (req, res) => {
  try {
    const result = await getSKUTotal();
    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getSalesRecords API failed" });
  }
});

// API to calculate the total revenue
app.get("/totalrevenue", async (req, res) => {
  try {
    const result = await totalRevenue();
    const totalPriceSum = result.reduce(
      (sum, item) => sum + Number(item.TotalPrice),
      0
    );
    res.send({ totalRevenue: totalPriceSum });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "totalrevenue API failed" });
  }
});

// API to get the monthly sales records
app.get("/getmonthlyrecords", async (req, res) => {
  try {
    const result = await getMonthlyTotal();
    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getmonthlyrecords API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
