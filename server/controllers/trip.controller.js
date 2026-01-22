const Trip = require("../models/trip.model");

const getTrip = async (req, res) => {
    const trips = await Trip.find().sort({ date: 1 });
    res.json(trips);
};

module.exports = { getTrip };
