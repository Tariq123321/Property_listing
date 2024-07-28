const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
* @type {mongoose.SchemaDefinitionProperty}
*/

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true , "Name field cannot be blank"],
      trim:true,
    },
    address:{
      type:String,
    },
    password:{
      type:String,
      required:[true , "Password cannot be blank"],
      minlength:[5,"password must be atleast of 5 letter"],  
      select:false
    },
    confirmPassword:{
      type:String,
      required:[true , "Password confirm your password blank"],
      validate:{
        validator : function(el){
          return el === this.password  
        },
        message: 'Passwords are not the same!'
      }
    },
    role: {
      type: String,
      required: true,
      enum: ['user','admin', 'owner'],
      default: 'user'
    },
    email:{
      type:String,
      required:[true , "Email cannot be blank"],
      trim:true,
      unique:true,
      lowercase:true,
      validate:[validator.isEmail , "Enter a valid email"],
    },
    phone: {
      type: String,
      unique:true, 
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v); 
        },
        message: props => `${props.value} is not a valid 10 digit number!`
      },
      required: true
    },
    photo:{
      type:String,
      default : 'placeholder.png'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
      type:Boolean,
      default:true,
      select: false 
    },
    isVerified:{
      type:Boolean,  // for verfication , send to mail
      default:false
    },
    verificationToken: {
      type: String,
      default:''
    },
    otp:{
      type:String,
    }
  }
)

userSchema.pre('save', function (next) {
  if (this.isNew) { 
    this.verificationToken = crypto.randomBytes(16).toString('hex');
  }
  next();
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,12);
  this.confirmPassword = undefined
  next();
});

const User = mongoose.model("User",userSchema);

module.exports = User