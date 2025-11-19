const router = require("express").Router();
const controller = require("./head.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

// Dashboard 1
router.get("/dashboard", auth, authorize("Head"), controller.dashboard);

// Verified officers 2
router.get("/officers", auth, authorize("Head"), controller.getVerifiedOfficers);

// Unverified officers 3
router.get("/unverifiedofficers", auth, authorize("Head"), controller.getUnverifiedOfficers);

// Approve / Reject officers 4 5
router.patch("/officers/:id/approve", auth, authorize("Head"), controller.approveOfficer);
router.patch("/officers/:id/reject", auth, authorize("Head"), controller.rejectOfficer);

// Unverified lots 6
router.get("/lots", auth, authorize("Head"), controller.getUnverifiedLots);

// Approve / Reject lots 7 8
router.patch("/lots/:id/approve", auth, authorize("Head"), controller.approveLot);
router.patch("/lots/:id/reject", auth, authorize("Head"), controller.rejectLot);

module.exports = router;