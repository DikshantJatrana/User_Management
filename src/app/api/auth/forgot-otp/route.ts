import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { id, forgotcode, password } = await req.json();

    if (!id || !forgotcode || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.forgotCode || user.forgotCode !== forgotcode) {
      return NextResponse.json(
        { error: "Invalid or expired reset code" },
        { status: 400 }
      );
    }

    if (new Date() > new Date(user.forgotCodeExpiry)) {
      return NextResponse.json(
        { error: "Reset code has expired" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.forgotCode = "";
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
