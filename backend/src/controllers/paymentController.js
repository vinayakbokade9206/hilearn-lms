const Payment = require("../models/Payment");
const Course = require("../models/Course");
const User = require("../models/User");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

/**
 * @desc    Create payment order (before gateway)
 * @route   POST /api/payments/create-order
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, planId } = req.body;

    // Bina Razorpay ke hum khud ek dummy Order ID bhej rahe hain
    res.status(200).json({
      success: true,
      amount: amount, 
      orderId: "DUMMY_ORDER_" + Date.now(),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount paise mein (INR * 100)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    // Razorpay se real order generate karein
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      amount: order.amount,
      orderId: order.id, // Ye real order.id hai (e.g., order_K9sd82...)
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

/**
 * @desc    Payment success – save payment & enroll user
 * @route   POST /api/payments/success
 * @access  Private
 */
exports.paymentSuccess = async (req, res) => {
  try {
    const { courseId, paymentId, amount } = req.body;

    // 1️⃣ Save payment details
    const payment = await Payment.create({
      user: req.user._id,
      course: courseId,
      amount,
      paymentId: paymentId || "DUMMY_PAY_" + Date.now(),
      status: "success",
    });

    // 2️⃣ Enroll user to course
    const user = await User.findById(req.user._id);

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment successful & course enrolled",
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed" });
  }
};
