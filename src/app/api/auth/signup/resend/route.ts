import { sendOTPEmail } from "@/lib/sendMail";
import User from "@/model/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { id } = await req.json();
    const code = uuidv4();

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    existingUser.verifyCode = code;
    existingUser.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await existingUser.save();
    const verification_link = `${process.env.DOMAIN}/auth/verify-email?verifycode=${code}&id=${existingUser._id}`;
    await sendOTPEmail(existingUser.email, verification_link);

    return NextResponse.json({ msg: "Verification code has been resent" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
