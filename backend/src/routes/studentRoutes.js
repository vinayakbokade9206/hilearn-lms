const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware.js");
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
  getStudentById,
} = require("../controllers/studentController.js");



router.get("/", protect, getStudents);
router.get("/:id", protect , getStudentById);
router.get("/students/:id", protect , getStudentDetails);
router.get("/students/:id/attendance", protect , getStudentAttendance);
router.get("/students/:id/quizzes", protect , getStudentQuizzes);
router.post("/", protect, addStudent);
router.put("/:id", protect, updateStudent);

router.patch("/:id/status", protect, toggleStudentStatus);
router.delete("/:id", protect, deleteStudent);
router.post("/seed", protect , seedStudents);

module.exports = router;
