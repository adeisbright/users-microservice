import winston from "winston";
import path from "path";

const infoFile = path.join("./", "/logs/info.log");

const streamLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: infoFile,
            level: "info",
            colorize: true,
            json: false,
        }),
    ],
});

streamLogger.stream = {
    write: (message, encoding) => streamLogger.info(message),
};

export default streamLogger;
