import UserDAL from "./user.DAL.js";

class UserService {
    static async addUser(doc) {
        let result = await UserDAL.addUser(doc);
        return {
            status: "OK",
            data: result.details(),
        };
    }
    static async getUsers(limit = 2, skip = 0) {
        let result = await UserDAL.getUsers(limit, skip);
        return {
            status: "OK",
            data: result,
        };
    }

    static async getUser(param, isId = true) {
        return await UserDAL.getUser(param, isId);
    }
}

export default UserService;
