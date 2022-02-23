import UserService from "./user.service.js";
import ApplicationError from "../../common/error-handler/ApplicationError.js";
import NotFoundError from "../../common/error-handler/NotFoundError.js";
import ForbiddenError from "../../common/error-handler/ForbiddenError.js";
import BadRequestError from "../../common/error-handler/BadRequestError.js";
import NotAuthorizeError from "../../common/error-handler/NotAuthorizeError.js";
import messageChannel from "../../rabbit-queue/message-channel.js";
import messageExchange from "../../rabbit-queue/message-exchange.js";

const faker = (roofNum) => {
    let alphabet = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "y",
        "z",
    ];
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    let length = Math.floor(Math.random() * roofNum + 1);
    let name = "";
    let pwd = "";
    for (let i = 0; i < length; i++) {
        name += alphabet[i];
        pwd += numbers[i];
    }
    const email = name + "@gmail.com";
    return { name, email, pwd };
};
class UserController {
    async handleAddUser(req, res, next) {
        try {
            const user = await UserService.addUser(req.body);
            //await messageChannel("user_registration", user.data);
            await messageExchange(user.data, "notification4", "fanout", "food");
            res.status(201).json(user);
        } catch (error) {
            return next(new ApplicationError(error));
        }
    }

    async handleGetUsers(req, res, next) {
        try {
            const { page_no, limit, filter } = req.query;
            const pageNumber = Math.abs(parseInt(page_no)) || 1;
            const docLimit = parseInt(limit) || 10;
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

    async getUser(req, res, next) {
        try {
            const user = await UserService.getUser(req.params.id);
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
