class BaseError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, BaseError);
    }
}

export default BaseError;
