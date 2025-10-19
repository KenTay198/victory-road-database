import DomainError from "@domain/shared/domainError/domainError";
import type IUserService from "../user.service";
import type { ILoginData } from "../user.types";
import { z } from "zod";
import type User from "@user/entities/user.entity";

const LoginData = z.object({
  identifier: z.string(),
  password: z.string(),
}) satisfies z.ZodType<ILoginData>;

export default class Login {
  constructor(private userService: IUserService) {}

  async execute(userData: ILoginData): Promise<User | null> {
    try {
      const data = LoginData.parse(userData);
      const user = await this.userService.login(data);
      if (!user)
        throw new DomainError("BUSINESS", "INVALID_CREDENTIALS", "components.auth.loginForm.errors.invalidCredentials");
      return user;
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
