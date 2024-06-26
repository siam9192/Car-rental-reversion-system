import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import sendResponse, {
  SendDataNotFoundResponse,
} from '../../utils/sendResponse';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.email = req.user.email;
  const result = await BookingServices.createBookingIntoDB(payload);
  sendResponse(res, {
    status: true,
    statusCode: 200,
    message: 'Car booked successfully',
    data: result,
  });
});

const returnTheCar = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await BookingServices.returnTheCar(payload);
  sendResponse(res, {
    status: true,
    statusCode: 200,
    message: 'Car returned successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await BookingServices.getAllBookingsFromDB(query);
  if (result && result.length) {
    sendResponse(res, {
      status: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: result,
    });
  } else {
    SendDataNotFoundResponse(res);
  }
});

const getAllUserBookings = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const result = await BookingServices.getAllUserBookingsFromDB(email);
  if (result && result.length) {
    sendResponse(res, {
      statusCode: 200,
      status: false,
      message: 'My Bookings retrieved successfully',
      data: result,
    });
  } else {
    SendDataNotFoundResponse(res);
  }
});

export const BookingController = {
  createBooking,
  returnTheCar,
  getAllBookings,
  getAllUserBookings,
};
