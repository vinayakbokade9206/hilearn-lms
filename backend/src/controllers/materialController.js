const Material = require("../models/Material");

/**
 * Upload material for a lecture
 * @route POST /api/materials/upload
 * @access Protected
 */
exports.uploadMaterial = async (req, res) => {
  try {
    const { lectureId, type, title } = req.body;

    const material = await Material.create({
      lecture: lectureId,
      type,
      title,
      fileUrl: `/uploads/materials/${req.file.filename}`,
    });

    res.json({ success: true, material });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Get materials by lecture ID
 * @route GET /api/materials/:lectureId
 * @access Public / Protected (as per middleware)
 */
exports.getMaterialsByLecture = async (req, res) => {
  const materials = await Material.find({ lecture: req.params.lectureId });
  res.json({ success: true, materials });
};
