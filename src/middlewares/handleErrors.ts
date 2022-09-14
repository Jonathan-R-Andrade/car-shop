import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import HttpStatus from '../enums/HttpStatus';
import HttpError from '../errors/HttpError';

const handleErrors: ErrorRequestHandler = (
  err: HttpError | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.issues });
  }
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};

export default handleErrors;
