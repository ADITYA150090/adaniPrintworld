const express = require("express");
const { signup, login, approveOfficer } = require("../controllers/officerController");
const authMiddleware = require("../middleware/authMiddleware"); // Head token check
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/approve/:id", authMiddleware, approveOfficer); // Head approves

module.exports = router;
