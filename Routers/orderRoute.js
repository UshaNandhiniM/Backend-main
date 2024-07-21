import express from 'express';
import { createBooking, deleteBooking, getBookingById, getBookings, updateBooking } from '../Contollers/orderContoller.js';


const router =express.Router();

router.get("/getorder", getBookings);
router.get("/get-order/:id",getBookingById)
router.post("/create-order", createBooking);
router.put("/update-order/:id", updateBooking);
router.delete("/delete-order/:id",deleteBooking );

export default router;



