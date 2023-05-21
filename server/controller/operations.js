const documentInsert = require("../datafix/index");
const Sales = require("../schema/sales");

/**
 * @function insertData Inserts a new sale record into the collection.
 */
const insertData = async () => {
  try {
    // Create a new document
    const newSale = new Sales({
      Date: "2023-05-20",
      SKU: "ABC123",
      UnitPrice: 10.99,
      Quantity: 5,
      TotalPrice: 54.95,
    });

    // Save the document to the database
    const savedSale = await newSale.save();
    console.log("Data inserted successfully:", savedSale);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

/**
 * @function getData Retrieves data from the collection with pagination.
 * @param {number} pageNumber The page number to retrieve.
 * @param {number} pageSize The number of items per page.
 * @returns {Object} The data for the specified page.
 */
const getData = async (pageNumber, pageSize) => {
  try {
    const skipCount = (pageNumber - 1) * pageSize;
    const salesData = await Sales.find({}).skip(skipCount).limit(pageSize);
    const totalCount = await Sales.countDocuments();

    return { data: salesData, total: totalCount };
  } catch (error) {
    console.log("Error while fetching data:", error);
    return { error: error.message };
  }
};

/**
 * @function getLatestRecords Retrieves the latest 10 records from the collection.
 * @returns {Object} The latest 10 records.
 */
const getLatestRecords = async () => {
  try {
    const salesData = await Sales.find({})
      .sort({ _id: -1 }) // Sort in descending order based on the _id field to get the latest records first
      .limit(10); // Retrieve only the latest 10 records
    return { data: salesData };
  } catch (error) {
    console.log("Error while fetching data:", error);
    return { error: error.message };
  }
};

/**
 * @function getTotleRecordsCount Retrieves the total count of records from the collection.
 * @returns {number} The total count of records.
 */
const getTotleRecordsCount = async () => {
  try {
    const totalCount = await Sales.countDocuments(); // Get the total count of records in the collection
    return totalCount;
  } catch (error) {
    console.log("Error while fetching data:", error);
    return 0; // Return 0 or handle the error case as per your requirement
  }
};

/**
 * @function getUniqueSKUCounts Retrieves the count of unique SKUs and their sales records.
 * @returns {Object} The count of unique SKUs and their sales records.
 */
const getUniqueSKUCounts = async () => {
  try {
    const uniqueSKUs = await Sales.aggregate([
      { $group: { _id: "$SKU", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort in descending order based on the count
    ]);

    return uniqueSKUs;
  } catch (error) {
    console.log("Error while retrieving unique SKU counts:", error);
    return { error: error.message };
  }
};

/**
 * @function getSKUTotal Retrieves the total sales records for each SKU.
 * @returns {Object} The total sales records for each SKU.
 */
const getSKUTotal = async () => {
  try {
    const uniqueSKUs = await Sales.aggregate([
      {
        $group: {
          _id: "$SKU",
          count: { $sum: 1 },
          totalSum: { $sum: "$TotalPrice" },
        },
      },
      { $sort: { count: -1 } }, // Sort in descending order based on the count
    ]);

    return uniqueSKUs;
  } catch (error) {
    console.log("Error while retrieving unique SKU counts:", error);
    return { error: error.message };
  }
};

/**
 * @function getMonthlyTotal Retrieves the total sales records grouped by month and year, and the most popular item for each month.
 * @returns {Object} The total sales records grouped by month and year, and the most popular item for each month.
 */
const getMonthlyTotal = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const salesByMonth = await Sales.aggregate([
      {
        $match: {
          Date: {
            $gte: new Date(2019, 0, 1), // Start of the current year
            $lte: currentDate, // Current date
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$Date" }, // Group by month of the "Date" field
            year: { $year: "$Date" }, // Group by year of the "Date" field
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month in ascending order
      {
        $lookup: {
          from: "sales",
          let: { month: "$_id.month", year: "$_id.year" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$Date" }, "$$month"] },
                    { $eq: [{ $year: "$Date" }, "$$year"] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: "$SKU",
                totalQuantity: { $sum: "$Quantity" },
              },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 1 },
          ],
          as: "mostPopularItem",
        },
      },
    ]);

    return salesByMonth;
  } catch (error) {
    console.log("Error while retrieving sales by month:", error);
    return { error: error.message };
  }
};

/**
 * @function totalRevenue Retrieves the total revenue from the sales records.
 * @returns {Object} The total revenue from the sales records.
 */
const totalRevenue = async () => {
  const records = await documentInsert();
  return records;
};

module.exports = {
  insertData,
  getData,
  getLatestRecords,
  getTotleRecordsCount,
  getUniqueSKUCounts,
  getSKUTotal,
  totalRevenue,
  getMonthlyTotal,
};
