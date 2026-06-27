import { otpStore } from "@/lib/otpStore";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import LoginLog from "@/models/LoginLog";
import { getDeviceInfo } from "@/lib/device";

export async function POST(req) {
  const { email, otp } = await req.json();

  // 🌐 User agent + IP
  const userAgent = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  const { browser, os, deviceType } = getDeviceInfo(userAgent);

  // ✅ OTP VALIDATION (existing logic unchanged)
  if (
    otpStore.email === email &&
    String(otpStore.otp) === String(otp)
  ) {
    await connectDB();

    // 📊 SAVE LOGIN LOG (TASK 6 ADDITION)
    await LoginLog.create({
      userId: otpStore.userId || null,
      ip,
      browser,
      os,
      deviceType,
    });

    const res = NextResponse.json({ verified: true });

    res.cookies.set("fr_verified", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 10,
    });

    return res;
  }

  return NextResponse.json({ verified: false });
}