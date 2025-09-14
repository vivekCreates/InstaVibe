import mongoose from "mongoose"
import AggregatePaginate from "mongoose-aggregate-paginate-v2"
import { dumyAvatar } from "../utils/dumyUrl.js"

const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        postImage:{
           type:String,
           default:"no post image"
        },

    }
    ,{timestamps:true}
)

postSchema.plugin(AggregatePaginate)


export const Post = mongoose.model("Post",postSchema)