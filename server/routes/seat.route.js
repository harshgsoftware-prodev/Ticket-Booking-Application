const express = require('express')

const {lockSeat, confirmSeat, getSeats} = require('../controllers/seat.controller')

const router = express.Router()

router.get('/test', () => {
    console.log('it is workig');
    
})

//get All seat
router.get('/seats', getSeats)

//lock seat
router.post('/lock-seat', lockSeat)

//confirm seat
router.post('/cofirm-seat', confirmSeat)

module.exports = router