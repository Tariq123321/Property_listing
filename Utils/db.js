const mongoose = require('mongoose');
require('dotenv').config();

const connetToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully"); 
  } catch (err) {
    console.log("Connection failed to DB",err);
  }
}

module.exports = connetToDatabase