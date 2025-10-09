import jwt from "jsonwebtoken";
import type { IUser } from "@user/user.types";
import { cookies } from "next/headers";

const TokenService = {
  //#region METHODS
  saveUser: async (user: IUser): Promise<boolean> => {
    const token = TokenService.createToken(user);
    if (!token) return Promise.resolve(false);
    const cookieStore = await cookies();
    cookieStore.set(TokenService.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return Promise.resolve(true);
  },
  getUser: async (): Promise<IUser | null> => {
    const token = await TokenService.getToken();
    if (!token) return Promise.resolve(null);
    return new Promise<IUser | null>((resolve) => {
      try {
        const decoded = jwt.verify(token, TokenService.SECRET);
        resolve(decoded as unknown as IUser);
      } catch {
        resolve(null);
      }
    });
  },
  deleteToken: async (): Promise<boolean> => {
    const cookieStore = await cookies();
    cookieStore.delete(TokenService.COOKIE_NAME);
    return Promise.resolve(true);
  },
  createToken: (payload: any): string | null => {
    const token = jwt.sign(payload, TokenService.SECRET, {
      expiresIn: process.env.NODE_ENV === "production" ? "7d" : "30d",
    });
    return token;
  },
  getToken: async (): Promise<string | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(TokenService.COOKIE_NAME);
    return token ? token.value : null;
  },
  //#endregion

  //#region VARIABLES
  SECRET: process.env.TOKEN_SECRET || "",
  COOKIE_NAME: process.env.TOKEN_COOKIE_NAME || "auth_token",
  //#endregion
};

export default TokenService;
