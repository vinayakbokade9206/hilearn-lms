const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getStudents,
  addStudent,
  updateStudent,
  toggleStudentStatus,
  deleteStudent,
  getStudentDetails,
  getStudentAttendance,
  getStudentQuizzes,
  seedStudents,
  getStudentDashboardData,
  getAllLecturesForStudent,
  getMyAttendance 
} = require("../controllers/studentController.js");


router.get("/dashboard", protect, getStudentDashboardData); 
router.get("/my-attendance", protect, getMyAttendance);    
router.get("/lectures", protect, getAllLecturesForStudent); 


router.get("/", protect, getStudents);
router.post("/", protect, addStudent);
router.post("/seed", protect, seedStudents);
router.get("/:id", protect, getStudentDetails);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);
router.patch("/:id/status", protect, toggleStudentStatus);
router.get("/:id/attendance", protect, getStudentAttendance);
router.get("/:id/quizzes", protect, getStudentQuizzes);

module.exports = router;