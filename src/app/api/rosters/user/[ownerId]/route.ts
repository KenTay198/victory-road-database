import { connectToDatabase } from "@lib/mongoose";
import Character from "@models/character.model";
import Roster from "@models/roster.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { ownerId: string } }
) {
  const completeCharacters = req.nextUrl.searchParams.get("completeCharacters");
  const { ownerId } = params;

  try {
    await connectToDatabase();
    const promise = Roster.find({ owner: ownerId });
    if (completeCharacters === "true")
      promise.populate({ path: "characters", model: Character });
    const roster = await promise.lean();
    return NextResponse.json(roster);
  } catch (error) {
    console.error("Failed to fetch roster:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
