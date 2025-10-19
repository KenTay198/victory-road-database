import type User from "@user/entities/user.entity";
import type IUserRepository from "@user/user.repository";
import type IUserService from "@user/user.service";
import MongoUserRepository from "./user.mongo-repository";
import type { IUserData, ILoginData } from "@user/user.types";
import PasswordService from "@infrastructure/auth/password.service";

export default class MongoUserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new MongoUserRepository();
  }

  async login(loginData: ILoginData): Promise<User | null> {
    const userSensitive = await this.userRepository.findByIdentifier(loginData.identifier);
    if (!userSensitive) {
      return null;
    }
    const isPasswordValid = await PasswordService.compare(loginData.password, userSensitive.password);
    if (!isPasswordValid) {
      return null;
    }
    return userSensitive.removeSensitiveInfo();
  }

  async create(userData: IUserData): Promise<string> {
    return this.userRepository.create({ ...userData, password: await PasswordService.hash(userData.password) });
  }
}
