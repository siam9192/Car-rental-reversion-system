import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const signIn = catchAsync(async(req:Request,res:Response)=>{
    const payload = req.body;
    const result = await AuthServices.signIn(payload)
})

export const AuthControllers = {
    signIn
}