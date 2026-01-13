// const express = require("express");
// const router = express.Router();

// const {protect} = require("../middleware/authMiddleware.js");
// const {
//   getStudents,
//   addStudent,
//   updateStudent,
//   toggleStudentStatus,
//   deleteStudent,
//   getStudentDetails,
//   getStudentAttendance,
//   getStudentQuizzes,
//   seedStudents,
//   getStudentById,
// } = require("../controllers/studentController.js");



// router.get("/", protect, getStudents);
// router.get("/:id", protect , getStudentById);
// // router.get("/students/:id", protect , getStudentDetails);
// router.get("/:id", protect , getStudentDetails);
// router.get("/students/:id/attendance", protect , getStudentAttendance);
// router.get("/students/:id/quizzes", protect , getStudentQuizzes);
// router.post("/", protect, addStudent);
// router.put("/:id", protect, updateStudent);

// router.patch("/:id/status", protect, toggleStudentStatus);
// router.delete("/:id", protect, deleteStudent);
// router.post("/seed", protect , seedStudents);

// module.exports = router;






const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.js");
const {
  getStudents,
  addStudent,
  updateStudent,
  toggleStudentStatus,
  deleteStudent,
  getStudentDetails, // Ye View function hai
  getStudentAttendance,
  getStudentQuizzes,
  seedStudents,
} = require("../controllers/studentController.js");

// Sabhi students fetch karna aur naya student add karna
router.get("/", protect, getStudents);
router.post("/", protect, addStudent);

// Seed data (Optional)
router.post("/seed", protect, seedStudents);

// ID based routes - Student ki details, update aur delete
// Note: router.get("/:id") hi getStudentDetails ko handle karega
router.get("/:id", protect, getStudentDetails);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

// Status update (Active/Inactive)
router.patch("/:id/status", protect, toggleStudentStatus);

// Attendance aur Quizzes routes
router.get("/:id/attendance", protect, getStudentAttendance);
router.get("/:id/quizzes", protect, getStudentQuizzes);

module.exports = router;