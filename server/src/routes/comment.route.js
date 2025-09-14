import express from "express"
import { createComment, deleteComment, updateComment, } from "../controllers/comment.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route("/create/:postId").post(verifyJWT, createComment)
router.route("/update/:commentId").patch(verifyJWT,updateComment)
router.route("/delete/:commentId").delete(verifyJWT, deleteComment)




export default router