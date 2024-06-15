import { Response } from 'express';

type TResponseData = {
  statusCode: number;
  status: boolean;
  message: string;
  data: any;
};

const sendResponse = (res: Response, responseData: TResponseData) => {
  res.status(responseData.statusCode).json({
    success: responseData.status,
    statusCode: responseData.statusCode,
    message: responseData.message,
    data: responseData.data,
  });
};

export const SendDataNotFoundResponse = (res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'No Data Found',
    data: [],
  });
};

export const SendNoAccessResponse = (res:Response)=>{
  res.status(401).json({
    success:false,
   statusCode: 401,
   message:"You have no access to this route"
  })
}
export default sendResponse;
