const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();
// const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    // await mongoose.connect(db);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
