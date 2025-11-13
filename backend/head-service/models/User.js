const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  approved: { type: Boolean, default: false },
  role: { type: String, default: "head" },
});

module.exports = mongoose.model("Head", userSchema);
