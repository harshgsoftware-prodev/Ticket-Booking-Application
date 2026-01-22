const express = require("express");
const { getUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, getUser);

module.exports = router;
