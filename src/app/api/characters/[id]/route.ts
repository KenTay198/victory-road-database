import { ICharacter } from "@/types/character.types";
import { connectToDatabase } from "@lib/mongoose";
import Character from "@models/character.model";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();
    const character = await Character.findById(id).lean();

    if (!character) {
      return NextResponse.json(
        { message: "Character not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(character);
  } catch (error) {
    console.error("Failed to fetch character:", error);
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

    await Character.updateOne(
      { _id: params.id },
      {
        $set: {
          firstName,
          lastName,
          hissatsus,
          statistics,
          defaultPosition,
          element,
        },
      }
    )

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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

    if (!params.id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await Character.deleteOne({ _id: params.id });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
