// const Booking = require("../../model/booking");
// const Package = require("../../model/package");

// const bookingController = async (req, res) => {
//     try {
//         const { name, email, phone, travelers, specialRequests, packageId } = req.body;

//         console.log("Incoming Request:", req.body);

//         // Find package by ID
//         const pkg = await Package.findById(packageId);
//         if (!pkg) {
//             return res.status(404).json({ message: 'Package not found' });
//         }

//         const totalPrice = travelers * pkg.price;

//         const booking = new Booking({
//             name,
//             email,
//             phone,
//             travelers,
//             specialRequests,
//             package: pkg._id,
//             totalPrice,
//         });

//         console.log("Saving Booking...");
//         await booking.save();

//         res.json({ message: 'Booking successful', booking });
//     } catch (error) {
//         console.error("Error:", error);

//         // Handle duplicate email error
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyValue)[0];
//             return res.status(400).json({ message: `${field} already exists` });
//         }

//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// module.exports = {
//     bookingController,
// };
                       


const Booking = require("../../model/booking");
const Package = require("../../model/package");

const bookingController = async (req, res) => {
    try {
        const { name, email, phone, travelers, specialRequests, packageId } = req.body;

        // Validate inputs
        if (!name || !email || !phone || !travelers || !packageId) {
            return res.status(400).json({ message: 'All fields are required' });
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
            email,
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
