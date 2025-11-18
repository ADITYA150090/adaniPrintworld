const router = require("express").Router();
const controller = require("./officer.controller");
const auth = require("../../middleware/auth.middleware");
const role = require("../../middleware/role.middleware");

router.get("/dashboard", auth, role("Officer"), controller.dashboard);

router.post("/lot", auth, role("Officer"), controller.createLot);
router.get("/lot", auth, role("Officer"), controller.getLots);

router.post("/lot/:lotId/nameplate", auth, role("Officer"), controller.createNameplate);
router.get("/lot/:lotId/nameplate", auth, role("Officer"), controller.getNameplates);

router.patch("/nameplate/:nameplateId/status", auth, role("Officer"), controller.updateStatus);

module.exports = router;