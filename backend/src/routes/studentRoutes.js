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






// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/authMiddleware.js");
// const {
//   getStudents,
//   addStudent,
//   updateStudent,
//   toggleStudentStatus,
//   deleteStudent,
//   getStudentDetails, // Ye View function hai
//   getStudentAttendance,
//   getStudentQuizzes,
//   seedStudents,
// } = require("../controllers/studentController.js");

// // Sabhi students fetch karna aur naya student add karna
// router.get("/", protect, getStudents);
// router.post("/", protect, addStudent);

// // Seed data (Optional)
// router.post("/seed", protect, seedStudents);

// // ID based routes - Student ki details, update aur delete
// // Note: router.get("/:id") hi getStudentDetails ko handle karega
// router.get("/:id", protect, getStudentDetails);
// router.put("/:id", protect, updateStudent);
// router.delete("/:id", protect, deleteStudent);

// // Status update (Active/Inactive)
// router.patch("/:id/status", protect, toggleStudentStatus);

// // Attendance aur Quizzes routes
// router.get("/:id/attendance", protect, getStudentAttendance);
// router.get("/:id/quizzes", protect, getStudentQuizzes);

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const { getMyAttendance } = require("../controllers/studentController");

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
//   getStudentDashboardData,
//   getAllLecturesForStudent
// } = require("../controllers/studentController.js");

// // Student View Routes (Step 2)
// router.get("/dashboard/stats", protect, getStudentDashboardData);
// router.get("/lectures", protect, getAllLecturesForStudent);

// // Admin Management Routes
// router.get("/", protect, getStudents);
// router.post("/", protect, addStudent);
// router.post("/seed", protect, seedStudents);
// router.get("/:id", protect, getStudentDetails);
// router.put("/:id", protect, updateStudent);
// router.delete("/:id", protect, deleteStudent);
// router.patch("/:id/status", protect, toggleStudentStatus);
// router.get("/:id/attendance", protect, getStudentAttendance);
// router.get("/:id/quizzes", protect, getStudentQuizzes);
// router.get("/my-attendance", protect, getMyAttendance);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Sabhi functions ko ek hi object se destructure karein
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
  getMyAttendance // Isse dhyan se add karein
} = require("../controllers/studentController.js");

// --- STUDENT VIEW ROUTES (Logged-in Student) ---
router.get("/dashboard", protect, getStudentDashboardData); // Dashboard stats
router.get("/my-attendance", protect, getMyAttendance);    // Student's own attendance
router.get("/lectures", protect, getAllLecturesForStudent);  // Lecture list

// --- ADMIN MANAGEMENT ROUTES (Admin usage) ---
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