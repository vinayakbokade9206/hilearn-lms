const Batch = require("../models/Batch");

/**
 * Get all batches
 * @route GET /api/batches
 * @access Public / Protected (as per middleware)
 */
exports.getBatches = async (req, res) => {
  const batches = await Batch.find()
    .populate("course", "title"); //  IMPORTANT

  res.json({
    success: true,
    data: batches,
  });
};

/**
 * Create a new batch
 * @route POST /api/batches
 * @access Protected
 */
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

/**
 * Update batch details
 * @route PUT /api/batches/:id
 * @access Protected
 */
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

/**
 * Delete a batch
 * @route DELETE /api/batches/:id
 * @access Protected
 */
exports.deleteBatch = async (req, res) => {
  await Batch.findByIdAndDelete(req.params.id);
  res.json({ message: "Batch deleted" });
};

/**
 * Toggle batch active/inactive status
 * @route PATCH /api/batches/:id/toggle-status
 * @access Protected
 */
exports.toggleBatchStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // SAFETY CHECK
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

