import { Bookmark } from "../models/bookmark.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const bookmarkPost = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  const user = await User.findById(req.user._id);
  
  const postAlreadySaved = await Bookmark.findOne({ savedPost: postId });
  if (postAlreadySaved) {
    await Bookmark.findByIdAndDelete(postAlreadySaved._id)
    return res.status(200).json({msg:"post removed from bookmark"})
  }
  await Bookmark.create({
    savedPost: post._id,
    savedBy: user._id,
  });
  return res.status(200).json({msg:"post saved in bookmark"})
};

export { bookmarkPost };
