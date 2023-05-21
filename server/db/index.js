const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Insure",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
