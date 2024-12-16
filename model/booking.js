const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (email) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    travelers: {
      type: Number,
      required: [true, "Number of travelers is required"],
      min: [1, "At least one traveler is required"],
    },
    specialRequests: {
      type: String,
      trim: true,
      default: "None",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: [true, "Package reference is required"],
    },
    packageTitle: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be a positive number"],
    },
    selectedDate: {
      type: String,
      required: [true, "Selected date is required"],
      validate: {
        validator: function (date) {
          return !isNaN(Date.parse(date));
        },
        message: "Selected date must be a valid date",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
