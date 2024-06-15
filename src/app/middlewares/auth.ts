import { NextFunction, Request, Response } from 'express';
import AppError from '../Errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import { SendNoAccessResponse } from '../utils/sendResponse';

export const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
      SendNoAccessResponse(res)
      return;
    }
    const token = req.headers.authorization?.split('Bearer ')[1];
   
    if (!token) {
      SendNoAccessResponse(res)
      return;
    }
    jwt.verify(token as string, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        SendNoAccessResponse(res)
        return;
      }
      if (!requiredRoles.includes((decoded as JwtPayload).role)) {
        SendNoAccessResponse(res)
        return;
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};
