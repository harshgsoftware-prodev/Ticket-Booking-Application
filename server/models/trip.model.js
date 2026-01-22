const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    source: String,
    destination: String,
    date: Date,
    vehicleNumber: String,
});

module.exports = mongoose.model("Trip", tripSchema);
