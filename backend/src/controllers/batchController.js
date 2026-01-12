const Batch = require("../models/Batch");

/* GET ALL BATCHES */
// exports.getBatches = async (req, res) => {
//   const batches = await Batch.find().populate("course", "title");
//   res.json(batches);
// };
exports.getBatches = async (req, res) => {
  const batches = await Batch.find()
    .populate("course", "title"); // 🔥 IMPORTANT

  res.json({
    success: true,
    data: batches,
  });
};

/* CREATE BATCH */
// exports.createBatch = async (req, res) => {
//   const batch = await Batch.create(req.body);
//   res.status(201).json(batch);
// };
exports.createBatch = async (req, res) => {
    console.log("Batch Model:", Batch);
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json(batch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create batch" });
  }
};

/* UPDATE BATCH */
exports.updateBatch = async (req, res) => {
  const { name, course } = req.body;

  const batch = await Batch.findByIdAndUpdate(
    req.params.id,
    { name, course },
    { new: true }
  );

  res.json({
    success: true,
    data: batch,
  });
};

/* DELETE BATCH */
exports.deleteBatch = async (req, res) => {
  await Batch.findByIdAndDelete(req.params.id);
  res.json({ message: "Batch deleted" });
};

/* TOGGLE STATUS */
// exports.toggleBatchStatus = async (req, res) => {
//   const batch = await Batch.findById(req.params.id);
//   batch.isActive = !batch.isActive;
//   await batch.save();

//   res.json({ isActive: batch.isActive });
// };

exports.toggleBatchStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 SAFETY CHECK
    if (!id) {
      return res.status(400).json({ message: "Batch ID is required" });
    }

    const batch = await Batch.findById(id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    batch.isActive = !batch.isActive;
    await batch.save();

    res.json({
      success: true,
      isActive: batch.isActive,
    });
  } catch (error) {
    console.error("Toggle Batch Error:", error);
    res.status(500).json({ message: "Failed to update batch status" });
  }
};

