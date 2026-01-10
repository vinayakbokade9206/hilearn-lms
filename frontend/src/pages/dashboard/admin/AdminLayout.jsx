import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  Layers,
  LogOut,
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
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <Users size={20} />,
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
  }, []);

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
                    : "text-bule-600 hover:bg-slate-700 hover:text-white"
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
