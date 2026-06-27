import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const userId = body?.userId;

    if (!userId) {
      return Response.json(
        { message: "userId missing from request" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return Response.json(
        { message: "User not found in DB" },
        { status: 404 }
      );
    }

    const limits = {
      free: 1,
      bronze: 3,
      silver: 5,
      gold: Infinity,
    };

    const limit = limits[user.plan];

    if (user.applicationsUsed >= limit) {
      return Response.json(
        { message: "Plan limit reached" },
        { status: 403 }
      );
    }

    user.applicationsUsed += 1;
    await user.save();

    return Response.json({
      message: "Applied successfully",
      applicationsUsed: user.applicationsUsed,
    });

  } catch (error) {
    console.log("APPLY ERROR:", error);

    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}