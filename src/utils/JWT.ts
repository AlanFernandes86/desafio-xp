import {
  sign,
  verify,
  JwtPayload,
  SignOptions,
} from 'jsonwebtoken';
import IClient from '../interfaces/IClient';
import HttpError from '../shared/HttpError';

const SECRET = process.env.JWT_SECRET || 'desafioxp';

const signInOptions: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateTokenJWT = (
  payload: Omit<IClient, 'password' | 'account' | 'wallet'>,
) => sign(payload, SECRET, signInOptions);

const authorizationToken = async (token: string): Promise<string | JwtPayload> => {
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
