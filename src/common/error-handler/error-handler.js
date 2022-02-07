import ErrorAlert from "../error-reporting/ErrorAlert.js";

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    console.log(err.code);
    console.log(err.address, err.errno, err.dest);
    let errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();

    res.status(err.statusCode).json(err);
};

export default errorHandler;
