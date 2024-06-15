import mongoose from 'mongoose';

export const HandleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  const errorMessages = Object.keys(err.errors).map((issue) => {
    return {
      path: err.errors[issue].path,
      message: err.errors[issue].message,
    };
  });
  return {
    statusCode,
    message: err.message,
    errorMessages,
  };
};
