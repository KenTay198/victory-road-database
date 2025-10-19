import type { IUser, UserRole } from "../user.types";

export default class User implements IUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.role = data.role;
  }

  //#region Utils
  toJSON(): IUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      role: this.role,
    };
  }

  static fromJSON(data: IUser): User {
    return new User({
      id: data.id,
      email: data.email,
      username: data.username,
      role: data.role,
    });
  }
  //#endregion
}
