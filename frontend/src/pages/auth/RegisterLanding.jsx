import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const RegisterLanding = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(data);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#D6D8F2] px-8 pt-16">
      <div className="max-w-6xl mx-auto min-h-[85vh] flex items-center">
        <div className="w-full bg-white rounded-3xl shadow-xl grid grid-cols-2 overflow-hidden">

          {/* LEFT – INFO SECTION */}
          <div className="flex flex-col justify-center bg-blue-700 text-white p-12">
            <h1 className="text-3xl font-bold mb-4">
              Start Your Learning Journey
            </h1>
            <p className="text-blue-100 leading-relaxed">
              Join our LMS platform to learn from expert mentors, track progress
              and build real-world skills.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li>✔ Industry-oriented courses</li>
              <li>✔ Mentor guidance</li>
              <li>✔ Certificate & placements</li>
            </ul>
          </div>

          {/* RIGHT – REGISTER FORM */}
          <div className="p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Register to access the learning dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Register As
                </label>
                <select
                  name="role"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                Create Account
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500 text-center">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterLanding;
