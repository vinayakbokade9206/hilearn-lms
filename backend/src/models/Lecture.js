// models/Lecture.js
const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title: { 
        type: String, required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", required: true 
    },
    duration: { 
        type: String, 
        default: "0" 
    }, // e.g., "15:00"
    videoUrl: { 
        type: String, default: "" 
    }, // Trending: Video support
    lectureType: {
        type: String,
        enum: ["video", "article", "quiz"],
        default: "video"
    },
    materials: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Material" }
    ],

    isPreviewFree: { 
        type: Boolean, 
        default: false 
    } // Trending: Free preview option
}, { timestamps: true });

module.exports = mongoose.model("Lecture", lectureSchema);