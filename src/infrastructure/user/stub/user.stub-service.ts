import StubUserRepository from "@infrastructure/user/stub/user.stub-repository";
import type User from "@user/entities/user.entity";
import type IUserRepository from "@user/user.repository";
import type IUserService from "@user/user.service";
import type { ICreateUserData, ILoginData } from "@user/user.types";

export default class StubUserService implements IUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new StubUserRepository();
  }

  create(data: ICreateUserData): Promise<string> {
    return this.userRepository.create(data);
  }

  async login(data: ILoginData): Promise<User | null> {
    const user = await this.userRepository.findByIdentifier(data.identifier);
    if (user && user.password === data.password) {
      return Promise.resolve(user.removeSensitiveInfo());
    }
    return null;
  }
}
