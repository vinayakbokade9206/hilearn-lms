const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  toggleBatchStatus,
} = require("../controllers/batchController");

router.get("/", protect, getBatches);
router.post("/", protect, createBatch);
router.put("/:id", protect, updateBatch);
router.delete("/:id", protect, deleteBatch);
router.patch("/:id/status", protect, toggleBatchStatus);

module.exports = router;
