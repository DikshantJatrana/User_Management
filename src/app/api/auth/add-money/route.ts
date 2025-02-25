import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import User from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId, amount } = await req.json();
    console.log("Received request with userId:", userId, "and amount:", amount);

    if (!userId || !amount || amount <= 0) {
      console.error("Invalid input:", { userId, amount });
      return NextResponse.json(
        { error: "Invalid user ID or amount" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    console.log("Fetched user:", user);

    if (!user) {
      console.error("User not found:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.balance === undefined || user.balance === null) {
      console.log("Initializing balance to 0 for user:", userId);
      user.balance = 0;
    }

    user.balance += amount;
    console.log("Updated user balance:", user.balance);

    await user.save();
    console.log("User saved successfully:", user);

    return NextResponse.json(
      { message: "Money added successfully", balance: user.balance },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding money:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
