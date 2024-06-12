import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import sendResponse from "../../utils/sendResponse";

const createBooking = catchAsync(async(req:Request,res:Response)=>{
    const payload = req.body ;
    const result = await BookingServices.createBookingIntoDB(payload)
    sendResponse(res,{status:true,statusCode:200,message:"Booking created successfully",data:result})
})


const returnTheCar = catchAsync(async(req:Request,res:Response)=>{
    const payload = req.body;
    const result = await BookingServices.returnTheCar(payload)
    sendResponse(res,{status:true,statusCode:200,message:"Car returned successfully",data:result})

})

const getAllBookings =  catchAsync(async(req:Request,res:Response)=>{
const query = req.query;
const result = await BookingServices.getAllBookingsFromDB(query)
sendResponse(res,{status:true,statusCode:200,message:"Bookings" || "No Data Found",data:result.length ? result : []})

}
)

const getAllUserBookings = catchAsync(async(req:Request,res:Response)=>{
    const {email} = req.user;
    const result = await BookingServices.getAllUserBookingsFromDB(email)
    sendResponse(res,{status:result.length ? true : false,statusCode: result.length? 200 : 404 ,message:result.length ? "My Bookings retrieved successfully" : "No Data Found",data:result.length ? result : []})
})

export const  BookingController = {
    createBooking,
    returnTheCar,
    getAllBookings,
    getAllUserBookings
}