import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import User from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { id } = await req.json();
    const user = await User.findById(id).select(
      "username email isVerified verifyCode verifyCodeExpiry"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
