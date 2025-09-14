import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    followedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})


export const Follow = mongoose.model("Follow",followSchema)