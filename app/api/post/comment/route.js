import connectDB from "@/lib/db";
import Post from "@/models/Post";

export async function POST(req) {
  await connectDB();

  try {
    const { postId, userId, text } = await req.json();

    // 🚨 validation
    if (!postId || !userId || !text) {
      return Response.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    // 🔍 find post
    const post = await Post.findById(postId);

    if (!post) {
      return Response.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    // 💬 add comment
    const newComment = {
      userId,
      text,
    };

    post.comments.push(newComment);

    await post.save();

    // ✅ IMPORTANT: always return { post }
    return Response.json({
      success: true,
      post,
    });

  } catch (err) {
    console.error("COMMENT API ERROR:", err);

    return Response.json(
      { message: "Server error in comment API" },
      { status: 500 }
    );
  }
}