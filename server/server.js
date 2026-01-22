require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//routes
const seatRoute = require("./routes/seat.route");
const authRoute = require("./routes/auth.route");
const tripRoute = require("./routes/trip.route");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/seats", seatRoute);
app.use("/api/auth", authRoute);
app.use("/api/trips", tripRoute);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listeing on ${port}`);
    });
});
