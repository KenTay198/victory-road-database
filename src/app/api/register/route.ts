import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { IUser } from "@/types/user.types";
import User from "@models/user.model";
import { isValidEmail, isValidPassword } from "@utils/functions";
import { hashPassword } from "@lib/bcrypt";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { username, password, email }: IUser = await request.json();

    if (!username || !password || !email)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    if (!isValidEmail(email))
      return NextResponse.json({ error: "E-mail invalid" }, { status: 400 });

    if (!isValidPassword(password))
      return NextResponse.json({ error: "Password invalid" }, { status: 400 });

    const newUser = new User({
      username,
      password: await hashPassword(password),
      email,
      roles: ["user"],
    });

    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error : any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
