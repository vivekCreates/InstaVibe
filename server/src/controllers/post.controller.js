import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import {User} from "../models/user.model.js";
import {Follow} from "../models/follow.model.js";

import uploadImageOnCloudinary from "../utils/cloudinary.js";

const createPost = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "post is empty" });
    }
    const { caption } = req.body;

    const postImageLocalPath = req.file?.path

    console.log(postImageLocalPath)

    if(!postImageLocalPath){
        return res.status(400).json({msg:"you dont have postImage local path"})
    }

    const postImage = await uploadImageOnCloudinary(postImageLocalPath)

    if(!postImage){
        return res.status(400).json({msg:"you dont have postImage"})
    }

    const createdPost = await Post.create({
      caption,
      userId: req.user._id,
      postImage:postImage?.url
    });
    res.status(201).json({ msg: "post created successfully", createdPost });
  } catch (error) {
    console.log("Something went wrong while creating a post : ", error.message);
    // return res.json(400).json({msg:"Something went wrong while creating a post"})
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;
    
    const existedPost = await Post.findById(postId)
    
    if (!existedPost) {
      return res.status(400).json({msg:"Post does'nt exists"})
    }
    const LocalPostImage = req.file?.path

    const postImage = await uploadImageOnCloudinary(LocalPostImage)

    if (existedPost.userId.toString() != req.user?._id.toString()){
        return res.status(400).json({msg:"you cannot edit other people post"})
    }
    const post = await Post.findByIdAndUpdate(
      postId,
      { $set: { caption,postImage } },
      { new: true }
    );
    post.save();
    return res.status(200).json({ msg: "post updated successfully", post });
  } catch (error) {
    console.log("Something went wrong while edit the post : ", error.message);
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  const existedPost= await Post.findById(postId)
  if (!existedPost) {
    return res.status(400).json({msg:"Post does'nt exists"})
  }
if (existedPost.userId.toString() != req.user?._id.toString())
   {
    return res.status(400).json({msg:"you cannot delete other people post"})
   }
  await Post.findByIdAndDelete(postId);

  return res.status(200).json({ msg: "deleted successfully" });
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({userId:req?.user.id});
    return res.status(200).json({ msg: "All users posts created by users", posts });
  } catch (error) {
    console.log("Cannot get all posts:", error.message);
    return res.status(400).json({ msg: "Can't get all posts" });
  }
};

const getOnePost = async(req,res) => {
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
            email: 1,
          },
          comments: 1,
          likes: 1,
          commentsCount: 1,
          likesCount: 1,
        },
      },
    ]);

    if (!post.length) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json({ msg: "Post details fetched", post: post[0] });
  } catch (error) {
    console.log("Error fetching post details:", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
} 


export { 
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getOnePost
 };
