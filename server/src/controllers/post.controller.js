import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Follow } from "../models/follow.model.js";

import uploadImageOnCloudinary from "../utils/cloudinary.js";

const createPost = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "post is empty", success: false });
    }
    const { caption } = req.body;

    const postImageLocalPath = req.file?.path;

    console.log(postImageLocalPath);

    if (!postImageLocalPath) {
      return res
        .status(400)
        .json({
          message: "you dont have postImage local path",
          success: false,
        });
    }

    const postImage = await uploadImageOnCloudinary(postImageLocalPath);

    if (!postImage) {
      return res
        .status(400)
        .json({ message: "you dont have postImage", success: false });
    }

    const createdPost = await Post.create({
      caption,
      userId: req.user._id,
      postImage: postImage?.url,
    });
    res
      .status(201)
      .json({
        message: "post created successfully",
        data: createdPost,
        success: true,
      });
  } catch (error) {
    console.log("Something went wrong while creating a post : ", error.message);
    // return res.json(400).json({message:"Something went wrong while creating a post"})
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;

    const existedPost = await Post.findById(postId);

    if (!existedPost) {
      return res
        .status(400)
        .json({ message: "Post does'nt exists", success: false });
    }
    const LocalPostImage = req.file?.path;

    const postImage = await uploadImageOnCloudinary(LocalPostImage);

    if (existedPost.userId.toString() != req.user?._id.toString()) {
      return res
        .status(400)
        .json({ message: "you cannot edit other people post", success: false });
    }
    const post = await Post.findByIdAndUpdate(
      postId,
      { $set: { caption, postImage } },
      { new: true }
    );
    post.save();
    return res
      .status(200)
      .json({
        message: "post updated successfully",
        data: post,
        success: true,
      });
  } catch (error) {
    console.log("Something went wrong while edit the post : ", error.message);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  const existedPost = await Post.findById(postId);
  if (!existedPost) {
    return res
      .status(400)
      .json({ message: "Post does'nt exists", success: false });
  }
  if (existedPost.userId.toString() != req.user?._id.toString()) {
    return res
      .status(400)
      .json({ message: "you cannot delete other people post", success: false });
  }
  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json({ message: "post deleted successfully", success: true });
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          localField: "_id",
          foreignField: "postId",
          from: "comments",
          as: "comments",
        },
      }
      ,{
        $lookup: {
          localField: "_id",
          foreignField: "postId",
          from: "likes",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $addFields: {
          isLiked: { $in: [req.user?.id, "$likes"]},
          commentsCount: { $size: "$comments" },
          likesCount: { $size: "$likes" },
          
        },
      },
      {
        $project: {
          _id: 1,
          caption: 1,
          postImage: 1,
          isLiked:1,
          user:{
            _id:1,
            username:1,
            avatar:1
          },
          commentsCount: 1,
          likesCount: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return res
      .status(200)
      .json({ message: "All posts", data: posts, success: true });
  } catch (error) {
    console.log("Cannot get all posts:", error.message);
    return res.status(400).json({ message: "Can't get all posts" });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },

      // Lookup user
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: { $ifNull: ["$comments", []] } },
          likesCount: { $size: { $ifNull: ["$likes", []] } },
        },
      },

      {
        $project: {
          _id: 1,
          caption: 1,
          postImage: 1,
          createdAt: 1,
          updatedAt: 1,
          user: {
            _id: 1,
            username: 1,
            avatar: 1,
          },
          comments: 1,
          commentsCount: 1,
          likesCount: 1,
        },
      },
    ]);

    if (!post.length) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Post details fetched", data: post[0], success: true });
  } catch (error) {
    console.log("Error fetching post details:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createPost, updatePost, deletePost, getAllPosts, getOnePost };
