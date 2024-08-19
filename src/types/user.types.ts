export interface IUser {
  username: string;
  email: string;
  roles: ("user" | "admin")[];
  password: string;
}
