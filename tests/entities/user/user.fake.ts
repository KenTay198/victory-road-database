import User from "@user/entities/user.entity";
import type { IUser } from "@user/user.types";

export default class FakeUser extends User {
  constructor({ username, email, role }: Partial<IUser> = {}) {
    super({
      id: "user-id",
      username: username || "testuser",
      email: email || "testuser@example.com",
      role: role || "user",
    });
  }
}
