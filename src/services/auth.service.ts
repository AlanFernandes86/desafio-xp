import IClient from '../interfaces/IClient';
import IClientPayload from '../interfaces/IClientPayload';
import Account from '../models/entities/Account';
import Client from '../models/entities/Client';
import Wallet from '../models/entities/Wallet';
import dataSource from '../models/MySqlDataSource';
import HttpError from '../shared/HttpError';
import { generateTokenJWT } from '../utils/JWT';
import uuid from '../utils/uuid';

const setClient = async (iClient: IClient): Promise<Client> => {
  try {
    const account = new Account();
    account.balance = 0;

    const wallet = new Wallet();

    const client = new Client();
    client.name = iClient.name;
    client.username = iClient.username;
    client.password = uuid.getPasswordHash(iClient.password);
    client.account = account;
    client.wallet = wallet;

    const newClient = await dataSource.manager.save(client);

    return newClient;
  } catch (error) {
    console.log(error);
    throw new HttpError(500, 'Error ao cadastrar novo cliente');
  }
};

const getNewToken = (payload: IClientPayload): string => generateTokenJWT(payload);

const login = async (iClient: IClient): Promise<Client> => {
  try {
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

export default { setClient, getNewToken, login };
