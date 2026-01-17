const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Yahan 'User' hona chahiye agar aap studentController mein User model use kar rahe hain
      required: true,
    },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"], // Strictly lowercase jaisa validation error ne manga
      required: true,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);