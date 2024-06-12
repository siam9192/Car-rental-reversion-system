import AppError from "../../Errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload:TUser)=>{
const isUserExists = await User.findOne({email:payload?.email})
if(isUserExists){
    throw new AppError(400,"User is already exists on this email")
}
const result = await User.create(payload)
return result
}

export const UserServices = {
    createUserIntoDB
}