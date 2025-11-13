const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" }, // fixed for admin
});

module.exports = mongoose.model("Admin", userSchema);
