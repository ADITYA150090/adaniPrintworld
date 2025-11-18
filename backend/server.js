const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/modules/auth/auth.routes");
const adminRoutes = require("./src/modules/admin/admin.routes");
const headRoutes = require("./src/modules/head/head.routes");
const officerRoutes = require("./src/modules/officer/officer.routes");
const nameplateRoutes = require("./src/modules/nameplate/nameplate.routes")
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors()); // <-- use here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);


app.use("/admin", adminRoutes);
app.use("/head", headRoutes);
app.use("/officer", officerRoutes);


app.use("/api/nameplate", nameplateRoutes);

// Default route
app.get("/api", (req, res) => {
    res.send("API is running...");
    console.log("api is runing");
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));