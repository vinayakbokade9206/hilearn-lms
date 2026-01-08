// import React from "react";
// import LoginForm from "../../component/auth/LoginForm";

// const LoginPage = () => {
//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
//       {/* LEFT SIDE – BRAND / INFO */}
//       <div className="hidden md:flex flex-col justify-center px-12 bg-blue-600 text-white">
//         <h1 className="text-4xl font-bold mb-4">HiLearn LMS</h1>
//         <p className="text-lg text-blue-100">
//           Learn. Practice. Grow.  
//           A complete learning management system for students, mentors and admins.
//         </p>
//       </div>

//       {/* RIGHT SIDE – LOGIN FORM */}
//       <div className="flex items-center justify-center bg-slate-100">
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/authService";

// const LoginLanding = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await loginUser(data);

//       // save auth data
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user", JSON.stringify(res.user));

//       // role based redirect
//       const role = res.user.role;
//       if (role === "student") navigate("/student");
//       else if (role === "mentor") navigate("/mentor");
//       else if (role === "admin") navigate("/admin");
//     } catch (err) {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#D6D8F2] px-8 pt-16">
//       <div className="max-w-6xl mx-auto min-h-[85vh] flex items-center">
//         <div className="w-full bg-white rounded-3xl shadow-xl grid grid-cols-2 overflow-hidden">

//           {/* LEFT – INFO SECTION */}
//           <div className="flex flex-col justify-center bg-blue-700 text-white p-12">
//             <h1 className="text-3xl font-bold mb-4">
//               Welcome Back to HiLearn
//             </h1>
//             <p className="text-blue-100 leading-relaxed">
//               Login to access your dashboard, courses, mentors and learning
//               progress.
//             </p>

//             <ul className="mt-8 space-y-3 text-sm">
//               <li>✔ Track your learning progress</li>
//               <li>✔ Access expert mentors</li>
//               <li>✔ Manage courses & lectures</li>
//             </ul>
//           </div>

//           {/* RIGHT – LOGIN FORM */}
//           <div className="p-12">
//             <h2 className="text-2xl font-bold text-slate-800 mb-2">
//               Sign In
//             </h2>
//             <p className="text-sm text-slate-500 mb-6">
//               Login to continue to your dashboard
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
//                   required
//                 />
//               </div>

//               <div className="text-right">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-blue-600 font-medium hover:underline"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
//                 Login
//               </button>
//             </form>

//             <p className="mt-6 text-sm text-slate-500 text-center">
//               Don’t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Create Account
//               </Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginLanding;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const LoginLanding = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(data);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      const role = res.user.role;
      if (role === "student") navigate("/student");
      else if (role === "mentor") navigate("/mentor");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  /* ================= SOCIAL LOGIN ================= */
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/facebook";
  };

  return (
    <div className="min-h-screen bg-[#D6D8F2] px-8 pt-5">
      <div className="max-w-6xl mx-auto min-h-[85vh] flex items-center">
        <div className="w-full bg-white rounded-3xl shadow-xl grid grid-cols-2 overflow-hidden">

          {/* LEFT INFO */}
          <div className="flex flex-col justify-center bg-blue-700 text-white p-12">
            <h1 className="text-3xl font-bold mb-4">
              Welcome Back to HiLearn
            </h1>
            <p className="text-blue-100 leading-relaxed">
              Login to access your dashboard and learning journey.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li>✔ Role-based dashboards</li>
              <li>✔ Secure authentication</li>
              <li>✔ Social & email login</li>
            </ul>
          </div>

          {/* RIGHT LOGIN */}
          <div className="p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Sign In
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Login to continue
            </p>

            
            {/* EMAIL LOGIN */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                Login
              </button>
              {/* SOCIAL LOGIN */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500" />
                Continue with Google
              </button>

              <button
                onClick={handleGithubLogin}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50"
              >
                <FaGithub />
                Continue with GitHub
              </button>

              <button
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50"
              >
                <FaFacebook className="text-blue-600" />
                Continue with Facebook
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <hr className="flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <hr className="flex-1" />
            </div>

            </form>

            <p className="mt-6 text-sm text-slate-500 text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginLanding;

