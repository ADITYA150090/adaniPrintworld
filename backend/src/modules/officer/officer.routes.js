// FILE 3: officer.routes.js
// ============================================
const router = require("express").Router();
const controller = require("./officer.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

// Dashboard route
router.get("/dashboard", auth, authorize("Officer"), controller.dashboard);

// Lot routes
router.post("/lot", auth, authorize("Officer"), controller.createLot);
router.get("/lot", auth, authorize("Officer"), controller.getLots);

// Nameplate routes
router.post("/lot/:lotId/nameplate", auth, authorize("Officer"), controller.createNameplate);
router.get("/lot/:lotId/nameplate", auth, authorize("Officer"), controller.getNameplates);

// Status update route
router.patch("/nameplate/:nameplateId/status", auth, authorize("Officer"), controller.updateStatus);

module.exports = router;