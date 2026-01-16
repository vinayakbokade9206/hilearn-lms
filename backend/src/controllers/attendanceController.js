const Attendance = require("../models/Attendance");

/**
 * @desc Mark Bulk Attendance for a specific lecture
 * @route POST /api/attendance/bulk
 */
exports.markBulkAttendance = async (req, res) => {
  try {
    const { lectureId, attendanceData } = req.body;

    // Validation: Check if data exists
    if (!lectureId || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({ 
        success: false, 
        message: "Lecture ID and Attendance Data are required." 
      });
    }

    // Data ko format karna database ke hisaab se
    const records = attendanceData.map(item => ({
      lecture: lectureId,
      student: item.studentId,
      status: item.status
    }));

    // 1. Purani attendance delete karenge (Taki agar update karein toh purane records clear ho jayein)
    await Attendance.deleteMany({ lecture: lectureId });

    // 2. Nayi attendance list insert karenge
    await Attendance.insertMany(records);

    res.status(200).json({ 
      success: true, 
      message: "Attendance updated successfully!" 
    });
  } catch (error) {
    // console.error("Bulk Attendance Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + error.message 
    });
  }
};