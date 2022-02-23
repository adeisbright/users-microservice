import BaseError from "./BaseError.js";
import HTTP_STATUS_CODES from "../../constants/http-status-codes.js";

/**
 * @description
 * Error thrown when a bad request is made to our server
 */
class BadRequestError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
    }

    get statusCode() {
        return HTTP_STATUS_CODES.BAD_REQUEST;
    }
}

export default BadRequestError;
