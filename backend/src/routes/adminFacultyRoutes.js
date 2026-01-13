const express = require("express");
const controller = require("../controllers/adminFacultyController");

const router = express.Router();

router.get("/faculties", controller.getFaculties);
router.post("/faculties", controller.addFaculty);
router.put("/faculties/:id", controller.updateFaculty);
router.patch("/faculties/:id/status", controller.toggleFacultyStatus);
router.delete("/faculties/:id", controller.deleteFaculty);
router.post("/faculties/assign-course", controller.assignFacultyToCourse);

module.exports = router;
