// const Lecture = require("../models/Lecture");
// const Course = require("../models/Course");

// // Create lecture
// exports.createLecture = async (req, res) => {
//   try {
//     const lecture = await Lecture.create(req.body);

//     // attach to course
//     await Course.findByIdAndUpdate(lecture.course, {
//       $push: { lectures: lecture._id },
//     });

//     res.status(201).json({
//       success: true,
//       lecture,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // Get all lectures
// exports.getLectures = async (req, res) => {
//   try {
//     const lectures = await Lecture.find().populate("course", "title");

//     res.json({
//       success: true,
//       lectures,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // Get single lecture
// exports.getLecture = async (req, res) => {
//   try {
//     const lecture = await Lecture.findById(req.params.id);

//     res.json({
//       success: true,
//       lecture,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       error: "Lecture not found",
//     });
//   }
// };

// // Update lecture
// exports.updateLecture = async (req, res) => {
//   try {
//     const lecture = await Lecture.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       lecture,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // Delete lecture
// exports.deleteLecture = async (req, res) => {
//   try {
//     const lecture = await Lecture.findById(req.params.id);

//     if (!lecture) {
//       return res.status(404).json({
//         success: false,
//         error: "Lecture not found",
//       });
//     }

//     // remove from course
//     await Course.findByIdAndUpdate(lecture.course, {
//       $pull: { lectures: lecture._id },
//     });

//     await lecture.deleteOne();

//     res.json({
//       success: true,
//       message: "Lecture deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };


const Lecture = require("../models/Lecture");


exports.createLecture = async (req, res) => {
try {
const lecture = await Lecture.create(req.body);
res.status(201).json({ success: true, lecture });
} catch (error) {
res.status(400).json({ success: false, error: error.message });
}
};


exports.getLectures = async (req, res) => {
try {
const lectures = await Lecture.find().populate("course", "title");
res.json({ success: true, lectures });
} catch (error) {
res.status(500).json({ success: false, error: error.message });
}
};


exports.updateLecture = async (req, res) => {
try {
const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!lecture) return res.status(404).json({ success: false, message: "Lecture not found" });
res.json({ success: true, lecture });
} catch (error) {
res.status(500).json({ success: false, error: error.message });
}
};


exports.deleteLecture = async (req, res) => {
try {
const lecture = await Lecture.findByIdAndDelete(req.params.id);
if (!lecture) return res.status(404).json({ success: false, message: "Lecture not found" });
res.json({ success: true, message: "Lecture deleted" });
} catch (error) {
res.status(500).json({ success: false, error: error.message });
}
};