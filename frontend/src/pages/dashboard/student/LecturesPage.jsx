// import React, { useState } from "react";
// import { PlayCircle, Clock, Calendar, Download } from "lucide-react";

// /**
//  * @desc Shows all available lectures for the student in descending order.
//  */
// const LecturesPage = () => {
//   const [lectures] = useState([
//     { id: 1, title: "04. Context API & State Management", date: "2026-01-16", duration: "55m", instructor: "Mentor A" },
//     { id: 2, title: "03. React Router & Navigation", date: "2026-01-14", duration: "45m", instructor: "Mentor B" },
//     { id: 3, title: "02. Styling with Tailwind CSS", date: "2026-01-12", duration: "1h 10m", instructor: "Mentor A" },
//     { id: 4, title: "01. Introduction to LMS Project", date: "2026-01-10", duration: "30m", instructor: "Admin" },
//   ]);

//   return (
//     <div className="animate-in slide-in-from-bottom-4 duration-500">
//       <div className="mb-6 flex justify-between items-end">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800">Available Lectures</h2>
//           <p className="text-slate-500 text-sm">Watch and learn from your course sessions.</p>
//         </div>
//         <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
//           TOTAL: {lectures.length} SESSIONS
//         </span>
//       </div>

//       <div className="grid gap-4">
//         {lectures.map((lecture) => (
//           <div key={lecture.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-sky-300 transition-all group flex items-center justify-between">
//             <div className="flex items-center gap-5">
//               <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all">
//                 <PlayCircle size={28} />
//               </div>
//               <div>
//                 <h3 className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors">{lecture.title}</h3>
//                 <div className="flex gap-4 mt-1">
//                   <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium italic">
//                     <Calendar size={12} /> {lecture.date}
//                   </span>
//                   <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium italic">
//                     <Clock size={12} /> {lecture.duration}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-2">
//                <button className="p-2 text-slate-400 hover:text-sky-600 transition-colors">
//                   <Download size={18} />
//                </button>
//                <button className="px-6 py-2.5 bg-sky-600 text-white text-xs font-black rounded-xl hover:bg-sky-700 shadow-md shadow-sky-100 transition-all">
//                  WATCH NOW
//                </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LecturesPage;


// import React, { useState, useEffect } from "react";
// import { Video, Download, PlayCircle, Search, Calendar } from "lucide-react";
// import axios from "axios";

// const LecturesPage = () => {
//   const [lectures, setLectures] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLectures = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/students/lectures", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         // Sorting Newest First (Descending)
//         const sorted = (res.data.lectures || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setLectures(sorted);
//       } catch (err) { console.error("Error", err); }
//       finally { setLoading(false); }
//     };
//     fetchLectures();
//   }, []);

//   const filtered = lectures.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row justify-between gap-6">
//         <div>
//           <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2"><Video className="text-blue-600" /> My Lectures</h2>
//           <p className="text-slate-500 text-sm italic">Newest lectures appear at the top.</p>
//         </div>
//         <div className="relative w-full md:w-80">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input type="text" placeholder="Search title..." className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filtered.map((lecture) => (
//           <div key={lecture._id} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
//             <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
//               <PlayCircle className="text-white opacity-50 group-hover:opacity-100 transition-opacity" size={48} />
//               <span className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter">New Recording</span>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <Calendar size={14} className="text-blue-500" />
//                 <span className="text-[10px] font-black text-slate-400 uppercase">{new Date(lecture.createdAt).toLocaleDateString()}</span>
//               </div>
//               <h3 className="text-lg font-bold text-slate-800 mb-4 line-clamp-1">{lecture.title}</h3>
//               <div className="flex gap-2 pt-4 border-t border-slate-50">
//                 <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-black uppercase hover:bg-blue-700 transition-colors">Watch Now</button>
//                 <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600"><Download size={18}/></button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LecturesPage;

import React, { useEffect, useState } from "react";
import { PlayCircle, Download, Search, Calendar, Video } from "lucide-react";
import axios from "axios";

/**
 * @desc Student Lectures Page with Watch Now Modal
 */
const LecturesPage = () => {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState("");

  // 🔹 Fetch lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students/lectures", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Sorting Newest First (Descending)
        // const sorted = (res.data.lectures || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // setLectures(sorted);
        const allLectures = res.data.lectures || [];

        // --- FIXED LOGIC: Strict Filtering & Sorting ---
        // 1. Sirf 'video' type wale lectures filter karein (Live meetings hide ho jayengi)
        // 2. Newest first (Descending order) sort karein
        const videoOnly = allLectures
          .filter(l => l.lectureType === 'video')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setLectures(videoOnly);
      } catch (err) { console.error("Error", err); }
      finally { setLoading(false); }
        
    };

    fetchLectures();
  }, []);

  // 🔹 YouTube ID extractor
  const getYouTubeId = (url) => {
    if (!url) return null;
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1];
    return null;
  };

  // 🔹 Watch handler
  const handleWatchNow = (videoUrl) => {
    console.log("WATCH NOW CLICKED:", videoUrl);

    const id = getYouTubeId(videoUrl);
    if (!id) {
      alert("Invalid or missing video URL");
      return;
    }

    setSelectedVideo(`https://www.youtube.com/embed/${id}?autoplay=1`);
  };

  const filteredLectures = lectures.filter((l) =>
    l.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-slate-400">Loading lectures...</p>;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Video className="text-blue-600" /> My Lectures
          </h2>
          <p className="text-slate-500 text-sm italic">
            Newest lectures appear at the top.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search lecture..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 focus:border-blue-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* LECTURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLectures.map((lecture) => (
          <div
            key={lecture._id}
            className="bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-xl transition-all group"
          >
            {/* THUMBNAIL */}
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
              <PlayCircle
                className="text-white opacity-50 group-hover:opacity-100 transition-opacity"
                size={48}
              />
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase">
                New Recording
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={14} className="text-blue-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  {new Date(lecture.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4 line-clamp-1">
                {lecture.title || "Untitled Lecture"}
              </h3>

              <div className="flex gap-2 pt-4 border-t border-slate-50">
                <button
                  onClick={() => handleWatchNow(lecture.videoUrl)}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-black uppercase hover:bg-blue-700 transition-colors"
                >
                  Watch Now
                </button>

                <button
                onClick={() =>
                  setOpenMaterials(
                    openMaterials === lecture._id ? null : lecture._id
                  )
                }
                className="p-2 bg-slate-100 rounded-lg"
              >
                <Download size={18} />
              </button>

              </div>
              
            </div>
          </div>
        ))}
      </div>


        
      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedVideo("")}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo("")}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>

            <iframe
              src={selectedVideo}
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Lecture Video"
            />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default LecturesPage;
