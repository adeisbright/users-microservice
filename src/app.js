import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import userRouter from "./services/users/user.routes.js";
import launchDB from "./loaders/MongooseLoader.js";
import errorHandler from "./common/error-handler/error-handler.js";
import httpLogger from "./common/logging/http-logger.js";
import mailingJob from "./job/mailing-job.js";
import userService from "./services/users/user.service.js";

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
const printHey = () => console.log("Hey");

const addNum = () => console.log("Why");

//Task Gating => Can Task Be automatically scheduled ?
mailingJob(listTotalUsers, "*/3 * * * * *");
// mailingJob(printHey);
// mailingJob(addNum);
app.use("/", userRouter);
app.use(errorHandler);

app.listen(5000, () => console.log("Running"));
