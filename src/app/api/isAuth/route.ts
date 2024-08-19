import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { IUser } from "@/types/user.types";
import { verifyAccessToken } from "@lib/jwt";
import { headers } from "next/headers";

export async function GET() {
  try {
    await connectToDatabase();

    if (!process.env.JWT_COOKIE_NAME)
      return NextResponse.json(
        { error: "No cookie name has been defined." },
        { status: 500 }
      );

    const token = headers().get("Authorization")?.split(" ")[1];

    if (!token)
      return NextResponse.json(
        { error: "No token provided." },
        { status: 400 }
      );

    const user: Omit<IUser, "password"> = await verifyAccessToken(token);

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
