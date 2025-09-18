require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json());

// Only start server & connect DB if not testing
if (process.env.NODE_ENV !== "test") {
  connectDB(process.env.MONGO_URI).then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  });
}

module.exports = app;