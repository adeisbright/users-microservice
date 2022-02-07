import mongoose from "mongoose";
import fileLogger from "../common/logging/file-logger.js";
import streamLogger from "../common/logging/stream-logger.js";

const environment = process.env.NODE_ENV || "dev";
const uri =
    environment === "dev"
        ? process.env.LOCAL_DB_URl
        : environment === "test"
        ? process.env.LOCAL_TEST_DB
        : process.env.REMOTE_MONGODB;

const options = {
    useNewUrlParser: true,
    autoIndex: false,
    keepAlive: true,
    useUnifiedTopology: true,
    keepAliveInitialDelay: 5e6,
    serverSelectionTimeoutMS: 10e3,
    socketTimeoutMS: 5000,
};
const launchDB = () => {
    try {
        mongoose.connect(process.env.LOCAL_DB_URl, options);
        const db = mongoose.connection;
        db.on("connected", () => {
            streamLogger.log({
                level: "info",
                message: `Connecting to Database  @${new Date().toISOString()}`,
            });
        });
        db.on("disconnected", () => {
            streamLogger.log({
                level: "info",
                message: `Disconnecting from Database @${new Date().toISOString()}`,
            });
        });
        db.on("error", () => {
            fileLogger.log({
                level: "error",
                message: `DB Error occured @${new Date().toISOString()}`,
            });
        });
        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                streamLogger.log({
                    level: "info",
                    message: `Killing Conection @${new Date().toISOString()}`,
                });
            });
            process.exit(0);
        });
    } catch (error) {
        fileLogger.log({
            level: "error",
            message: `${error.name}  : ${
                error.message
            } : Time ${new Date().toISOString()}`,
        });
    }
};

export default launchDB;
