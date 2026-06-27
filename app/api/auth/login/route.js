import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { message: "Email required" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: "New User",
        email,
        plan: "free",
        applicationsUsed: 0,
        friends: []
      });
    }

    return Response.json({
      success: true,
      user
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}