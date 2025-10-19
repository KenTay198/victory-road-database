import DomainError from "@domain/shared/domainError/domainError";
import type IUserService from "../user.service";
import type { IUserData } from "../user.types";
import { z } from "zod";
import { userRoles } from "@user/user.variables";

export default class CreateUser {
  constructor(private userService: IUserService) {}

  async execute(userData: IUserData): Promise<string> {
    try {
      const data = CreateUserData.parse(userData);
      return await this.userService.create(data);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}

const CreateUserData = z.object({
  email: z.string().check(z.trim(), z.email("errors.common.invalidEmail")),
  username: z
    .string()
    .trim()
    .min(4, "components.auth.registerForm.errors.usernameMinLength")
    .max(30, "components.auth.registerForm.errors.usernameMaxLength"),
  password: z
    .string()
    .trim()
    .min(8, "components.auth.registerForm.errors.passwordMinLength")
    .max(100, "components.auth.registerForm.errors.passwordMaxLength"),
  role: z.enum(userRoles, "errors.common.invalidRole"),
}) satisfies z.ZodType<IUserData>;
