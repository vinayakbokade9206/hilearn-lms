const Lecture = require("../models/Lecture");

/**
 * Create a new lecture
 * @route POST /api/lectures
 * @access Protected
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
 * Get all lectures
 * @route GET /api/lectures
 * @access Public
 */
exports.getLectures = async (req, res) => {
try {
const lectures = await Lecture.find().populate("course", "title");
res.json({ success: true, lectures });
} catch (error) {
res.status(500).json({ success: false, error: error.message });
}
};

/**
 * Update lecture details
 * @route PUT /api/lectures/:id
 * @access Protected
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
 * Delete a lecture
 * @route DELETE /api/lectures/:id
 * @access Protected
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