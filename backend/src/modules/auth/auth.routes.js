const router = require("express").Router();
const controller = require("./auth.controller");
const auth = require("../../middleware/auth.middleware");


// Signup → 3 separate types
router.post("/signup/:type", controller.register);

// Email verification
router.patch("/verify-email", controller.verifyEmail);

// Common login
router.post("/login", controller.login);


// Approve officer
router.patch("/approve-officer/:officerId", controller.approveOfficer);



router.get("/officers", auth("Head"), controller.getMyOfficers);
router.get("/officers/pending", auth("Head"), controller.getPendingOfficers);

module.exports = router;