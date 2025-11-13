const express = require("express");
const { signup, login, approveHead } = require("../controllers/adminController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/approve/:headId", approveHead);

module.exports = router;
