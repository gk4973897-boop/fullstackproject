import connectDB from "@/lib/db";
import LoginLog from "@/models/LoginLog";
import { getDeviceInfo } from "@/lib/device";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId, email } = body;

    if (!userId || !email) {
      return Response.json(
        { success: false, message: "userId or email required" },
        { status: 400 }
      );
    }

    // 🌐 USER INFO
    const userAgent = req.headers.get("user-agent") || "";
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    const { browser, os, deviceType } = getDeviceInfo(userAgent);

    const hour = new Date().getHours();

    // 📱 Mobile restriction
    if (deviceType === "mobile" && (hour < 10 || hour >= 13)) {
      return Response.json(
        {
          success: false,
          message: "Mobile login allowed only between 10AM–1PM",
        },
        { status: 403 }
      );
    }

    // 🌐 Chrome OTP rule
    if (browser?.toLowerCase().includes("chrome")) {
      return Response.json({
        success: true,
        otpRequired: true,
        message: "OTP required for Chrome login",
        tempUser: { userId, email, ip, browser, os, deviceType },
      });
    }

    // 🔐 JWT TOKEN
    const token = signToken({ userId, email });

    // 📊 LOGIN LOG SAVE (IMPORTANT FIX)
    await LoginLog.create({
      userId, // ✅ NO ObjectId conversion needed
      ip,
      browser,
      os,
      deviceType,
    });

    return Response.json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}