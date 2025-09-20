import mongoose from "mongoose";
import { Bookmark } from "../models/bookmark.model.js";
import { Post } from "../models/post.model.js";

const bookmarkPost = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if(!post){
     return res.status(404).json({success:false, message: "post not found" });
  }

  const postAlreadySaved = await Bookmark.findOne({ savedPost: postId });
  if (postAlreadySaved) {
    await Bookmark.findByIdAndDelete(postAlreadySaved._id);
    return res.status(200).json({success:true, message: "post removed from bookmark" });
  }
  await Bookmark.create({
    savedPost: new mongoose.Types.ObjectId(post._id),
    savedBy: new mongoose.Types.ObjectId(req.user._id),
  });

  return res.status(200).json({success:true, message: "post saved in bookmark" });
};

export { bookmarkPost };
