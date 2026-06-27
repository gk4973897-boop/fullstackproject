"use client";

import { useState } from "react";

export default function PaymentButton({ user, plan }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1️⃣ Order create karna
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const order = await res.json();

      if (!order.id) {
        alert("Order create failed");
        setLoading(false);
        return;
      }

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "InternHub",
        description: `${plan} plan subscription`,
        order_id: order.id,

        handler: async function (response) {
          try {
            // 3️⃣ Payment success → backend update
            const verifyRes = await fetch("/api/payment/success", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user._id,
                plan: plan,
                paymentId: response.razorpay_payment_id,
              }),
            });

            const data = await verifyRes.json();

            if (verifyRes.ok) {
              alert("🎉 Payment Successful! Plan Updated");
            } else {
              alert(data.message || "Payment done but update failed");
            }
          } catch (err) {
            alert("Error updating plan");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : `Buy ${plan} Plan`}
      </button>
    </div>
  );
}