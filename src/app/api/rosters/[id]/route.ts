import { IRoster } from "@/types/roster.types";
import { connectToDatabase } from "@lib/mongoose";
import Character from "@models/character.model";
import Roster from "@models/roster.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const completeCharacters = req.nextUrl.searchParams.get("completeCharacters");
  const { id } = params;

  try {
    await connectToDatabase();
    const promise = Roster.findById(id);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { characters, name, owner }: IRoster = await request.json();

    if (!name)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    if (characters && characters.length > 16)
      return NextResponse.json(
        { error: "Too much characters in the roster" },
        { status: 400 }
      );

    const updated = await Roster.findOneAndUpdate(
      { _id: params.id },
      {
        $set: {
          characters,
          name,
          owner,
        },
      },
      { new: true }
    );

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!params.id)
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const deleted = await Roster.findOneAndDelete({ _id: params.id });
    if (!deleted)
      return NextResponse.json({ error: "No roster deleted" }, { status: 400 });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
