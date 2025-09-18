// backend/src/config/db.js
const mongoose = require("mongoose");
const createAdminIfNotExist = require("./adminInit");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
     createAdminIfNotExist();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
