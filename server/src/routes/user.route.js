import express from "express";
import {
     registerUser,
     loginUser,
     logoutUser,
     getCurrentUser,
     updateUser,
     changeUserPassword,
     getUserProfile
     } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = express.Router()

router.route('/register')
.post( upload.single('avatar'),
    registerUser
)

router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/me').get(verifyJWT,getCurrentUser)
router.route('/profile/:userId').get(verifyJWT,getUserProfile)
router.route('/update').patch(verifyJWT,updateUser)
router.route('/change-password').patch(verifyJWT,upload.single('avatar'), changeUserPassword)


export default router