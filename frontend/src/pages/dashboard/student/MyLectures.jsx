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


import React, { useState, useEffect } from "react";
import { Play, Download, X } from "lucide-react";
import axios from "axios";

const MyLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students/lectures", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) setLectures(res.data.lectures);
      } catch (err) { console.error(err); }
    };
    fetchLectures();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url || url.trim() === "") return null;
    let videoId = "";
    if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
    else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const handleWatchNow = (url) => {
    const embedUrl = getEmbedUrl(url);
    if (embedUrl) {
      setSelectedVideo(embedUrl);
    } else {
      // Agar ye alert aata hai, toh matlab Database mein link nahi hai
      alert("Error: Is lecture ka Video Link database mein nahi mila! Admin se kahein ki link update karein.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-black mb-6">My Lectures</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <div key={lecture._id} className="bg-white rounded-3xl border p-5 shadow-sm">
            <div className="aspect-video bg-slate-100 rounded-2xl mb-4 flex items-center justify-center">
              <Play size={40} className="text-slate-300" />
            </div>
            <h3 className="font-bold text-lg mb-4">{lecture.title}</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => handleWatchNow(lecture.videoUrl)}
                className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl"
              >
                WATCH NOW
              </button>
              {lecture.pdfUrl && (
                <a href={lecture.pdfUrl} target="_blank" className="p-3 bg-slate-100 rounded-xl">
                  <Download size={20} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full z-[1000]">
              <X size={20} />
            </button>
            <iframe width="100%" height="100%" src={selectedVideo} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLectures;