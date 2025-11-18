const router = require("express").Router();
const controller = require("./admin.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

router.get("/dashboard", auth, authorize("Admin"), controller.dashboard);
router.get("/heads", auth, authorize("Admin"), controller.getAllHeads);

module.exports = router;