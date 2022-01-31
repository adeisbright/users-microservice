import express from "express";
import UserController from "./user.controller";

const { handleAddUser, handleGetUsers } = UserController;

const UserRouter = express.Router();

UserRouter.route("/users").get(handleGetUsers).post(handleAddUser);

module.exports = UserRouter;
