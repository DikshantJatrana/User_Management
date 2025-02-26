import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("DB Connected successfully");
    connection.isConnected = mongoose.connections[0].readyState;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
