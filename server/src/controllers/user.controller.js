import mongoose from "mongoose";
import { User } from "../models/user.model.js";

import uploadImageOnCloudinary from "../utils/cloudinary.js";

const options = {
  secure: true,
  httpOnly: true,
  sameSite:'strict',
  maxAge:1*24*60*60*1000
};

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateAccessToken();

  user.refreshToken = refreshToken;

  user.save({ validateBeforeSave: "false" });

  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(402).json({ msg: "All fields are required." });
    }

    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "password must be atleast 8 character" });
    }

    const userExist = await User.findOne({
      $or: [{ username }, { email }, { password }],
    });
    if (userExist) {
      return res.status(401).json({ msg: "user already exists." });
    }
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      console.log("You don't have avatar local path ");
    }

    const avatar = await uploadImageOnCloudinary(avatarLocalPath);
    if (!avatar) {
      console.log("You don't have avatar");
    }

    const user = await User.create({
      username,
      email,
      password,
      avatar: avatar?.url,
    });
    return res.status(201).json({ msg: "user registered succesfully.", user });
  } catch (error) {
    console.log(
      "Something went wrong while registering the user : ",
      error.message
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "You don't have an account please register" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    // console.log("ispasswordvalid",isPasswordValid)

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "username or password is incorrect" });
    }

    const { accessToken,refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken,options)
      .cookie("refreshToken", refreshToken,options)
      .json({ msg: "user login succesfully", user,accessToken,refreshToken });
  } catch (error) {
    console.log("Somenthing went wrong while user login ", error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: 1 },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .clearCookie("accessToken",options)
      .json({ msg: "user logout successfully", user: req.user });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong while logout" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    return res.status(200).json({msg:"current user fetch successfully", currentUser: user });
  } catch (error) {
    return res.status(405).json({ mgs: "can't get current user " });
  }
};

const updateUser = async(req, res) => {
  const { username, email } = req.body;
  const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      console.log("You don't have avatar local path ");
    }
     console.log("avatarLocalPath: ",avatarLocalPath);

    const avatar = await uploadImageOnCloudinary(avatarLocalPath);
    if (!avatar) {
      console.log("You don't have avatar");
    }

    console.log("username: ",username);
    console.log("email: ",email);
    console.log("avatar: ",avatar);
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set:{ username,email,avatar}},
    { new: true }
  );

  return res
    .status(200)
    .json({ msg: "user updated successfully", updatedUser });
};

const changeUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const checkPassword = await user.isPasswordCorrect(oldPassword);
  console.log(checkPassword)
  if (!checkPassword) {
    return res.status(400).json({ msg: "your old password in incorrect" });
  }
  user.password = newPassword;
  user.save();
  return res.status(200).json({ msg: "password changed" });
};

const getUserProfile = async (req, res) => {
  const {userId} = req.params;
  try {
    const profile = await User.aggregate([
      {
        $match:{
          _id:userId
        }
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "savedBy",
          as: "bookmarks",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followedTo",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followedBy",
          as: "following",
        },
      },
      {
        $addFields: {
          followers: {
            $size: "$followers",
          },
          following: {
            $size: "$following",
          },
          isFollowed: {
            $cond: {
              if: {
                $in: [
                  new mongoose.Types.ObjectId(req.user.Id),
                  "$followers.followedBy",
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project:{
          _id:1,
          username:1,
          email:1,
          avatar:1,
          posts:1,
          bookmarks:1,
          followers:1,
          following:1,
          isFollowed:1,
          createdAt:1,
          updatedAt:1
        }
      }
    ]);
    return res.status(200).json({ msg: "user profile", profile:profile[0] });
  } catch (error) {
    console.log(
      "Something went wrong while getting user profile : ",
      error.message
    );
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getCurrentUser,
  getUserProfile,
  changeUserPassword,
};
