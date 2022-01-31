import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: String,
        pwd: String,
        name: String,
        ucode: String,
    },
    {
        timestamps: true,
    }
);

const userModel = model("users", userSchema);

module.exports = userModel;
