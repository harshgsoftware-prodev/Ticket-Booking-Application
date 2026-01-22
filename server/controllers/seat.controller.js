const Seat = require("../models/seat.model");

const LOCK_DURATION_MS = 0.5 * 60 * 1000; //30 second

//get all seats
const getSeats = async (req, res) => {
    const { tripId } = req.query;

    const now = new Date();

    await Seat.updateMany(
        {
            tripId,
            status: "LOCKED",
            lockedExpiresAt: { $lte: now },
        },
        {
            status: "AVAILABLE",
            lockedBy: null,
            lockedExpiresAt: null,
        },
    );

    const seats = await Seat.find({ tripId }).lean();
    return res.status(200).json(seats);
};

//lock seat
const lockSeat = async (req, res) => {
    const { seatId } = req.body;
    const userId = req.user.id;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + LOCK_DURATION_MS);

    const seat = await Seat.findOneAndUpdate(
        {
            _id: seatId,
            status: "AVAILABLE",
        },
        {
            status: "LOCKED",
            lockedBy: userId,
            lockedExpiresAt: expiresAt,
        },
        { new: true },
    );

    if (!seat) {
        return res.status(400).json({ message: "Seat not available" });
    }

    return res.status(200).json(seat);
};

//confirm seat
const confirmSeat = async (req, res) => {
    const { seatId } = req.body;
    const userId = req.user.id;
    const now = new Date();

    const seat = await Seat.findOneAndUpdate(
        {
            _id: seatId,
            status: "LOCKED",
            lockedBy: userId,
            lockedExpiresAt: { $gt: now },
        },
        {
            status: "CONFIRMED",
            confirmedBy: userId,
            lockedBy: null,
            lockedExpiresAt: null,
        },
        { new: true },
    );

    if (!seat) {
        return res.status(400).json({ message: "Seat invalid or lock" });
    }

    return res.status(200).json(seat);
};

//cancel seat
const cancelSeat = async (req, res) => {
    const { seatId } = req.body;
    const userId = req.user.id;

    const seat = await Seat.findOneAndUpdate(
        {
            _id: seatId,
            status: "CONFIRMED",
            confirmedBy: userId,
        },

        {
            status: "AVAILABLE",
            confirmedBy: null,
        },
        { new: true },
    );

    if (!seat) {
        return res.status(403).json({
            message: "You don't have rights to cancel this seat.",
        });
    }

    return res.status(200).json(seat);
};

module.exports = {
    getSeats,
    lockSeat,
    confirmSeat,
    cancelSeat,
};
