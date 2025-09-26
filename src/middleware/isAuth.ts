import { NextResponse } from "next/server";
import { IUser } from "@/types/models/user.types";
import { verifyAccessToken } from "@lib/jwt";
import { Handler } from ".";
import { NextApiRequest } from "next";
import { headers } from "next/headers";

export default async function isAuth(req: NextApiRequest, next: Handler): Promise<NextResponse> {
  try {
    if (!process.env.JWT_COOKIE_NAME) return NextResponse.json({ error: "No cookie name has been defined." }, { status: 500 });

    const headersStore = await headers();
    const token = headersStore.get("authorization")?.split(" ")[1];

    if (!token) return NextResponse.json({ error: "No token provided." }, { status: 401 });

    const decoded: Omit<IUser, "password"> = await verifyAccessToken(token);
    req.user = decoded;
    return next(req);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
