import { connectToDatabase } from "@lib/mongoose";
import Hissatsu from "@models/hissatsu.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { ids } = await request.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const res = await Hissatsu.deleteMany({ _id: { $in: ids } });

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
