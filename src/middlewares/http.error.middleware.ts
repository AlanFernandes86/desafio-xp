import { NextFunction, Request, Response } from 'express';
import HttpError from '../shared/HttpError';

const httpErrorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = error as HttpError;

  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
