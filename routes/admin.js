const express = require('express');
const {
    adminLogin,
    addPackage,
    updatePackage,
    deletePackage,
} = require("../controllers/Admin/packageController")

const { getAllBookings } = require("../controllers/Admin/getAllBookings")
const router = express.Router();

// Admin login route
router.post('/login', adminLogin);
router.get('/bookings', getAllBookings);

// Package routes
router.post('/packages', addPackage);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

module.exports = router;
