const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"],
    },
    availableDates: {
        type: [String],
        required: [true, "At least one available date is required"],
       
            message: "All dates must be in a valid format (e.g., YYYY-MM-DD)",
        },
    
    image: {
        type: String,
        required: [true, "Image URL is required"],
        match: [
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
            "Please provide a valid image URL (must end with .png, .jpg, etc.)",
        ],
    },
}, {
    timestamps: true, 
});

module.exports = mongoose.model('Package', PackageSchema);




