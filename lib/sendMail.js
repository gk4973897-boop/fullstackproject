import nodemailer from "nodemailer";

export async function sendMail(email, plan) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "InternHub",
    to: email,
    subject: "Payment Invoice - InternHub",
    html: `
      <h2>Payment Successful 🎉</h2>
      <p>Your plan: <b>${plan}</b></p>
      <p>Thank you for subscribing!</p>
    `,
  });
}