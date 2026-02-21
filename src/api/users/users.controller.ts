import { Request, Response } from 'express';
import { createUser, getUsers } from './users.service';
import { UserType } from '../models/user.model';

export const getUsersController = (req: Request, res: Response) => {
  const users = getUsers();

  res.send(users);
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