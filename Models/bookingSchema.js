import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    address: String,
    pickupDate:String,
    phonenumber: Number,
    carFuelType: String,
    carBrand: String,
    carNumber: String,
    noteDown: String,
    productName: String,
    price: Number,
    totalPrice: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["booked", "completed"],
      default: "booked",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },

    // Add other fields if needed like notes, payment details etc.
    // This can be a reference to a Mechanic model if you have one
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
