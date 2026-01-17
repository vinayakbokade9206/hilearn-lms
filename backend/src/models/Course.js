const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      
      enum: {
        values: ["frontend", "backend", "database", "fullstack", "general"],
        message: '{VALUE} is not a valid category'
      },
      lowercase: true, 
      trim: true,
      default: "general",
    },
    duration: {
      type: String, 
      default: "",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    price: {
      type: String, 
      default: "0",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);