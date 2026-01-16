// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   Video,
//   Layers,
//   LogOut,
//   GraduationCap,
//   UserCheck,
// } from "lucide-react";
// import { getAdminProfile } from "../../../services/adminService";

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={19} /> },
//     { name: "Students", path: "/admin/students", icon: <Users size={19} /> },
//     { name: "Attendance", path: "/admin/attendance", icon: <UserCheck size={19} /> },
//     { name: "Faculties", path: "/admin/faculties", icon: <GraduationCap size={19} /> },
//     { name: "Courses", path: "/admin/courses", icon: <BookOpen size={19} /> },
//     { name: "Lectures", path: "/admin/lectures", icon: <Video size={19} /> },
//     { name: "Batches", path: "/admin/batches", icon: <Layers size={19} /> },
//   ];

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const data = await getAdminProfile();
//         setAdmin(data.admin);
//       } catch (error) {
//         console.error("Unauthorized");
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAdmin();
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-blue-50">
//         <p className="text-blue-700 font-bold italic animate-pulse">Loading Admin Portal...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-slate-50">
      
//       {/* ========== SIDEBAR (Student Style) ========== */}
//       <aside className="w-64 bg-blue-600 text-white flex flex-col shadow-xl sticky top-0 h-screen">
        
//         {/* Logo Section */}
//         <div className="p-8 text-2xl font-black italic tracking-tighter">
//           HiLearn <span className="text-[10px] not-italic bg-white/20 px-2 py-0.5 rounded ml-1 uppercase">Admin</span>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 px-4 space-y-1">
//           {menu.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer transition-all duration-200 group ${
//                   isActive 
//                     ? "bg-white text-blue-600 shadow-lg font-bold" 
//                     : "hover:bg-blue-500/50 text-blue-100"
//                 }`
//               }
//             >
//               <span className="transition-transform group-hover:scale-110">
//                 {item.icon}
//               </span>
//               <span className="text-sm font-medium">{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>

//         {/* Logout Button at Bottom */}
//         <div className="p-4 border-t border-blue-500/50">
//           <button 
//             onClick={logout} 
//             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-700 hover:bg-red-500 transition-all duration-300"
//           >
//             <LogOut size={18} />
//             <span className="font-semibold text-sm">Sign Out</span>
//           </button>
//         </div>
//       </aside>

//       {/* ========== MAIN CONTENT AREA ========== */}
//       <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
//         {/* Top Header */}
//         <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
//             <h1 className="text-xl font-bold text-slate-700 tracking-tight">Administrator Portal</h1>
//           </div>

//           <div className="flex items-center gap-3">
//              <div className="text-right hidden sm:block">
//                 <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
//                 <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Super Admin</p>
//              </div>
//              <div className="w-10 h-10 bg-blue-100 border-2 border-blue-500 text-blue-600 rounded-xl flex items-center justify-center font-black shadow-sm">
//               {user?.name?.charAt(0)}
//              </div>
//           </div>
//         </header>

//         {/* Main Content Page */}
//         <main className="p-8">
//           <Outlet /> 
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;






import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  Layers,
  LogOut,
  GraduationCap,
  UserCheck, // Attendance ke liye functionality icon
} from "lucide-react";
import { getAdminProfile } from "../../../services/adminService";

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <Users size={20} />,
    },
    {
      name: "Attendance", // Naya menu item add kiya
      path: "/admin/attendance",
      icon: <UserCheck size={20} />,
    },
    {
      name: "Faculties",
      path: "/admin/faculties",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Courses",
      path: "/admin/courses",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Lectures",
      path: "/admin/lectures",
      icon: <Video size={20} />,
    },
    {
      name: "Batches",
      path: "/admin/batches",
      icon: <Layers size={20} />,
    },
    {
      name: "Subscriptions",
      path: "/admin/subscriptions",
      icon: <Layers size={20} />,
    },
  ];

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data.admin);
      } catch (error) {
        console.error("Unauthorized");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-blue-700 font-semibold text-lg">
          Loading Admin Panel...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ========== SIDEBAR ========== */}
      <aside className="w-72 bg-blue-200 from-slate-900 to-slate-800 text-white flex flex-col">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-wide text-blue-500">
            HiLearn <span className="text-blue-500">Admin</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Learning Management System
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 text-blue-600 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-600 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-slate-700">
          <button
            onClick={logout}
            className="flex items-center gap-4 w-full px-5 py-3 rounded-xl text-slate-300 bg-blue-600 hover:bg-gray-700 hover:text-white transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ========== MAIN AREA ========== */}
      <div className="flex-1 flex flex-col">

        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;