import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import httpErrorMiddleware from './middlewares/http.error.middleware';
import routers from './routes';
import initializeDatabase from './helpers/initializeDatabase';

const app = express();

const main = async () => {
  await initializeDatabase();

  app.use(express.json());

  app.use(routers);

  app.use(httpErrorMiddleware);
};

main();

export default app;
