import type User from "./entities/user.entity";
import type { ICreateUserData, ILoginData } from "./user.types";

interface IUserService {
  create(data: ICreateUserData): Promise<string>;
  login(data: ILoginData): Promise<User | null>;
}

export default IUserService;
