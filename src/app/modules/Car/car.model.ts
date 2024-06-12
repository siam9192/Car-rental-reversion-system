import { Schema, model } from "mongoose";
import { TCar, TCarStaticMethods } from "./car.interface";
import { CarStatus } from "./car.constant";
import { boolean } from "zod";

const carModelSchema = new Schema <TCar>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    isElectric:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        enum:CarStatus,
        default:"available"
    },
    features:{
        type:[String],
        required:true
    },
    pricePerHour:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    }
},{
    timestamps:true
})

carModelSchema.statics.isCarExists = async(carId)=>{
return await Car.findById(carId)
}

export const Car = model<TCar,TCarStaticMethods>("Car",carModelSchema)