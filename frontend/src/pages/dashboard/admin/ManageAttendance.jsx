import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, Users, AlertCircle, RefreshCw } from "lucide-react";

const ManageAttendance = () => {
  const [students, setStudents] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState("");
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchData = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [resStudents, resLectures] = await Promise.all([
        axios.get("http://localhost:5000/api/students", config),
        axios.get("http://localhost:5000/api/lectures", config)
      ]);

      setStudents(Array.isArray(resStudents.data) ? resStudents.data : resStudents.data.students || []);
      
      let finalLectures = [];
      if (resLectures.data.success && resLectures.data.lectures) {
        finalLectures = resLectures.data.lectures;
      } else if (Array.isArray(resLectures.data)) {
        finalLectures = resLectures.data;
      }
      setLectures(finalLectures);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Status ko exact lowercase mein set kar rahe hain
  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status.toLowerCase() }));
  };

  const saveAttendance = async () => {
    if (!selectedLecture) return alert("Pehle session select karein!");
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const attendanceData = students.map(s => ({
        studentId: s._id,
        // Yahan strictly lowercase "present" ya "absent" bhej rahe hain
        status: attendance[s._id] ? attendance[s._id].toLowerCase() : "absent"
      }));

      await axios.post("http://localhost:5000/api/attendance/bulk", {
        lectureId: selectedLecture,
        attendanceData: attendanceData
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      alert("Attendance saved successfully! ✅");
    } catch (err) {
      console.error("Save Error:", err.response?.data);
      alert(`Error: ${err.response?.data?.message || "Attendance save nahi ho saki."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Users className="text-sky-600" size={28} /> Manage Attendance
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Daily Records</p>
        </div>
        <div className="flex gap-3">
            <button onClick={fetchData} className="p-3 bg-slate-50 text-slate-400 hover:text-sky-600 rounded-2xl transition-all border border-slate-100">
                <RefreshCw size={20} className={fetching ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={saveAttendance} 
              disabled={loading || !selectedLecture || students.length === 0}
              className={`px-8 py-3 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                !selectedLecture ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-sky-600 text-white hover:bg-sky-700 shadow-xl shadow-sky-100"
              }`}
            >
              <Save size={18} /> {loading ? "Processing..." : "Submit Records"}
            </button>
        </div>
      </div>

      <div className="mb-8">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Select Active Session</label>
        <select 
          className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-sm text-slate-700"
          value={selectedLecture}
          onChange={(e) => setSelectedLecture(e.target.value)}
        >
          <option value="">-- Choose a Lecture --</option>
          {lectures.map((l) => (
            <option key={l._id} value={l._id}>{l.title}</option>
          ))}
        </select>
      </div>

      <div className={`space-y-4 ${!selectedLecture ? "opacity-20 pointer-events-none" : "opacity-100"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map(student => (
              <div key={student._id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-sky-200 transition-all shadow-sm">
                <span className="font-bold text-slate-800">{student.name}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(student._id, "present")}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${attendance[student._id] === "present" ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-400"}`}
                  >
                    PRESENT
                  </button>
                  <button 
                    onClick={() => handleStatusChange(student._id, "absent")}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${attendance[student._id] === "absent" ? "bg-red-500 text-white" : "bg-slate-50 text-slate-400"}`}
                  >
                    ABSENT
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageAttendance;