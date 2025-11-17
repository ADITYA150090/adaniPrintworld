const router = require("express").Router();
const controller = require("./admin.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

router.get("/dashboard", auth, role("Admin"), controller.dashboard);
router.get("/heads", auth, role("Admin"), controller.getAllHeads);

module.exports = router;