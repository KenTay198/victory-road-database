import type { IUserData } from "@user/user.types";
import { userRoles } from "@user/user.variables";
import mongoose, { type ObjectId } from "mongoose";

export interface IUserDocument extends Omit<IUserData, "id"> {
  _id: ObjectId | string;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRoles,
      default: "user",
    },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV === "development" && mongoose.models.User) {
  mongoose.deleteModel("User");
}

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
