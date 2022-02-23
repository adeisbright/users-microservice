import ErrorAlert from "../error-reporting/ErrorAlert.js";
import fileLogger from "../logging/file-logger.js";
import ApplicationError from "./ApplicationError.js";

const errorHandler = (err, req, res, next) => {
    let errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();

    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;

    fileLogger.log({
        message: errorMessage,
        level: "error",
    });

    if (err instanceof ApplicationError) {
        //res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: "ERROR 500 : Internal Server Error" });
    } else {
        res.status(err.statusCode).json({ message: err.message });
    }
};

export default errorHandler;
