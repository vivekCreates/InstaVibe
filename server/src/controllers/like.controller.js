import mongoose from "mongoose";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";

const likeOrDislikePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const likeExist = await Like.findOne({ postId });

    if (likeExist) {
      await Like.findByIdAndDelete(likeExist._id);
      return res.status(200).json({ message: "post disliked",success:true });
    }
    await Like.create({
      postId:new mongoose.Types.ObjectId(postId),
      likedBy: req.user._id,
    });
    return res.status(200).json({ message: "post liked",success:true});
  } catch (error) {
    res.status(400).json({ message: "something went wrong while like the post" });
  }
};

export { likeOrDislikePost };
