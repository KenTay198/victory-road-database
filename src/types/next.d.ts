import { IUser } from "./models/user.types";

declare module "next" {
  interface NextApiRequest {
    user?: Omit<IUser, "password">;
  }
}
