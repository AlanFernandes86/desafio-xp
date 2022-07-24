import { NextFunction, Request, Response } from 'express';
import newClientSchema from '../schemas/newClient.schema';
import HttpError from '../shared/HttpError';

const newClientMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    await newClientSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    throw new HttpError(400, error.message);
  }
};

export default newClientMiddleware;
