import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await User.create({
    name,
    email,
    password,
    friends: [],
  });

  return Response.json(user);
}