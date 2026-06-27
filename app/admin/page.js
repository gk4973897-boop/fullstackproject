export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/User";

export default async function AdminPage() {
  await connectDB();

  // TODO: replace with real logged-in user later
  const currentUser = await User.findOne({ role: "admin" });

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/");
  }

  const users = await User.find().sort({ createdAt: -1 });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard 📊
      </h1>

      <div className="grid gap-3">
        {users.map((u) => (
          <div key={u._id.toString()} className="border p-3 rounded">
            <p>
              <b>{u.name}</b> ({u.email})
            </p>
            <p>Plan: {u.plan}</p>
            <p>Usage: {u.applicationsUsed}</p>
            <p>Role: {u.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}