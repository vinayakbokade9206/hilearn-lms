import React, { useState, useEffect } from "react";
import axios from "axios";
import { Video, Users, Clock } from "lucide-react";

const MentorDashboard = () => {
  const [stats, setStats] = useState({ lectures: 0, students: 0 });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/mentor/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.stats);
      } catch (err) { console.error(err); }
    };
    fetchMentorData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Hello, {user?.name}! 👋</h2>
      <p className="text-slate-500 mb-8 font-medium">Mentor Dashboard Overview</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Video size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">My Lectures</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.lectures}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><Users size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Assigned Students</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.students}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-xl"><Clock size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Next Class</p>
            <h3 className="text-sm font-bold text-slate-800">10:30 AM Today</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;