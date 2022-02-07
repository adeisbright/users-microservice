import express from "express";
import UserController from "./user.controller.js";

const { handleAddUser, handleGetUsers } = UserController;

const userRouter = express.Router();

userRouter.route("/users").get(handleGetUsers).post(handleAddUser);

export default userRouter;
