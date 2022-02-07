import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import userRouter from "./services/users/user.routes.js";
import launchDB from "./loaders/MongooseLoader.js";
import errorHandler from "./common/error-handler/error-handler.js";
import httpLogger from "./common/logging/http-logger.js";

dotenv.config();
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(httpLogger);
launchDB();

app.use("/", userRouter);
app.use(errorHandler);

app.listen(5000, () => console.log("Running"));
