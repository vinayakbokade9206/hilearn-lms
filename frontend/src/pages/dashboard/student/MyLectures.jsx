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

//   // const getEmbedUrl = (url) => {
//   //   if (!url || url.trim() === "") return null;
//   //   let videoId = "";
//   //   if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
//   //   else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1];
//   //   return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
//   // };
//   const getEmbedUrl = (url) => {
//   if (!url || url.trim() === "") return null;
  
//   let videoId = "";
//   try {
//     // Regular expression for all YouTube link types
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);

//     if (match && match[2].length === 11) {
//       videoId = match[2];
//     } else {
//       return null;
//     }
//   } catch (e) {
//     return null;
//   }
  
//   return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
// };

// const handleWatchNow = (url) => {
//   console.log("Original URL:", url); // Debugging ke liye
//   const embedUrl = getEmbedUrl(url);
  
//   if (embedUrl) {
//     setSelectedVideo(embedUrl);
//   } else {
//     alert("Invalid Video URL!");
//   }
// };

//   // const handleWatchNow = (url) => {
//   //   const embedUrl = getEmbedUrl(url);
//   //   if (embedUrl) {
//   //     setSelectedVideo(embedUrl);
//   //   } else {
//   //     // Agar ye alert aata hai, toh matlab Database mein link nahi hai
//   //     alert("Error: Is lecture ka Video Link database mein nahi mila! Admin se kahein ki link update karein.");
//   //   }
//   // };

// //   const handleWatchNow = (url) => {
// //   if (url && url.trim() !== "") {
// //     window.open(url, "_blank"); // Yeh naye tab mein link open kar dega
// //   } else {
// //     alert("Error: Is lecture ka Video Link database mein nahi mila!");
// //   }
// // };

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
//                 onClick={() => {handleWatchNow(lecture.videoUrl); console.log(lecture.videoUrl)}}
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
//       } catch (err) { console.error("Fetch Error:", err); }
//     };
//     fetchLectures();
//   }, []);

//   // Is function ko dhyan se dekhein - Yeh video ID nikaalta hai
//   const getEmbedUrl = (url) => {
//     if (!url || typeof url !== 'string') return null;
    
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);

//     if (match && match[2].length === 11) {
//       const videoId = match[2];
//       // Autoplay aur permissions ke saath embed link
//       return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//     }
//     return null;
//   };

