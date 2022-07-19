import { DataSource } from 'typeorm';
import { Account } from './entities/Account';
import { AccountTransaction } from './entities/AccountTransaction';
import { AccountTransactionType } from './entities/AccountTransactionType';
import { Client } from './entities/Client';

class MySqlDataSource {
  private static AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: Number.parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      Client,
      Account,
      AccountTransaction,
      AccountTransactionType,
    ],
    synchronize: true
  });

  private initialize() {
    MySqlDataSource.AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
        throw new Error('Error ao conectar ao banco de dados!');        
    });
  }

  get dataSource(): DataSource {
    if (MySqlDataSource.AppDataSource.isInitialized) {
      return MySqlDataSource.AppDataSource;
    } else {
      this.initialize();
      return MySqlDataSource.AppDataSource;
    }
  }

}

export default new MySqlDataSource();