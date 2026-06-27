import mongoose from "mongoose";

const LoginLogSchema = new mongoose.Schema(
  {
    userId: String,   // 🔥 TEMP SAFE
    ip: String,
    browser: String,
    os: String,
    deviceType: String,
  },
  { timestamps: true }
);

export default mongoose.models.LoginLog ||
  mongoose.model("LoginLog", LoginLogSchema);