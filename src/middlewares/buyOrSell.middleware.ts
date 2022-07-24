import { NextFunction, Request, Response } from 'express';
import buyOrSellSchema from '../schemas/buyOrSell.schema';
import HttpError from '../shared/HttpError';

const buyOrSellMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    await buyOrSellSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    throw new HttpError(400, error.message);
  }
};

export default buyOrSellMiddleware;
