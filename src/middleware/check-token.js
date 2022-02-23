import jwt from "jsonwebtoken";
import config from "../config.js";
import ApplicationError from "../common/error-handler/ApplicationError.js";
import BadRequestError from "../common/error-handler/BadRequestError.js";

/**
 * @description
 * Authenticates a request by checking for an authorization header
 * and also verify if the token is avalid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * Passed the request to the next middleware
 */
const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new BadRequestError("Authorization Header Required"));
        }
        const [authType, token] = authorization.split(" ");
        if (authType !== "Bearer" || token === undefined) {
            return next(new BadRequestError("Invalid Bearer Token"));
        }
        jwt.verify(
            token,
            config.jwt.secret,
            config.jwt.header,
            async function (err, data) {
                if (err) {
                    return next(new BadRequestError(err.message));
                }
                req.user = {
                    _id: data._id,
                };
            }
        );
        next();
    } catch (err) {
        return next(new ApplicationError(err));
    }
};

export default authentication;
