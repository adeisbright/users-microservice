import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";

const { Schema, model } = mongoose;
const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        pwd: String,
        name: String,
        ucode: String,
    },
    {
        timestamps: true,
    }
);

//Hash Password before saving it
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("pwd")) return next();
        let salt = await bcrypt.genSalt(10);
        this.pwd = await bcrypt.hash(this.pwd, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Compare if Password Matches
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.pwd);
};

userSchema.methods.grantToken = function () {
    const payload = {
        _id: this._id,
        collection: "user",
        priviledges: ["READ NOTIFICATION", "EDIT NOTIFICATION"],
    };

    return jwt.sign(payload, config.jwt.secret, config.jwt.header);
};

//This should be post
userSchema.methods.details = function () {
    const user = Object.create(null);
    Object.assign(user, this._doc);
    delete user.pwd;
    delete user.__v;
    return user;
};
const userModel = model("users", userSchema);

export default userModel;
