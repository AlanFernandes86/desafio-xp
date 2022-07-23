import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/models/entities/**.ts'],
  subscribers: ['./src/models/subscribers/**.ts'],
  synchronize: true,
};

export default config;
