import ErrorAlert from "../error-reporting/ErrorAlert.js";
import fileLogger from "../logging/file-logger.js";

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    console.log(err.code);
    console.log(err.address, err.errno, err.dest);
    console.log(err.info);
    console.log(err.path);
    let errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();

    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;

    fileLogger.log({
        message: errorMessage,
        level: "error",
    });

    res.status(err.statusCode).json(err);
};

export default errorHandler;
