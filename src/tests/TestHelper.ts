/* eslint-disable */
import { DataSource } from 'typeorm';
import mysql from 'mysql2/promise';
import Client from '../models/entities/Client';
import Account from '../models/entities/Account';
import Wallet from '../models/entities/Wallet';
import WalletTransaction from '../models/entities/WalletTransaction';
import WalletStock from '../models/entities/WalletStock';
import Stock from '../models/entities/Stock';
import AccountTransactionSubscriber from '../models/subscribers/AccountTransactionSubscriber';
import WalletTransactionSubscriber from '../models/subscribers/WalletTransactionSubscriber';
import AccountTransaction from '../models/entities/AccountTransaction';
import 'dotenv/config';

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
    const { DB_HOSTNAME, DB_PASSWORD, DB_PORT } = process.env;

    TestHelper.connection = mysql.createPool({
      host: DB_HOSTNAME,
      user: 'root',
      password: DB_PASSWORD,
    });

    await TestHelper.connection.execute("CREATE DATABASE desafioxptest;"); 

    this.dataSource = new DataSource({
      type: 'mysql',
      host: DB_HOSTNAME,
      port: Number.parseInt(DB_PORT || '3306', 10),
      username: 'root',
      password: DB_PASSWORD,
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

    await this.dataSource.initialize();
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

