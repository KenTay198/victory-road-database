import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@models/user.model";
import { isPasswordValid } from "@lib/bcrypt";
import { signAccessToken } from "@lib/jwt";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { identifier, password } = await request.json();

    if (!identifier || !password)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).lean();

    if (!user)
      return NextResponse.json(
        { error: "Invalid identifier or password" },
        { status: 400 }
      );

    if (!isPasswordValid(password, user.password))
      return NextResponse.json(
        { error: "Invalid identifier or password" },
        { status: 400 }
      );

    const { _id, username, email, roles } = user;

    const token = await signAccessToken({ _id, username, email, roles }, "7d");

    return NextResponse.json(token, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
