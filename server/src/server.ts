require('express-async-errors');
require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';

import { connectDb } from './config/connection';

// Routes
import auth from './routes/auth';
import customer from './routes/customer';
import product from './routes/product';
import order from './routes/order';
import payments from './routes/payments';
import success from './routes/success';

const app = express();

connectDb();

app.use(
  express.json({
    limit: '20mb',
    verify: (req: Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     allowedHeaders: 'Content-Type, Authorization',
//   })
// );

/** @description Auth routes */
app.use('/api/v1/auth', auth);
/**@description Customer routes */
app.use('/api/v1/customer', customer);
/**@description Product routes */
app.use('/api/v1/product', product);
/**@description Order routes */
app.use('/api/v1/order', order);
/**@description Payment routes */
app.use('/api/v1/session', payments);
/**@description Success routes */
app.use('/api/v1/verify', success);

// Serve static client-side files
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Catch-all route for client-side
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// __dirname = path.resolve();

// console.log(__dirname);
// app.use(express.static(path.join(__dirname, 'client/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
// });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
