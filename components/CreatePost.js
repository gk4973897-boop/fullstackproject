"use client";

import { useState } from "react";

export default function CreatePost({ user }) {
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!caption) return alert("Caption required");

    setLoading(true);

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          caption,
          mediaUrl,
          mediaType: mediaUrl.includes("video") ? "video" : "image",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Post failed");
      } else {
        alert("Post created successfully ✅");
        setCaption("");
        setMediaUrl("");
        window.location.reload(); // simple refresh feed
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-3">Create Post</h2>

      {/* CAPTION */}
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* MEDIA URL */}
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Image/Video URL"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
      />

      {/* BUTTON */}
      <button
        onClick={handlePost}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}