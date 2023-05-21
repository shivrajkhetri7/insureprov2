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

app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.post("/insert", async (req, res) => {
  try {
    await insertData();
    res.send("Data inserted successfully");
  } catch (error) {
    console.error("Error while inserting data in collection", error);
    res.status(500).send("Error while inserting data");
  }
});

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

app.get("/latest", async (req, res) => {
  try {
    const result = await getLatestRecords();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getData API failed" });
  }
});

app.get("/getTotleRecords", async (req, res) => {
  try {
    const result = await getTotleRecordsCount();
    res.send({ totle: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getData API failed" });
  }
});

app.get("/getMostSalesRecords", async (req, res) => {
  try {
    const result = await getUniqueSKUCounts();
    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getData API failed" });
  }
});

app.get("/getSalesRecords", async (req, res) => {
  try {
    const result = await getSKUTotal();
    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getData API failed" });
  }
});

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
    res.status(500).send({ Error: "getData API failed" });
  }
});

app.get("/getmonthlyrecords", async (req, res) => {
  try {
    const result = await getMonthlyTotal();
    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: "getData API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
