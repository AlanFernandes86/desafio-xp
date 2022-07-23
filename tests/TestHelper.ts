
import { DataSource } from 'typeorm';
import Database from 'better-sqlite3';

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dataSource!: DataSource;
  private testdb!: any;

  async setupTestDB() {
    this.testdb = new Database(':memory:', { verbose: console.log });
    this.dataSource = new DataSource({
      name: 'default',
      type: 'better-sqlite3',
      database: ':memory:',
      entities: ['src/models/entities/*.ts'],
      subscribers: ['src/models/subscribers/*.ts'],
      synchronize: true,
    });
    await this.dataSource.initialize();
  }

  teardownTestDB() {
    this.dataSource.destroy();
    this.testdb.close();
  }

  getDataSource = async (): Promise<DataSource> => {
    if (!this.dataSource.isInitialized) {
      await this.setupTestDB();
      return this.dataSource;
    }
    return this.dataSource;
  };
}

