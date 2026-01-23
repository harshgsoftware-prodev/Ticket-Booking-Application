const Seat = require("../models/seat.model");

const LOCK_DURATION_MS = 0.5 * 60 * 1000; //30 second

//get all seats
const getSeats = async (req, res) => {
    await Seat.updateMany(
        {
            status: "LOCKED",
            lockedExpiresAt: { $lt: new Date() },
        },
        {
            $set: {
                status: "AVAILABLE",
                lockedBy: null,
                lockedExpiresAt: null,
            },
        },
    );

    const seats = await Seat.find().lean();
    return res.status(200).json(seats);
};

//get seat by trip
const getSeatsByTrip = async (req, res) => {
    try {
        const { tripId } = req.params;

        if (!tripId && !mongoose.Types.ObjectId.isValid(tripId)) {
            return res.status(400).json({ message: "Invalid tripId" });
        }

        await Seat.updateMany(
            {
                tripId,
                status: "LOCKED",
                lockedExpiresAt: { $lt: new Date() },
            },
            {
                $set: {
                    status: "AVAILABLE",
                    lockedBy: null,
                    lockedExpiresAt: null,
                },
            },
        );

        const seats = await Seat.find({ tripId })
            .sort({ seatNumber: 1 })
            .lean();

        res.json(seats);
    } catch (err) {
        res.status(500).json({
            message: "Fail to fetch seats",
        });
    }
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

//confirm one seat
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

//confirm multiple seats
const confirmMultipleSeats = async (req, res) => {
    const { seatIds } = req.body;
    const userId = req.user.id;
    const now = new Date();

    if (!seatIds || seatIds.length === 0) {
        return res.status(400).json({ message: "No seats provided" });
    }

    const result = await Seat.updateMany(
        {
            _id: { $in: seatIds },
            status: "LOCKED",
            lockedBy: userId,
            lockedExpiresAt: { $gt: now },
        },
        {
            $set: {
                status: "CONFIRMED",
                confirmedBy: userId,
                lockedBy: null,
                lockedExpiresAt: null,
            },
        },
    );

    if (result.modifiedCount === 0) {
        return res.status(400).json({
            message: "Seats invalid or lock expired",
        });
    }

    return res.status(200).json({
        message: "Seats confirmed successfully",
        confirmedCount: result.modifiedCount,
    });
};

//cancel one seat
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

// cancel multiple seats
const cancelMultipleSeats = async (req, res) => {
    const { seatIds } = req.body;
    const userId = req.user.id;

    if (!seatIds || seatIds.length === 0) {
        return res.status(400).json({ message: "No seats provided" });
    }

    const result = await Seat.updateMany(
        {
            _id: { $in: seatIds },
            status: "CONFIRMED",
            confirmedBy: userId,
        },
        {
            $set: {
                status: "AVAILABLE",
                confirmedBy: null,
            },
        },
    );

    if (result.modifiedCount === 0) {
        return res.status(403).json({
            message: "No seats cancelled",
        });
    }

    return res.status(200).json({
        message: "Seats cancelled successfully",
        cancelledCount: result.modifiedCount,
    });
};

// cancel current user seats
const cancelMyLockedSeats = async (req, res) => {
    const userId = req.user.id;

    const result = await Seat.updateMany(
        {
            status: "LOCKED",
            lockedBy: userId,
        },
        {
            $set: {
                status: "AVAILABLE",
                lockedBy: null,
                lockedExpiresAt: null,
            },
        },
    );
    return res.status(200).json({
        message: "All locked seats released",
        releasedCount: result.modifiedCount,
    });
};

// cancel LOCKED seat
const cancelLockedSeat = async (req, res) => {
    const { seatId } = req.body;
    const userId = req.user.id;

    const seat = await Seat.findOneAndUpdate(
        {
            _id: seatId,
            status: "LOCKED",
            lockedBy: userId,
        },
        {
            status: "AVAILABLE",
            lockedBy: null,
            lockedExpiresAt: null,
        },
        { new: true },
    );

    if (!seat) {
        return res.status(403).json({
            message: "Cannot cancel this seat",
        });
    }

    res.status(200).json(seat);
};

module.exports = {
    getSeats,
    getSeatsByTrip,
    lockSeat,
    confirmSeat,
    cancelSeat,
    confirmMultipleSeats,
    cancelMultipleSeats,
    cancelMyLockedSeats,
    cancelLockedSeat,
};
