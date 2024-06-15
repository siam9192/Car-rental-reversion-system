import { ZodError } from 'zod';
import { TErrorInterface } from '../interface/error';

export const HandleZodValidationError = (err: ZodError): TErrorInterface => {
  const statusCode = 400;
  const errorMessages = err.issues.map((issue) => {
    return {
      path: issue.path.at(-1) || '',
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation error',
    errorMessages,
  };
};
