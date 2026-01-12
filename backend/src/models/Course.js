// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Course title is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     category: {
//       type: String,
//       default: "General",
//     },
//     duration: {
//       type: Number, // duration in hours
//       default: 0,
//     },
//     level: {
//       type: String,
//       enum: ["Beginner", "Intermediate", "Advanced"],
//       default: "Beginner",
//     },
//     price: {
//       type: Number,
//       default: 0,
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//     lectures: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Lecture",
//       },
//     ],
//     batches: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Batch",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Course", courseSchema);

// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Course title is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     category: {
//       type: String,
//       default: "General",
//     },
//     duration: {
//       type: String, // UI se "3 months" aayega isliye String rakha hai
//       default: "",
//     },
//     level: {
//       type: String,
//       enum: ["Beginner", "Intermediate", "Advanced"],
//       default: "Beginner",
//     },
//     price: {
//       type: String, // Frontend se string input aata hai, DB handle kar lega
//       default: "0",
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//     lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
//     batches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Course", courseSchema);

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
      // LMS Professionalism: Enum ensure karta hai ki data categories ke bahar na jaye
      enum: {
        values: ["frontend", "backend", "database", "fullstack", "general"],
        message: '{VALUE} is not a valid category'
      },
      lowercase: true, // DB me hamesha choti ABC me save hoga (best for filtering)
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
    // Professional Tip: In fields ka use karke aap course ke andar total content count dikha sakte hain
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);