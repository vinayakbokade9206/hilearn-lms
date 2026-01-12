const Material = require("../models/Material");

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

exports.getMaterialsByLecture = async (req, res) => {
  const materials = await Material.find({ lecture: req.params.lectureId });
  res.json({ success: true, materials });
};
