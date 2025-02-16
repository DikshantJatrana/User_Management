import dbConnect from "@/lib/connectDB";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/lib/sendMail";
import { v4 as uuidv4 } from "uuid";
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const code = uuidv4();

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          forgotCode: code,
          forgotCodeExpiry: new Date(Date.now() + 60 * 60 * 1000),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user with forgot code" },
        { status: 500 }
      );
    }
    const reset_link = `${process.env.DOMAIN}/auth/reset-password?forgotcode=${code}&id=${updatedUser._id}`;
    await sendResetPasswordEmail(email, reset_link);

    return NextResponse.json(
      {
        msg: "User Found",
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isVerified: updatedUser.isVerified,
          forgotCode: updatedUser.forgotCode,
          forgotCodeExpiry: updatedUser.forgotCodeExpiry,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot password API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
