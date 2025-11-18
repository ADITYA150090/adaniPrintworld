const router = require("express").Router();
const controller = require("./dashboard.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

// Admin Dashboard
router.get("/admin", auth, authorize("Admin"), controller.adminDashboard);

// Head Dashboard
router.get("/head", auth, authorize("Head"), controller.headDashboard);

// Officer Dashboard
router.get("/officer", auth, authorize("Officer"), controller.officerDashboard);

module.exports = router;