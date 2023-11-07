import express from 'express'
import * as usercontroller from '../Controllers/usercontroller/auth'
import * as forgotPasswordController from '../Controllers/usercontroller/forgotPassword'

const router = express.Router();

router.post("/Register", usercontroller.Register);
router.post("/Login", usercontroller.Login);
router.post("/GoogleLogin", usercontroller.GoogleLogin)
router.post("/MobileVer",forgotPasswordController.MobileVerification)
router.post("/OtpVer",forgotPasswordController.otpVerifyingForPass)
router.post("/AuthReset",forgotPasswordController.AuthReset)

export default router;