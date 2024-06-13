import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from '../Auth/auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserServices.createUserIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    status: true,
    message: 'User is created successfully',
    data: result,
  });
});

const signInUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthServices.signIn(payload);
});

export const UserControllers = {
  createUser,
  signInUser,
};
