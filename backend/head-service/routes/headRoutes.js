const express = require("express");
const { signup, login, approveOfficer } = require("../controllers/headController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/approve/:id", verifyToken, checkRole("head"), approveOfficer);

module.exports = router;
