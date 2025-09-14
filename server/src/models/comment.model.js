import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment:{ type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    postId: {type:mongoose.Schema.Types.ObjectId,ref:"Post"}
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
