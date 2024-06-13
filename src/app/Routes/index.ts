import { Router } from 'express';
import { AuthRouter } from '../modules/Auth/auth.route';
import { CarRouter } from '../modules/Car/car.route';
import { BookingRouter } from '../modules/Booking/booking.route';
const router = Router();
const moduleRoutes: { path: string; route: any }[] = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/cars',
    route: CarRouter,
  },
  {
    path: '/bookings',
    route: BookingRouter,
  },
];

moduleRoutes.forEach((ele) => {
  router.use(ele.path, ele.route);
});

export default router;
