const express = require("express");

const {
    lockSeat,
    confirmSeat,
    getSeats,
    cancelSeat,
    confirmMultipleSeats,
    cancelMultipleSeats,
    cancelMyLockedSeats,
} = require("../controllers/seat.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/test", () => {
    console.log("it is workig");
});

router.get("/", getSeats);
router.post("/lock", authMiddleware, lockSeat);
router.post("/confirm", authMiddleware, confirmSeat);
router.post("/cancel", authMiddleware, cancelSeat);

router.post("/confirm-multiple", authMiddleware, confirmMultipleSeats);
router.post("/cancel-multiple", authMiddleware, cancelMultipleSeats);
router.post("/cancel-my-locked", authMiddleware, cancelMyLockedSeats);

module.exports = router;
