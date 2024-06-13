import { NextFunction, Request, Response } from 'express';
import AppError from '../Errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';

export const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
      throw new AppError(400, 'You have no access to this route');
    }
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new AppError(401, 'You have no access to this route');
    }
    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(401, 'You have no access to this route');
      }
      if (!requiredRoles.includes((decoded as JwtPayload).role)) {
        throw new AppError(401, 'You have no access to this route');
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};
