exports.getAdminProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.user, // authMiddleware se aa raha
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
