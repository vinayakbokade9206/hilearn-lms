import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForogotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import LoginLanding from "./pages/auth/LoginLanding";
import RegisterLanding from "./pages/auth/RegisterLanding";
import VerifyOtp from "./pages/auth/VerifyOtp";

import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import MentorDashboard from "./pages/dashboard/mentor/MentorDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";

import AdminLayout from "./pages/dashboard/admin/AdminLayout";
import StudentLayout from "./pages/dashboard/student/StudentLayout";
import MentorLayout from "./pages/dashboard/mentor/MentorLayout"; // Mentor Layout Import

import ProfilePage from "./pages/dashboard/student/ProfilePage";
import QuizzesPage from "./pages/dashboard/student/QuizzesPage";
import LeaderboardPage from "./pages/dashboard/student/LeaderboardPage";
import MyLectures from "./pages/dashboard/student/MyLectures";
import Schedule from "./pages/dashboard/student/Schedule";

// Admin Pages
import StudentList from "./pages/dashboard/admin/students/StudentList";
import CourseList from "./pages/dashboard/admin/courses/CourseList";
import AddEditCourses from "./pages/dashboard/admin/courses/AddEditCourse";
import LectureList from "./pages/dashboard/admin/lectures/LectureList";
import BatchList from "./pages/dashboard/admin/batches/BatchList";
import AddEditStudent from "./pages/dashboard/admin/students/AddEditStudent";
import StudentDetails from "./pages/dashboard/admin/students/StudentDetails";
import LectureMaterialList from "./pages/dashboard/admin/materials/LectureMaterialList";
import FacultyList from "./pages/dashboard/admin/FacultyList";
import Subscription from "./pages/dashboard/Subscription";
import AdminSubscriptionPlans from "./pages/dashboard/admin/AdminSubscriptionPlans";

// Naya Admin Page: Manage Attendance
import ManageAttendance from "./pages/dashboard/admin/ManageAttendance"; 

// Student Pages
import LecturesPage from "./pages/dashboard/student/LecturesPage";
import AttendancePage from "./pages/dashboard/student/AttendancePage";

/**
 * @desc Main Application component for routing and navigation
 */
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
        {/* SUBSCRIPTION PAGE */}
        <Route
          path="/subscribe"
          element={<Subscription />}
        />

        {/* --- STUDENT PANEL ROUTES --- */}
        <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="lectures" element={<LecturesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            {/* <Route path="my-lectures" element={<MyLectures />} /> */}
            <Route path="lectures" element={<MyLectures />} />
            <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* --- MENTOR PANEL ROUTES (NEW) --- */}
        <Route path="/mentor" element={<MentorLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<MentorDashboard />} />
            <Route path="attendance" element={<ManageAttendance />} />
            {/* Mentor ke lectures page ke liye aap naya component bana sakte hain ya purana reuse kar sakte hain */}
            <Route path="lectures" element={<LectureList />} /> 
        </Route>

        {/* --- ADMIN DASHBOARD ROUTES --- */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            
            <Route path="attendance" element={<ManageAttendance />} />

            {/* Admin - Student Management */}
            <Route path="students" element={<StudentList />} />
            <Route path="students/add" element={<AddEditStudent />} />
            <Route path="students/edit/:id" element={<AddEditStudent />} />
            <Route path="students/:id" element={<StudentDetails />} />
            
            {/* Admin - Resource Management */}
            <Route path="faculties" element={<FacultyList />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/add" element={<AddEditCourses />} />
            <Route path="courses/edit/:id" element={<AddEditCourses />} />
            <Route path="lectures" element={<LectureList />} />
            <Route path="batches" element={<BatchList />} />
          <Route path="students" element={<StudentList />} />
          <Route path="subscriptions" element={<AdminSubscriptionPlans />} />

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
            <Route path="materials" element={<LectureMaterialList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;