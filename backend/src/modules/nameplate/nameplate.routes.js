// routes/certificate.routes.js
const express = require("express");
const router = express.Router();

const { createNameplate } = require("./nameplate.controller");

router.post("/", createNameplate);

module.exports = router;