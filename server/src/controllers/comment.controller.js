import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  try {
    const createdComment = await Comment.create({
      comment,
      userId: req.user?._id,
      postId,
    });

    return res
      .status(200)
      .json({ msg: "comment created successfully", createdComment });
  } catch (error) {
    console.log(
      "something went wrong while creating comment : ",
      error.message
    );
    return res.status(200).json({ msg: "Problem while creating comment" });
  }
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  try {
    const existedComment = await Comment.findById(commentId);
    if (!existedComment) {
      return res.status(400).json({
        msg: "comment does'nt exists",
      });
    }
   
    
    if ((existedComment.userId.toString() != req.user._id)) {
      return res.status(400).json({
        msg: "you cannot edit other people comment",
      });
    }
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: {
          comment,
        },
      },
      { new: true }
    );

    return res.status(200).json({ msg: "comment updated successfully" });
  } catch (error) {
    console.log(
      "Something went wrong while updating the comment : ",
      error.message
    );
    return res.status(400).json({ msg: "comment not updated" });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const existedComment = await Comment.findById(commentId);
    if (!existedComment) {
      return res.status(400).json({
        msg: "comment does'nt exists",
      });
    }
   
    
    if ((existedComment.userId.toString() != req.user._id)) {
      return res.status(400).json({
        msg: "you cannot delete other people post",
      });
    }
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ msg: "comment deleted successfully" });
  } catch (error) {
    console.log("Something went wrong while deleting the comment");
    return res.status(400).json({ msg: "comment not deleted" });
  }
};

export { createComment, updateComment, deleteComment };
