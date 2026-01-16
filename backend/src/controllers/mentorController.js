const Lecture = require("../models/Lecture");
const Student = require("../models/Student");

exports.getMentorStats = async (req, res) => {
  try {
    // Sirf wahi lectures count honge jahan Mentor ka ID match karega
    const lectureCount = await Lecture.countDocuments({ mentor: req.user._id });
    const totalStudents = await Student.countDocuments(); // Filhal total students

    res.status(200).json({
      success: true,
      stats: {
        lectures: lectureCount,
        students: totalStudents,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};