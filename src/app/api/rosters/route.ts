import Roster from "@models/roster.model";
import { connectToDatabase } from "@/lib/mongoose";
import { IRoster } from "@/types/roster.types";
import { NextRequest, NextResponse } from "next/server";
import Character from "@models/character.model";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { characters, owner, name }: IRoster = await request.json();

    if (!name || !owner)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    if (characters && characters.length > 16)
      return NextResponse.json(
        { error: "Too much characters in the roster" },
        { status: 400 }
      );

    const newRoster = new Roster({
      characters,
      name,
      owner,
    });

    await newRoster.save();

    return NextResponse.json(newRoster, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const completeCharacters = req.nextUrl.searchParams.get("completeCharacters");

  try {
    await connectToDatabase();
    const promise = Roster.find();
    if (completeCharacters === "true")
      promise.populate({ path: "characters", model: Character });
    const rosters = await promise.lean();
    return NextResponse.json(rosters);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
