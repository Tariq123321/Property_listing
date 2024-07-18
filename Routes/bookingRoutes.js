const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);
router.patch("/:id/status", bookingController.updateBookingStatus);
router.patch("/:id/cancel", bookingController.cancelBooking);

module.exports = router;
