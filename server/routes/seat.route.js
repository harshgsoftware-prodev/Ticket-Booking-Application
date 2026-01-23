const express = require("express");

const {
    lockSeat,
    confirmSeat,
    getSeats,
    getSeatsByTrip,
    cancelSeat,
    confirmMultipleSeats,
    cancelMultipleSeats,
    cancelMyLockedSeats,
    cancelLockedSeat,
} = require("../controllers/seat.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getSeats);
router.get("/:tripId", getSeatsByTrip);

router.post("/lock", authMiddleware, lockSeat);
router.post("/confirm", authMiddleware, confirmSeat);
router.post("/cancel", authMiddleware, cancelSeat);

router.post("/confirm-multiple", authMiddleware, confirmMultipleSeats);
router.post("/cancel-multiple", authMiddleware, cancelMultipleSeats);
router.post("/cancel-my-locked", authMiddleware, cancelMyLockedSeats);
router.post("/cancel-locked", authMiddleware, cancelLockedSeat);

module.exports = router;
