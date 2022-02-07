import UserService from "./user.service.js";

class UserController {
    async handleAddUser(req, res) {
        try {
            const user = await UserService.addUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async handleGetUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserController();
