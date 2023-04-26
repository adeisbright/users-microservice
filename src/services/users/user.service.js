import UserDAL from "./user.DAL.js";

class UserService {
    static async addUser(doc) {
        let result = await UserDAL.addUser(doc);
        return {
            status: "OK",
            data: result.details(),
        };
    }
    static async getUsers(limit = 5, skip = 0) {
        let result = await UserDAL.getUsers(limit, skip);
        return {
            status: "OK",
            data: result,
        };
    }

    static async getUser(param, isId = true) {
        return await UserDAL.getUser(param, isId);
    }

    static async removeUser(id) {
        return await UserDAL.removeUser(id);
    }

    static async updateUser(id , data) {
        return await UserDAL.updateUser(id , data)
    }
}


export default UserService;
