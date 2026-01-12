const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    quizTitle: String,
    score: Number,
    totalMarks: Number,
  },
  { timestamps: true }
);


module.exports = mongoose.model("QuizResult", quizResultSchema);