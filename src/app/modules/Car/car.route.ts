import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { carControllers } from "./car.controller";
import { BookingValidations } from "../Booking/booking.validation";
import { BookingController } from "../Booking/booking.controller";

const router = Router();



router.post("/",validateRequest(CarValidations.createCarValidationSchema),carControllers.createCar)

router.patch("/return",validateRequest(BookingValidations.updateReturnTheCarValidationSchema),BookingController.returnTheCar)

router.put("/:carId",validateRequest(CarValidations.carUpdateValidationSchema),carControllers.updateCar)


router.get("/:carId",carControllers.getCarById)

router.get('/',carControllers.getAllCars)

router.delete("/:carId",carControllers.deleteCar)

export const CarRouter = router