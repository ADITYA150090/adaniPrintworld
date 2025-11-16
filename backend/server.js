const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/modules/auth/auth.routes");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors()); // <-- use here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));