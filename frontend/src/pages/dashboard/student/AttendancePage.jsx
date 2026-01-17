

// import React, { useState, useEffect } from "react";
// import { CheckCircle, XCircle, Calendar, UserCheck } from "lucide-react";
// import axios from "axios";

// const AttendancePage = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         // API call to get logged-in student's attendance
//         const res = await axios.get("http://localhost:5000/api/attendance/my-attendance", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setAttendanceData(res.data.attendance || []);
//       } catch (err) {
//         console.error("Error fetching attendance");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAttendance();
//   }, []);

//   if (loading) return <div className="p-8 text-slate-500 font-bold">Loading Attendance Records...</div>;

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
//             <UserCheck className="text-blue-600" size={28} /> My Attendance
//           </h2>
//           <p className="text-slate-500 text-sm font-medium">Track your presence across all lectures.</p>
//         </div>
        
//         {/* Overall Percentage Badge */}
//         <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-100 flex items-center gap-3">
//           <span className="text-xs font-black uppercase tracking-widest opacity-80">Overall Score</span>
//           <span className="text-xl font-black">88%</span>
//         </div>
//       </div>

//       {/* Attendance List/Table */}
//       <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50 border-b border-slate-100">
//               <tr>
//                 <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lecture Details</th>
//                 <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
//                 <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {attendanceData.length > 0 ? (
//                 attendanceData.map((record, index) => (
//                   <tr key={index} className="hover:bg-slate-50/50 transition-colors">
//                     <td className="px-8 py-6">
//                       <div className="flex items-center gap-4">
//                         <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
//                           <Calendar size={18} />
//                         </div>
//                         <div>
//                           <p className="font-bold text-slate-800">{record.lectureId?.title || "Lecture Session"}</p>
//                           <p className="text-xs text-slate-400 font-medium">{record.lectureId?.batchId?.name || "Regular Batch"}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-8 py-6 text-center">
//                       <span className="text-sm font-bold text-slate-600">
//                         {new Date(record.createdAt).toLocaleDateString('en-GB')}
//                       </span>
//                     </td>
//                     <td className="px-8 py-6">
//                       <div className="flex justify-center">
//                         {record.status === "Present" ? (
//                           <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tight border border-emerald-100">
//                             <CheckCircle size={14} /> Present
//                           </span>
//                         ) : (
//                           <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-tight border border-red-100">
//                             <XCircle size={14} /> Absent
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="px-8 py-10 text-center text-slate-400 italic">
//                     No attendance records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendancePage;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";

// const AttendancePage = () => {
//   const [attendanceList, setAttendanceList] = useState([]);
//   const [stats, setStats] = useState({ totalPresent: 0, totalLectures: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/students/my-attendance", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         console.log("Attendance API Response:", res.data);

//         if (res.data.success) {
//           // Check karein ki data list kahan hai (res.data.attendance ya res.data)
//           const list = Array.isArray(res.data.attendance) ? res.data.attendance : [];
//           setAttendanceList(list);
//           setStats({
//             totalPresent: res.data.totalPresent || 0,
//             totalLectures: res.data.totalLectures || 0
//           });
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAttendance();
//   }, []);

//   // Attendance Percentage Calculate karein
//   const percentage = stats.totalLectures > 0 
//     ? Math.round((stats.totalPresent / stats.totalLectures) * 100) 
//     : 0;

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
//         <p className="text-slate-400 font-bold">Loading your records...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header Card */}
//       <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex justify-between items-center">
//         <h2 className="text-2xl font-black text-slate-800">My Attendance Report</h2>
//         <div className="text-right">
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Score</p>
//           <h3 className="text-4xl font-black text-blue-600">{percentage}%</h3>
//         </div>
//       </div>

//       {/* Attendance Table */}
//       <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50 border-b border-slate-100">
//               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lecture Name</th>
//               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
//               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {attendanceList.length > 0 ? (
//               attendanceList.map((record) => (
//                 <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
//                   <td className="px-8 py-6">
//                     <p className="font-bold text-slate-800">{record.lecture?.title || "Untitled Session"}</p>
//                   </td>
//                   <td className="px-8 py-6 text-center text-sm font-bold text-slate-500">
//                     {new Date(record.createdAt).toLocaleDateString('en-GB')}
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className="flex justify-center">
//                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 border ${
//                         record.status.toLowerCase() === "present" 
//                         ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
//                         : "bg-red-50 text-red-600 border-red-100"
//                       }`}>
//                         {record.status.toLowerCase() === "present" ? <CheckCircle size={14}/> : <XCircle size={14}/>}
//                         {record.status}
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="px-8 py-20 text-center">
//                    <p className="text-slate-400 font-bold">No attendance records found in database.</p>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendancePage;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const AttendancePage = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [stats, setStats] = useState({ totalPresent: 0, totalLectures: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students/my-attendance", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          const list = Array.isArray(res.data.attendance) ? res.data.attendance : [];
          
          // --- LOGIC CHANGE: Filter records where lecture still exists ---
          // Agar admin ne lecture delete kar diya hai, to record.lecture null hoga.
          // Hum sirf unhi records ko rakhenge jahan lecture object exist karta hai.
          const activeRecords = list.filter(record => record.lecture !== null && record.lecture !== undefined);
          
          setAttendanceList(activeRecords);

          // Stats ko bhi filter kiye huye records ke hisaab se update karein
          const presentCount = activeRecords.filter(r => r.status.toLowerCase() === "present").length;
          
          setStats({
            totalPresent: presentCount,
            totalLectures: activeRecords.length
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const percentage = stats.totalLectures > 0 
    ? Math.round((stats.totalPresent / stats.totalLectures) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
        <p className="text-slate-400 font-bold">Loading your records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800">My Attendance Report</h2>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Score</p>
          <h3 className="text-4xl font-black text-blue-600">{percentage}%</h3>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#3b82f6] text-white">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Lecture Name</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Date</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {attendanceList.length > 0 ? (
              attendanceList.map((record) => (
                <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-800">{record.lecture.title}</p>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-bold text-slate-500">
                    {new Date(record.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 border ${
                        record.status.toLowerCase() === "present" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-red-50 text-red-600 border-red-100"
                      }`}>
                        {record.status.toLowerCase() === "present" ? <CheckCircle size={14}/> : <XCircle size={14}/>}
                        {record.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-8 py-20 text-center">
                   <p className="text-slate-400 font-bold">No active attendance records found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;