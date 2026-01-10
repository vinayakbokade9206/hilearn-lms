const express = require("express");
const router = express.Router();


const {protect} = require("../middleware/authMiddleware.js");

const {getAdminProfile} = require("../controllers/adminController.js");

router.get("/profile", protect, getAdminProfile);

module.exports = router;

