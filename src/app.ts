import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import conn from './models/MySqlDataSource';

const app = express();

app.use(express.json());

conn.dataSource;

export default app;