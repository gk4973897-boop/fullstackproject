import connectDB from "@/lib/db";
import Post from "@/models/Post";

export async function POST(req) {
  await connectDB();

  try {
    const { postId, userId } = await req.json();

    const post = await Post.findById(postId);

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return Response.json({ post });

  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}