import connectDB from "@/lib/db";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    await connectDB();

    const { postId, userId } = await req.json();

    const post = await Post.findById(postId);

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    return Response.json({
      success: true,
      likesCount: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    return Response.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}