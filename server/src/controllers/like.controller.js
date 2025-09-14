import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";

const likeOrDislikePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const likeExist = await Like.findOne({ postId });

    if (likeExist) {
      await Like.findByIdAndDelete(likeExist._id);
      return res.status(200).json({ msg: "post disliked" });
    }
    await Like.create({
      postId,
      likedBy: req.user._id,
    });
    return res.status(200).json({ msg: "post liked"});
  } catch (error) {
    res.status(400).json({ msg: "something went wrong while like the post" });
  }
};

export { likeOrDislikePost };
