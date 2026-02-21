import { UserModel, UserType } from "../models/user.model";

export const getUsers = async () => {
  return await UserModel.find();
}

export const createUser = async (userDto: UserType) => {
  const user = await UserModel.create(userDto);

  return user;
}