const express = require("express");
const { getTrip } = require("../controllers/trip.controller");

const router = express.Router();

router.get("/", getTrip);

module.exports = router;
