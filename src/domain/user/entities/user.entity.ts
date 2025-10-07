import type { IUser } from "../user.types";

export default class User implements IUser {
  id: string;
  email: string;
  username: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
  }

  //#region Utils
  toJSON(): IUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
    };
  }

  static fromJSON(data: IUser): User {
    return new User({
      id: data.id,
      email: data.email,
      username: data.username,
    });
  }
  //#endregion
}
