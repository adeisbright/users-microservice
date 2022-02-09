import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import userRouter from "./services/users/user.routes.js";
import launchDB from "./loaders/MongooseLoader.js";
import errorHandler from "./common/error-handler/error-handler.js";
import httpLogger from "./common/logging/http-logger.js";
import mailingJob from "./job/job.js";
import userService from "./services/users/user.service.js";
import readFromChannel from "./rabbit-queue/read-channel.js";

dotenv.config();
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(httpLogger);
launchDB();

/**
 * @description
 * listTotalUsers get the total number of users and then list it
 * to the console
 */
const listTotalUsers = async () => {
    const results = await userService.getUsers();
    console.log(results.data.length);
};

//mailingJob(listTotalUsers, "* 5 * * * 1-3");
const logData = async (data) => {
    console.log(await data.content.toString());
};
readFromChannel("how", logData, false);

app.use("/", userRouter);
app.use(errorHandler);

app.listen(5000, () => console.log("Running"));
