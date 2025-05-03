import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    getUserChannelProfile, 
    updateAccountDetails
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateAndSendOtp, verifyOtp } from '../middlewares/otpMiddleware.js';
import asyncHandler from 'express-async-handler';

const router = Router()


// Route to send OTP to email for verification
router.post('/send-otp', generateAndSendOtp, asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'OTP sent successfully' });
  }));


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
    ]),
    verifyOtp,
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)


export default router