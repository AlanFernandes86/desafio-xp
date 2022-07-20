import { sign, SignOptions, verify } from 'jsonwebtoken';
import IClient from '../interfaces/IClient';
import HttpError from '../shared/HttpError';

const SECRET = 'process.env.JWT_SECRET';

const signInOptions: SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateTokenJWT = (payload: IClient) => sign(payload, SECRET, signInOptions);

const authorizationToken = async (token: string) => {
  if (!token) {
    throw new HttpError(401, 'Token not found');
  }

  try {
    const instrospection = await verify(token, SECRET, signInOptions);
    return instrospection;
  } catch (error) {
    throw new HttpError(401, 'Expired or invalid token');
  }
};

export {
  generateTokenJWT,
  authorizationToken,
};
