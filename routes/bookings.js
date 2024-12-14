const express = require('express');
const { bookingController} = require("../controllers/booking/bookingController")
const router = express.Router();

router.post('/', bookingController);

module.exports = router;
