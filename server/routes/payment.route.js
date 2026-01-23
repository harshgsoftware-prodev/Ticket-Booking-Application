const express = require("express");

const { initPayment } = require("../controllers/payment.controller");

const router = express.Router();

router.post("/initPayment", initPayment);

module.exports = router;
