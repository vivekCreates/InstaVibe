import express from "express"
import 
{ 
    createPost,
    deletePost,
    getAllPosts,
    getOnePost,
    updatePost
    } from "../controllers/post.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = express.Router()

router.route("/create").post(verifyJWT,upload.single("postImage"),createPost)
router.route("/:postId").get(verifyJWT,getOnePost);

router.route("/update/:postId").patch(verifyJWT,upload.single("postImage"),updatePost);
router.route("/delete/:postId").delete(verifyJWT,deletePost);
router.route("/all-posts").get(verifyJWT,getAllPosts);


export default router