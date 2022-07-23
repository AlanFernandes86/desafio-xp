import getDataSource from '../models/MySqlDataSource';
import IClient from '../interfaces/IClient';
import Account from '../models/entities/Account';
import Client from '../models/entities/Client';
import Wallet from '../models/entities/Wallet';
import HttpError from '../shared/HttpError';
import uuid from '../utils/uuid';

const setClient = async (iClient: IClient): Promise<IClient> => {
  try {
    const dataSource = await getDataSource();

    const account = new Account();
    account.balance = 0.0;

    const wallet = new Wallet();

    const client = new Client();
    client.name = iClient.name || '';
    client.username = iClient.username;
    client.password = uuid.getPasswordHash(iClient.password);
    client.account = account;
    client.wallet = wallet;

    const newClient = await dataSource.manager.save(client);

    return newClient as IClient;
  } catch (error: any) {
    throw new HttpError(500, error.message);
  }
};

const getClientById = async (clientId: number): Promise<IClient> => {
  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        id: clientId,
      },
      relations: {
        wallet: {
          walletStocks: {
            stock: true,
          },
          client: true,
        },
        account: true,
      },
    });

    return client as IClient;
  } catch (error) {
    throw new HttpError(404, 'Pessoa investidora não encontrada para o id informado.');
  }
};

const getClientByUsernameAndPassword = async (
  username: string,
  password: string,
): Promise<IClient> => {
  try {
    const dataSource = await getDataSource();

    const client = await dataSource.manager.findOneOrFail(Client, {
      where: {
        username,
        password: uuid.getPasswordHash(password),
      },
      relations: {
        wallet: true,
        account: true,
      },
    });

    return client as IClient;
  } catch (error) {
    throw new HttpError(404, 'Usuário ou senha inválido.');
  }
};

export default {
  setClient,
  getClientById,
  getClientByUsernameAndPassword,
};
