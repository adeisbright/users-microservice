import UserDAL from "./user.DAL";

class UserService {
    static async addUser(doc) {
        let result = await UserDAL.addUser(doc);
        return {
            status: "OK",
            data: result,
        };
    }
    static async getUsers() {
        let result = await UserDAL.find();
        return {
            status: "OK",
            data: result,
        };
    }
}

module.exports = UserService;
