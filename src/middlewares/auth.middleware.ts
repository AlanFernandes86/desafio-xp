import { NextFunction, Request, Response } from 'express';
import { authorizationToken } from '../utils/JWT';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  const payload = await authorizationToken(authorization || '');

  res.locals.payload = payload;

  next();
};

export default authMiddleware;
