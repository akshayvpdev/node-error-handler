const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;
console.log("Connecting to MongoDB:", MONGODB_URL);

const connectDB = async () => {
    try {
      await mongoose.connect(MONGODB_URL);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); 
    }
  };

module.exports = connectDB;
