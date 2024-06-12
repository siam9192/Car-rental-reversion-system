import { Schema, model } from "mongoose";
import {TBooking, TBookingStaticsMethods } from "./booking.interface";

const bookingModelSchema = new Schema <TBooking>({
    date:{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    car: {
        type: Schema.Types.ObjectId,
        ref:"Car",
        required:true
    },
    startTime: {
        type:String,
        required:true
    },
    endTime: {
        type:String,
        default:null
    },
    totalCost:{
        type:Number,
        default:0
    },
    isBooked: {
        type:String,
        enum:["confirmed","unconfirmed"],
        default:"unconfirmed"
    }

},{
    timestamps:true
})

bookingModelSchema.statics.isBookingExists = async (bookingId)=>{
    return await Booking.findById(bookingId)
}
export const Booking = model<TBooking,TBookingStaticsMethods>("Booking",bookingModelSchema)