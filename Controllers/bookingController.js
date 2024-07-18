const Booking = require("../Models/Booking");
const Property = require("../Models/Property");
const User = require("../Models/userSchema");

exports.createBooking = async (req, res) => {
	try {
		const { propertyId, tenantId, bookingDate, transactionId } = req.body;

		// Check if property and tenant exist
		const property = await Property.findById(propertyId);
		const tenant = await User.findById(tenantId);

		if (!property || !tenant) {
			return res
				.status(404)
				.json({ message: "Property or tenant not found" });
		}

		const newBooking = new Booking({
			property: propertyId,
			tenant: tenantId,
			bookingDate,
			transactionId,
		});

		const savedBooking = await newBooking.save();

		res.status(201).json(savedBooking);
	} catch (error) {
		res.status(500).json({
			message: "Error creating booking",
			error: error.message,
		});
	}
};

exports.getBookings = async (req, res) => {
	try {
		const bookings = await Booking.find()
			.populate("property", "name location")
			.populate("tenant", "name email");
		res.status(200).json(bookings);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching bookings",
			error: error.message,
		});
	}
};

exports.getBookingById = async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id)
			.populate("property", "name location")
			.populate("tenant", "name email");
		if (!booking) {
			return res.status(404).json({ message: "Booking not found" });
		}
		res.status(200).json(booking);
	} catch (error) {
		res.status(500).json({
			message: "Error fetching booking",
			error: error.message,
		});
	}
};

exports.updateBookingStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const booking = await Booking.findByIdAndUpdate(
			req.params.id,
			{ status, updatedAt: Date.now() },
			{ new: true }
		);
		if (!booking) {
			return res.status(404).json({ message: "Booking not found" });
		}
		res.status(200).json(booking);
	} catch (error) {
		res.status(500).json({
			message: "Error updating booking status",
			error: error.message,
		});
	}
};

exports.cancelBooking = async (req, res) => {
	try {
		const booking = await Booking.findByIdAndUpdate(
			req.params.id,
			{ status: "Cancelled", updatedAt: Date.now() },
			{ new: true }
		);
		if (!booking) {
			return res.status(404).json({ message: "Booking not found" });
		}
		res.status(200).json(booking);
	} catch (error) {
		res.status(500).json({
			message: "Error cancelling booking",
			error: error.message,
		});
	}
};
