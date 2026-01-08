import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  LogOut,
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold">{count}</h2>
        </div>
        <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
          <Icon />
        </div>
      </div>
    </div>
  );
};

const MentorDashboard = () => {
  const mentor = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex bg-[#F5F7FB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-2xl font-extrabold text-blue-600 mb-8">
          Mentor Panel
        </h2>

        <nav className="space-y-4 text-gray-600">
          <p className="font-semibold text-blue-600">Dashboard</p>
          <p className="cursor-pointer hover:text-blue-600">My Students</p>
          <p className="cursor-pointer hover:text-blue-600">Create Exam</p>
          <p className="cursor-pointer hover:text-blue-600">Assignments</p>
          <p className="cursor-pointer hover:text-blue-600">Attendance</p>
          <p className="cursor-pointer hover:text-blue-600">Messages</p>
          <p className="cursor-pointer hover:text-blue-600">Settings</p>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, {mentor?.name || "Mentor"} 👋
          </h1>

          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="mentor"
              className="w-10 h-10 rounded-full"
            />
            <button className="flex items-center gap-2 text-red-500 font-semibold">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 grid grid-cols-4 gap-6">
          <StatCard title="Total Students" value={120} icon={Users} />
          <StatCard title="Active Courses" value={6} icon={BookOpen} />
          <StatCard title="Pending Assignments" value={14} icon={ClipboardList} />
          <StatCard title="Upcoming Exams" value={3} icon={CalendarCheck} />
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Recent Students</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {["Rahul", "Priya", "Aman"].map((name, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-3 font-medium">{name}</td>
                  <td>{name.toLowerCase()}@gmail.com</td>
                  <td className="text-green-500 font-semibold">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
