"use client";

import { useState } from "react";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);

  // ❤️ LIKE
  const handleLike = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          userId: "test-user-id",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Like failed");
      } else {
        setLikes(data.post.likes.length); // update UI instantly
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  // 💬 COMMENT
  const handleComment = async () => {
    const text = prompt("Write your comment:");

    if (!text) return;

    try {
      const res = await fetch("/api/post/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          userId: "test-user-id",
          text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Comment failed");
      } else {
        setComments(data.post.comments); // update UI instantly
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">

      {/* CAPTION */}
      <p className="mb-2">{post.caption}</p>

      {/* MEDIA */}
      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="post"
          className="w-full rounded mt-2"
        />
      )}

      {/* ACTIONS */}
      <div className="flex gap-6 mt-3">

        <button
          onClick={handleLike}
          disabled={loading}
          className="text-red-500 font-semibold"
        >
          ❤️ Like ({likes})
        </button>

        <button
          onClick={handleComment}
          className="text-blue-500 font-semibold"
        >
          💬 Comment ({comments.length})
        </button>

      </div>

      {/* COMMENT LIST */}
      <div className="mt-3">
        {comments.map((c, i) => (
          <p key={i} className="text-sm text-gray-600">
            💬 {c.text}
          </p>
        ))}
      </div>

    </div>
  );
}