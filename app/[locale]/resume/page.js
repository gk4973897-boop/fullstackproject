"use client";

import { useState } from "react";
import Script from "next/script";

export default function ResumePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume Data:", form);
    alert("Resume Info Saved");
  };

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
      });

      const data = await res.json();
      console.log("PAYMENT RESPONSE:", data);
alert(JSON.stringify(data));

      if (!data.success) {
        alert("Payment order create failed");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "InternHub",
        description: "Resume Builder Premium",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const user = JSON.parse(localStorage.getItem("user"));

            const saveRes = await fetch("/api/resume/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user?._id || "demo-user",
                name: form.name,
                email: form.email,
                education: form.education,
                experience: form.experience,
                paymentStatus: "paid",
              }),
            });

            const result = await saveRes.json();

            if (result.success) {
              alert("Resume Saved Successfully ✅");
              console.log(result.resume);
            } else {
              alert("Resume Save Failed");
            }
          } catch (error) {
            console.log(error);
            alert("Something went wrong");
          }
        },

        prefill: {
          name: form.name,
          email: form.email,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Resume Builder
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={form.education}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Save Resume Info
          </button>

          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Pay ₹50
          </button>
        </form>
      </div>
    </div>
  );
}