const mongoose = require("mongoose");
const Package = require("./package"); // Ensure the path to the Package model is correct

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
    packageTitle: {
      type: String,
      required: true, // Automatically filled, not required from the user
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

// Pre-save middleware to fetch and set the package title
BookingSchema.pre("save", async function (next) {
  if (this.isModified("package")) {
    try {
      const pkg = await Package.findById(this.package).select("title");
      if (!pkg) {
        return next(new Error("Package not found"));
      }
      this.packageTitle = pkg.title; // Automatically set the package title
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Booking", BookingSchema);
