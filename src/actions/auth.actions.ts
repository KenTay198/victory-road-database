"use server";

import type IUserService from "@user/user.service";
import StubUserService from "@infrastructure/user/stub/user.stub-service";
import CreateUser from "@user/usecases/CreateUser";
import type { ICreateUserData, ILoginData, IUser } from "@user/user.types";

declare global {
  var userService: IUserService | undefined;
}

const defaultType = process.env.NODE_ENV === "development" ? "stub" : "mongo";

export async function getUserServiceInstance(type = defaultType): Promise<IUserService> {
  if (globalThis.userService) return globalThis.userService;

  switch (type) {
    case "stub":
      globalThis.userService = new StubUserService();
      break;
    default:
      throw new Error(`Unknown user service type: ${type}`);
  }

  return globalThis.userService;
}

export async function createUserAction(userData: ICreateUserData): Promise<string> {
  const userService = await getUserServiceInstance();
  return await new CreateUser(userService).execute(userData);
}

export async function loginAction(loginData: ILoginData): Promise<IUser | null> {
  const userService = await getUserServiceInstance();
  throw new Error("Not implemented");
}
