import ApplyButton from "@/components/ApplyButton";
import PaymentButton from "@/components/PaymentButton";
import connectDB from "@/lib/db";
import User from "@/models/User";

export default async function PublicSpace() {
  await connectDB();

  let user = await User.findOne({ email: "test@gmail.com" });

  if (!user) {
    user = await User.create({
      name: "Test User",
      email: "test@gmail.com",
      plan: "free",
      applicationsUsed: 0,
    });
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Public Space 🌍
        </h1>

        <div className="bg-white p-4 rounded shadow mb-4">
          <p><b>User:</b> {user.email}</p>
          <p><b>Plan:</b> {user.plan}</p>
          <p><b>Used:</b> {user.applicationsUsed}</p>
        </div>

        {/* 💳 PAYMENT BUTTONS */}
        <div className="mb-6">
          <PaymentButton user={user} plan="bronze" />
          <PaymentButton user={user} plan="silver" />
          <PaymentButton user={user} plan="gold" />
        </div>

        {/* 📌 APPLY BUTTON */}
        <ApplyButton user={{
          _id: user._id.toString(),
          plan: user.plan,
          applicationsUsed: user.applicationsUsed
        }} />

      </div>
    </main>
  );
}