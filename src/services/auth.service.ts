import getDataSource from '../models/MySqlDataSource';
import IClient from '../interfaces/IClient';
import IClientPayload from '../interfaces/IClientPayload';
import Client from '../models/entities/Client';
import HttpError from '../shared/HttpError';
import { generateTokenJWT } from '../utils/JWT';
import uuid from '../utils/uuid';

const getNewToken = (payload: IClientPayload): string => generateTokenJWT(payload);

const login = async (iClient: IClient): Promise<Client> => {
  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        username: iClient.username,
        password: uuid.getPasswordHash(iClient.password),
      },
      relations: {
        wallet: true,
        account: true,
      },
    });
    return client;
  } catch (error) {
    throw new HttpError(500, 'Usuário ou senha inválidos');
  }
};

export default {
  getNewToken,
  login,
};
