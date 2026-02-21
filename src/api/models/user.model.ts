import { model, Schema } from "mongoose";

export interface UserType {
  name: string;
  commentary: string;
  answer: boolean;
}

const userSchema = new Schema<UserType>({
  name: { type: String, required: true, minLength: 2 },
  commentary: { type: String, required: true, minLength: 10 },
  answer: { type: Boolean, required: true }
})

export const UserModel = model<UserType>('User', userSchema);