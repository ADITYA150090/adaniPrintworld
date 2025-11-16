const router = require("express").Router();
const controller = require("./auth.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

// Public
router.post("/signup/:type", controller.register);
router.patch("/verify-email", controller.verifyEmail);
router.post("/login", controller.login);

// Protected
router.patch("/approve-officer/:officerId", auth, role("Head"), controller.approveOfficer);

module.exports = router;