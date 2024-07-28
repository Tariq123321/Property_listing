const express =require('express');
const { signup, emailVerfify, signin, forgetPassword ,resetPassword, updatePassword, protect,  validateOtp, getMe} = require('../Controllers/authController');
const authRouter = express.Router();


authRouter.post("/signup",signup)
authRouter.post("/signin",signin)
authRouter.put("/email-verify",emailVerfify)
authRouter.post("/forget-password",forgetPassword)
authRouter.put("/reset-password",resetPassword)
authRouter.post("/update-password",protect,updatePassword)
authRouter.post("/validate-otp",validateOtp)
authRouter.get("/me",protect,getMe)





module.exports = authRouter