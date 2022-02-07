import mongoose from "mongoose";

const { Schema, model } = mongoose;
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

export default userModel;
