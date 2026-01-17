// import React, { useState, useEffect } from "react";
// import { Play, Download, X, AlertCircle } from "lucide-react";
// import axios from "axios";

// const MyLectures = () => {
//   const [lectures, setLectures] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     const fetchLectures = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/students/lectures", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (res.data.success) setLectures(res.data.lectures);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     };
//     fetchLectures();
//   }, []);

//   const formatVideoUrl = (url) => {
//     if (!url) return null;
//     let videoId = "";
//     try {
//       if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
//       else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1];
//       else if (url.includes("embed/")) return url;
//       else return null;
      
//       return `https://www.youtube.com/embed/${videoId}`; // Autoplay hata diya error fix karne ke liye
//     } catch (e) {
//       return null;
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-black text-slate-800">My Lectures</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {lectures.map((lecture) => (
//           <div key={lecture._id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden group">
//             <div 
//               className="aspect-video bg-slate-800 flex items-center justify-center relative cursor-pointer"
//               onClick={() => {
//                 const url = formatVideoUrl(lecture.videoUrl);
//                 if(url) setSelectedVideo(url);
//                 else alert("Video link is invalid or missing!");
//               }}
//             >
//               <Play className="text-white opacity-50 group-hover:opacity-100 transition-opacity" size={48} />
//             </div>

//             <div className="p-5 space-y-4">
//               <h3 className="font-bold text-lg text-slate-800">{lecture.title}</h3>
//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => {
//                     const url = formatVideoUrl(lecture.videoUrl);
//                     if(url) setSelectedVideo(url);
//                     else alert("Video link not found!");
//                   }}
//                   className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700"
//                 >
//                   WATCH NOW
//                 </button>

//                 {lecture.pdfUrl && (
//                   <a href={lecture.pdfUrl} target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-xl">
//                     <Download size={20} />
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedVideo && (
//         <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">
//           <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden">
//             <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded-full z-50">
//               <X size={20} />
//             </button>
//             <iframe
//               width="100%"
//               height="100%"
//               src={selectedVideo}
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyLectures;


// import React, { useState, useEffect } from "react";
// import { Play, Download, X } from "lucide-react";
// import axios from "axios";

// const MyLectures = () => {
//   const [lectures, setLectures] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     const fetchLectures = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/students/lectures", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (res.data.success) setLectures(res.data.lectures);
//       } catch (err) { console.error(err); }
//     };
//     fetchLectures();
//   }, []);

//   const getEmbedUrl = (url) => {
//     if (!url || url.trim() === "") return null;
//     let videoId = "";
//     if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
//     else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1];
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
//   };

//   const handleWatchNow = (url) => {
//     const embedUrl = getEmbedUrl(url);
//     if (embedUrl) {
//       setSelectedVideo(embedUrl);
//     } else {
//       // Agar ye alert aata hai, toh matlab Database mein link nahi hai
//       alert("Error: Is lecture ka Video Link database mein nahi mila! Admin se kahein ki link update karein.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-black mb-6">My Lectures</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {lectures.map((lecture) => (
//           <div key={lecture._id} className="bg-white rounded-3xl border p-5 shadow-sm">
//             <div className="aspect-video bg-slate-100 rounded-2xl mb-4 flex items-center justify-center">
//               <Play size={40} className="text-slate-300" />
//             </div>
//             <h3 className="font-bold text-lg mb-4">{lecture.title}</h3>
//             <div className="flex gap-2">
//               <button 
//                 onClick={() => handleWatchNow(lecture.videoUrl)}
//                 className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl"
//               >
//                 WATCH NOW
//               </button>
//               {lecture.pdfUrl && (
//                 <a href={lecture.pdfUrl} target="_blank" className="p-3 bg-slate-100 rounded-xl">
//                   <Download size={20} />
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedVideo && (
//         <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">
//           <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden">
//             <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full z-[1000]">
//               <X size={20} />
//             </button>
//             <iframe width="100%" height="100%" src={selectedVideo} frameBorder="0" allowFullScreen></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyLectures;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { Play, Download, Search, Loader2, VideoOff } from "lucide-react";

const MyLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // API se saara data mangwaya
        const res = await axios.get("http://localhost:5000/api/lectures");
        
        // --- FIXED LOGIC: Sirf 'video' type ko filter kiya ---
        // Isse Live meetings (Schedule wali) yahan nahi dikhengi
        const allData = res.data.lectures || [];
        const videoOnly = allData.filter(l => l.lectureType === 'video');
        
        setLectures(videoOnly);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Search filter
  const filteredLectures = lectures.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="animate-spin text-blue-600 mb-2" size={30} />
      <p className="text-slate-400 font-bold text-sm">Loading recordings...</p>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Play className="text-blue-600" fill="currentColor" size={24}/> My Lectures
          </h2>
          <p className="text-slate-500 text-sm">Newest lectures appear at the top.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
          <input 
            type="text" 
            placeholder="Search title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-400 w-full md:w-64 shadow-sm font-medium"
          />
        </div>
      </div>

      {/* Grid Section */}
      {filteredLectures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLectures.map((lecture) => (
            <div key={lecture._id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 group transition-all hover:-translate-y-1">
              {/* Thumbnail Area */}
              <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">
                  RECORDING
                </div>
                <button 
                  onClick={() => window.open(lecture.videoUrl, "_blank")}
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md group-hover:scale-110 transition-transform"
                >
                  <Play fill="white" size={24}/>
                </button>
              </div>
              
              {/* Content Area */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-blue-500 font-bold text-[11px] mb-2">
                  <span>📅</span> {new Date(lecture.createdAt).toLocaleDateString('en-GB')}
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-6 truncate capitalize">
                  {lecture.title}
                </h3>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.open(lecture.videoUrl, "_blank")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-[0.15em] shadow-lg shadow-blue-100 transition-all"
                  >
                    WATCH NOW
                  </button>
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100">
                    <Download size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 opacity-20">
          <VideoOff size={48} />
          <p className="mt-4 font-black uppercase tracking-widest text-sm">No video lectures available</p>
        </div>
      )}
    </div>
  );
};

export default MyLectures;