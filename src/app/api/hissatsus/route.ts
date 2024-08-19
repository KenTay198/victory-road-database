import { connectToDatabase } from "@/lib/mongoose";
import IHissatsu from "@/types/hissatsu.types";
import Hissatsu from "@models/hissatsu.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, type, element, characteristic }: IHissatsu = await request.json();

    // Validation
    if (!name || !type || !element) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newHissatsu = new Hissatsu({ name, type, element, characteristic });
    await newHissatsu.save();

    return NextResponse.json(newHissatsu, { status: 201 });
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
    const hissatsus = await Hissatsu.find().lean();
    return NextResponse.json(hissatsus);
  } catch (error : any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
