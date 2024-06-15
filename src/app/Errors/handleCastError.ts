import { CastError } from 'mongoose';
import { TErrorInterface } from '../interface/error';

export const HandleCastError = (err: CastError): TErrorInterface => {
  const statusCode = 400;
  const errorMessages = [
    {
      path: err.path || '',
      message: err.message || '',
    },
  ];

  return {
    statusCode,
    message: err?.message,
    errorMessages,
  };
};
