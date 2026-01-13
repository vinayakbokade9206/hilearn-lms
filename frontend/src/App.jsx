import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForogotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import LoginLanding from "./pages/auth/LoginLanding";
import RegisterLanding from "./pages/auth/RegisterLanding";
import VerifyOtp from "./pages/auth/VerifyOtp";

import StudentDashboard from "./pages/dashboard/StudentDashboard";
import MentorDashboard from "./pages/dashboard/MentorDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";

import AdminLayout from "./pages/dashboard/admin/AdminLayout";

// Admin Pages
import StudentList from "./pages/dashboard/admin/students/StudentList";
// import AddEditStudent from "./pages/dashboard/admin/students/AddEditStudent";

import CourseList from "./pages/dashboard/admin/courses/CourseList";
import AddEditCourses from "./pages/dashboard/admin/courses/AddEditCourse";

import LectureList from "./pages/dashboard/admin/lectures/LectureList";
import BatchList from "./pages/dashboard/admin/batches/BatchList";
import AddEditStudent from "./pages/dashboard/admin/students/AddEditStudent";
// import CourseList from "./pages/dashboard/admin/courses/CourseList";
import StudentDetails from "./pages/dashboard/admin/students/StudentDetails";

// New Material Management Pages
import LectureMaterialList from "./pages/dashboard/admin/materials/LectureMaterialList";
import FacultyList from "./pages/dashboard/admin/FacultyList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterLanding />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Dashboards */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/mentor" element={<MentorDashboard />} />

        {/* Admin Dashboard with Nested Routes */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentList />} />
            <Route path="students/add" element={<AddEditStudent />} />
            <Route path="students/edit/:id" element={<AddEditStudent />} />
            <Route path="/admin/students/:id" element={<StudentDetails />} />
            <Route path="faculties" element={<FacultyList />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="lectures" element={<LectureList />} />
            <Route path="batches" element={<BatchList />} />
          <Route path="students" element={<StudentList />} />

          {/* Student Management */}
          <Route path="students" element={<StudentList />} />
          {/* <Route path="students/add" element={<AddEditStudent />} /> */}
          <Route path="students/edit/:id" element={<AddEditStudent />} />

          {/* Course Management */}
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/add" element={<AddEditCourses />} />
          <Route path="courses/edit/:id" element={<AddEditCourses />} />

          {/* Lecture Management */}
          <Route path="lectures" element={<LectureList />} />

          {/* Batch Management */}
          <Route path="batches" element={<BatchList />} />

          {/* Lecture Material Management */}
          <Route path="materials" element={<LectureMaterialList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
