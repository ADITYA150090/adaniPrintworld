const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected (Admin)");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err);
  }
};

module.exports = connectDB;
