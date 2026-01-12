const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["notes", "quiz", "interview"],
      required: true,
    },

    fileUrl: {
      type: String,
    },

    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
