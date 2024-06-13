import { CastError } from 'mongoose';
import { TErrorInterface } from '../interface/error';

export const HandleCastError = (err: CastError): TErrorInterface => {
  const statusCode = 400;
  const errorResources = [
    {
      path: err.path || '',
      message: err.message || '',
    },
  ];

  return {
    statusCode,
    message: 'id is not validate',
    errorResources,
  };
};
