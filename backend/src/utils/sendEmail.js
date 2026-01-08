// const crypto = require("crypto");

// // FORGOT PASSWORD
// exports.forgotPassword = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const resetToken = crypto.randomBytes(20).toString("hex");

//   user.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   await user.save();

//   res.json({
//     success: true,
//     resetToken, // frontend pe link banane ke liye
//   });
// };

// // RESET PASSWORD
// exports.resetPassword = async (req, res) => {
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) return res.status(400).json({ message: "Invalid token" });

//   user.password = await bcrypt.hash(req.body.password, 10);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   res.json({ success: true, message: "Password reset successful" });
// };



const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true only for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"HiLearn LMS" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;


