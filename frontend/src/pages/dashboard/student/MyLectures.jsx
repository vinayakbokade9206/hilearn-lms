import axios from "axios";


import  { React,useState, useEffect } from "react";
import { Play, Download, Search, Loader2, VideoOff, X } from "lucide-react";

const MyLectures = () => {
  console.log("MyLectures component rendered");
  const [lectures, setLectures] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch lectures
  useEffect(() => {
    const fetchVideos = async () => {
      try {
    setLoading(true);
         {/* API se saara data mangwaya */}
        const res = await axios.get("http://localhost:5000/api/lectures");
        
         {/* --- FIXED LOGIC: Sirf 'video' type ko filter kiya --- */}
         {/* Isse Live meetings (Schedule wali) yahan nahi dikhengi */}
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
