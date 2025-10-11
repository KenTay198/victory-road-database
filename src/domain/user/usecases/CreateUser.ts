import DomainError from "@domain/shared/domainError/domainError";
import type IUserService from "../user.service";
import type { IUserData } from "../user.types";
import { z } from "zod";

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
  email: z.email("errors.common.invalidEmail").trim(),
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
}) satisfies z.ZodType<IUserData>;
