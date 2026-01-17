const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
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
    },
    
    date: { 
        type: Date 
    }, 
    startTime: { 
        type: String 
    },
    meetingLink: { 
        type: String, 
        default: "" 
    }, 
   
    videoUrl: { 
        type: String, 
        default: "" 
    },
    lectureType: {
        type: String,
        enum: ["video", "live", "article", "quiz"],
        default: "video"
    },
    materials: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Material" 
    }],
    isPreviewFree: { 
        type: Boolean, 
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Lecture", lectureSchema);