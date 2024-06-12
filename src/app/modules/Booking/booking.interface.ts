import mongoose, { Model } from "mongoose"

export type TBooking = {
    date:String;
    user:mongoose.Types.ObjectId;
    car:mongoose.Types.ObjectId;
    startTime:string;
    endTime:string;
    totalCost:number;
    isBooked?:"confirmed" | "unconfirmed"
}

export interface TBookingStaticsMethods extends Model<TBooking>{
    isBookingExists(bookingId:string):TBooking | null
}