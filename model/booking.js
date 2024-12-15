const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    emails: {
      type: [String],
      required: [true, "At least one email is required"],
      validate: {
        validator: function (value) {
          return value.every(
            (email) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
          );
        },
        message: "Please provide valid email addresses",
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
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be a positive number"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
