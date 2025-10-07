import type { ILoginData } from "./user.types";

interface IUserService {
  create({ email, username, password }: ILoginData): Promise<string>;
}

export default IUserService;
