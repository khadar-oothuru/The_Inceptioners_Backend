const Booking = require("../../model/booking");
const Package = require("../../model/package");

const bookingController = async (req, res) => {
    try {
        const { name, email, phone, travelers, specialRequests, packageId } = req.body;

        // Validate packageId and fetch package details
        if (!packageId) {
            return res.status(400).json({ error: 'Package ID is required' });
        }

        const pkg = await Package.findById(packageId);
        if (!pkg) {
            return res.status(404).json({ error: 'Package not found' });
        }

        // Calculate total price
        const totalPrice = travelers * pkg.price;

        // Create a new booking
        const booking = new Booking({
            name,
            email,
            phone,
            travelers,
            specialRequests: specialRequests || 'None', // Default to 'None'
            package: pkg._id,
            packageTitle: pkg.title, // Derive package title
            totalPrice,
        });

        // Save the booking
        const savedBooking = await booking.save();

        // Respond with success message
        res.status(201).json({ message: 'Booking successful', booking: savedBooking });
    } catch (error) {
        // Handle errors
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'An error occurred while processing your booking' });
    }
}


module.exports = {bookingController}