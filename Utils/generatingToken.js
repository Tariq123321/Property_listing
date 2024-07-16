const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"10d"})
};

const createSendToken = (user,statusCode , res,req)=>{
  const token = generateToken(user.id);
  const cookieOptions = {
    httpOnly : true,
    // secure : true ,
     expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), 
  }
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true ;
  res.cookie('jwt',token , cookieOptions);

  return res.status(statusCode).json({
    status:"success",
    token,
    message : req.message,
    data:{
      user
    },
  })
};

module.exports ={ generateToken , createSendToken}