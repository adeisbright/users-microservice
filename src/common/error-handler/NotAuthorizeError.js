import BaseError from "./BaseError.js";
import HTTP_STATUS_CODES from "../../constants/http-status-codes.js";

/**
 * @description
 * Rejection Response for Request without Necessary priviledges
 */
class NotAuthorizeError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "NotAuthorizeError";
    }

    get statusCode() {
        return HTTP_STATUS_CODES.UNAUTHORIZED;
    }
}

export default NotAuthorizeError;
