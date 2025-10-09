export interface IUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface IUserSensitive extends IUser {
  password: string;
}

export interface ICreateUserData {
  email: string;
  username: string;
  password: string;
}

export interface ILoginData {
  identifier: string;
  password: string;
}

export type UserRole = "user" | "admin";
