import UserService from "./user.service.js";
import ApplicationError from "../../common/error-handler/ApplicationError.js";
import NotFoundError from "../../common/error-handler/NotFoundError.js";
import BadRequestError from "../../common/error-handler/BadRequestError.js";
import NotAuthorizeError from "../../common/error-handler/NotAuthorizeError.js";
import publishMessage from "../../loaders/rabbit-mq-loader.js";

class UserController {
    async handleAddUser(req, res, next) {
        try {
            const user = await UserService.addUser(req.body);
            const data = {
                index: "ade-users",
                id: user.data._id,
                body: user.data,
            };
            await publishMessage(data)
            res.status(201).json(user);
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }
 
    async handleGetUsers(req, res, next) {
        try {
            const { page_no, limit, filter } = req.query;
            const pageNumber = Math.abs(parseInt(page_no)) || 1;
            const docLimit = parseInt(limit) || 15;
            const skip = docLimit * (pageNumber - 1);
            const options = {};
            if (filter) {
                const filters = filter.replace(" ", "").split(",");
                filters.map((e) => (options[e.trim()] = 1));
            }

            const users = await UserService.getUsers(docLimit, skip, options);
            res.status(200).json(users);
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }

    async handleRemoveUser(req, res, next) {
        try {
            const userId = req.params.id 
            await UserService.removeUser(userId)
            //Publish message to RabbitMQ
            await publishMessage({
                index: "ade-users",
                id: userId,
                format : "delete"
            })
            res.status(200).json({
                message: "User was removed successfully",
                data: {},
                status: true, 
                statusCode :200
            });
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }
    
     async handleUpdateUser(req, res, next) {
        try {
            const userId = req.params.id 

            await UserService.updateUser(userId, req.body)

            await publishMessage({
                index: "ade-users",
                id: userId,
                format: "update",
                body : req.body 
            })

            res.status(200).json({
                message : "Data updated sucessfully"
            });
        } catch (error) {
            return next(new ApplicationError(error));
        }
     }
    
    async getUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.params.id);
            if (!user) {
                return next(new BadRequestError("User Not Found"))
            }
            res.status(200).json(user.details());
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }

    async handleLogin(req, res, next) {
        try {
            const { email, pwd } = req.body;
            let authEmail = {
                email: new RegExp(`^${email}$`, "i"),
            };
            let user = await UserService.getUser(authEmail, false);
            if (!user) {
                return next(
                    new NotFoundError(
                        "We could not find an account with this email"
                    )
                );
            }
            if (!user.checkPassword(pwd)) {
                return next(new NotAuthorizeError("Invalid Login Detail"));
            }
            //Create a Login Successful Event and Send To queue
            const token = user.grantToken();
            user = user.details();
            user.token = token;
            //Also Generate a refresh Token
            res.status(200).json({
                ...user,
            });
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }

    async getToken(req, res, next) {
        //Get the refreshToken from the user
        // Check the Dataabse to see if the token is valid ,blacklisted  , etc
    }
}

export default new UserController();
