const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcryptjs");

/* GET all faculties */
exports.getFaculties = async (req, res) => {
  const faculties = await User.find({ role: "mentor" });
  res.json(faculties);
};

/* ADD faculty */
exports.addFaculty = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Faculty already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const faculty = await User.create({
    name,
    email,
    password: hashed,
    mobile,
    role: "mentor",
  });

  res.status(201).json(faculty);
};

/* UPDATE faculty */
exports.updateFaculty = async (req, res) => {
  const faculty = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(faculty);
};

/* DELETE faculty */
exports.deleteFaculty = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Faculty deleted" });
};

/* ASSIGN faculty to course */
exports.assignFacultyToCourse = async (req, res) => {
  const { facultyId, courseId } = req.body;

  const course = await Course.findById(courseId);
  course.faculty = facultyId;
  await course.save();

  res.json({ message: "Faculty assigned to course" });
};


exports.toggleFacultyStatus = async (req, res) => {
  const faculty = await User.findById(req.params.id);

  faculty.isActive = !faculty.isActive;
  await faculty.save();

  res.json({ message: "Status updated", isActive: faculty.isActive });
};