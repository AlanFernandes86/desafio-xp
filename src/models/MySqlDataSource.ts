import { DataSource } from 'typeorm';

class MySqlDataSource {
  private static AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: Number.parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  private initialize() {
    MySqlDataSource.AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
  }

  get getConnection(): DataSource {
    if (MySqlDataSource.AppDataSource.isInitialized) {
      return MySqlDataSource.AppDataSource;
    } else {
      this.initialize();
      return MySqlDataSource.AppDataSource;
    }
  }

}

export default new MySqlDataSource();