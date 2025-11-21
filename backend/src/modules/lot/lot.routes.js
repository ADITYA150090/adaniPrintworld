const express = require("express");
const router = express.Router();
const lotController = require("./lot.controller");

router.post("/", lotController.createLot);
router.get("/", lotController.getLots);
router.get("/:id", lotController.getLotById);
router.put("/:id", lotController.updateLot);
router.delete("/:id", lotController.deleteLot);

module.exports = router;
