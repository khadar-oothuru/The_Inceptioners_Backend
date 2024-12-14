const express = require('express');
const { get_all_packages , get_single_package} = require("../controllers/packages/packageController")
const router = express.Router();

// Get all packages
router.get('/', get_all_packages);

// Get a single package by ID
router.get('/:id', get_single_package);

module.exports = router;
