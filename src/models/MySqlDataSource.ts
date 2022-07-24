import { DataSource } from 'typeorm';
import config from '../../typeorm.config';
import HttpError from '../shared/HttpError';

const AppDataSource = new DataSource(config);

const initialize = async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
      throw new HttpError(500, 'Error ao conectar com o banco de dados!');
    });
};

const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await initialize();
    return AppDataSource;
  }
  return AppDataSource;
};

export default getDataSource;
