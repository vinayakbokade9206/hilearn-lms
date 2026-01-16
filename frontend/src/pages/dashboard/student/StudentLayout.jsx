import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// Trophy aur User icons add kiye hain navigation ke liye
import { User, BookOpen, ClipboardList, Calendar, LogOut, PlayCircle, Trophy } from "lucide-react";

/**
 * @desc Shared Layout for all Student Pages. Controls the Sidebar and Navbar.
 */
const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* FIXED SIDEBAR - Appears only once */}
      <aside className="w-64 bg-sky-600 text-white flex flex-col shadow-xl sticky top-0 h-screen">
        <div className="p-8 text-2xl font-black italic tracking-tighter">
          HiLearn
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarNavItem 
            icon={<BookOpen size={19} />} 
            label="Dashboard" 
            active={location.pathname.includes("dashboard")}
            onClick={() => navigate("/student/dashboard")} 
          />
          <SidebarNavItem 
            icon={<PlayCircle size={19} />} 
            label="My Lectures" 
            active={location.pathname.includes("lectures")}
            onClick={() => navigate("/student/lectures")} 
          />
          <SidebarNavItem 
            icon={<ClipboardList size={19} />} 
            label="Attendance" 
            active={location.pathname.includes("attendance")}
            onClick={() => navigate("/student/attendance")} 
          />
          {/* NAYA: Quizzes Section */}
          <SidebarNavItem 
            icon={<Trophy size={19} />} 
            label="My Quizzes" 
            active={location.pathname.includes("quizzes")}
            onClick={() => navigate("/student/quizzes")} 
          />
          <SidebarNavItem 
            icon={<Calendar size={19} />} 
            label="Schedule" 
            active={location.pathname.includes("schedule")}
          />
          {/* NAYA: Profile Section */}
          <SidebarNavItem 
            icon={<User size={19} />} 
            label="My Profile" 
            active={location.pathname.includes("profile")}
            onClick={() => navigate("/student/profile")} 
          />
        </nav>

        {/* Logout at bottom */}
        <div className="p-4 border-t border-sky-500/50">
          <button 
            onClick={() => { localStorage.clear(); navigate("/"); }} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-700 hover:bg-red-500 transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="font-semibold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* HEADER - Single instance */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-sky-500 rounded-full"></div>
            <h1 className="text-xl font-bold text-slate-700 tracking-tight">Student Portal</h1>
          </div>

          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded-xl transition-all"
            onClick={() => navigate("/student/profile")}
          >
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
                <p className="text-[10px] text-sky-600 font-bold uppercase tracking-widest mt-1">Active Member</p>
             </div>
             <div className="w-10 h-10 bg-sky-100 border-2 border-sky-500 text-sky-600 rounded-xl flex items-center justify-center font-black shadow-sm">
              {user?.name?.charAt(0)}
             </div>
          </div>
        </header>

        {/* MAIN AREA: Where Dashboard/Lectures/Attendance/Quizzes load */}
        <main className="p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

/**
 * @desc Individual Navigation Item with active state styling
 */
const SidebarNavItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer transition-all duration-200 group ${
      active ? "bg-white text-sky-600 shadow-lg font-bold" : "hover:bg-sky-500/50 text-sky-100"
    }`}
  >
    <span className={active ? "text-sky-600" : "group-hover:scale-110 transition-transform"}>
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default StudentLayout;