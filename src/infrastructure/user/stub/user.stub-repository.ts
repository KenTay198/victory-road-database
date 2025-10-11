import type IUserRepository from "@user/user.repository";
import type { ICreateUserData } from "@user/user.types";
import UserErrors from "../../../domain/user/user.errors";
import UserSensitive from "@user/entities/userSensitive.entity";

export default class StubUserRepository implements IUserRepository {
  private idCounter = 1;
  private users: UserSensitive[];

  constructor() {
    this.users = [];
  }

  findByIdentifier(identifier: string): Promise<UserSensitive | null> {
    return Promise.resolve(this.findUserByIdentifier(identifier));
  }

  create(user: ICreateUserData): Promise<string> {
    const newUser = new UserSensitive({ id: String(this.idCounter++), role: "admin", ...user });
    const duplicateFields = this.checkUserExists(newUser.email, newUser.username);
    if (Object.keys(duplicateFields).length > 0) {
      throw UserErrors.getError("USER_ALREADY_EXISTS", { fields: duplicateFields });
    }
    this.users.push(newUser);
    return Promise.resolve(newUser.id);
  }

  private findUserByIdentifier(identifier: string): UserSensitive | null {
    const user = this.users.find((u) => u.email === identifier || u.username === identifier);
    return user || null;
  }

  private checkUserExists(email: string, username: string): Record<string, string>[] {
    const duplicateFields: Record<string, string>[] = [];
    const user = this.users.find((u) => u.email === email || u.username === username);
    if (user) {
      if (user.email === email)
        duplicateFields.push({ field: "email", message: "components.auth.registerForm.errors.emailAlreadyExists" });
      if (user.username === username)
        duplicateFields.push({
          field: "username",
          message: "components.auth.registerForm.errors.usernameAlreadyExists",
        });
    }
    return duplicateFields;
  }
}
