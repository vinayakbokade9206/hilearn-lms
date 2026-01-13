const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Course = require("./models/Course"); // Ensure path is correct
const courseRoutes = require("./routes/courseRoutes");
const materialRoutes = require("./routes/materialRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// --- Database Auto-Seed Logic ---
const seedData = async () => {
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      const defaultCourses = [
        { title: "MERN Stack Web Development", description: "Master React, Node, Express and MongoDB.", price: "25000", duration: "6 Months", category: "Programming" },
        { title: "Graphic Designing", description: "Learn Photoshop, Illustrator and Canva.", price: "12000", duration: "3 Months", category: "Design" },
        { title: "Digital Marketing", description: "SEO, Social Media and Ads masterclass.", price: "15000", duration: "4 Months", category: "Marketing" }
      ];
      await Course.insertMany(defaultCourses);
      console.log("✅ Default courses seeded!");
    }
  } catch (err) { console.error("Seeding error:", err); }
};

mongoose.connection.once("open", seedData);
// --------------------------------

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes.js"));
app.use("/api/students", require("./routes/studentRoutes.js"));
app.use("/api/courses", courseRoutes);
app.use("/api/admin/batches", require("./routes/batchRoutes"));


app.use("/api/lectures", require("./routes/lectureRoutes.js"));
app.use("/api/materials", require("./routes/materialRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));



app.use("/api/admin", require("./routes/adminFacultyRoutes"));


app.use("/api/materials", materialRoutes);
app.use("/uploads", express.static("uploads"));


module.exports = app;