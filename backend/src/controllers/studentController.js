
const User = require("../models/User");

/* GET all students */
exports.getStudents = async (req, res) => {
  const students = await User.find().sort({ createdAt: -1 });
  res.json(students);
};

/* ADD student */
// exports.addStudent = async (req, res) => {
//   const { name, email, mobile } = req.body;

//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ message: "Student already exists" });

//   const student = await User.create({ name, email, mobile });
//   res.status(201).json(student);
// };

exports.addStudent = async (req, res) => {
  const { name, email, mobile } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Student already exists" });
  }

  const student = await User.create({
    name,
    email,
    mobile,
    role: "student",
    isActive: true,
  });

  res.status(201).json(student);
};

/* UPDATE student */
exports.updateStudent = async (req, res) => {
  const student = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(student);
};

exports.toggleStudentStatus = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.isActive = !student.isActive;
    await student.save();

    res.json({
      message: "Status updated successfully",
      isActive: student.isActive,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete student" });
  }
};