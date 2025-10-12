import type UserSensitive from "./entities/userSensitive.entity";

export default interface IUserAdapter {
  toEntity(data: any): UserSensitive;
}
