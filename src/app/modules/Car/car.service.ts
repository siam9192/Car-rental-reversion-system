import AppError from "../../Errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload:TCar)=>{
    const result = await Car.create(payload)
    return result
}
const updateCarIntoDB = async (carId:string,payload:Partial<TCar>)=>{
    
    // Check is the car available in the database
    const isCarExists = await Car.findById(carId)
    if(!isCarExists){
        throw new AppError(400,"Car is not found")
    }
    
    // Updating the car
    const result = await Car.findByIdAndUpdate(carId,{...payload},{new:true})
    return result
}

const getCarByIdFromDB = async (carId:string)=>{
    const result = await Car.findById(carId)
    return result
}
const getAllCarsFromDB = async ()=>{
    const result = await Car.find();
    return result
}
const deleteCarIntoDB = async (carId:string)=>{

// Check is the car available in the database
const isCarExists = await Car.findById(carId)

if(!isCarExists){
    throw new AppError(400,"Car is not found")
}


const result = await Car.findByIdAndUpdate(carId,{isDeleted:true},{new:true})

return null
}
export const CarServices = {
    createCarIntoDB,
    updateCarIntoDB,
    getCarByIdFromDB,
    getAllCarsFromDB,
    deleteCarIntoDB
}