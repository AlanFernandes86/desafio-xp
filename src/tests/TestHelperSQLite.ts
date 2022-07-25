/* eslint-disable */
import { DataSource } from 'typeorm';
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

class TestHelperSQLite {
  private static _instance: TestHelperSQLite;

  private constructor() {}

  public static get instance(): TestHelperSQLite {
    if (!this._instance) this._instance = new TestHelperSQLite();

    return this._instance;
  }

  private dataSource!: DataSource;

  async setupTestDB() {
    this.dataSource = new DataSource({
      type: 'sqlite',
      logging: false,
      database: ':memory:',
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
    await this.dataSource.dropDatabase();
    await this.dataSource.destroy();
  }

  getDataSource = async (): Promise<DataSource> => {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      return this.dataSource;
    }
    return this.dataSource;
  };
}

export default TestHelperSQLite;
