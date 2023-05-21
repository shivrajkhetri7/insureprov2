const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  Date: {
    type: String,
  },
  SKU: {
    type: String,
  },
  UnitPrice: {
    type: String,
  },
  Quantity: {
    type: String,
  },
  TotalPrice: {
    type: String,
  },
});

module.exports = mongoose.model("Sales", salesSchema, "sales");
