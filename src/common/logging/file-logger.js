import winston from "winston";
import path from "path";
const errorFile = path.join("./", "/logs/error.log");

const { combine, timestamp, prettyPrint } = winston.format;

const fileLogger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston.transports.File({ filename: errorFile, level: "info" }),
    ],
    exitOnError: false,
    colorize: true,
});

export default fileLogger;
