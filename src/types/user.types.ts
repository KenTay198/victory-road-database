import { IDocument } from "./types";

export interface IUser extends IDocument {
  username: string;
  email: string;
  roles: ("user" | "admin")[];
  password: string;
}
