import connectDB from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";

function canPost(user) {
  const friends = user.friends.length;

  if (friends === 0) return false;
  if (friends === 1) return user.postsToday < 1;
  if (friends <= 10) return user.postsToday < friends;
  return true;
}

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { userId, caption, mediaUrl, mediaType } = body;

  const user = await User.findById(userId);

  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  // reset daily count
  const today = new Date().toDateString();
  if (!user.lastPostDate || new Date(user.lastPostDate).toDateString() !== today) {
    user.postsToday = 0;
  }

  if (!canPost(user)) {
    return Response.json({ error: "Post limit reached" }, { status: 403 });
  }

  const post = await Post.create({
    userId,
    caption,
    mediaUrl,
    mediaType,
  });

  user.postsToday += 1;
  user.lastPostDate = new Date();
  await user.save();

  return Response.json(post);
}