const express = require("express");

const {
    lockSeat,
    confirmSeat,
    getSeats,
} = require("../controllers/seat.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/test", () => {
    console.log("it is workig");
});

router.get("/", getSeats);
router.post("/lock", authMiddleware, lockSeat);
router.post("/confirm", authMiddleware, confirmSeat);

module.exports = router;
