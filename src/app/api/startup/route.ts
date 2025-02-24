import { NextResponse } from "next/server";
import StartupModel from "@/model/Startup";
import dbConnect from "@/lib/connectDB";

export async function GET(req: Request) {
  await dbConnect();
  try {
    const startups = await StartupModel.find().populate("admin");
    if (!startups) {
      return NextResponse.json({ error: "Startup Not Found" }, { status: 500 });
    }
    return NextResponse.json({ startups }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
