import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/zod";
import { sendOTPEmail } from "@/lib/sendMail";
import { v4 as uuidv4 } from "uuid";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const validationResult = signupSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, name } = validationResult.data;
    const code = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }

      existingUser.username = name;
      existingUser.password = hashedPassword;
      existingUser.verifyCode = code;
      existingUser.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

      await existingUser.save();
      const verification_link = `${process.env.DOMAIN}/verify-email?verifycode=${code}&id=${existingUser._id}`;
      await sendOTPEmail(email, verification_link);
      return NextResponse.json(
        {
          message: "Please verify your email.",
          user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isVerified: existingUser.isVerified,
          },
        },
        { status: 200 }
      );
    }

    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
      verifyCode: code,
      verifyCodeExpiry: new Date(Date.now() + 60 * 60 * 1000),
    });

    await newUser.save();
    const verification_link = `${process.env.DOMAIN}/auth/verify-email?verifycode=${code}&id=${newUser._id}`;
    await sendOTPEmail(email, verification_link);
    return NextResponse.json(
      {
        message: "User created successfully. Please verify your email.",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isVerified: newUser.isVerified,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
