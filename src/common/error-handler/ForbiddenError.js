import BaseError from "./BaseError.js";
import HTTP_STATUS_CODES from "../../constants/http-status-codes.js";

/**
 * @description
 * Rejection resonse when a request is made to a route that is not permitted
 */
class ForbiddenError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
    }

    get statusCode() {
        return HTTP_STATUS_CODES.FORBIDDEN;
    }
}

export default ForbiddenError;
