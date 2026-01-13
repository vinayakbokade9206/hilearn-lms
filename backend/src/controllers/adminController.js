/**
 * @desc    Get logged-in admin profile
 * @route   GET /api/admin/profile
 * @access  Private (Admin)
 *
 * This controller returns the currently authenticated admin's profile
 * which is already attached to `req.user` by the auth middleware.
 */


exports.getAdminProfile = async (req, res) => {
  try {
     // Send admin details stored in req.user by auth middleware
    res.status(200).json({
      success: true,
      admin: req.user,  // Send admin details stored in req.user by auth middleware
    });
  } catch (error) {
     // Send admin details stored in req.user by auth middleware
    res.status(500).json({ message: "Server error" });
  }
};
