const Booking = require("../../model/booking");

const  getAllBookings =  async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch packages', error: error.message });
    }
}



module.exports = {
    getAllBookings,
};
