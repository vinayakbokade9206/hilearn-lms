import { User, BookOpen, ClipboardList, Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex bg-slate-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-black tracking-wide">
          HiLearn
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem icon={<BookOpen />} label="Dashboard" />
          <SidebarItem icon={<ClipboardList />} label="My Tasks" />
          <SidebarItem icon={<Calendar />} label="Exams" />
          <SidebarItem icon={<User />} label="Profile" />
        </nav>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="m-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-slate-800">
            Student Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-6 grid grid-cols-4 gap-6">

          <DashboardCard title="Tasks Completed" value={12} suffix=" / 20" color="bg-green-500" />
<DashboardCard title="Upcoming Exams" value={3} color="bg-orange-500" />
<DashboardCard title="Attendance" value={92} suffix="%" color="bg-blue-500" />
<DashboardCard title="Overall Progress" value={78} suffix="%" color="bg-purple-500" />
        </main>
      </div>
    </div>
  );
};

/* SIDEBAR ITEM */
const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

/* DASHBOARD CARD */
import useCountUp from "../../hooks/useCountUp";

const DashboardCard = ({ title, value = 0, suffix = "", color }) => {
  const animatedValue = useCountUp(value);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-2">
          {animatedValue}{suffix}
        </h2>
      </div>

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${color}`}>
        %
      </div>
    </div>
  );
};


export default StudentDashboard;