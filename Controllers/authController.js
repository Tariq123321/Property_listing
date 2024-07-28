const User = require("../Models/userSchema");
const Email = require("../Utils/email");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createSendToken } = require("../Utils/generatingToken");
const { generateOTP, createAndSendOTP } = require("../Utils/twillio.config");
const infoLogger = require("../logger/infoLogger");

const signup = async (req, res) => {
  try {
    
    const { name, email, password, confirmPassword, role, phone} = req.body;
    let userExist = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    }).select("active");

    if (userExist) {
      return res.status(401).json({
        status: "fail",
        message: "User already exist with this email or phone no",
      });
    }

    //* Note:- bcrypt is done in the usermodel schema
    
    const user = await User.create(req.body);

    user.password = undefined; // Do not send the password to the client side
    user.active = undefined; // also do not send whether is active/nonactive

    const url = `${req.protocol}//:${req.get("host")}/me`;
    const sendMail = new Email(user, url);
    infoLogger.info(sendMail);
    sendMail.sendEmailVerification();

    req.message = "Verification link has been sent to email. Kindly verify!";
    createSendToken(user, 201, res, req);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const emailVerfify = async (req, res) => {
  console.log("comes");
  console.log(req.query);
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send({ message: "Invalid verification link" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).send({ message: "Your account has been verified" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { password, identifier, role } = req.body;

    const isEmail = identifier.includes("@");
    const query = isEmail ? { email: identifier } : { phone: identifier };
    console.log(query);
    const user = await User.findOne(query).select("+password");

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Check if the role matches
    if (user.role !== role) {
      return res.status(403).send({ message: "Role mismatch" });
    }

    // if (!user.isVerified) {
    //   return res
    //     .status(400)
    //     .send({ message: "Please verify your email before logging in" });
    // }

    if (!isEmail) {
      try {
        const generateOtp = generateOTP();
        const content = `Your OTP is ${generateOtp}`;
        createAndSendOTP(query.phone, content);
        await User.findOneAndUpdate(
          { phone: query.phone },
          { $set: { otp: generateOtp } }
        );

        return res.status(200).json({
          status: "success",
          message: "OTP sent successfully",
        });
      } catch (error) {
        return res.status(404).json({
          status: "fail",
          message: error.message,
        });
      }
    }

    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) {
      return res.status(404).json({
        status: "fail",
        message: "invalid credentail",
      });
    }

    createSendToken(user, 201, res, req);
  } catch (error) {
    res.status(500).send({ message: `Server error: ${error.message}` });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "you are not logged in! please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await User.findById(decoded.id).select("+password");

    if (!userExists) {
      return res.status(401).json({
        status: "fail",
        message: "User not exist",
      });
    }
    
    req.user = userExists;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      error: error.message,
    });
  }
};

const restrictTo = (...roles) => {
  return async (req, res, next) => {
    // console.log(req.user)
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(401).json({
      status: "fail",
      message: "you are restricted to perform this action",
    });
  };
};

const forgetPassword = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(400).json({
        status: "fail",
        message: "User not exist with this email",
      });
    }

    // 2) Generating a random cryptographic token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Reset token is:-", resetToken);
    userExist.passwordChangedAt = Date.now();
    userExist.passwordResetToken = crypto
      .createHash("sha-256")
      .update(resetToken)
      .digest("hex");
    userExist.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await userExist.save({ validateBeforeSave: false });

    try {
      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/reset-password?token=${resetToken}`;
      const message = `click this link ${resetURL} to reset your password`;
      const sendForgetEmail = new Email(userExist, resetURL);
      sendForgetEmail.passwordReset();

      return res.status(200).json({
        status: "success",
        message: "Token has been sent to email",
      });
    } catch (error) {
      userExist.passwordChangedAt = undefined;
      userExist.passwordResetToken = undefined;
      userExist.passwordResetExpires = undefined;
      userExist.save({ validateBeforeSave: false });

      // const err = new Error("Something wrong while sending the error . Please try again after sometime");
      return res.status(500).json({
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const hasedToken = crypto
      .createHash("sha256")
      .update(req.query.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hasedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select("-password");

    // 2) if token is not expired , and there is user  then set the new password for user
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid token",
      });
    }

    // 3) Update changePasswordAt property for the user
    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect Password(confirm password typo)",
      });
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save(); // ! here we do not turn of becoause it will validate the password and confirm password

    // 4) Log the user in , send JWT
    req.message = "successfully updated password";
    createSendToken(user, 200, res, req);
  } catch (error) {
    console.log(error.message);
  }
};

const updatePassword = async (req, res) => {
  // 1) Authenticate the User:- Ensure the user is authenticated and authorized to update their password. This typically involves checking their current session or JWT token.
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({
      status: "fail",
      message: "Enter correct password to update you password",
    });
  }

  //3) Validate New Password:- Ensure the new password meets your application's security requirements (e.g., length, complexity, ensure comfirm and new password is same ).
  if (req.body.confirmPassword !== req.body.confirmNewPassword) {
    return res.status(400).json({
      status: "fail",
      message: "New password are mismatched (typo)",
    });
  }

  // 4) Hashing(done by mongoose pre-save method) and update the new password in the database
  user.password = req.body.confirmPassword;
  user.confirmPassword = req.body.confirmNewPassword;
  user.save();

  // 5) Log user in ,  resend the JWT
  createSendToken(user, 200, res, req);
};

const validateOtp = async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (req.body.otp == user.otp) {
      createSendToken(user, 200, res, req);
    }
    else return res.send("Invalid otp");
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const getMe = async (req,res)=>{
  const user = await User.findById(req.user);
  console.log(user);
  return res.status(200).json({
    status:"success",
    user
  })
}

module.exports = {
  signup,
  emailVerfify,
  signin,
  protect,
  restrictTo,
  forgetPassword,
  resetPassword,
  updatePassword,
  validateOtp,
  getMe
};
