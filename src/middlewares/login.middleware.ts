import { NextFunction, Request, Response } from 'express';
import loginSchema from '../schemas/login.schema';
import HttpError from '../shared/HttpError';

const loginMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    throw new HttpError(400, error.message);
  }
};

export default loginMiddleware;
