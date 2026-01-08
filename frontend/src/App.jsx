import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForogotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import LoginLanding from "./pages/auth/LoginLanding";
import RegisterLanding from "./pages/auth/RegisterLanding";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import MentorDashboard from "./pages/dashboard/MentorDashboard";
import AdminDashboard from "./pages/dashboard/MentorDashboard";
import VerifyOtp from "./pages/auth/VerifyOtp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginLanding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterLanding />} />
        {/* <Route path="/register" element={<RegisterPage/>} /> */}
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Dashboard Routes (role-based) */}
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
