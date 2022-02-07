import userModel from "./user.model.js";

class UserDAL {
    static async addUser(doc) {
        return await userModel.create(doc);
    }

    static async getUsers() {
        return await userModel.find();
    }
}

export default UserDAL;
