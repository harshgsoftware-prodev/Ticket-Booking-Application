const {Schema, model } = require('mongoose')

const seatSchema = new Schema(
    {
        seatId: {
            type: String, 
            required: true,
            unique: true,
        },

        status: {
            type: String,
            enum: ['AVAILABLE', 'LOCKED', 'CONFIRMED'],
            default: 'AVAILABLE'
        },

        lockedBy: {
            type: String
        },

        lockedExpiresAt: {
            type: Date,
        }
    }, 
    { timestamps: true }
)

module.exports = model('Seat', seatSchema)


