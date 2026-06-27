import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    default: "",
  },
 password: {
    type: String,
    required: true,
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  lastPasswordReset: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  plan: {
  type: String,
  enum: ["free", "bronze", "silver", "gold"],
  default: "free"
},
applicationsUsed: {
  type: Number,
  default: 0
},
planExpiresAt: Date
});

export default mongoose.models.User || mongoose.model("User", UserSchema);