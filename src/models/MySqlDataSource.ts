import { DataSource } from 'typeorm';
import Account from './entities/Account';
import AccountTransaction from './entities/AccountTransaction';
import Client from './entities/Client';
import Stock from './entities/Stock';
import Wallet from './entities/Wallet';
import WalletStock from './entities/WalletStock';
import { WalletTransaction } from './entities/WalletTransaction';
import AccountTransactionSubscriber from './subscribers/AccountTransactionSubscriber';
import WalletTransactionSubscriber from './subscribers/WalletTransactionSubscriber';

class MySqlDataSource {
  private static AppDataSource = new DataSource({
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

  private static initialize = () => {
    MySqlDataSource.AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
        throw new Error('Error ao conectar ao banco de dados!');
      });
  };

  static get dataSource(): DataSource {
    if (MySqlDataSource.AppDataSource.isInitialized) {
      return MySqlDataSource.AppDataSource;
    }
    MySqlDataSource.initialize();
    return MySqlDataSource.AppDataSource;
  }
}

export default MySqlDataSource.dataSource;
