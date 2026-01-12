const Material = require("../models/Material");

/**
 * Add material to lecture
 */
exports.createMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.json({ success: true, material });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Get materials of a lecture
 */
exports.getLectureMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ lecture: req.params.lectureId });
    res.json({ success: true, materials });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Delete material
 */
exports.deleteMaterial = async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
