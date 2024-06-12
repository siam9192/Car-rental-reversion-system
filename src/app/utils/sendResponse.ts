import { Response } from "express";

type TResponseData = {
    statusCode:number;
    status:boolean;
    message:string;
    data:any
}

const sendResponse = (res:Response,responseData:TResponseData)=>{
  
res.status(responseData.statusCode).json({
    success:responseData.status,
    statusCode:responseData.statusCode,
    message:responseData.message,
    data:responseData.data
})
}

export default sendResponse