import mongoose, { Schema, Document, Types } from "mongoose";

export interface Startup extends Document {
  title: string;
  logo: string;
  slug: string;
  sharePrice: number;
  shareQuantity: number;
  details: string;
  coverImage: string;
  description: string;
  admin: Types.ObjectId[];
  member: Types.ObjectId[];
  chats: Types.ObjectId[];
  website: string;
}

const StartupSchema: Schema<Startup> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sharePrice: {
      type: Number,
      required: true,
    },
    shareQuantity: {
      type: Number,
      required: true,
    },
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

const StartupModel =
  (mongoose.models.Startup as mongoose.Model<Startup>) ||
  mongoose.model<Startup>("Startup", StartupSchema);

export default StartupModel;
