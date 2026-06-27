import connectDB from "@/lib/db";
import User from "@/models/User";

function generatePassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return password;
}

export async function POST(req) {
  try {
    await connectDB();

    const { emailOrPhone } = await req.json();

    if (!emailOrPhone) {
      return Response.json({
        message: "Email or phone required",
      });
    }

    // user find
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone },
      ],
    });

    if (!user) {
      return Response.json({
        message: "User not found",
      });
    }

    // 1 day restriction
    const now = new Date();

    if (user.lastPasswordReset) {
      const diff =
        now - new Date(user.lastPasswordReset);

      const oneDay = 24 * 60 * 60 * 1000;

      if (diff < oneDay) {
        return Response.json({
          message:
            "You can use this option only once per day.",
        });
      }
    }

    // new password generate
    const newPassword = generatePassword();

    // update user
    user.password = newPassword;
    user.lastPasswordReset = now;

    await user.save();

    return Response.json({
      message: "Password reset successful",
      newPassword: newPassword,
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}