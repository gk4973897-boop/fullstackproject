import nodemailer from "nodemailer";
import { otpStore } from "@/lib/otpStore";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore.email = email;
    otpStore.otp = otp;
    otpStore.verified = false;

    console.log("EMAIL:", process.env.EMAIL);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "FOUND" : "MISSING"
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "French Language OTP Verification",
      text: `Your OTP is: ${otp}`
    });

    console.log("OTP Sent:", otp);

    return Response.json({
      success: true,
      message: "OTP sent successfully"
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}