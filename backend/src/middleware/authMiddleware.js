const jwt = require("jsonwebtoken");

/**
 * Protect middleware
 * Verifies JWT token from Authorization header
 * @route Middleware
 * @access Protected
 */
exports.protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token failed" });
  }
};
