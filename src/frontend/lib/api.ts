import axios from "axios";

const API_URL = "https://landing-mono-dev.up.railway.app/users";

export interface User {
  _id?: string;
  name: string;
  commentary: string;
  answer: boolean;
}

export async function fetchUsers(): Promise<User[]> {
  const { data } = await axios.get<User[]>(API_URL);
  return data;
}

export async function createUser(user: Omit<User, "_id">): Promise<User> {
  const { data } = await axios.post<User>(API_URL, user);
  return data;
}
