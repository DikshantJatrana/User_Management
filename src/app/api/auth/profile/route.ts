import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { id } = await req.json();

    const user = await UserModel.findById(id).select(
      "username email isVerified verifyCode verifyCodeExpiry balance orders"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
