import UserSensitive from "@user/entities/userSensitive.entity";
import type { IUserSensitive } from "@user/user.types";

export default class FakeUserSensitive extends UserSensitive {
  constructor({ id, username, email, password, role }: Partial<IUserSensitive> = {}) {
    super({
      id: id || "user-id",
      username: username || "testuser",
      email: email || "testuser@example.com",
      password: password || "password",
      role: role || "user",
    });
  }
}
