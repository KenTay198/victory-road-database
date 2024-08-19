import { IUser } from "@/types/user.types";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    roles: { type: [String], required: true, enum: ["user", "admin"] },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

if (models.User) delete models.User;

const User = model<IUser>("User", UserSchema);

export default User;
