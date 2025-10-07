import User from "@user/entities/user.entity";
import type IUserRepository from "@user/user.repository";
import type { ILoginData } from "@user/user.types";
import UserErrors from "../user.errors";

export default class StubUserRepository implements IUserRepository {
  private idCounter = 1;
  private users: User[];

  constructor() {
    this.users = [];
  }

  create(user: ILoginData): Promise<string> {
    const newUser = new User({ id: String(this.idCounter++), ...user });
    if (this.checkUserExists(newUser.email, newUser.username)) {
      throw UserErrors.getError("USER_ALREADY_EXISTS");
    }
    this.users.push(newUser);
    return Promise.resolve(newUser.id);
  }

  private checkUserExists(email: string, username: string): boolean {
    return this.users.some((u) => u.email === email || u.username === username);
  }
}
