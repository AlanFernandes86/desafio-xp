
import { DataSource } from 'typeorm';
import Database from 'better-sqlite3';
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

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dataSource!: DataSource;

  async setupTestDB() {
    this.dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: Number.parseInt(process.env.DB_PORT || '3306', 10),
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'desafioxp-test',
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
  }

  async clearDB() {
    const entities = this.dataSource.entityMetadatas;

    await Promise.all(entities.map(async (entity) => {
      const repository = this.dataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }));

    (await this.getDataSource()).destroy();
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

