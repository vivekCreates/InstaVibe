import express from "express"
import { likeOrDislikePost } from "../controllers/like.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();


router.route('/:postId').post(verifyJWT ,likeOrDislikePost)


export default router