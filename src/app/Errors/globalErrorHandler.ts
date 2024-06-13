import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { HandleCastError } from './handleCastError';
import { HandleZodValidationError } from './handleZodValidationError';
import { HandleValidationError } from './handleValidationError';
import AppError from './AppError';
import { TErrorInterface, TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import config from '../config';

export const GlobalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSource[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err.name === 'CastError') {
    const errHandler = HandleCastError(err);
    statusCode = errHandler.statusCode;
    (message = errHandler.message), (errorSources = errHandler.errorResources);
  } else if (err instanceof ZodError) {
    const errHandler = HandleZodValidationError(err);
    statusCode = errHandler.statusCode;
    (message = errHandler.message), (errorSources = errHandler.errorResources);
  } else if (err.name === 'ValidationError') {
    const errHandler = HandleValidationError(err);
    statusCode = errHandler.statusCode;
    (message = errHandler.message), (errorSources = errHandler.errorResources);
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
