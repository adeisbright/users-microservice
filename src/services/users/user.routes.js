import express from "express";
import UserController from "./user.controller.js";
import authentication from "../../middleware/check-token.js";

const { handleAddUser, handleGetUsers, getUser, handleLogin } = UserController;

const userRouter = express.Router();

userRouter.route("/auth").post(handleLogin);
userRouter.route("/users").get(handleGetUsers).post(handleAddUser);

userRouter.all("/users/:id", authentication);
userRouter.route("/users/:id").get(getUser);

export default userRouter;