//   const handleWatchNow = (url) => {
//     const embedUrl = getEmbedUrl(url);
//     if (embedUrl) {
//       setSelectedVideo(embedUrl);
//     } else {
//       alert("Invalid Video URL! Please check the link in database.");
//     }
//   };

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <h2 className="text-2xl font-black mb-6 text-slate-800">My Lectures</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {lectures.map((lecture) => (
//           <div key={lecture._id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
//             <div 
//               className="aspect-video bg-slate-100 rounded-2xl mb-4 flex items-center justify-center cursor-pointer group"
//               onClick={() => handleWatchNow(lecture.videoUrl)}
//             >
//               <Play size={44} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
//             </div>
            
//             <h3 className="font-bold text-lg mb-4 text-slate-700 line-clamp-1">{lecture.title}</h3>
            
//             <div className="flex gap-2">
//               <button 
//                 onClick={() => handleWatchNow(lecture.videoUrl)}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
//               >
//                 WATCH NOW
//               </button>
              
//               {lecture.pdfUrl && (
//                 <a 
//                   href={lecture.pdfUrl} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
//                 >
//                   <Download size={20} className="text-slate-600" />
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- POPUP MODAL --- */}
//       {selectedVideo && (
//         <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            
//             {/* Close Button */}
//             <button 
//               onClick={() => setSelectedVideo(null)} 
//               className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-[1000] transition-transform hover:scale-110"
//             >
//               <X size={24} />
//             </button>

//             {/* Iframe with proper permissions */}
//             <iframe 
//               width="100%" 
//               height="100%" 
//               src={selectedVideo} 
//               title="Video Player"
//               frameBorder="0" 
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
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
//         // Check kijiye ki res.data.lectures sahi array hai ya nahi
//         if (res.data.success) {
//           setLectures(res.data.lectures);
//         }
//       } catch (err) {
//         console.error("API Error:", err);
//       }
//     };
//     fetchLectures();
//   }, []);

//   // const getEmbedUrl = (url) => {
//   //   if (!url) return null;
//   //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   //   const match = url.match(regExp);
//   //   return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
//   // };

//   // const handleWatchNow = (lecture) => {
//   //   // DEBUG: Agar link nahi mil rahi toh alert dikhayega ki database mein key ka naam kya hai
//   //   if (!lecture.videoUrl) {
//   //     alert(`URL Missing! Backend se aane wali keys ye hain: ${Object.keys(lecture).join(", ")}`);
//   //     return;
//   //   }

//   //   const embedUrl = getEmbedUrl(lecture.videoUrl);
//   //   if (embedUrl) {
//   //     setSelectedVideo(embedUrl);
//   //   } else {
//   //     alert("Invalid YouTube Link: " + lecture.videoUrl);
//   //   }
//   // };
//   const getEmbedUrl = (url) => {
//     if (!url || typeof url !== "string") return null;

//     try {
//       let videoId = "";

//       // Case 1: Agar link mein "/shorts/" hai
//       if (url.includes("/shorts/")) {
//         videoId = url.split("/shorts/")[1].split(/[?&]/)[0];
//       } 
//       // Case 2: Agar link mein "watch?v=" hai (Aapki nayi link isi case mein aayegi)
//       else if (url.includes("v=")) {
//         // v= ke baad waali ID nikaalte hain aur baaki parameters (&list etc.) hata dete hain
//         const urlParams = new URLSearchParams(new URL(url).search);
//         videoId = urlParams.get("v");
//       } 
//       // Case 3: Agar link short waali hai (youtu.be/ID)
//       else if (url.includes("youtu.be/")) {
//         videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
//       }

//       // Final check: YouTube ID hamesha 11 characters ki hoti hai
//       if (videoId && videoId.length === 11) {
//         return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//       }
//       return null;
//     } catch (error) {
//       console.error("URL Parsing Error:", error);
//       return null;
//     }
//   };

//   const handleWatchNow = (url) => {
//     console.log("Database URL:", url); // Debugging ke liye
//     const embedUrl = getEmbedUrl(url);
    
//     if (embedUrl) {
//       setSelectedVideo(embedUrl);
//     } else {
//       // Agar yahan alert aata hai, toh link format check karna padega
//       alert("Invalid YouTube Link! Link format is not supported.");
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h2 className="text-2xl font-black mb-6">My Lectures ({lectures.length})</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {lectures.map((lecture) => (
//           <div key={lecture._id} className="bg-white rounded-3xl border p-5 shadow-sm">
//             <div 
//               className="aspect-video bg-slate-200 rounded-2xl mb-4 flex items-center justify-center cursor-pointer overflow-hidden"
//               onClick={() => handleWatchNow(lecture)}
//             >
//                {/* Thumbnail logic: Agar link hai toh YouTube ka photo dikhao */}
//                {lecture.videoUrl ? (
//                  <img 
//                    src={`https://img.youtube.com/vi/${lecture.videoUrl.split('v=')[1]?.split('&')[0] || lecture.videoUrl.split('/').pop()}/0.jpg`} 
//                    className="w-full h-full object-cover"
//                    alt="thumbnail"
//                    onError={(e) => e.target.style.display='none'}
//                  />
//                ) : <Play size={40} className="text-slate-400" />}
//             </div>

//             <h3 className="font-bold text-lg mb-4">{lecture.title || "Untitled Lecture"}</h3>
            
//             <div className="flex gap-2">
//               <button 
//                 onClick={() => handleWatchNow(lecture)}
//                 className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all"
//               >
//                 WATCH NOW
//               </button>
//               {lecture.pdfUrl && (
//                 <a href={lecture.pdfUrl} target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-xl">
//                   <Download size={20} />
//                 </a>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL SECTION */}
//       {selectedVideo && (
//         <div 
//           className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
//           onClick={() => setSelectedVideo(null)} // Background click to close
//         >
//           <div 
//             className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
//           >
//             <button 
//               onClick={() => setSelectedVideo(null)} 
//               className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full z-[10000]"
//             >
//               <X size={20} />
//             </button>
            
//             <iframe
//               title="Lecture Video"
//               width="100%"
//               height="100%"
//               src={selectedVideo}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
//         if (res.data.success) {
//           setLectures(res.data.lectures);
//         }
//       } catch (err) {
//         console.error("API Error:", err);
//       }
//     };
//     fetchLectures();
//   }, []);

//   const getYouTubeId = (url) => {
//   if (!url) return null;

//   try {
//     if (url.includes("/shorts/")) {
//       return url.split("/shorts/")[1].split(/[?&]/)[0];
//     }
//     if (url.includes("v=")) {
//       return url.split("v=")[1].split("&")[0];
//     }
//     if (url.includes("youtu.be/")) {
//       return url.split("youtu.be/")[1].split(/[?&]/)[0];
//     }
//     return null;
//   } catch {
//     return null;
//   }
// };

//   // const getEmbedUrl = (url) => {
//   //   if (!url || typeof url !== "string") return null;

//   //   try {
//   //     let videoId = "";

//   //     // Case 1: Shorts link
//   //     if (url.includes("/shorts/")) {
//   //       videoId = url.split("/shorts/")[1].split(/[?&]/)[0];
//   //     } 
//   //     // Case 2: Watch link (watch?v=ID)
//   //     else if (url.includes("v=")) {
//   //       const parts = url.split("v=")[1];
//   //       videoId = parts.split("&")[0];
//   //     } 
//   //     // Case 3: Short youtu.be link
//   //     else if (url.includes("youtu.be/")) {
//   //       videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
//   //     }

//   //     if (videoId) {
//   //       // Trim videoId to exactly 11 characters (safety check)
//   //       const cleanId = videoId.substring(0, 11);
//   //       return `https://www.youtube.com/embed/${cleanId}?autoplay=1&rel=0`;
//   //     }
//   //     return null;
//   //   } catch (error) {
//   //     return null;
//   //   }
//   // };
//   const getEmbedUrl = (url) => {
//   const videoId = getYouTubeId(url);
//   if (!videoId) return null;

//   return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
// };

//   const handleWatchNow = (url) => {
//     if (!url) {
//       alert("Error: Video link database mein nahi hai!");
//       return;
//     }
//     const embedUrl = getEmbedUrl(url);
//     if (embedUrl) {
//       setSelectedVideo(embedUrl);
//     } else {
//       alert("Invalid YouTube Link!");
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h2 className="text-2xl font-black mb-6">My Lectures ({lectures.length})</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// {lectures.map((lecture) => {
//   const videoId = getYouTubeId(lecture.videoUrl);

//   return (
//     <div key={lecture._id} className="bg-white rounded-3xl border p-5 shadow-sm">
//       <div
//         className="aspect-video bg-slate-200 rounded-2xl mb-4 flex items-center justify-center cursor-pointer overflow-hidden"
//         onClick={() => handleWatchNow(lecture.videoUrl)}
//       >
//         {lecture.videoUrl ? (
//           <img
//             src={
//               videoId
//                 ? `https://img.youtube.com/vi/${videoId}/0.jpg`
//                 : "https://via.placeholder.com/400x225?text=No+Thumbnail"
//             }
//             className="w-full h-full object-cover"
//             alt="thumbnail"
//           />
//         ) : (
//           <Play size={40} className="text-slate-400" />
//         )}
//       </div>

//       <h3 className="font-bold text-lg mb-4">
//         {lecture.title || "Untitled Lecture"}
//       </h3>

//       <div className="flex gap-2">
//         <button
//           onClick={() => handleWatchNow(lecture.videoUrl)}
//           className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all"
//         >
//           WATCH NOW
//         </button>

//         {lecture.pdfUrl && (
//           <a
//             href={lecture.pdfUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="p-3 bg-slate-100 rounded-xl"
//           >
//             <Download size={20} />
//           </a>
//         )}
//       </div>
//     </div>
//   );
// })}

//       </div>

//       {selectedVideo && (
//         <div 
//           className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
//           onClick={() => setSelectedVideo(null)}
//         >
//           <div 
//             className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button 
//               onClick={() => setSelectedVideo(null)} 
//               className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full z-[10000] hover:scale-110 transition-transform"
//             >
//               <X size={20} />
//             </button>
            
//             <iframe
//               title="Lecture Video"
//               width="100%"
//               height="100%"
//               src={selectedVideo}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyLectures;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const MyLectures = () => {
  console.log("MyLectures component rendered");
  const [lectures, setLectures] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  // 🔹 Fetch lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/students/lectures",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("LECTURES API RESPONSE:", res.data);

        if (res.data.success) {
          setLectures(res.data.lectures);
        }
      } catch (error) {
        console.error("LECTURES API ERROR:", error);
      }
    };

    fetchLectures();
  }, []);

  // 🔹 VERY SIMPLE watch handler
  const handleWatchNow = (videoUrl) => {
    console.log("WATCH CLICKED:", videoUrl);

    if (!videoUrl) {
      alert("Video URL missing");
      return;
    }

    // ONLY this format — always works
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];

    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    console.log("EMBED URL:", embedUrl);
    setSelectedVideo(embedUrl);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Lectures ({lectures.length})
      </h2>

      {/* LECTURE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            className="border rounded-xl p-4 shadow"
          >
            <h3 className="font-semibold mb-4">
              {lecture.title || "Untitled Lecture"}
            </h3>

            <button
              onClick={() => handleWatchNow(lecture.videoUrl)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              WATCH NOW
            </button>
          </div>
        ))}
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setSelectedVideo("")}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={28} />
            </button>

            <iframe
              src={selectedVideo}
              className="w-full h-full"
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

export default MyLectures;
