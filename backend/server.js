const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/modules/auth/auth.routes");
const adminRoutes = require("./src/modules/admin/admin.routes");
const headRoutes = require("./src/modules/head/head.routes");
const officerRoutes = require("./src/modules/officer/officer.routes");
const nameplateRoutes = require("./src/modules/nameplate/nameplate.routes");
// const dashboardRoutes = require("./src/modules/dashboard/dashboard.routes");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors()); // <-- use here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

// Routes
app.use("/auth", authRoutes);


app.use("/admin", adminRoutes);
app.use("/head", headRoutes);
app.use("/officer", officerRoutes);
app.use("/lot", require("./src/modules/lot/lot.routes"));

app.use("/api/nameplate", nameplateRoutes);

// app.use("/dashboard", dashboardRoutes);

// Default route
app.get("/api", (req, res) => {
    res.send("API is running...");
    console.log("api is runing");
});

// Export app for testing
module.exports = app;

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}