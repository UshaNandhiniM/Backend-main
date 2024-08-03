import Booking from "../Models/bookingSchema.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ message: "Order Details", bookings });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBooking = async (req, res) => {
  const {
    name,
    email,
    address,
    pickupDate,
    phonenumber,
    carFuelType,
    carBrand,
    carNumber,
    productName,
    price,
    noteDown,
    totalPrice,
    paymentMethod,
    paymentStatus,
    status,
    bookingDate,
  } = req.body;
  const newBooking = new Booking({
    name,
    email,
    address,
    pickupDate,
    phonenumber,
    carFuelType,
    carBrand,
    carNumber,
    productName,
    price,
    noteDown,
    totalPrice,
    paymentMethod,
    paymentStatus,
    status,
    bookingDate,
  });
  try {
    const savedBooking = await newBooking.save();
    res
      .status(201)
      .json({ message: "ordre created succussfully", savedBooking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedbooking = await Booking.findByIdAndUpdate(
      { _id: id },
      {
        status: req.body.status,
        paymentStatus: req.body.paymentStatus,  
      }
    );
    if (!updatedbooking) {
      return next(errorHandler(404, "booking not found"));
    }
    res.status(200).json({
      message: "booking updated successfully",
      result: updatedbooking,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error updating a booking" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "booking deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal error deleting a booking" });
  }
};

export const getBookingById = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No booking with that id");
  const booking = await Booking.findById(_id);
  if (!booking) return res.status(404).send("No booking found with that id");
  res.status(200).json(booking);
};

export default {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
};
