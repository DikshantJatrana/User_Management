import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDB";
import UserModel from "@/model/User";
import OrderModel from "@/model/Order";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { id } = await req.json();

    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = await OrderModel.find({ user: id }).populate("startup");

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
