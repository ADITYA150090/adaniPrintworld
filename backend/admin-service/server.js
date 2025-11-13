const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Admin Service running on port ${PORT}`));
