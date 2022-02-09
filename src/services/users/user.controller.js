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
            const body = {
                name: faker(10).name,
                email: faker(10).email,
                pwd: faker(10).pwd,
            };
            const user = await UserService.addUser(body);
            //await messageChannel("user_registration", user.data);
            await messageExchange(user.data, "notification4", "fanout", "food");
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
