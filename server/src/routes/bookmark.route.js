import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
import { bookmarkPost } from "../controllers/bookmark.controller.js";

const router = express.Router();


router.route("/:postId").post(verifyJWT,bookmarkPost)


export default router