import mongoose from "mongoose";

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
            console.log("Connected to the database");
        });
        db.on("disconnected", () => {
            console.log("Disconnected from the database");
        });
        db.on("error", () => {
            console.log("An Error occured");
        });
        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                console.log("Mongoose terminated. Process ended");
            });
            process.exit(0);
        });
    } catch (error) {
        console.error(error);
    }
};

export default launchDB;
