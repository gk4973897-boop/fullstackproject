import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { plan } = await req.json();

    // 💰 Plan prices
    const prices = {
      bronze: 100,
      silver: 300,
      gold: 1000,
    };

    // ❌ Invalid plan check
    if (!prices[plan]) {
      return NextResponse.json(
        { message: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // 🔐 Check env variables
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { message: "Razorpay keys missing in .env.local" },
        { status: 500 }
      );
    }

    // ⚡ Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 🧾 Create order
    const order = await razorpay.orders.create({
      amount: prices[plan] * 100, // paise me
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
    });

  } catch (error) {
    console.log("ORDER ERROR:", error);

    return NextResponse.json(
      {
        message: "Order create failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}