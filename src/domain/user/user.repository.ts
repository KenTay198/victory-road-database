import type { ILoginData } from "./user.types";

interface IUserRepository {
  create({ email, username, password }: ILoginData): Promise<string>;
}

export default IUserRepository;
