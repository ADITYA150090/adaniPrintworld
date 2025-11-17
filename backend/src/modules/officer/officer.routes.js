const router = require("express").Router();
const controller = require("./officer.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

router.get("/dashboard", auth, role("Officer"), controller.dashboard);

module.exports = router;