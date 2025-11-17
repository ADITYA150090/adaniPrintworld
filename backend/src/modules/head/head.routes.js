const router = require("express").Router();
const controller = require("./head.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

router.get("/dashboard", auth, role("Head"), controller.dashboard);
router.patch("/approve/:officerId", auth, role("Head"), controller.approveOfficer);

module.exports = router;