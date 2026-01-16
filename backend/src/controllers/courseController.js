const Course = require("../models/Course");

/**
 * Create a new course
 * @route POST /api/courses
 * @access Protected
 */
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, course });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

/**
 * Get all courses
 * @route GET /api/courses
 * @access Public
 */
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    // console.log("Database se mila data:", courses); 
    
    res.status(200).json({
      success: true,
      count: courses.length, 
      courses: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get a single course by ID
 * @route GET /api/courses/:id
 * @access Public
 */
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Update course details
 * @route PUT /api/courses/:id
 * @access Protected
 */
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Delete a course
 * @route DELETE /api/courses/:id
 * @access Protected
 */
exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};