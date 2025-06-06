import { IUser } from "./user.types";

declare module "next" {
  interface NextApiRequest {
    user?: Omit<IUser, "password">;
  }
}
