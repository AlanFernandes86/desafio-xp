import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import dataSource from './models/MySqlDataSource';

const app = express();

app.use(express.json());

const main = () => {
  console.log(dataSource);
};

main();

export default app;
