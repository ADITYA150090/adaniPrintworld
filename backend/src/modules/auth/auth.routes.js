const router = require("express").Router();
const controller = require("./auth.controller");

// Signup → 3 separate types
router.post("/signup/:type", controller.register);

// Email verification
router.patch("/verify-email", controller.verifyEmail);

// Common login
router.post("/login", controller.login);

module.exports = router;