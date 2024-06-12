import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingController } from "./booking.controller";
import { Auth } from "../../middlewares/auth";

const router = Router();

router.post("/",validateRequest(BookingValidations.createBookingValidationSchema),BookingController.createBooking)

router.get("/",Auth("admin"),BookingController.getAllBookings)
router.get("/my-bookings",Auth("user"),BookingController.getAllUserBookings)
export const BookingRouter = router