const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      default: "student",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
   otp: String,
   otpExpire: Date,
   isActive: {
  type: Boolean,
  default: true,
  },
  mobile: {
  type: String,
},
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
