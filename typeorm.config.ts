import { DataSourceOptions } from 'typeorm';
import Account from './src/models/entities/Account';
import AccountTransaction from './src/models/entities/AccountTransaction';
import Client from './src/models/entities/Client';
import Stock from './src/models/entities/Stock';
import Wallet from './src/models/entities/Wallet';
import WalletStock from './src/models/entities/WalletStock';
import WalletTransaction from './src/models/entities/WalletTransaction';
import AccountTransactionSubscriber from './src/models/subscribers/AccountTransactionSubscriber';
import WalletTransactionSubscriber from './src/models/subscribers/WalletTransactionSubscriber';

const config: DataSourceOptions = {
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
};

export default config;
