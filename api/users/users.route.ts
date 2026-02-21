import { Router } from "express";
import { 
  createUsersController, 
  getUserByIdController, 
  getUsersController 
} from "./users.controller";

export const usersRouter = Router();

usersRouter.get('/', getUsersController);
usersRouter.get('/:id', getUserByIdController);
usersRouter.post('/', createUsersController);
