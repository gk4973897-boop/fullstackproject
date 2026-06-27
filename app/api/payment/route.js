import Razorpay from "razorpay";

export async function POST() {
  try {
    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: 5000,
      currency: "INR",
      receipt: `resume_${Date.now()}`,
    });

    return Response.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}