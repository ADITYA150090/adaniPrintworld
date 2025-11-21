const express = require("express");
const router = express.Router();
const officerController = require("./officer.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

router.use(auth, authorize("Officer"));

router.get("/dashboard", officerController.getDashboard);
router.post("/lot", officerController.createLot);
router.get("/lots", officerController.getMyLots);
router.post("/nameplate", officerController.createNameplate);


module.exports = router;