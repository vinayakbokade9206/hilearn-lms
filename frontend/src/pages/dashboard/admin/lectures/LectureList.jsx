// import { useEffect, useState } from "react";
// import { Edit3, Trash2, Clock, Search, Filter, Plus, X, Video, FileText, Play } from "lucide-react";
// import AddEditLecture from "./AddEditLecture";

// const API = "http://localhost:5000/api/lectures";

// const LectureList = () => {
//   const [lectures, setLectures] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   const fetchLectures = async () => {
//     try {
//       const res = await fetch(API);
//       const data = await res.json();
//       if (data.success) setLectures(data.lectures);
//     } catch (err) { console.error("Error fetching lectures:", err); }
//   };

//   useEffect(() => { fetchLectures(); }, []);

//   const deleteLecture = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       await fetch(`${API}/${id}`, { method: "DELETE" });
//       fetchLectures();
//     }
//   };

//   const handleEdit = (lecture) => {
//     setEditData(lecture);
//     setIsFormOpen(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const filteredLectures = lectures.filter(l => {
//     const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterValue === "" ||
//       l.course?._id === filterValue ||
//       l.course?.category?.toLowerCase() === filterValue.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   const uniqueCourses = Array.from(new Set(lectures.map(l => l.course?._id)))
//     .map(id => lectures.find(l => l.course?._id === id)?.course).filter(Boolean);

//   return (
//     <div className="max-w-6xl mx-auto p-6 md:p-8 bg-[#f8faff] min-h-screen font-sans text-slate-800">

//       {/* Normal but Blue-Themed Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-blue-100 pb-6">
//         <div>
//           <h1 className="text-2xl font-black text-blue-900 tracking-tight">Lecture Management</h1>
//           <p className="text-blue-500/70 text-sm font-medium">Manage your course curriculum and resources</p>
//         </div>
//         <button
//           onClick={() => isFormOpen ? (setIsFormOpen(false), setEditData(null)) : setIsFormOpen(true)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 ${isFormOpen
//               ? "bg-white text-slate-500 border border-slate-200"
//               : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
//             }`}
//         >
//           {isFormOpen ? <><X size={18} /> Close Panel</> : <><Plus size={18} /> Add New Lecture</>}
//         </button>
//       </div>

//       {isFormOpen && (
//         <div className="mb-10 animate-in fade-in slide-in-from-top-2">
//           <AddEditLecture refreshLectures={fetchLectures} editData={editData} clearEdit={() => { setIsFormOpen(false); setEditData(null); }} />
//         </div>
//       )}

//       {/* Search & Filter - Blue Accents */}
//       <div className="flex flex-col md:flex-row gap-3 mb-8">
//         <div className="relative flex-grow group">
//           {/* Icon container with flex centering */}
//           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//             <Search
//               className="text-blue-300 group-focus-within:text-blue-500 transition-colors duration-200"
//               size={18}
//             />
//           </div>

//           {/* Input Field */}
//           <input
//             type="text"
//             placeholder="Search lectures..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-11 pr-4 py-3 bg-white border border-blue-100 rounded-xl outline-none 
//                placeholder:text-slate-400 text-sm font-medium
//                shadow-sm shadow-blue-50/50
//                focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 
//                transition-all duration-200"
//           />
//         </div>
//         <div className="flex items-center gap-2 bg-white border border-blue-50 px-3 py-1 rounded-xl w-full md:w-64">
//           <Filter className="text-blue-400" size={16} />
//           <select
//             value={filterValue} onChange={(e) => setFilterValue(e.target.value)}
//             className="bg-transparent py-2 outline-none text-xs font-bold text-slate-600 w-full cursor-pointer uppercase tracking-wider"
//           >
//             <option value="">All Disciplines</option>
//             {uniqueCourses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Clean Grid - Blue Card Styling */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLectures.map((l) => (
//           <div key={l._id} className="bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-6 flex flex-col">
//             <div className="flex justify-between items-start mb-4">
//               <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
//                 {l.course?.category || 'General'}
//               </span>
//               <span className="text-slate-400 text-[11px] font-bold flex items-center gap-1">
//                 <Clock size={12} /> {l.duration}m
//               </span>
//             </div>

//             <h3 className="font-bold text-slate-800 mb-2 line-clamp-1 text-[16px]">{l.title}</h3>

