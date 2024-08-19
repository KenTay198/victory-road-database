import IHissatsu from "@/types/hissatsu.types";
import { connectToDatabase } from "@lib/mongoose";
import Hissatsu from "@models/hissatsu.model";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();
    const hissatsu = await Hissatsu.findById(id).lean();
    return NextResponse.json(hissatsu);
  } catch (error) {
    console.error("Failed to fetch hissatsu:", error);
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

    const { name, type, element, characteristic }: IHissatsu =
      await request.json();

    if (!name || !type || !element)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    await Hissatsu.updateOne(
      { _id: params.id },
      {
        $set: {
          name,
          type,
          element,
          characteristic,
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

    const res = await Hissatsu.deleteOne({ _id: params.id });

    if (res.deletedCount === 0)
      return NextResponse.json(
        { error: "No hissatsu deleted" },
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
