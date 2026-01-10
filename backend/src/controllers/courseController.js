// const Course = require("../models/Course");

// // Create a new course
// exports.createCourse = async (req, res) => {
//   try {
//     const course = await Course.create(req.body);
//     res.status(201).json({ success: true, course });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // Get all courses
// exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.status(200).json({ success: true, courses });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Get a single course
// exports.getCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ success: false, message: "Course not found" });
//     res.status(200).json({ success: true, course });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update a course
// exports.updateCourse = async (req, res) => {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!course) return res.status(404).json({ success: false, message: "Course not found" });
//     res.status(200).json({ success: true, course });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete a course
// exports.deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) return res.status(404).json({ success: false, message: "Course not found" });
//     res.status(200).json({ success: true, message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

const Course = require("../models/Course");

// 1. Create Course
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, course });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 2. Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    console.log("Database se mila data:", courses); // 👈 Ye terminal mein check karein
    
    res.status(200).json({
      success: true,
      count: courses.length, // 👈 Ye add karein check karne ke liye
      courses: courses
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get Single Course
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 4. Update Course
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 5. Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};