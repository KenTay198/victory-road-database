import Character from "@models/character.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ICharacter } from "@/types/character.types";
import { NextRequest, NextResponse } from "next/server";
import Hissatsu from "@models/hissatsu.model";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const {
      firstName,
      lastName,
      hissatsus,
      statistics,
      defaultPosition,
      element,
    }: ICharacter = await request.json();

    if (!firstName) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newCharacter = new Character({
      firstName,
      lastName,
      hissatsus,
      statistics,
      defaultPosition,
      element,
    });
    await newCharacter.save();

    return NextResponse.json(newCharacter, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const completeHissatsus =
    req.nextUrl.searchParams.get("completeHissatsus");

  try {
    await connectToDatabase();
    const promise = Character.find();
    if (completeHissatsus === "true")
      promise.populate({ path: "hissatsus.hissatsuId", model: Hissatsu });
    const characters = await promise.lean();
    return NextResponse.json(characters);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
