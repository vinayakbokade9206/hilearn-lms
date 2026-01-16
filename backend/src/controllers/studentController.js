// const User = require("../models/User");
// const Student = require("../models/Student.js");
// const Attendance = require("../models/Attendance.js");
// const QuizResult = require("../models/QuizResult.js");
// const Course = require("../models/Course");
// const bcrypt = require("bcryptjs");


// /**
//  * Get all students
//  * @route GET /api/students
//  * @access Protected
//  */
// exports.getStudents = async (req, res) => {
//   try {
//     // Fetch only users with role = student, exclude password field
//     const students = await User.find({ role: "student" })
//       .select("-password") 
//       .sort({ createdAt: -1 });// Latest students first
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching students" });
//   }
// };

// /**
//  * Add a new student
//  * @route POST /api/students
//  * @access Protected
//  */
// exports.addStudent = async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Student already exists" });
//     }

//     // 🔐 HASH PASSWORD
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const student = await User.create({
//       name,
//       email,
//       mobile,
//       password: hashedPassword, // ✅ hashed
//       role: "student",
//       isActive: true,
//     });

//     const studentObj = student.toObject();
//     delete studentObj.password;

//     res.status(201).json(studentObj);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /**
//  * Get student details (view page)
//  * @route GET /api/students/:id/details
//  * @access Protected
//  */
// exports.getStudentDetails = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id).select("-password");
//     if (!student) return res.status(404).json({ message: "Not found" });

//     res.json({ success: true, student });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// /**
//  * Get student by ID
//  * @route GET /api/students/:id
//  * @access Protected
//  */
// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id).select("-password");
//     res.status(200).json({ success: true, student });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };


// /**
//  * Update student details
//  * @route PUT /api/students/:id
//  * @access Protected
//  */
// exports.updateStudent = async (req, res) => {

//   if (!req.body.password) {
//     delete req.body.password;
//   }

//   const student = await User.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   ).select("-password");

//   res.json(student);
// };

// /**
//  * Toggle student active/inactive status
//  * @route PATCH /api/students/:id/toggle-status
//  * @access Protected
//  */
// exports.toggleStudentStatus = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     student.isActive = !student.isActive;
//     await student.save();
//     res.json({ message: "Status updated successfully", isActive: student.isActive });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update status" });
//   }
// };

// /**
//  * Delete a student
//  * @route DELETE /api/students/:id
//  * @access Protected
//  */
// exports.deleteStudent = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete student" });
//   }
// };


// /**
//  * Get student attendance
//  * @route GET /api/students/:id/attendance
//  * @access Protected
//  */
// exports.getStudentAttendance = async (req, res) => {
//   const attendance = await Attendance.find({ student: req.params.id }).populate("lecture", "title");
//   res.json({ totalLectures: attendance.length, attendance });
// };


// /**
//  * Get student quiz results
//  * @route GET /api/students/:id/quizzes
//  * @access Protected
//  */
// exports.getStudentQuizzes = async (req, res) => {
//   const quizzes = await QuizResult.find({ student: req.params.id });
//   res.json(quizzes);
// };

// /**
//  * Seed sample students (for testing/demo)
//  * @route POST /api/students/seed
//  * @access Protected / Dev only
//  */
// exports.seedStudents = async (req, res) => {
//   try {
//     const students = [
//       { name: "Rahul Sharma", email: "rahul@gmail.com", mobile: "9876543210", password: "password123", role: "student" }
//     ];
//     await User.insertMany(students);
//     res.status(201).json({ success: true, message: "Sample students inserted" });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };


const User = require("../models/User");
const Attendance = require("../models/Attendance");
const QuizResult = require("../models/QuizResult.js");
const Lecture = require("../models/Lecture");
const bcrypt = require("bcryptjs");

// 1. Dashboard Stats (Student)
exports.getStudentDashboardData = async (req, res) => {
  try {
    const studentId = req.user.id;
    const totalLectures = await Lecture.countDocuments();
    const presentCount = await Attendance.countDocuments({
      student: studentId,
      status: { $in: ["present", "Present"] }
    });

    res.json({
      success: true,
      stats: {
        enrolledCourse: "Full Stack Web Development",
        totalLectures: totalLectures,
        attendanceRate: totalLectures > 0 ? Math.round((presentCount / totalLectures) * 100) : 0,
        progress: 65
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Stats fetch failed" });
  }
};

// 2. Attendance History (Student)
exports.getMyAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const records = await Attendance.find({ student: studentId })
      .populate({ path: "lecture", select: "title date" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalPresent: records.filter(r => r.status.toLowerCase() === "present").length,
      totalLectures: records.length,
      attendance: records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Attendance error" });
  }
};

// 3. Get All Lectures (UPDATED for Video & Material)
exports.getAllLecturesForStudent = async (req, res) => {
  try {
    // Database se sabhi fields mangwana
    const lectures = await Lecture.find().sort({ createdAt: -1 });
    res.json({ success: true, lectures });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lectures fetch failed" });
  }
};

// --- ADMIN FUNCTIONS (Keep as is) ---

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password").sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await User.create({ name, email, mobile, password: hashedPassword, role: "student", isActive: true });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 10);
    const student = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.toggleStudentStatus = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    student.isActive = !student.isActive;
    await student.save();
    res.json({ success: true, isActive: student.isActive });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.id }).populate("lecture", "title").sort({ createdAt: -1 });
    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.getStudentQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizResult.find({ student: req.params.id });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.seedStudents = async (req, res) => {
  try {
    await User.insertMany([{ name: "Test Student", email: "test@gmail.com", password: "123", role: "student" }]);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};