import StubUserRepository from "@infrastructure/user/stub/user.stub-repository";
import type IUserRepository from "@user/user.repository";
import type IUserService from "@user/user.service";
import type { ILoginData } from "@user/user.types";

export default class StubUserService implements IUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new StubUserRepository();
  }
  create(data: ILoginData): Promise<string> {
    return this.userRepository.create(data);
  }
}
