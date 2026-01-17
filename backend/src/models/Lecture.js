// // models/Lecture.js
// const mongoose = require("mongoose");

// const lectureSchema = new mongoose.Schema({
//     title: {
//         type: String, required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         default: ""
//     },
//     course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course", required: true
//     },
//     duration: {
//         type: String,
//         default: "0"
//     }, // e.g., "15:00"
//     videoUrl: {
//         type: String, default: ""
//     }, // Trending: Video support
//     pdfUrl: {
//         type: String,
//         default: ""
//     },
//     lectureType: {
//         type: String,
//         enum: ["video", "article", "quiz"],
//         default: "video"
//     },
//     materials: [
//         { type: mongoose.Schema.Types.ObjectId, ref: "Material" }
//     ],

//     isPreviewFree: {
//         type: Boolean,
//         default: false
//     } // Trending: Free preview option
// }, { timestamps: true });

// module.exports = mongoose.model("Lecture", lectureSchema);

const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    duration: { type: String, default: "0" },
    // Fields for Live/Scheduled content
    date: { type: Date }, 
    startTime: { type: String },
    meetingLink: { type: String, default: "" }, 
    // Fields for Recorded content
    videoUrl: { type: String, default: "" },
    lectureType: {
        type: String,
        enum: ["video", "live", "article", "quiz"],
        default: "video"
    },
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
    isPreviewFree: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Lecture", lectureSchema);