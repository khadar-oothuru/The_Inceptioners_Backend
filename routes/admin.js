const express = require('express');
const {
    adminLogin,
    addPackage,
    updatePackage,
    get_all_packages,
    get_single_package,
    deletePackage,
} = require("../controllers/Admin/packageController");

const { getAllBookings } = require("../controllers/Admin/getAllBookings");

const router = express.Router();

// Admin Routes
router.post('/login', adminLogin);
router.get('/bookings', getAllBookings);

// Package Routes
router.get('/packages', get_all_packages); // Get all packages
router.get('/packages/:id', get_single_package); // Get a single package by ID
router.post('/package', addPackage); // Add a new package
router.put('/packages/:id', updatePackage); // Update a package by ID
router.delete('/packages/:id', deletePackage); // Delete a package by ID

module.exports = router;
