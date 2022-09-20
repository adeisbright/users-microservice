import userModel from "./user.model.js";

class UserDAL {
    static async addUser(doc) {
        return await userModel.create(doc);
    }

    static async getUsers(limit = 5, skip = 0, filter = {}) {
        return await userModel
            .find()
            .skip(skip)
            .limit(limit)
            .select(filter)
            .lean();
    }
    /**
     * @description
     * Searches the user model for a particular user
     * @param {Object or String} param search parameter to use for query
     * @param {Boolean} isId if the id of the user needs to be used for search.
     *
     * @returns
     * A user object
     */

    static async getUser(param, isId = true) {
        if (isId) {
            return await userModel.findById(param);
        }
        return await userModel.findOne(param);
    }
}

export default UserDAL;
