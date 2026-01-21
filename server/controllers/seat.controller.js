const Seat = require('../models/seat.model')

const LOCK_DURATION_MS = 2 * 60 * 1000 //2 min

//get all seats
const getSeats = async (req, res) => {
    const seats = Seat.find().lean()
    return res.status(200).json(seats)
}

//lock seat
const lockSeat = async (req, res) => {
    const {seatId, userId} = req.body

    const now = new Date()
    const expiresAt = new Date(now.getTime(), LOCK_DURATION_MS)

    const seat = await Seat.findOneAndUpdate(
        {
            seatId,
            $or: [
                {status: 'AVAILABLE'},
                {status: 'LOCKED', lockedExpiresAt: {$lte: now} }
            ], 
        },
        {
            status: 'LOCKED',
            lockedBy: userId,
            lockedExpiresAt: expiresAt,
        },
        { new: true }
    )

    if(!seat) {
        return res.status(400).json({message: "Seat not available"})
    }

    return res.status(200).json({message: "Seat is locked", seat})
}

//confirm seat
const confirmSeat = async(req, res) => {
    const {seatId, userId} = req.body
    const now = new Date()

    const seat = Seat.findOneAndUpdate(
        {
            seatId,
            status: 'LOCKED',
            lockedBy: userId,
            lockedExpiresAt: { $gt : now }
        }, 
        {
            status: 'CONFIRMED',
            lockedBy: null,
            lockedExpiresAt: null,
        }, 
        { new: true }
    )

    if(!seat) {
        return res.status(400).json({message: "Seat invalid or lock"})
    }

    return res.status(200).json({message: "Seat is book", seat})
}

module.exports = {
    getSeats,
    lockSeat,
    confirmSeat,
}