//             <p className="text-slate-500 text-xs line-clamp-2 mb-6 flex-grow leading-relaxed italic opacity-80">
//               {l.description || "No summary provided for this content."}
//             </p>

//             <div className="flex flex-col gap-2 pt-4 border-t border-blue-50">
//               {l.videoUrl && (
//                 <button
//                   onClick={() => window.open(l.videoUrl, "_blank")}
//                   className="w-full py-2.5 bg-blue-50 text-blue-700 rounded-xl text-[11px] font-black flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
//                 >
//                   <Play size={14} fill="currentColor" /> WATCH CONTENT
//                 </button>
//               )}

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(l)}
//                   className="flex-1 py-2.5 text-[11px] font-bold text-indigo-600 bg-indigo-50/50 rounded-xl hover:bg-indigo-100 transition-colors"
//                 >
//                   EDIT
//                 </button>
//                 <button
//                   onClick={() => deleteLecture(l._id)}
//                   className="flex-1 py-2.5 text-[11px] font-bold text-rose-600 bg-rose-50/50 rounded-xl hover:bg-rose-100 transition-colors"
//                 >
//                   DELETE
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LectureList;

import { useEffect, useState } from "react";
import { Edit3, Trash2, Clock, Search, Filter, Plus, X, Play, FileText } from "lucide-react";
import AddEditLecture from "./AddEditLecture";
import MaterialList from "../materials/MaterialList";   // ✅ ADD THIS

const API = "http://localhost:5000/api/lectures";

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedLectureId, setSelectedLectureId] = useState(null); // ✅ NEW

  const fetchLectures = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (data.success) setLectures(data.lectures);
    } catch (err) {
      console.error("Error fetching lectures:", err);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const deleteLecture = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchLectures();
    }
  };

  const handleEdit = (lecture) => {
    setEditData(lecture);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredLectures = lectures.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterValue === "" || l.course?._id === filterValue;
    return matchesSearch && matchesFilter;
  });

  const uniqueCourses = Array.from(new Set(lectures.map((l) => l.course?._id)))
    .map((id) => lectures.find((l) => l.course?._id === id)?.course)
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-[#f8faff] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-900">Lecture Management</h1>
        <button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setEditData(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          {isFormOpen ? "Close" : "Add Lecture"}
        </button>
      </div>

      {isFormOpen && (
        <AddEditLecture
          refreshLectures={fetchLectures}
          editData={editData}
          clearEdit={() => {
            setIsFormOpen(false);
            setEditData(null);
          }}
        />
      )}

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search lectures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Courses</option>
          {uniqueCourses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* MATERIAL PANEL */}
      {selectedLectureId && (
        <div className="mb-8 bg-white p-4 rounded-xl shadow border">
          <div className="flex justify-between mb-2">
            <h2 className="font-bold text-blue-800">Lecture Materials</h2>
            <button
              onClick={() => setSelectedLectureId(null)}
              className="text-red-500 font-bold"
            >
              Close
            </button>
          </div>

          <MaterialList lectureId={selectedLectureId} />
        </div>
      )}

      {/* LECTURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLectures.map((l) => (
          <div
            key={l._id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs text-blue-600 font-bold">
                {l.course?.title}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {l.duration}m
              </span>
            </div>

            <h3 className="font-bold mb-2">{l.title}</h3>
            <p className="text-xs text-gray-500 mb-4">
              {l.description || "No description"}
            </p>

            {l.videoUrl && (
              <button
                onClick={() => window.open(l.videoUrl)}
                className="w-full bg-blue-50 text-blue-700 py-2 rounded mb-2 flex items-center justify-center gap-2"
              >
                <Play size={14} /> Watch Video
              </button>
            )}

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleEdit(l)}
                className="bg-indigo-50 text-indigo-600 py-2 rounded text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => deleteLecture(l._id)}
                className="bg-rose-50 text-rose-600 py-2 rounded text-xs"
              >
                Delete
              </button>

              {/* ✅ NEW MATERIAL BUTTON */}
              <button
                onClick={() => setSelectedLectureId(l._id)}
                className="bg-green-50 text-green-700 py-2 rounded text-xs flex items-center justify-center gap-1"
              >
                <FileText size={12} /> Material
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureList;
