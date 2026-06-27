import crypto from "crypto";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { sendMail } from "@/lib/sendMail";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, plan, paymentId, orderId, signature } = await req.json();

    // 🔐 VERIFY SIGNATURE
    const body = orderId + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return Response.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    user.plan = plan;
    user.applicationsUsed = 0;
    await user.save();

    await sendMail(user.email, plan);

    return Response.json({
      message: "Payment verified & plan updated",
    });

  } catch (error) {
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}