import { ICharacter } from "@/types/character.types";
import { connectToDatabase } from "@lib/mongoose";
import Character from "@models/character.model";
import Hissatsu from "@models/hissatsu.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const completeHissatsus =
    request.nextUrl.searchParams.get("completeHissatsus");
  const { id } = params;

  try {
    await connectToDatabase();
    const promise = Character.findById(id);
    if (completeHissatsus === "true")
      promise.populate({ path: "hissatsus.hissatsuId", model: Hissatsu });
    const character = await promise.lean();
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
      imageUrl,
    }: ICharacter = await request.json();

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
          imageUrl,
        },
      }
    );

    return NextResponse.json({ status: 200 });
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

    if (!params.id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const res = await Character.deleteOne({ _id: params.id });

    if (res.deletedCount === 0)
      return NextResponse.json(
        { error: "No character deleted" },
        { status: 400 }
      );

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
