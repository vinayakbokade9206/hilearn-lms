/**
 * @desc    Get logged-in admin profile
 * @route   GET /api/admin/profile
 * @access  Private (Admin)
 *
 * This controller returns the currently authenticated admin's profile
 * which is already attached to `req.user` by the auth middleware.
 */


const Student = require("../models/Student");
const Course = require("../models/Course");
const Batch = require("../models/Batch");
const Lecture = require("../models/Lecture");

// Dashboard stats fetch karne ke liye
exports.getDashboardStats = async (req, res) => {
  try {
    const [students, courses, batches, lectures] = await Promise.all([
      Student.countDocuments(),
      Course.countDocuments(),
      Batch.countDocuments(),
      Lecture.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      stats: { students, courses, batches, lectures }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Profile fetch karne ke liye (Aapka existing code)
exports.getAdminProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.user, 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
