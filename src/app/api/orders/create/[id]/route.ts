import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import OrderModel from "@/model/Order";
import UserModel from "@/model/User";
import StartupModel from "@/model/Startup";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { quantity, userId } = await req.json();
    const startupId = params.id;

    if (!quantity || quantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const user = await UserModel.findById(userId);
    const startup = await StartupModel.findById(startupId);

    if (!user || !startup) {
      return NextResponse.json(
        { error: "User or startup not found" },
        { status: 404 }
      );
    }

    const totalCost = quantity * startup.sharePrice;

    if (user.balance < totalCost) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    if (startup.shareQuantity < quantity) {
      return NextResponse.json(
        { error: "Not enough shares available" },
        { status: 400 }
      );
    }

    const updatedStartup = await StartupModel.findByIdAndUpdate(
      startupId,
      { $inc: { shareQuantity: -quantity } },
      { new: true }
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $inc: { balance: -totalCost } },
      { new: true }
    );

    if (!updatedStartup || !updatedUser) {
      return NextResponse.json(
        { error: "Failed to update records" },
        { status: 500 }
      );
    }

    const order = await OrderModel.create({
      amount: totalCost,
      quantity,
      startup: startup._id,
      user: user._id,
    });

    updatedUser.orders.push(order._id);
    await updatedUser.save();

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error buying shares:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
