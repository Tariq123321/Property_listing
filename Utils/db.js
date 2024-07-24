const mongoose = require("mongoose");
// const logger = require("../logger/logger");
const errorLogger = require("../logger/errorLogger");
const successLogger = require("../logger/successLogger");
require("dotenv").config();

const connetToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    successLogger.http("Database connected successfully");
  } catch (err) {
    errorLogger.error("Connection failed to DB " + err.stack);
  }
};

module.exports = connetToDatabase;
