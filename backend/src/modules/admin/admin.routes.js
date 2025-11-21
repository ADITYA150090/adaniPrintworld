const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

router.use(auth, authorize("Admin"));


router.get("/heads", adminController.getAllHeads);
router.get("/lots/verified", adminController.getVerifiedLots);
router.get("/lot/:lotId/download", adminController.downloadLot);

module.exports = router;