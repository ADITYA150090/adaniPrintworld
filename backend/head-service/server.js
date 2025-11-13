const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const headRoutes = require("./routes/headRoutes");

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use("/api/head", headRoutes);

app.listen(process.env.PORT || 3002, () =>
  console.log(`✅ Head Service running on port ${process.env.PORT || 3002}`)
);
