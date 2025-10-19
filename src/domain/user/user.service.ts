import type User from "./entities/user.entity";
import type { IUserData, ILoginData } from "./user.types";

interface IUserService {
  create(data: IUserData): Promise<string>;
  login(data: ILoginData): Promise<User | null>;
}

export default IUserService;
