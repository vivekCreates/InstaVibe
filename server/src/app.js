import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

//middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true,
    
}))

app.get("/",(req,res)=>{
    return res.send("Hello i am home")
})

// app.get("/user",verifyJWT,(req,res)=>{
//     const user = req.user;
//   return res
//   .status(200)
//   .json({user})
// })

//import routes

import UserRoute from "./routes/user.route.js"
import PostRoute from "./routes/post.route.js"
import CommentRoute from "./routes/comment.route.js"
import LikeRoute from "./routes/like.route.js"
import FollowRoute from "./routes/follow.route.js"
import BookmarkRoute from "./routes/bookmark.route.js"


// decleare routes
app.use("/api/v1/users",UserRoute)
app.use("/api/v1/posts",PostRoute)
app.use("/api/v1/comments",CommentRoute)
app.use("/api/v1/likes",LikeRoute)
app.use("/api/v1/follows",FollowRoute)
app.use("/api/v1/bookmarks",BookmarkRoute)


export default app