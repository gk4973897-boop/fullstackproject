import mongoose from "mongoose";

export default async function connectDB() {
  console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is undefined");
  }

  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGODB_URI);
}