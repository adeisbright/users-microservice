import BaseError from "./BaseError.js";
import HTTP_STATUS_CODES from "../../constants/http-status-codes.js";

/**
 * @description
 * Rejection resonse when a request is made to a resource that does not exist
 */
class NotFoundError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }

    get statusCode() {
        return HTTP_STATUS_CODES.NOT_FOUND;
    }
}

export default NotFoundError;
