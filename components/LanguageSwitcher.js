"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher({ userEmail }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingLang, setPendingLang] = useState(null);

  // 🔥 Language change handler
  const changeLanguage = async (lang) => {
    if (lang === "fr") {
      setPendingLang(lang);

      await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail })
      });

      setShowOtp(true);
      return;
    }

    router.push(`/${lang}`);
  };

  // 🔥 OTP verify handler
  const verifyOtp = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userEmail,
        otp
      })
    });

    const data = await res.json();

    if (data.verified) {
      setShowOtp(false);
      setOtp("");

      router.push(`/${pendingLang}`);
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      
      {/* 🌐 Language Dropdown */}
      <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="hi">Hindi</option>
        <option value="pt">Portuguese</option>
        <option value="zh">Chinese</option>
        <option value="fr">French 🔒</option>
      </select>

      {/* 🔐 OTP Modal */}
      {showOtp && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "0",
            background: "#fff",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h4>Enter OTP</h4>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={{ padding: "5px", marginBottom: "10px" }}
          />

          <br />

          <button onClick={verifyOtp}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}