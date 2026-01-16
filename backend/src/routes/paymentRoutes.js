const express = require("express");
const { createOrder, paymentSuccess } = require("../controllers/paymentController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/success", protect, paymentSuccess);

module.exports = router;
