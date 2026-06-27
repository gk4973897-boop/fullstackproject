import connectDB from "@/lib/db";
import Resume from "@/models/Resume";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const resume = await Resume.create(body);

    return Response.json({
      success: true,
      resume,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}