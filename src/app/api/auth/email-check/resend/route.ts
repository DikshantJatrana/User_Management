import { sendResetPasswordEmail } from "@/lib/sendMail";
import User from "@/model/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid";
export async function POST(req: Request) {
  dbConnect();
  try {
    const { id } = await req.json();
    const code = uuidv4();
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ msg: "User not Found" }, { status: 404 });
    }
    existingUser.forgotCode = code;
    existingUser.forgotCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await existingUser.save();
    const reset_link = `${process.env.DOMAIN}/auth/reset-password?forgotcode=${code}&id=${existingUser._id}`;
    await sendResetPasswordEmail(existingUser.email, reset_link);
    return NextResponse.json({ msg: "OTP have been resend" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
