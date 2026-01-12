const express = require("express");
const router = express.Router();

const {
  createMaterial,
  getLectureMaterials,
  deleteMaterial,
} = require("../controllers/materialController");

router.post("/", createMaterial);
router.get("/lecture/:lectureId", getLectureMaterials);
router.delete("/:id", deleteMaterial);

module.exports = router;
