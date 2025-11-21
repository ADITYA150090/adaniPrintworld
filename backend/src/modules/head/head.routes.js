const express = require("express");
const router = express.Router();
const headController = require("./head.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

router.use(auth, authorize("Head"));


router.get("/dashboard", headController.getDashboard);
router.get("/officers", headController.getOfficers);
router.get("/officer/:officerId/lots", headController.getOfficerLots);
router.patch("/nameplate/:nameplateId/verify", headController.verifyNameplate);
router.patch("/lot/:lotId/verify", headController.verifyLot);
router.get("/lots/unverified", headController.getUnverifiedLots);
router.patch("/officer/:officerId/approve", headController.approveOfficer);
router.delete("/officer/:officerId/reject", headController.rejectOfficer);

module.exports = router;