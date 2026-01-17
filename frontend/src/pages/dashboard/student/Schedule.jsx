import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, Video, Loader2, VideoOff } from "lucide-react";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/lectures");
        
        // --- LOGIC: Sirf 'live' lectures aur future dates ko filter karein ---
        const allLectures = res.data.lectures || [];
        const today = new Date().setHours(0, 0, 0, 0);

        const liveOnly = allLectures.filter((l) => {
          const lectureDate = new Date(l.date).setHours(0, 0, 0, 0);
          // Type 'live' hona chahiye aur date aaj ya aane wali honi chahiye
          return l.lectureType === "live" && lectureDate >= today;
        });

        const sorted = liveOnly.sort((a, b) => new Date(a.date) - new Date(b.date));
        setSchedules(sorted);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="animate-spin text-blue-600 mb-2" size={30} />
      <p className="text-slate-400 font-bold text-sm">Loading your schedule...</p>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-blue-900 tracking-tight">Lecture Schedule</h2>
        <p className="text-blue-500/70 text-sm font-medium">Upcoming live sessions and meetings</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em]">Date</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em]">Topic</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-center">Time</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black tracking-[0.2em] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {schedules.length > 0 ? (
              schedules.map((lecture) => (
                <tr key={lecture._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-sm">
                        {new Date(lecture.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        {new Date(lecture.date).toLocaleDateString('en-GB', { weekday: 'short' })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-800 capitalize tracking-tight">{lecture.title}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black">
                      <Clock size={12}/> {lecture.startTime || "TBA"}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {lecture.meetingLink ? (
                      <button 
                        onClick={() => window.open(lecture.meetingLink, "_blank")}
                        className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center gap-2 ml-auto"
                      >
                        <Video size={14}/> Join Class
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 italic uppercase">TBA</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-20">
                    <VideoOff size={40} />
                    <p className="font-black text-sm uppercase tracking-widest text-slate-900">No sessions scheduled</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;