const express = require("express");
const router = express.Router();
const nameplateController = require("./nameplate.controller");

// Create a new nameplate
router.post("/", nameplateController.create.bind(nameplateController));

// Get all nameplates
router.get("/", nameplateController.getAll.bind(nameplateController));

// Get nameplate by ID
router.get("/:id", nameplateController.getById.bind(nameplateController));

// Approve nameplate
router.patch("/:id/approve", nameplateController.approve.bind(nameplateController));

// Reject nameplate
router.patch("/:id/reject", nameplateController.reject.bind(nameplateController));

module.exports = router;