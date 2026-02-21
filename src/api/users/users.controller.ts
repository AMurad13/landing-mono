import { Request, Response } from 'express';
import { createUser, getUserById, getUsers, removeUserById } from './users.service';
import { UserType } from '../models/user.model';

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsers();

  res.send(users);
}

export const getUserByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const user = await getUserById(id as string);

  if (!user) {
    return res
      .status(404)
      .json({
        message: `User with ${id} not found`
      })
  } 

  return res.send(user);
}

export const removeUserByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const user = await removeUserById(id as string);

  if (!user) {
    return res
      .status(404)
      .json({
        message: `User with ${id} not found`
      })
  }

  return res.send(user);
}

export const createUsersController = async (req: Request, res: Response) => {
  const {
    name,
    commentary,
    answer
  } = req.body as UserType;

  if (!name || !commentary || !answer) { 
    return res.status(400).json({
      message: 'User data is required'
    });
  }

  try {
    const createdUser = await createUser(req.body);
    res.send(createdUser); 
  } catch(error) { res.status(500).json({ message: 'Server error' }) }
}