require('express-async-errors');
require('dotenv').config();
require('./config/associations');
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sequelize, startDatabaseConnection } from './config/connection';
import redisClient from './config/redis';

// Routes
import auth from './routes/auth';
import customer from './routes/customer';
import product from './routes/product';
import order from './routes/order';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Shop Nex Express Server');
});

/** @description Auth routes */
app.use('/api/v1/auth', auth);
/**@description Customer routes */
app.use('/api/v1/customer', customer);
/**@description Product routes */
app.use('/api/v1/product', product);
/**@description Order routes */
app.use('/api/v1/order', order);

startDatabaseConnection().then(async () => {
  await sequelize.sync({ alter: true });

  await redisClient.connect();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
