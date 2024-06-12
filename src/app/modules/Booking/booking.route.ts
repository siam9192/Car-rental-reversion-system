import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();

router.post("/",validateRequest(BookingValidations.createBookingValidationSchema),BookingController.createBooking)

router.get("/",BookingController.getAllBookings)

export const BookingRouter = router