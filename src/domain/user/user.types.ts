export interface IUser {
  id: string;
  email: string;
  username: string;
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
  email: string;
  username: string;
  password: string;
}
