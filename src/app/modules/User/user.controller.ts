import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req:Request,res:Response)=>{
    
    const payload = req.body
    const result = await UserServices.createUserIntoDB(payload)
    sendResponse(res,{statusCode:200,status:true,message:"User is created successfully",data:result})
})


export const UserControllers = {
createUser
}