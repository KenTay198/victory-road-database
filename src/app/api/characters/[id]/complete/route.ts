import { ICharacter } from "@/types/models/character.types";
import { connectToDatabase } from "@lib/mongoose";
import Character from "@models/character.model";
import Hissatsu from "@models/hissatsu.model";
import { getCompleteCharacters } from "@utils/characters.functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();
    const allCharacters: ICharacter[] = await Character.find()
      .populate({
        path: "hissatsus.hissatsuId",
        model: Hissatsu,
      })
      .lean();

    if (!allCharacters.some(({ _id }) => _id.toString() === id))
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );

    const { characters } = getCompleteCharacters(allCharacters);
    const character = characters.find(({ _id }) => _id.toString() === id);

    return NextResponse.json(character);
  } catch (error) {
    console.error("Failed to fetch character:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
