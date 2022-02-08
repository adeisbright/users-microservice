import UserDAL from "./user.DAL.js";

class UserService {
    static async addUser(doc) {
        let result = await UserDAL.addUser(doc);
        return {
            status: "OK",
            data: result,
        };
    }
    static async getUsers() {
        let result = await UserDAL.getUsers();
        return {
            status: "OK",
            data: result,
        };
    }
}

export default UserService;
