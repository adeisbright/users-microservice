import BaseError from "./BaseError.js";
import HTTP_STATUS_CODES from "../../constants/http-status-codes.js";

/**
 * @description
 * Rejection resonse when a request is made to a resource that does not exist
 */
class ApplicationError extends BaseError {
    constructor(message, code = null) {
        super(message);
        this.name = "ApplicationError";
        this.code = code ? code : 500;
    }

    get statusCode() {
        return HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    }
}

export default ApplicationError;
