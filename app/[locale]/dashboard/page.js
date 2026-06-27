import connectDB from "@/lib/db";
import User from "@/models/User";
import Post from "@/models/Post";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";

export default async function Dashboard() {
  await connectDB();

  const user = await User.findOne({ email: "test@gmail.com" }).lean();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard 📊
        </h1>

        {/* USER INFO */}
        <div className="bg-white p-4 rounded mb-4">
          <p>User: {user.email}</p>
          <p>Friends: {user.friends?.length || 0}</p>
        </div>

        {/* CREATE POST */}
        <CreatePost user={user} />

        {/* FEED */}
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}

      </div>
    </main>
  );
}