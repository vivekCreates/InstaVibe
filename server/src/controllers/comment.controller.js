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
      .json({ message: "comment created successfully", data:createdComment,success:true });
  } catch (error) {
    console.log(
      "something went wrong while creating comment : ",
      error.message
    );
    return res.status(200).json({ message: "Problem while creating comment" });
  }
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  try {
    const existedComment = await Comment.findById(commentId);
    if (!existedComment) {
      return res.status(400).json({
        message: "comment does'nt exists",
        success:false
      });
    }
   
    
    if ((existedComment.userId.toString() != req.user._id)) {
      return res.status(400).json({
        message: "you cannot edit other people comment",
        success:false
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

    return res.status(200).json({ message: "comment updated successfully",success:true });
  } catch (error) {
    console.log(
      "Something went wrong while updating the comment : ",
      error.message
    );
    return res.status(400).json({ message: "comment not updated" });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const existedComment = await Comment.findById(commentId);
    if (!existedComment) {
      return res.status(400).json({
        message: "comment does'nt exists",
        success:false
      });
    }
   
    
    if ((existedComment.userId.toString() != req.user._id)) {
      return res.status(400).json({
        message: "you cannot delete other people post",
        success:false
      });
    }
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ message: "comment deleted successfully",success:true });
  } catch (error) {
    console.log("Something went wrong while deleting the comment");
    return res.status(400).json({ message: "comment not deleted" });
  }
};

export { createComment, updateComment, deleteComment };
