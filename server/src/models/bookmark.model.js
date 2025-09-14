import mongoose,{Schema} from "mongoose";


const bookmarkSchema = new Schema(
    {
        savedPost:{
            type:Schema.Types.ObjectId,
            ref:"Post"
        },
        savedBy:{
             type:Schema.Types.ObjectId,
             ref:"User"
        }
    }
    ,{timestamps:true})



export const Bookmark = mongoose.model("Bookmark",bookmarkSchema)