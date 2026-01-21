require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')

//routes
const seatRoute = require('./routes/seat.route')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/api', seatRoute)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listeing on ${port}`)
    })
})
