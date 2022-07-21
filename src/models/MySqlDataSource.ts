import { DataSource } from 'typeorm';
import HttpError from '../shared/HttpError';
import Account from './entities/Account';
import AccountTransaction from './entities/AccountTransaction';
import Client from './entities/Client';
import Stock from './entities/Stock';
import Wallet from './entities/Wallet';
import WalletStock from './entities/WalletStock';
import { WalletTransaction } from './entities/WalletTransaction';
import AccountTransactionSubscriber from './subscribers/AccountTransactionSubscriber';
import WalletTransactionSubscriber from './subscribers/WalletTransactionSubscriber';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Client,
    Account,
    AccountTransaction,
    Wallet,
    WalletTransaction,
    WalletStock,
    Stock,
  ],
  subscribers: [
    AccountTransactionSubscriber,
    WalletTransactionSubscriber,
  ],
  synchronize: true,
});

const initialize = async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
      throw new HttpError(500, 'Error ao conectar com o banco de dados!');
    });
};

const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await initialize();
    return AppDataSource;
  }
  return AppDataSource;
};

export default getDataSource;
