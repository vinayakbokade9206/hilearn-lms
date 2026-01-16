import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, BookOpen, Video, Layers } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    lectures: 0,
    batches: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-blue-600 font-bold">Updating Dashboard...</div>;
  }

  const cards = [
    { label: "Total Students", value: stats.students, icon: <Users size={20} />, color: "text-blue-600" },
    { label: "Courses", value: stats.courses, icon: <BookOpen size={20} />, color: "text-emerald-600" },
    { label: "Lectures", value: stats.lectures, icon: <Video size={20} />, color: "text-purple-600" },
    { label: "Active Batches", value: stats.batches, icon: <Layers size={20} />, color: "text-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <h2 className={`text-3xl font-bold mt-2 ${card.color}`}>{card.value}</h2>
              </div>
              <div className={`p-3 rounded-xl bg-slate-50 ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Extra Section for Visuals */}
      <div className="mt-10 p-10 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Layers size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-700">System Analytics</h3>
        <p className="text-slate-500 text-sm max-w-xs">Detailed charts and activity logs will appear here as the system grows.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;