require("express-async-errors");
require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { connectDb } from "./config/connection";

// Routes
import auth from "./routes/auth";
import customer from "./routes/customer";
import product from "./routes/product";
import order from "./routes/order";

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Shop Nex Express Server");
});

/** @description Auth routes */
app.use("/api/v1/auth", auth);
/**@description Customer routes */
app.use("/api/v1/customer", customer);
/**@description Product routes */
app.use("/api/v1/product", product);
/**@description Order routes */
app.use("/api/v1/order", order);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
