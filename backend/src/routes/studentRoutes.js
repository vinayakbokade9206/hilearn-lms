const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware.js");
const {
  getStudents,
  addStudent,
  updateStudent,
  toggleStudentStatus,
  deleteStudent,
} = require("../controllers/studentController.js");



router.get("/", protect, getStudents);
router.post("/", protect, addStudent);
router.put("/:id", protect, updateStudent);

router.patch("/:id/status", protect, toggleStudentStatus);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
