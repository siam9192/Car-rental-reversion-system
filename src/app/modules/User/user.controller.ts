import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';


const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: 201,
    status: true,
    message: 'User registered successfully',
    data: result,
  });
});



export const UserControllers = {
  createUser
};
