import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Resume ||
  mongoose.model("Resume", ResumeSchema);