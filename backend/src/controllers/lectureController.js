const Lecture = require("../models/Lecture");

/**
 * @desc Create a new lecture
 * POST /api/lectures
 */
exports.createLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(201).json({ success: true, lecture });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @desc Get all lectures (Sorting added for consistency)
 * GET /api/lectures
 */
exports.getLectures = async (req, res) => {
  try {
    // Populate course details if necessary
    const lectures = await Lecture.find().sort({ createdAt: -1 });
    
    // IMPORTANT: Sending structured response
    res.json({ 
      success: true, 
      count: lectures.length,
      lectures: lectures // Frontend yahan se 'lectures' array nikalega
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc Update lecture details
 */
exports.updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lecture) return res.status(404).json({ success: false, message: "Lecture not found" });
    res.json({ success: true, lecture });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @desc Delete a lecture
 */
exports.deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) return res.status(404).json({ success: false, message: "Lecture not found" });
    res.json({ success: true, message: "Lecture deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};