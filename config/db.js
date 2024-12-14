require('dotenv').config();
const mongoose = require('mongoose');
const Package = require("../model/package")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No options needed
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};



    module.exports = connectDB;