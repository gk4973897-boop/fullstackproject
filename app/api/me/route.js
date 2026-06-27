import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return Response.json({ user: null }, { status: 401 });
  }

  const user = verifyToken(token);

  if (!user) {
    return Response.json({ user: null }, { status: 401 });
  }

  return Response.json({ user });
}