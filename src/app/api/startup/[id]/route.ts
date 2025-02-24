import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import StartupModel from "@/model/Startup";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const startup = await StartupModel.findById(id);
    if (!startup)
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });

    return NextResponse.json(startup);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid ID or Server Error" },
      { status: 500 }
    );
  }
}
