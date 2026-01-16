const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { markBulkAttendance } = require("../controllers/attendanceController");

/**
 * POST /api/attendance/bulk
 * Admin attendance mark karne ke liye is route ka use karega
 */
router.post("/bulk", protect, markBulkAttendance);

module.exports = router;