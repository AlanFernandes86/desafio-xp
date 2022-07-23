import { DataSource } from 'typeorm';
import mysql from 'mysql2/promise';
import Client from '../src/models/entities/Client';
import Account from '../src/models/entities/Account';
import Wallet from '../src/models/entities/Wallet';
import WalletTransaction from '../src/models/entities/WalletTransaction';
import WalletStock from '../src/models/entities/WalletStock';
import Stock from '../src/models/entities/Stock';
import AccountTransactionSubscriber from '../src/models/subscribers/AccountTransactionSubscriber';
import WalletTransactionSubscriber from '../src/models/subscribers/WalletTransactionSubscriber';
import AccountTransaction from '../src/models/entities/AccountTransaction';

class TestHelper {
  private static _instance: TestHelper;
  private static connection: mysql.Pool;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dataSource!: DataSource;

  async setupTestDB() {
    TestHelper.connection = mysql.createPool({
      host: process.env.DB_HOSTNAME,
      user: 'root',
      password: process.env.DB_PASSWORD,
    });

    await TestHelper.connection.execute("CREATE DATABASE desafioxptest;"); 

    this.dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: Number.parseInt(process.env.DB_PORT || '3306', 10),
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'desafioxptest',
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
      dropSchema: true,
      synchronize: true,
    });
  }

  async dropDB() {
    await TestHelper.connection.execute("DROP DATABASE IF EXISTS desafioxptest;");
    await TestHelper.connection.end()
  }

  getDataSource = async (): Promise<DataSource> => {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      return this.dataSource;
    }
    return this.dataSource;
  };
}

export default TestHelper;

