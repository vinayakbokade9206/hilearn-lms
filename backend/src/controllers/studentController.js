
// const User = require("../models/User");
// const Student = require("../models/Student.js");
// const Attendance = require("../models/Attendance.js");
// const QuizResult = require("../models/QuizResult.js");
// const Course = require("../models/Course");
// /* GET all students */
// // exports.getStudents = async (req, res) => {
// //   const students = await User.find().sort({ createdAt: -1 });
// //   res.json(students);
// // };

// exports.getStudents = async (req, res) => {
//   try {
//     const students = await User.find({ role: "student" })
//       .select("-password") // Isse password nahi dikhega
//       .sort({ createdAt: -1 });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching students" });
//   }
// };

// /* ADD student */
// // exports.addStudent = async (req, res) => {
// //   const { name, email, mobile } = req.body;

// //   const exists = await User.findOne({ email });
// //   if (exists) return res.status(400).json({ message: "Student already exists" });

// //   const student = await User.create({ name, email, mobile });
// //   res.status(201).json(student);
// // };

// exports.addStudent = async (req, res) => {
//   const { name, email, mobile } = req.body;

//   const exists = await User.findOne({ email });
//   if (exists) {
//     return res.status(400).json({ message: "Student already exists" });
//   }

//   const student = await User.create({
//     name,
//     email,
//     mobile,
//     role: "student",
//     isActive: true,
//   });

//   res.status(201).json(student);
// };

// /* GET Student Details (View) - Yahan bhi password hide kiya */
// exports.getStudentDetails = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id).select("-password");
//     if (!student) return res.status(404).json({ message: "Not found" });
    
//     res.json({ success: true, student });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// /* GET Student By ID - Yahan bhi password hide kiya */
// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id).select("-password");
//     res.status(200).json({ success: true, student });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// /* UPDATE student */
// exports.updateStudent = async (req, res) => {
//   const student = await User.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.json(student);
// };

// exports.toggleStudentStatus = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     student.isActive = !student.isActive;
//     await student.save();

//     res.json({
//       message: "Status updated successfully",
//       isActive: student.isActive,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update status" });
//   }
// };

// exports.deleteStudent = async (req, res) => {
//   try {
//     const student = await User.findById(req.params.id);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     await student.deleteOne();

//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete student" });
//   }
// };

// /* 1️⃣ Student Basic Details */
// // exports.getStudentDetails = async (req, res) => {
// //   const student = await Student.findById(req.params.id)
// //     .populate("course", "title")
// //     .populate("batch", "name");

// //   res.json({ success: true, student });
// // };

// /* 2️⃣ Attendance Report */
// exports.getStudentAttendance = async (req, res) => {
//   const attendance = await Attendance.find({
//     student: req.params.id,
//   }).populate("lecture", "title");

//   const total = attendance.length;
//   const present = attendance.filter(
//     (a) => a.status === "present"
//   ).length;

//   res.json({
//     totalLectures: total,
//     attended: present,
//     attendance,
//   });
// };

// /* 3️⃣ Quiz Results */
// exports.getStudentQuizzes = async (req, res) => {
//   const quizzes = await QuizResult.find({
//     student: req.params.id,
//   });

//   res.json(quizzes);
// };



// exports.seedStudents = async (req, res) => {
//   try {
//     const course = await Course.findOne();
//     if (!course) {
//       return res.status(400).json({
//         success: false,
//         message: "No course found. Please add course first",
//       });
//     }

//     const students = [
//       {
//         name: "Rahul Sharma",
//         email: "rahul@gmail.com",
//         phone: "9876543210",
//         course: course._id,
//         isActive: true,
//       },
//       {
//         name: "Priya Patel",
//         email: "priya@gmail.com",
//         phone: "9123456780",
//         course: course._id,
//         isActive: true,
//       },
//       {
//         name: "Amit Verma",
//         email: "amit@gmail.com",
//         phone: "9000011111",
//         course: course._id,
//         isActive: false,
//       },
//     ];

//     await Student.insertMany(students);

//     res.status(201).json({
//       success: true,
//       message: "Sample students inserted successfully",
//       count: students.length,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// };

// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id)
//       .populate("course", "title");

//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       student,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// };




const User = require("../models/User");
const Student = require("../models/Student.js");
const Attendance = require("../models/Attendance.js");
const QuizResult = require("../models/QuizResult.js");
const Course = require("../models/Course");

/* GET all students - Password Hatane ke liye .select("-password") ka use kiya hai */
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password") // Isse password nahi dikhega
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

/* ADD student */
exports.addStudent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await User.create({
      name,
      email,
      mobile,
      password, // User model mein agar bcrypt setup hai toh hash ho jayega
      role: "student",
      isActive: true,
    });

    // Response bhejte waqt password delete kar rahe hain
    const studentObj = student.toObject();
    delete studentObj.password;

    res.status(201).json(studentObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET Student Details (View) - Yahan bhi password hide kiya */
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");
    if (!student) return res.status(404).json({ message: "Not found" });
    
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* GET Student By ID - Yahan bhi password hide kiya */
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ... Baaki ke functions (update, delete, toggle, reports) pehle wale hi rahenge
// Bas dhyaan rakhein ki update mein bhi password field ko carefuly handle karein.

exports.updateStudent = async (req, res) => {
  // Agar password update nahi karna toh body se delete kar dein
  if (!req.body.password) {
    delete req.body.password;
  }
  
  const student = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json(student);
};

// Toggle, Delete, Reports functions ko pehle ki tarah hi rehne dein.
exports.toggleStudentStatus = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    student.isActive = !student.isActive;
    await student.save();
    res.json({ message: "Status updated successfully", isActive: student.isActive });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student" });
  }
};

exports.getStudentAttendance = async (req, res) => {
  const attendance = await Attendance.find({ student: req.params.id }).populate("lecture", "title");
  res.json({ totalLectures: attendance.length, attendance });
};

exports.getStudentQuizzes = async (req, res) => {
  const quizzes = await QuizResult.find({ student: req.params.id });
  res.json(quizzes);
};

exports.seedStudents = async (req, res) => {
  try {
    const students = [
      { name: "Rahul Sharma", email: "rahul@gmail.com", mobile: "9876543210", password: "password123", role: "student" }
    ];
    await User.insertMany(students);
    res.status(201).json({ success: true, message: "Sample students inserted" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};