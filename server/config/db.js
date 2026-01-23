const mongoose = require('mongoose')

module.exports = connectDB = async () => {
    await mongoose.connect(process.env.MONDODB_URL)
    console.log('Mongodb connectedd!!!');
}