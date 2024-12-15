const Booking = require("../../model/booking");
const Package = require("../../model/package");

const bookingController = async (req, res) => {
    try {
        const { name, emails, phone, travelers, specialRequests, packageId } = req.body;

        // Find the package to get its details
        const pkg = await Package.findById(packageId);
        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }

        // Calculate total price
        const parsedTravelers = parseInt(travelers, 10) || 1; // Default to 1 if invalid
        const totalPrice = parsedTravelers * pkg.price;

        // Create the booking with required fields
        const booking = await Booking.create({
            name,
            emails,
            phone,
            travelers: parsedTravelers,
            specialRequests,
            package: pkg._id,
            packageTitle: pkg.title,
            totalPrice,
        });

        return res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { bookingController };
