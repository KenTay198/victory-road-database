import DomainError from "@domain/shared/domainError/domainError";
import type IUserService from "../user.service";
import type { ILoginData } from "../user.types";
import { z } from "zod";

const CreateUserData = z.object({
  email: z.email("errors.common.invalidEmail"),
  username: z
    .string()
    .min(4, "errors.components.forms.register.usernameMinLength")
    .max(30, "errors.components.forms.register.usernameMaxLength"),
  password: z
    .string()
    .min(8, "errors.components.forms.register.passwordMinLength")
    .max(100, "errors.components.forms.register.passwordMaxLength"),
}) satisfies z.ZodType<ILoginData>;

export default class CreateUser {
  constructor(private userService: IUserService) {}

  async execute(userData: ILoginData): Promise<string> {
    try {
      const data = CreateUserData.parse(userData);
      return await this.userService.create(data);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
