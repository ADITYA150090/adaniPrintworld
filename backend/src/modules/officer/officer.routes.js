const router = require("express").Router();
const controller = require("./officer.controller");
const { auth, authorize } = require("../../middleware/auth.middleware");

router.get("/dashboard", auth, authorize("Officer"), controller.dashboard);

router.post("/lot", auth, authorize("Officer"), controller.createLot);
router.get("/lot", auth, authorize("Officer"), controller.getLots);

router.post("/lot/:lotId/nameplate", auth, authorize("Officer"), controller.createNameplate);
router.get("/lot/:lotId/nameplate", auth, authorize("Officer"), controller.getNameplates);

router.patch("/nameplate/:nameplateId/status", auth, authorize("Officer"), controller.updateStatus);

module.exports = router;