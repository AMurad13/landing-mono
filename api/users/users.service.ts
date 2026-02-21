import { UserModel, UserType } from "../models/user.model";

export const getUsers = async () => {
  return await UserModel.find();
}

export const createUser = async (userDto: UserType) => {
  const user = await UserModel.create(userDto);

  return user;
}

export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);

  return user;
}

export const removeUserById = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);

  return user;
}
