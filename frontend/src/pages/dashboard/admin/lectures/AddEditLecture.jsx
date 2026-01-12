// import { useEffect, useState } from "react";
// import { Video, Type, Clock, Layers, Link as LinkIcon, Send, XCircle } from "lucide-react";

// const API = "http://localhost:5000/api";

// const AddEditLecture = ({ refreshLectures, editData, clearEdit }) => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ 
//     title: "", description: "", duration: "", course: "", videoUrl: "", lectureType: "video" 
//   });

//   useEffect(() => {
//     fetch(`${API}/courses`).then(res => res.json()).then(data => setCourses(data.courses || []));
//   }, []);

//   useEffect(() => {
//     if (editData) {
//       setForm({
//         ...editData,
//         course: editData.course?._id || editData.course // handle populated object
//       });
//     }
//   }, [editData]);

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const url = editData ? `${API}/lectures/${editData._id}` : `${API}/lectures`;
//     const method = editData ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (data.success) {
//         refreshLectures();
//         clearEdit();
//         setForm({ title: "", description: "", duration: "", course: "", videoUrl: "", lectureType: "video" });
//       }
//     } catch (err) { alert("Error saving lecture"); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 mb-10">
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
//             <Video size={24} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800">{editData ? "Edit Lecture" : "Create New Lecture"}</h2>
//             <p className="text-sm text-slate-500 font-medium">Assign lectures to courses and add content</p>
//           </div>
//         </div>
//         {editData && (
//           <button onClick={clearEdit} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition">
//             <XCircle size={18} /> Cancel
//           </button>
//         )}
//       </div>

//       <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="md:col-span-2 space-y-2">
//           <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2"><Layers size={14}/> Target Course</label>
//           <select name="course" value={form.course} onChange={(e)=>setForm({...form, course: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none cursor-pointer">
//             <option value="">Select a Course</option>
//             {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2"><Type size={14}/> Lecture Title</label>
//           <input name="title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} placeholder="Introduction to UI/UX" required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2"><LinkIcon size={14}/> Video URL</label>
//           <input name="videoUrl" value={form.videoUrl} onChange={(e)=>setForm({...form, videoUrl: e.target.value})} placeholder="YouTube or Vimeo Link" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2"><Clock size={14}/> Duration</label>
//           <input name="duration" value={form.duration} onChange={(e)=>setForm({...form, duration: e.target.value})} placeholder="e.g. 15 min" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">Lecture Type</label>
//           <select name="lectureType" value={form.lectureType} onChange={(e)=>setForm({...form, lectureType: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none">
//             <option value="video">Video</option>
//             <option value="article">Article</option>
//             <option value="quiz">Quiz</option>
//           </select>
//         </div>

//         <button type="submit" disabled={loading} className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100 active:scale-95">
//           {loading ? "Processing..." : editData ? "Update Lecture" : "Add Lecture"} <Send size={18} />
//         </button>
//       </form>
//     </div>
//   );
// };
// export default AddEditLecture;

import { useEffect, useState } from "react";
import { Video, Send, FileText, LayoutGrid, Type, Link, Clock, AlignLeft, Layers } from "lucide-react";

const API = "http://localhost:5000/api";

const AddEditLecture = ({ refreshLectures, editData, clearEdit }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    title: "", description: "", duration: "", course: "", videoUrl: "", lectureType: "video" 
  });

  useEffect(() => {
    fetch(`${API}/courses`).then(res => res.json()).then(data => setCourses(data.courses || []));
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({ ...editData, course: editData.course?._id || editData.course });
    }
  }, [editData]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = editData ? `${API}/lectures/${editData._id}` : `${API}/lectures`;
    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        refreshLectures();
        clearEdit();
        setForm({ title: "", description: "", duration: "", course: "", videoUrl: "", lectureType: "video" });
      }
    } catch (err) { alert("Error saving lecture"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/40">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-slate-50">
        <div className="p-2 bg-slate-900 rounded-lg text-white shadow-lg shadow-slate-200">
          <LayoutGrid size={18}/>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            {editData ? "Modify Lecture" : "Editor: New Content"}
          </h2>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">LMS Admin Panel</p>
        </div>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Course Dropdown - Full Width */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1">
            <Layers size={12} className="text-indigo-500"/> Parent Course Pathway
          </label>
          <select 
            name="course" value={form.course} onChange={(e)=>setForm({...form, course: e.target.value})} 
            required className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-400 focus:bg-white text-sm font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
          >
            <option value="">Select the target course...</option>
            {courses.map((c) => <option key={c._id} value={c._id}>💎 {c.title}</option>)}
          </select>
        </div>

        {/* Title Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 ml-1">
            <Type size={12} className="text-indigo-500"/> Lecture Title
          </label>
          <input name="title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} placeholder="Mastering the Basics" required className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-400 focus:bg-white text-sm font-medium transition-all" />
        </div>

        {/* URL Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 ml-1">
            <Link size={12} className="text-indigo-500"/> Content Link / URL
          </label>
          <input name="videoUrl" value={form.videoUrl} onChange={(e)=>setForm({...form, videoUrl: e.target.value})} placeholder="https://vimeo.com/..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-400 focus:bg-white text-sm font-medium transition-all" />
        </div>

        {/* Description Field - Full Width */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 ml-1">
            <AlignLeft size={12} className="text-indigo-500"/> Curriculum Description
          </label>
          <textarea 
            name="description" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} 
            placeholder="Write a brief summary of what students will learn..." rows="2"
            className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-400 focus:bg-white text-sm font-medium transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Duration Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 ml-1">
            <Clock size={12} className="text-indigo-500"/> Duration (Mins)
          </label>
          <input type="number" name="duration" value={form.duration} onChange={(e)=>setForm({...form, duration: e.target.value})} placeholder="15" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-indigo-400 focus:bg-white text-sm font-bold" />
        </div>

        {/* Format Select */}
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 ml-1">Lecture Format</label>
          <select name="lectureType" value={form.lectureType} onChange={(e)=>setForm({...form, lectureType: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none text-sm font-bold text-indigo-600 transition-all cursor-pointer">
            <option value="video">🎥 Video Content</option>
            <option value="article">📄 Reading Material</option>
            <option value="quiz">📝 Quiz/Knowledge Test</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="md:col-span-2 bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4 text-[12px] tracking-[0.2em] active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-slate-200"
        >
          {loading ? "SAVING..." : editData ? "UPDATE LECTURE" : "PUBLISH LECTURE"} <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AddEditLecture;