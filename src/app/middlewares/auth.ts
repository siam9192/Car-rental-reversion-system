import { NextFunction, Request, Response } from 'express';
import AppError from '../Errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';

export const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(400, 'You are not authorized');
    }
    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(400, 'You are not authorized');
      }
      if (!requiredRoles.includes((decoded as JwtPayload).role)) {
        throw new AppError(400, 'You can not have access of this route');
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};
