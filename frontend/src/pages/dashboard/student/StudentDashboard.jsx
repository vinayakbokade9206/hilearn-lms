// import { User, BookOpen, ClipboardList, Calendar, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="min-h-screen flex bg-slate-100">
      
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-blue-700 text-white flex flex-col">
//         <div className="p-6 text-2xl font-black tracking-wide">
//           HiLearn
//         </div>

//         <nav className="flex-1 px-4 space-y-2">
//           <SidebarItem icon={<BookOpen />} label="Dashboard" />
//           <SidebarItem icon={<ClipboardList />} label="My Tasks" />
//           <SidebarItem icon={<Calendar />} label="Exams" />
//           <SidebarItem icon={<User />} label="Profile" />
//         </nav>

//         <button
//           onClick={() => {
//             localStorage.clear();
//             navigate("/");
//           }}
//           className="m-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </aside>

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* TOP NAVBAR */}
//         <header className="h-16 bg-white shadow flex items-center justify-between px-6">
//           <h1 className="text-xl font-bold text-slate-800">
//             Student Dashboard
//           </h1>

//           <div className="flex items-center gap-3">
//             <div className="text-right">
//               <p className="text-sm font-semibold">{user?.name}</p>
//               <p className="text-xs text-slate-500">{user?.email}</p>
//             </div>
//             <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
//               {user?.name?.charAt(0)}
//             </div>
//           </div>
//         </header>

//         {/* DASHBOARD CONTENT */}
//         <main className="p-6 grid grid-cols-4 gap-6">

//           <DashboardCard title="Tasks Completed" value={12} suffix=" / 20" color="bg-green-500" />
// <DashboardCard title="Upcoming Exams" value={3} color="bg-orange-500" />
// <DashboardCard title="Attendance" value={92} suffix="%" color="bg-blue-500" />
// <DashboardCard title="Overall Progress" value={78} suffix="%" color="bg-purple-500" />
//         </main>
//       </div>
//     </div>
//   );
// };

// /* SIDEBAR ITEM */
// const SidebarItem = ({ icon, label }) => (
//   <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 cursor-pointer">
//     {icon}
//     <span>{label}</span>
//   </div>
// );

// /* DASHBOARD CARD */
// import useCountUp from "../../hooks/useCountUp";

// const DashboardCard = ({ title, value = 0, suffix = "", color }) => {
//   const animatedValue = useCountUp(value);

//   return (
//     <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
//       <div>
//         <p className="text-slate-500 text-sm">{title}</p>
//         <h2 className="text-3xl font-bold mt-2">
//           {animatedValue}{suffix}
//         </h2>
//       </div>

//       <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${color}`}>
//         %
//       </div>
//     </div>
//   );
// };


// export default StudentDashboard;


import React, { useState, useEffect } from "react";
import { BookOpen, Video, Clock, TrendingUp } from "lucide-react";
import axios from "axios";

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourse: "Full Stack Web Development",
    progress: 0,
    totalLectures: 0,
    attendanceRate: 0
  });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-white border border-slate-100 rounded-[32px] p-10 shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            Welcome back, {user?.name}! <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium max-w-md">
            You have completed <span className="text-blue-600 font-bold">{stats.progress}%</span> of your course. Keep it up!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-8 uppercase">Current Course</h3>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><BookOpen size={28} /></div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">{stats.enrolledCourse}</h4>
              <p className="text-sm text-slate-400 font-medium">Batch: Professional (B1)</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-500">Course Completion</span>
              <span className="text-2xl font-black text-blue-600">{stats.progress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-4 rounded-full"><div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.progress}%` }}></div></div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <StatCard icon={<Video size={24}/>} label="Total Lectures" value={stats.totalLectures} color="bg-emerald-50 text-emerald-600" />
          <StatCard icon={<Clock size={24}/>} label="Attendance Rate" value={`${stats.attendanceRate}%`} color="bg-amber-50 text-amber-600" />
          <div className="bg-slate-900 p-7 rounded-[32px] text-white relative overflow-hidden">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
             <h3 className="text-2xl font-black">#12</h3>
             <TrendingUp className="text-slate-700 absolute -right-2 -bottom-2" size={80} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase">{label}</p>
      <h3 className="text-2xl font-black text-slate-800">{value}</h3>
    </div>
  </div>
);

export default StudentDashboard;