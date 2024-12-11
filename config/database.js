const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
