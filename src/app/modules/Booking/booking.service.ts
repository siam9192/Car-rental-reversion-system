import { date, number } from 'zod';
import AppError from '../../Errors/AppError';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';
import { Booking } from './Booking.model';
import { TBookingRequest } from './booking.interface';
import mongoose from 'mongoose';

const createBookingIntoDB = async (payload: TBookingRequest) => {
  const startTime = Number(payload.startTime);
  // Checking the start time is that in 24 hours
  if (startTime && startTime > 24) {
    throw new AppError(400, 'Invalid start time');
  }

  // Checking is the user exists on the database
  const user = await User.findOne({ email: payload.email });

  // Checking is the car exists on the database

  const car = await Car.isCarExists(payload.carId.toString());

  if (!car) {
    throw new AppError(400, 'Car not found');
  }
  if (car.isDeleted) {
    throw new AppError(400, 'Car not found');
  }
  if (!user) {
    throw new AppError(400, 'User not found');
  }

  const booking = {
    car: car._id,
    user: user._id,
    date: payload.date,
    startTime: payload.startTime,
  };
  let id;
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const userBooking = await Booking.create([booking], { session });
    const updatedCarStatus = await Car.findByIdAndUpdate(
      car._id,
      { status: 'unavailable' },
      { session, new: true, runValidators: true },
    );

    // If booking is unsuccessful or updating car status is unsuccessful it  will role back
    if (!userBooking.length || !updatedCarStatus) {
      throw new Error();
    }

    await session.commitTransaction();
    await session.endSession();
    return await Booking.findById(userBooking[0]._id.toString()).populate([
      { path: 'car' },
      { path: 'user' },
    ]);
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Booking is unsuccessful');
  }
};
const returnTheCar = async (payload: {
  bookingId: string;
  endTime: string;
}) => {
  const { bookingId, endTime } = payload;

  const booking = await Booking.isBookingExists(bookingId);

  // Checking is the booking exists in the database
  if (!booking) {
    throw new AppError(400, 'Booking is not found');
  }

  const car = await Car.isCarExists(booking.car.toString());

  let convertedEndTime;
  let convertedStartTime;

  // Convert booking end time in minute
  const splitEndTime = payload.endTime.split(':');
  convertedEndTime = Number(splitEndTime[0]) * 60 + Number(splitEndTime[1]);

  // Convert booking start time in minute
  const splitStartTime = booking.startTime.split(':');
  convertedStartTime =
    Number(splitStartTime[0]) * 60 + Number(splitStartTime[1] || '00');

  // Checking the end time format
  if (convertedEndTime < convertedStartTime) {
    throw new AppError(400, 'End time  cannot be getter than start time');
  }
  let totalCost = 0;
  if (car?.pricePerHour) {
    totalCost =
      (convertedEndTime - convertedStartTime) * (car.pricePerHour / 60);
  }
  const session = await mongoose.startSession()
  await session.startTransaction()

  try {
  const updatedCarStatus = await Car.findByIdAndUpdate(car._id,{status:"available"},{session,runValidators:true})
  const updateBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { endTime: endTime, totalCost, isBooked: 'confirmed' },
    { new: true,session},
  ).populate([{ path: 'car' }, { path: 'user' }]);


  if(!updatedCarStatus || !updateBooking){
   throw new Error()
  }
  await session.commitTransaction()
  await session.endSession()
  return updateBooking
 
  }
  catch{
    await session.abortTransaction()
    await session.endSession()
   throw new AppError(400,"Return the car unsuccessful")
  }

//   return result;
};

const getAllBookingsFromDB = async (query: any) => {
  const filter: any = {};

  if (query.carId) {
    filter.car = new mongoose.Types.ObjectId(query.carId);
  }

  if (query.date) {
    filter.date = query.date;
  }

  if (query.isBooked) {
    filter.isBooked = query.isBooked;
  }

  const result = await Booking.find(filter).populate([
    { path: 'car' },
    { path: 'user' },
  ]);
  return result;
};

const getAllUserBookingsFromDB = async (email: string) => {
  const result = await Booking.find({ email: email });
  return result;
};
export const BookingServices = {
  createBookingIntoDB,
  returnTheCar,
  getAllBookingsFromDB,
  getAllUserBookingsFromDB,
};
