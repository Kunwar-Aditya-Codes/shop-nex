require('express-async-errors');
require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sequelize, startDatabaseConnection } from './config/connection';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Shop Nex Express Server');
});

startDatabaseConnection().then(async () => {
  await sequelize.sync({ alter: true });
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
