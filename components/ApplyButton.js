"use client";

import { useState } from "react";

export default function ApplyButton({ user }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const applyInternship = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage(`✅ Applied! Total: ${data.applicationsUsed}`);
      }

    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={applyInternship}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Applying..." : "Apply Internship"}
      </button>

      {message && (
        <p className="mt-2 text-sm">{message}</p>
      )}
    </div>
  );
}