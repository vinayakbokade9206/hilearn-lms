const express = require("express");
const {
createLecture,
getLectures,
updateLecture,
deleteLecture,
} = require("../controllers/lectureController");


const router = express.Router();


router.post("/", createLecture);
router.get("/", getLectures);
router.put("/:id", updateLecture);
router.delete("/:id", deleteLecture);


module.exports = router;