import Character from "@models/character.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ICharacter } from "@/types/character.types";
import { NextResponse } from "next/server";

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
  } catch (error : any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const characters = await Character.find()
      .populate("hissatsus.hissatsuId")
      .lean();
    return NextResponse.json(characters);
  } catch (error : any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
