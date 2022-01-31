import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import UserRouter from "./services/";
import MongooseLoader from "./loaders/MongooseLoader";

dotenv.config();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

MongooseLoader();

app.use("/", UserRouter);
app.listen(5000, () => console.log("Running"));
//module.exports = app;
