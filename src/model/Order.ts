import mongoose, { Schema, Document, Types } from "mongoose";

export interface Order extends Document {
  amount: number;
  quantity: number;
  startup: Types.ObjectId;
  user: Types.ObjectId;
}

const OrderSchema: Schema<Order> = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel =
  (mongoose.models.Order as mongoose.Model<Order>) ||
  mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
