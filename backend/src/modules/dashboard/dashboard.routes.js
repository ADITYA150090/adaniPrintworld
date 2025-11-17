const router = require("express").Router();
const controller = require("./dashboard.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

router.get("/admin", auth, role("Admin"), controller.adminDashboard);
router.get("/head", auth, role("Head"), controller.headDashboard);
router.get("/officer", auth, role("Officer"), controller.officerDashboard);

module.exports = router;