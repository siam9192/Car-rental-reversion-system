import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const signIn = catchAsync(async(req:Request,res:Response)=>{
    const payload = req.body;
    const result = await AuthServices.signIn(payload)

    res.status(200).json({
        success:true,
        statusCode:200,
        message:"User logged in successfully",
        data:{
            
        },
        token:result.accessToken
    })
})

export const AuthControllers = {
    signIn
}