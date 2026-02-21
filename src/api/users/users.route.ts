import { Router } from "express";
import { createUsersController, getUsersController } from "./users.controller";

export const usersRouter = Router();

usersRouter.get('/', getUsersController);
usersRouter.post('/', createUsersController);
