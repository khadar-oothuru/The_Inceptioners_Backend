const Booking = require("../../model/booking");
const Package = require("../../model/package");

const bookingController = async (req, res) => {
    try {
        const { name, emails, phone, travelers, specialRequests, packageId } = req.body;

        // Validate inputs
        if (!name || !emails || !phone || !travelers || !packageId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate that emails is an array and contains valid email addresses
        if (!Array.isArray(emails) || emails.some(email => !/\S+@\S+\.\S+/.test(email))) {
            return res.status(400).json({ message: 'Emails must be a valid array of email addresses' });
        }

        const parsedTravelers = parseInt(travelers, 10);
        if (isNaN(parsedTravelers) || parsedTravelers <= 0) {
            return res.status(400).json({ message: 'Travelers must be a positive number' });
        }

        console.log("Incoming Request:", req.body);

        // Find the package by ID
        const pkg = await Package.findById(packageId);
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }

        const totalPrice = parsedTravelers * pkg.price;
        console.log(`Total price calculated: ${totalPrice}`);

        // Create and save the booking
        const booking = new Booking({
            name,
            emails, // Store the array of emails
            phone,
            travelers: parsedTravelers,
            specialRequests,
            package: pkg._id,
            totalPrice,
        });

        console.log("Saving Booking...");
        await booking.save();

        res.json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error("Error:", error);

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    bookingController,
};
