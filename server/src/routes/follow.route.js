import express from "express"
import { followOrUnfollowUser } from "../controllers/follow.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = express.Router()

router.use(verifyJWT)

router.route("/:id").post(followOrUnfollowUser)

export default router