const { Schema, model } = require("mongoose");

const seatSchema = new Schema(
    {
        tripId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },

        seatNumber: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["AVAILABLE", "LOCKED", "CONFIRMED"],
            default: "AVAILABLE",
            index: true,
        },

        lockedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        lockedExpiresAt: {
            type: Date,
        },
    },
    { timestamps: true },
);

module.exports = model("Seat", seatSchema);
