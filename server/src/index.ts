require('express-async-errors');
require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sequelize, startDatabaseConnection } from './config/connection';

// Routes
import auth from './routes/auth';
import customer from './routes/customer';

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

startDatabaseConnection().then(async () => {
  await sequelize.sync({ alter: true });
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
