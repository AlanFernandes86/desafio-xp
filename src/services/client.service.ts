import getDataSource from '../models/MySqlDataSource';
import IClient from '../interfaces/IClient';
import Account from '../models/entities/Account';
import Client from '../models/entities/Client';
import Wallet from '../models/entities/Wallet';
import HttpError from '../shared/HttpError';
import uuid from '../utils/uuid';

const setClient = async (iClient: IClient): Promise<Client> => {
  try {
    const dataSource = await getDataSource();

    const account = new Account();
    account.balance = 0.0;

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

const getClientById = async (clientId: number): Promise<Client> => {
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

    return client;
  } catch (error) {
    console.log(error);
    throw new HttpError(404, 'Cliente não encontrado.');
  }
};

export default {
  setClient,
  getClientById,
};