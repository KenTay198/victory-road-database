export interface IUser {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface IUserSensitive extends IUser {
  password: string;
}

export interface IUserData {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface ILoginData {
  identifier: string;
  password: string;
}

export type UserRole = "user" | "admin";
