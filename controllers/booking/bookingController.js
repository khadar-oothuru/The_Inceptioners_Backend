const Booking = require("../../model/booking");
const Package = require("../../model/package");

const bookingController = async (req, res) => {
    try {
        const { name, email, phone, travelers, specialRequests, packageId, selectedDate } = req.body;

        // Validate packageId
        if (!packageId) {
            return res.status(400).json({ error: "Package ID is required" });
        }

        const pkg = await Package.findById(packageId);
        if (!pkg) {
            return res.status(404).json({ error: "Package not found" });
        }

        // Validate selectedDate
        if (!selectedDate || !pkg.availableDates.includes(selectedDate)) {
            return res.status(400).json({ error: "Invalid or unavailable date selected" });
        }

        // Calculate total price
        const totalPrice = travelers * pkg.price;

        // Create a new booking
        const booking = new Booking({
            name,
            email,
            phone,
            travelers,
            specialRequests: specialRequests || "None",
            package: pkg._id,
            packageTitle: pkg.title,
            totalPrice,
            selectedDate,
        });

        const savedBooking = await booking.save();

        res.status(201).json({ message: "Booking successful", booking: savedBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "An error occurred while processing your booking" });
    }
};

module.exports = { bookingController };
