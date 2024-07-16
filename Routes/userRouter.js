const express =require('express');
const { signup, emailVerfify, signin, forgetPassword ,resetPassword, updatePassword, protect,  validateOtp, getMe} = require('../Controllers/authController');
const userRouter = express.Router();



userRouter.post("/signup",signup)
userRouter.post("/signin",signin)
userRouter.put("/email-verify",emailVerfify)
userRouter.post("/forget-password",forgetPassword)
userRouter.put("/reset-password",resetPassword)
userRouter.post("/update-password",protect,updatePassword)
userRouter.post("/validate-otp",validateOtp)
userRouter.get("/me",protect,getMe)





module.exports = userRouter