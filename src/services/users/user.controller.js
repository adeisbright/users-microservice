import UserService from "./user.service.js";
import ApplicationError from "../../common/error-handler/ApplicationError.js";
import NotFoundError from "../../common/error-handler/NotFoundError.js";
import ForbiddenError from "../../common/error-handler/ForbiddenError.js";
import BadRequestError from "../../common/error-handler/BadRequestError.js";
import NotAuthorizeError from "../../common/error-handler/NotAuthorizeError.js";

class UserController {
    async handleAddUser(req, res) {
        try {
            const user = await UserService.addUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }

    async handleGetUsers(req, res, next) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }
}

export default new UserController();
