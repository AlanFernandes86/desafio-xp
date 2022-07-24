import { NextFunction, Request, Response } from 'express';
import depositOrWithdrawSchema from '../schemas/depositOrWithdraw.schema';
import HttpError from '../shared/HttpError';

const depositOrWithdrawMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    await depositOrWithdrawSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    throw new HttpError(400, error.message);
  }
};

export default depositOrWithdrawMiddleware;
