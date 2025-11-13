const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const officerRoutes = require("./routes/officerRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount route
app.use("/api/officer", officerRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected (Officer)"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(3003, () => {
  console.log("🚀 Officer Service running on port 3003");
});
