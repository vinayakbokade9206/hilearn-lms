// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";
// import ForgotPasswordPage from "./pages/auth/ForogotPasswordPage";
// import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
// import LoginLanding from "./pages/auth/LoginLanding";
// import RegisterLanding from "./pages/auth/RegisterLanding";
// import StudentDashboard from "./pages/dashboard/StudentDashboard";
// import MentorDashboard from "./pages/dashboard/MentorDashboard";
// import AdminDashboard from "./pages/dashboard/MentorDashboard";
// import VerifyOtp from "./pages/auth/VerifyOtp";
// import AdminLayout from "./pages/dashboard/admin/AdminLayout";
// import StudentList from "./pages/dashboard/admin/sudents/StudentList";
// import CourseList from "./pages/dashboard/admin/courses/CourseList";
// import LectureList from "./pages/dashboard/admin/lectures/LectureList";
// import BatchList from "./pages/dashboard/admin/batches/BatchList";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/" element={<LoginLanding />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterLanding />} />
//         {/* <Route path="/register" element={<RegisterPage/>} /> */}
//         {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

//         {/* Dashboard Routes (role-based) */}
//         <Route path="/student" element={<StudentDashboard/>} />
//         <Route path="/mentor" element={<MentorDashboard />} />
//         <Route path="/admin" element={<AdminLayout />}>
//             <Route path="students" element={<StudentList />} />
//             <Route path="courses" element={<CourseList />} />
//             <Route path="lectures" element={<LectureList />} />
//             <Route path="batches" element={<BatchList />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForogotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import LoginLanding from "./pages/auth/LoginLanding";
import RegisterLanding from "./pages/auth/RegisterLanding";
import VerifyOtp from "./pages/auth/VerifyOtp";

import StudentDashboard from "./pages/dashboard/StudentDashboard";
import MentorDashboard from "./pages/dashboard/MentorDashboard";

import AdminLayout from "./pages/dashboard/admin/AdminLayout";

// Admin Pages
import StudentList from "./pages/dashboard/admin/courses/CourseList";
import AddEditCourses from "./pages/dashboard/admin/courses/AddEditCourse";
import LectureList from "./pages/dashboard/admin/lectures/LectureList";
import BatchList from "./pages/dashboard/admin/batches/BatchList";
<<<<<<< HEAD
import AddEditStudent from "./pages/dashboard/admin/sudents/AddEditStudent";
=======
import CourseList from "./pages/dashboard/admin/courses/CourseList";
>>>>>>> feature/admin-courses

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
<<<<<<< HEAD
            <Route path="students" element={<StudentList />} />
            <Route path="students/add" element={<AddEditStudent />} />
            <Route path="students/edit/:id" element={<AddEditStudent />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="lectures" element={<LectureList />} />
            <Route path="batches" element={<BatchList />} />
=======
          <Route path="students" element={<StudentList />} />
          {/* <Route path="courses" element={<AddEditCourses />} /> */}
          <Route path="courses" element={<CourseList />} />
          <Route path="lectures" element={<LectureList />} />
          <Route path="batches" element={<BatchList />} />
>>>>>>> feature/admin-courses
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
