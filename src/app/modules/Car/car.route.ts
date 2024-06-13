import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';
import { carControllers } from './car.controller';
import { BookingValidations } from '../Booking/booking.validation';
import { BookingController } from '../Booking/booking.controller';
import { Auth } from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  Auth('admin'),
  validateRequest(CarValidations.createCarValidationSchema),
  carControllers.createCar,
);

router.put(
  '/return',
  Auth('admin'),
  validateRequest(BookingValidations.updateReturnTheCarValidationSchema),
  BookingController.returnTheCar,
);

router.put(
  '/:carId',
  Auth('admin'),
  validateRequest(CarValidations.carUpdateValidationSchema),
  carControllers.updateCar,
);

router.get('/:carId', carControllers.getCarById);

router.get('/', carControllers.getAllCars);

router.delete('/:carId', Auth('admin'), carControllers.deleteCar);

export const CarRouter = router;
