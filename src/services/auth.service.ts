import IClient from '../interfaces/IClient';
import Account from '../models/entities/Account';
import Client from '../models/entities/Client';
import Wallet from '../models/entities/Wallet';
import dataSource from '../models/MySqlDataSource';
import { generateTokenJWT } from '../utils/JWT';

const newClient = async (iClient: IClient): Promise<string> => {
  const client = new Client();
  client.name = iClient.name;
  client.username = iClient.username;
  client.password = iClient.password;
  await dataSource.manager.save(client);

  const account = new Account();
  account.client = client;
  account.balance = 0;
  await dataSource.manager.save(account);

  const wallet = new Wallet();
  wallet.client = client;
  await dataSource.manager.save(wallet);

  return generateTokenJWT(client.toIClient());
};

export default { newClient };
