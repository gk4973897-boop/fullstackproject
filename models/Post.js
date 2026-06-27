import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  caption: String,
  mediaUrl: String,
  mediaType: String,

  likes: {
    type: [String],
    default: []
  },

  comments: {
    type: [
      {
        userId: String,
        text: String
      }
    ],
    default: []
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);