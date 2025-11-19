const router = require("express").Router();
const controller = require("./auth.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

// Public
router.post("/signup/:type", controller.register);
router.patch("/verify-email", controller.verifyEmail);
router.post("/login", controller.login);
router.get("/profile", auth, controller.getProfile);


// Protected
router.patch("/approve-officer/:officerId", auth, authorize("Head"), controller.approveOfficer);

module.exports = router;