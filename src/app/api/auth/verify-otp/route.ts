import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import User from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  const { userId, verifyCode } = await req.json();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (
      user.verifyCode !== verifyCode ||
      new Date() > new Date(user.verifyCodeExpiry)
    ) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyCode = "";
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
