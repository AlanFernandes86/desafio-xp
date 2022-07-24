import { DataSource } from 'typeorm';
import Client from '../src/models/entities/Client';
import Account from '../src/models/entities/Account';
import Wallet from '../src/models/entities/Wallet';
import WalletTransaction from '../src/models/entities/WalletTransaction';
import WalletStock from '../src/models/entities/WalletStock';
import Stock from '../src/models/entities/Stock';
import AccountTransactionSubscriber from '../src/models/subscribers/AccountTransactionSubscriber';
import WalletTransactionSubscriber from '../src/models/subscribers/WalletTransactionSubscriber';
import AccountTransaction from '../src/models/entities/AccountTransaction';
import 'dotenv/config';

class TestHelper {
  
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

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

export default TestHelper;

