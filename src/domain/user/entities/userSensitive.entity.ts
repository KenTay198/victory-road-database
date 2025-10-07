import type { IUserSensitive } from "../user.types";
import User from "./user.entity";

export default class UserSensitive extends User {
  password: string;

  constructor(data: IUserSensitive) {
    super(data);
    this.password = data.password;
  }
}
